/*!
 * ga4-consent-analytics.js
 * Reusable, standalone, consent-gated GA4 loader for multiple static/SPA sites.
 * Vanilla JS, no dependencies. Drop in via a single <script> tag with data-* config.
 *
 * Usage:
 *   <script src="/shared/ga4-consent-analytics.js"
 *     data-site-analytics="boardroom"
 *     data-measurement-id="G-XXXXXXX"
 *     data-canonical-host="boardroom.example.com"
 *     data-site-name="Board Room"
 *     data-public-paths='["/","/about","/blog/*"]'
 *     data-privacy-url="/analytics-privacy.html"></script>
 *
 * Rules enforced:
 * - No request to any Google domain until the visitor affirmatively opts in.
 * - Never loads on a hostname other than the exact canonical host or its
 *   "www." variant (no previews/dev/other subdomains).
 * - page_location is built from the canonical origin + an allowed pathname
 *   ONLY (no query string, no hash). page_referrer is reduced to origin only.
 * - page_title is always the fixed configured site name (never document.title
 *   or a filename), so titles never leak page/document contents.
 * - Ads consent signals are always denied and never requested; Google
 *   signals / ad personalization are disabled unconditionally.
 * - Consent Mode v2 defaults to fully denied before any user decision.
 * - ga-disable-<id> is set to true BEFORE the "denied" consent update is
 *   pushed, so a loaded gtag.js cannot race a ping in between.
 * - Cookies are host-only via cookie_domain:none (no Domain attribute / no
 *   shared root domain), 60-day expiry, and every host/domain/www variant is
 *   cleared on decline/withdraw.
 * - Tracking is suspended while an SPA is on a non-public route (detected via
 *   pushState/replaceState/popstate) and resumes only on a public route with
 *   saved consent.
 * - Exactly one explicit `page_view` event fires per new allowed route, or on
 *   a denied -> granted transition; re-clicking "accept" never duplicates it.
 * - No enhanced measurement, no form/click/content tracking of any kind.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    factory().autoInit(root);
  }
})(typeof window !== 'undefined' ? window : this, function () {
  'use strict';

  var COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 60; // 60 days
  var STORAGE_PREFIX = 'ga4cga.consent.';

  // ----------------------------------------------------------------------
  // Pure helpers (unit-testable, no DOM access)
  // ----------------------------------------------------------------------

  /** Parse the data-public-paths JSON attribute into a clean string array. */
  function parsePublicPaths(raw) {
    if (!raw) return [];
    var parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      return [];
    }
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(function (v) { return typeof v === 'string' && v.length > 0; })
      .map(function (v) { return v.trim(); });
  }

  /**
   * A path is public if it exactly matches an entry, or if an entry ends in
   * "/*" and the path starts with that entry's prefix (blog route prefix).
   */
  function isPublicPath(pathname, publicPaths) {
    for (var i = 0; i < publicPaths.length; i++) {
      var rule = publicPaths[i];
      if (rule.slice(-2) === '/*') {
        var prefix = rule.slice(0, -1); // keep trailing slash
        if (pathname === prefix.slice(0, -1) || pathname.indexOf(prefix) === 0) return true;
      } else if (pathname === rule) {
        return true;
      }
    }
    return false;
  }

  /** Only the exact canonical host or its www. variant may load analytics. */
  function isAllowedHost(hostname, canonicalHost) {
    if (!hostname || !canonicalHost) return false;
    return hostname === canonicalHost || hostname === 'www.' + canonicalHost;
  }

  function canonicalOrigin(canonicalHost) {
    return 'https://' + canonicalHost;
  }

  /** Canonical origin + allowed pathname only. No query string, no hash, ever. */
  function buildPageLocation(canonicalHost, pathname) {
    var cleanPath = String(pathname || '/').split('?')[0].split('#')[0];
    return canonicalOrigin(canonicalHost) + cleanPath;
  }

  /** Reduce any URL to just its origin (scheme + host), dropping path/query/hash. */
  function originOnly(url) {
    if (!url) return '';
    try {
      var parsed = new URL(url);
      return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed.origin : '';
    } catch (e) {
      return '';
    }
  }

  function disableFlagName(measurementId) {
    return 'ga-disable-' + measurementId;
  }

  function cookieBaseNames(measurementId) {
    var suffix = String(measurementId || '').replace(/^G-/, '');
    var names = ['_ga', '_gid', '_gat'];
    if (suffix) names.push('_ga_' + suffix);
    return names;
  }

  /**
   * Every {name, domain} combination to expire: host-only (no domain attr),
   * the exact canonical host, the dotted canonical host, and the same pair
   * for the www. variant, plus whatever the browser's current hostname is
   * (covers the case GA set a cookie before this host allowlist tightened).
   * Deliberately bounded to canonical+www so a shared parent/root domain
   * (e.g. other subdomains on the same apex) is never touched.
   */
  function cookieDirectives(hostname, canonicalHost, measurementId) {
    var names = cookieBaseNames(measurementId);
    var www = 'www.' + canonicalHost;
    var domainSet = [undefined, canonicalHost, '.' + canonicalHost, www, '.' + www];
    if (hostname && domainSet.indexOf(hostname) === -1) {
      domainSet.push(hostname, '.' + hostname);
    }
    var seen = {};
    var directives = [];
    for (var i = 0; i < names.length; i++) {
      for (var j = 0; j < domainSet.length; j++) {
        var domain = domainSet[j];
        var key = names[i] + '|' + (domain || '');
        if (seen[key]) continue;
        seen[key] = true;
        directives.push(domain ? { name: names[i], domain: domain } : { name: names[i] });
      }
    }
    return directives;
  }

  function consentStorageKey(siteKey) {
    return STORAGE_PREFIX + siteKey;
  }

  function parseConsent(value) {
    return value === 'granted' || value === 'denied' ? value : null;
  }

  function detectLang(doc) {
    var l = (doc && doc.documentElement && doc.documentElement.lang) || '';
    return l.toLowerCase().indexOf('en') === 0 ? 'en' : 'ko';
  }

  var COPY = {
    ko: {
      title: '방문 통계 수집에 동의하시겠어요?',
      desc: '이 GA4 방문 통계 기능은 동의한 경우에만 쿠키를 사용해요. 동의하면 방문 주소와 기기·접속 정보가 Google로 전송돼요.',
      privacyLink: '개인정보 안내',
      accept: '동의',
      decline: '거부',
      settingsButton: '분석 설정',
      close: '닫기',
      statusGranted: '현재 통계 수집에 동의한 상태예요.',
      statusDenied: '현재 통계 수집을 거부한 상태예요.'
    },
    en: {
      title: 'Allow visit analytics?',
      desc: 'This GA4 visit-analytics feature uses cookies only with your consent. If you accept, page addresses and device/connection information are sent to Google.',
      privacyLink: 'Privacy notice',
      accept: 'Accept',
      decline: 'Decline',
      settingsButton: 'Analytics settings',
      close: 'Close',
      statusGranted: 'Analytics is currently allowed.',
      statusDenied: 'Analytics is currently declined.'
    }
  };

  // ----------------------------------------------------------------------
  // Config parsing from the <script> tag's own attributes
  // ----------------------------------------------------------------------

  function readConfig(scriptEl) {
    var get = function (name) { return scriptEl.getAttribute(name); };
    var canonicalHost = get('data-canonical-host') || '';
    return {
      siteKey: get('data-site-analytics') || canonicalHost,
      measurementId: get('data-measurement-id') || '',
      canonicalHost: canonicalHost,
      siteName: get('data-site-name') || canonicalHost,
      publicPaths: parsePublicPaths(get('data-public-paths')),
      privacyUrl: get('data-privacy-url') || '/analytics-privacy.html'
    };
  }

  // ----------------------------------------------------------------------
  // Controller: all DOM/window access happens through an injected `env`,
  // so the exact same logic can run against a real browser or a fake DOM
  // sandbox in regression tests, with no network ever required.
  // ----------------------------------------------------------------------

  function createController(env, config) {
    var win = env.window;
    var doc = env.document;
    var getLocation = function () { return env.location; };
    var hist = env.history;
    var storage = env.localStorage;

    var sessionConsent = null;
    var appliedState = null; // 'granted' | 'denied' | null
    var scriptInjected = false;
    var suppressed = false; // true while on a non-public route
    var lastSentRoute = null;
    var bannerEl = null;
    var settingsButtonEl = null;
    var bannerShownOnce = false;
    var historyPatched = false;
    var privateModeActive = false; // true while documentElement[data-site-analytics-private]==='true'
    var softDisabled = false; // GA soft-disabled for private mode, without touching saved consent
    var mutationObserver = null;

    function ensureGtagStub() {
      win.dataLayer = win.dataLayer || [];
      if (!win.gtag) {
        // Canonical snippet: push the `arguments` object itself.
        win.gtag = function () {
          win.dataLayer.push(arguments);
        };
      }
    }

    function applyConsentDefaults() {
      ensureGtagStub();
      win.gtag('consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied'
      });
    }

    function hostAllowed() {
      return isAllowedHost(getLocation().hostname, config.canonicalHost);
    }

    function readConsent() {
      try {
        return parseConsent(storage && storage.getItem(consentStorageKey(config.siteKey))) || sessionConsent;
      } catch (e) {
        return sessionConsent;
      }
    }

    function writeConsent(value) {
      sessionConsent = parseConsent(value);
      try {
        storage.setItem(consentStorageKey(config.siteKey), value);
      } catch (e) {
        /* storage blocked: re-ask next visit */
      }
    }

    function clearAnalyticsCookies() {
      if (!doc) return;
      var loc = getLocation();
      var directives = cookieDirectives(loc.hostname, config.canonicalHost, config.measurementId);
      for (var i = 0; i < directives.length; i++) {
        var d = directives[i];
        doc.cookie = d.name + '=; max-age=0; path=/' + (d.domain ? '; domain=' + d.domain : '');
      }
    }

    function loadGtagScript() {
      if (scriptInjected || !hostAllowed() || !config.measurementId) return;
      scriptInjected = true;
      var s = doc.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(config.measurementId);
      doc.head.appendChild(s);
    }

    function currentPathname() {
      return getLocation().pathname || '/';
    }

    function isRouteAllowed(pathname) {
      return isPublicPath(pathname, config.publicPaths);
    }

    function sendPageviewIfNeeded(pathname) {
      if (!hostAllowed() || appliedState !== 'granted' || suppressed || isPrivateModeActive() || readConsent() !== 'granted') return;
      if (!isRouteAllowed(pathname)) return;
      if (lastSentRoute === pathname) return; // de-dupe: same route already sent
      lastSentRoute = pathname;
      win.gtag('event', 'page_view', {
        page_location: buildPageLocation(config.canonicalHost, pathname),
        page_referrer: doc.referrer ? originOnly(doc.referrer) : '',
        page_title: config.siteName
      });
    }

    function activate() {
      if (!hostAllowed() || !isRouteAllowed(currentPathname()) || isPrivateModeActive() || readConsent() !== 'granted') {
        softSuspendForPrivateMode();
        return;
      }
      softDisabled = false;
      ensureGtagStub();
      // Clear the hard opt-out flag first so a stub/loaded gtag.js never
      // stays silently disabled after a fresh accept.
      win[disableFlagName(config.measurementId)] = false;
      win.gtag('consent', 'update', { analytics_storage: 'granted' });
      var wasGranted = appliedState === 'granted';
      appliedState = 'granted';
      suppressed = false;
      loadGtagScript();
      if (!wasGranted) {
        lastSentRoute = null; // force exactly one pageview for this transition
        win.gtag('js', new Date());
        win.gtag('config', config.measurementId, {
          page_location: buildPageLocation(config.canonicalHost, currentPathname()),
          page_referrer: doc.referrer ? originOnly(doc.referrer) : '',
          page_title: config.siteName,
          allow_google_signals: false,
          allow_ad_personalization_signals: false,
          cookie_domain: 'none', // host-only, including apex vs child subdomain isolation
          cookie_expires: COOKIE_MAX_AGE_SECONDS,
          send_page_view: false
        });
      }
      sendPageviewIfNeeded(currentPathname());
    }

    function deactivate() {
      ensureGtagStub();
      // Set the hard opt-out flag BEFORE the consent update so an in-flight
      // or already-loaded gtag.js cannot slip a ping in between the two.
      win[disableFlagName(config.measurementId)] = true;
      win.gtag('consent', 'update', { analytics_storage: 'denied' });
      appliedState = 'denied';
      lastSentRoute = null;
      clearAnalyticsCookies();
    }

    function applyConsent(state) {
      if (state === 'granted') activate();
      else deactivate();
    }

    // -- Internal/auth-gated private mode ---------------------------------
    // Hosts can set <html data-site-analytics-private="true"> while an
    // authenticated/private screen is shown (e.g. during auth resolution,
    // or any signed-in-only route sharing a path with a public one). This
    // hides the banner/settings UI and hard-disables live GA output, but it
    // NEVER overwrites saved consent or clears cookies -- only an explicit
    // decline does that. Clearing the flag re-evaluates the current route
    // against saved consent and resumes normally.

    function isPrivateModeActive() {
      var root = doc && doc.documentElement;
      if (!root) return false;
      if (root.dataset && 'siteAnalyticsPrivate' in root.dataset) {
        return root.dataset.siteAnalyticsPrivate === 'true';
      }
      return root.getAttribute && root.getAttribute('data-site-analytics-private') === 'true';
    }

    function softSuspendForPrivateMode() {
      suppressed = true;
      if (softDisabled) return;
      ensureGtagStub();
      win[disableFlagName(config.measurementId)] = true;
      win.gtag('consent', 'update', { analytics_storage: 'denied' });
      softDisabled = true;
    }

    // -- UI --------------------------------------------------------------

    function copy() {
      return COPY[detectLang(doc)];
    }

    function closeBanner() {
      if (bannerEl && bannerEl.parentNode) bannerEl.parentNode.removeChild(bannerEl);
      bannerEl = null;
    }

    function removeSettingsButton() {
      if (settingsButtonEl && settingsButtonEl.parentNode) settingsButtonEl.parentNode.removeChild(settingsButtonEl);
      settingsButtonEl = null;
    }

    function renderBanner(mode) {
      if (!doc || !doc.body) return;
      closeBanner();
      var c = copy();
      var el = doc.createElement('div');
      el.setAttribute('data-ga4cga', 'banner');
      el.setAttribute('role', 'dialog');
      el.setAttribute('aria-modal', 'false');
      var current = readConsent();
      var status = mode === 'settings' && current ? (current === 'granted' ? c.statusGranted : c.statusDenied) : '';
      var closeBtn = mode === 'settings' ? '<button type="button" data-ga4cga-action="close">' + c.close + '</button>' : '';
      el.innerHTML =
        closeBtn +
        '<p data-ga4cga="title">' + c.title + '</p>' +
        '<p data-ga4cga="desc">' + c.desc + ' <a href="' + config.privacyUrl + '">' + c.privacyLink + '</a></p>' +
        (status ? '<p data-ga4cga="status">' + status + '</p>' : '') +
        '<div data-ga4cga="actions">' +
        '<button type="button" data-ga4cga-action="accept">' + c.accept + '</button>' +
        '<button type="button" data-ga4cga-action="decline">' + c.decline + '</button>' +
        '</div>';
      doc.body.appendChild(el);
      bannerEl = el;
      bannerShownOnce = true;
      var acceptBtn = el.querySelector('[data-ga4cga-action="accept"]');
      var declineBtn = el.querySelector('[data-ga4cga-action="decline"]');
      var closeBtnEl = el.querySelector('[data-ga4cga-action="close"]');
      acceptBtn.onclick = function () {
        writeConsent('granted');
        applyConsent('granted');
        closeBanner();
      };
      declineBtn.onclick = function () {
        writeConsent('denied');
        applyConsent('denied');
        closeBanner();
      };
      if (closeBtnEl) closeBtnEl.onclick = closeBanner;
      // Non-modal first prompt: never steal focus.
    }

    function renderSettingsButton() {
      if (!doc || !doc.body || settingsButtonEl) return;
      var c = copy();
      var btn = doc.createElement('button');
      btn.type = 'button';
      btn.setAttribute('data-ga4cga', 'settings-button');
      btn.textContent = c.settingsButton;
      btn.onclick = function () {
        renderBanner('settings');
      };
      doc.body.appendChild(btn);
      settingsButtonEl = btn;
    }

    // -- Routing -----------------------------------------------------------

    function onRouteChangeCore() {
      var pathname = currentPathname();
      if (!hostAllowed() || !isRouteAllowed(pathname) || isPrivateModeActive()) {
        softSuspendForPrivateMode();
        removeSettingsButton();
        closeBanner();
        return;
      }
      suppressed = false;
      renderSettingsButton();
      var consent = readConsent();
      if (consent === 'granted') {
        if (appliedState !== 'granted' || softDisabled) activate();
        else sendPageviewIfNeeded(pathname);
      } else if (consent === 'denied') {
        if (appliedState !== 'denied') deactivate();
      } else {
        if (appliedState === 'granted') deactivate();
        if (!bannerShownOnce) renderBanner('ask');
      }
    }

    function onRouteChange() {
      privateModeActive = isPrivateModeActive();
      onRouteChangeCore();
    }

    function setupPrivateModeObserver() {
      var root = doc && doc.documentElement;
      var MO = win && win.MutationObserver;
      if (!root || !MO || mutationObserver) return;
      mutationObserver = new MO(function () {
        onRouteChange();
      });
      mutationObserver.observe(root, { attributes: true, attributeFilter: ['data-site-analytics-private'] });
    }

    function patchHistory() {
      if (historyPatched || !hist) return;
      historyPatched = true;
      ['pushState', 'replaceState'].forEach(function (method) {
        var orig = hist[method];
        if (typeof orig !== 'function') return;
        hist[method] = function () {
          var ret = orig.apply(hist, arguments);
          onRouteChange();
          return ret;
        };
      });
      if (win.addEventListener) win.addEventListener('popstate', onRouteChange);
    }

    function init() {
      var style = doc.createElement('style');
      style.textContent = '[data-ga4cga="banner"]{position:fixed;z-index:2147483647;right:16px;bottom:58px;width:min(420px,calc(100vw - 32px));max-height:75vh;overflow:auto;box-sizing:border-box;padding:22px;background:#fff;color:#111827;border:1px solid #d1d5db;border-radius:16px;box-shadow:0 14px 50px #0003;font:14px/1.6 system-ui,sans-serif;text-align:left;letter-spacing:normal}[data-ga4cga="banner"] p{margin:0 0 10px}[data-ga4cga="title"]{font-weight:700;font-size:17px}[data-ga4cga="banner"] a{color:#1d4ed8;text-decoration:underline}[data-ga4cga="actions"]{display:flex;gap:10px;margin-top:16px}[data-ga4cga-action]{min-height:40px;padding:8px 16px;border:1px solid #9ca3af;border-radius:8px;background:#f3f4f6;color:#111827;font:600 14px/1.4 system-ui,sans-serif;cursor:pointer}[data-ga4cga="actions"] button{flex:1}[data-ga4cga-action="close"]{float:right;margin:0 0 8px 10px;padding:4px 10px;min-height:32px}[data-ga4cga="settings-button"]{position:fixed;z-index:2147483646;right:16px;bottom:12px;min-height:34px;padding:6px 13px;border:1px solid #9ca3af;border-radius:999px;background:#fff;color:#111827;box-shadow:0 2px 12px #0002;font:13px/1.5 system-ui,sans-serif;cursor:pointer}[data-ga4cga-action]:focus-visible,[data-ga4cga="settings-button"]:focus-visible{outline:3px solid #2563eb;outline-offset:3px}';
      doc.head.appendChild(style);
      applyConsentDefaults();
      patchHistory();
      setupPrivateModeObserver();
      if (win.addEventListener) win.addEventListener('storage', function (event) {
        if (event && event.key !== null && event.key !== consentStorageKey(config.siteKey)) return;
        sessionConsent = null;
        bannerShownOnce = false;
        onRouteChange();
      });
      onRouteChange();
    }

    return {
      init: init,
      onRouteChange: onRouteChange,
      activate: activate,
      deactivate: deactivate,
      readConsent: readConsent,
      writeConsent: writeConsent,
      isRouteAllowed: isRouteAllowed,
      hostAllowed: hostAllowed,
      // test-only introspection:
      _state: function () {
        return {
          appliedState: appliedState,
          suppressed: suppressed,
          lastSentRoute: lastSentRoute,
          scriptInjected: scriptInjected,
          hasBanner: !!bannerEl,
          hasSettingsButton: !!settingsButtonEl,
          privateModeActive: privateModeActive,
          softDisabled: softDisabled
        };
      }
    };
  }

  function autoInit(global) {
    if (!global || !global.document) return;
    var doc = global.document;
    var scriptEl = doc.currentScript;
    if (!scriptEl) {
      // Fallback: find a script tag carrying our marker attribute.
      var candidates = doc.querySelectorAll('script[data-site-analytics], script[data-measurement-id]');
      scriptEl = candidates && candidates[candidates.length - 1];
    }
    if (!scriptEl) return;
    var config = readConfig(scriptEl);
    if (!config.canonicalHost || !config.measurementId) return;
    var env = {
      window: global,
      document: doc,
      location: global.location,
      history: global.history,
      localStorage: (function () { try { return global.localStorage; } catch (e) { return null; } })()
    };
    global.__ga4ConsentAnalytics = global.__ga4ConsentAnalytics || {};
    if (global.__ga4ConsentAnalytics[config.siteKey]) return;
    var controller = createController(env, config);
    global.__ga4ConsentAnalytics[config.siteKey] = controller;
    controller.init();
  }

  return {
    // pure helpers, exported for regression tests
    parsePublicPaths: parsePublicPaths,
    isPublicPath: isPublicPath,
    isAllowedHost: isAllowedHost,
    canonicalOrigin: canonicalOrigin,
    buildPageLocation: buildPageLocation,
    originOnly: originOnly,
    disableFlagName: disableFlagName,
    cookieBaseNames: cookieBaseNames,
    cookieDirectives: cookieDirectives,
    consentStorageKey: consentStorageKey,
    parseConsent: parseConsent,
    detectLang: detectLang,
    readConfig: readConfig,
    createController: createController,
    autoInit: autoInit,
    COOKIE_MAX_AGE_SECONDS: COOKIE_MAX_AGE_SECONDS
  };
});
