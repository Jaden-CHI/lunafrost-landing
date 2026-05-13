# Sections — Before / After 가이드

> 각 섹션의 변경 사유 + 마크업 차이 + Next.js 컴포넌트 시그니처.
> 실제 작동 코드는 `prototype/lunafrost v2.html` 참조 (lines 표기 포함).

---

## NAV — 한·영 mono 서브라벨

**변경 사유 (audit 4.1)** — V1은 "블로그/AI 도구/앱/YouTube/About" 한·영 혼용. 의도가 보이지 않음.

**해결** — 한국어가 main, 영어가 작은 mono 서브라벨. 잡지 목차 느낌.

```tsx
// components/Nav.tsx
const NAV_ITEMS = [
  { ko: '블로그',   en: 'BLOG',      href: '/blog' },
  { ko: 'AI 도구',  en: 'AI TOOLS',  href: '/tools' },
  { ko: '앱',       en: 'APPS',      href: '/apps' },
  { ko: '영상',     en: 'YOUTUBE',   href: '/youtube' },
  { ko: '소개',     en: 'ABOUT',     href: '/about' },
];

{NAV_ITEMS.map(item => (
  <a key={item.en} href={item.href} className="group flex flex-col items-start">
    <span className="text-[14px] font-medium text-on-surface-var group-hover:text-primary transition-colors">
      {item.ko}
    </span>
    <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-on-surface-var/30 group-hover:text-primary/60 transition-colors">
      {item.en}
    </span>
  </a>
))}
```

**CONTACT 버튼** — V1은 ghost outline (약함). V2는 primary fill + rim-light + bloom hover.

---

## HERO — 4-corner 메타 + 위계 있는 CTA

**변경 사유** —
- 1.1 두 CTA가 동등 무게로 경쟁
- 1.2 화면 80%가 비어 있음 — 메타 없음
- 1.3 "lunafrost" 타이포 약함

**해결** — 좌표 시스템 4구석을 메타데이터로 채움. CTA는 명확히 primary > secondary.

```tsx
// components/Hero.tsx
export function Hero({ latestArticle, archiveStats }: Props) {
  return (
    <header className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 grid-bg -z-20" />
      <div className="absolute inset-0 hero-glow -z-10" />

      {/* 4-corner meta */}
      <HeroCornerMeta position="top-left">
        <div className="text-primary/70">VOL.05 · 2026</div>
        <div className="text-on-surface-var/40 mt-1">LOG · {latestArticle.number}</div>
      </HeroCornerMeta>
      <HeroCornerMeta position="top-right">
        <div className="text-on-surface-var/60">SEOUL · KST</div>
        <LiveClock />
      </HeroCornerMeta>
      <HeroCornerMeta position="bottom-left">
        <div className="text-on-surface-var/40 mb-2">NOW · WRITING</div>
        <div className="text-on-surface-var sans text-[13px]">{currently}</div>
      </HeroCornerMeta>
      <HeroCornerMeta position="bottom-right">
        <div className="text-on-surface-var/40 mb-2">ARCHIVE</div>
        <div className="text-on-surface-var sans text-[13px] text-right">
          {archiveStats.articles}글 · {archiveStats.tools}도구<br/>
          {archiveStats.apps}앱 · {archiveStats.projects}프로젝트
        </div>
      </HeroCornerMeta>

      {/* Center stack */}
      <div className="max-w-3xl mx-auto text-center px-6 relative z-10">
        <KickerLabel>AI · DEV · APP · CONTENTS</KickerLabel>
        <h1 className="font-serif italic text-[72px] md:text-[112px] leading-[0.95] mb-2 tracking-tight">
          luna<span className="font-light text-primary">frost</span>
        </h1>
        <div className="font-mono text-[9px] text-on-surface-var/30 mt-4 mb-12 tracking-[0.5em]">
          37.5665° N · 126.9780° E
        </div>
        <p className="text-[18px] text-on-surface-var max-w-xl mx-auto leading-[1.7] mb-14">
          AI 트렌드, 앱 개발, 콘텐츠 전략을 탐구하는 공간.<br/>
          기술과 창작의 경계를 걷는 Moonyth의 기록입니다.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
          <CTAPrimary href="/blog">블로그 보기</CTAPrimary>
          <CTASecondary href="/about">소개 보기 →</CTASecondary>
        </div>
      </div>
    </header>
  );
}
```

**HeroCornerMeta 컴포넌트** — `whitespace-nowrap` 필수 (좁은 컨테이너에서 줄바꿈 방지).

---

## LATEST ARTICLES — NEW SECTION

**변경 사유** — Hero CTA가 "블로그 보기"인데 정작 글 미리보기가 없음. 잡지 컨셉이라면 "이번 호 목차"가 1면에 있어야.

**구조** — `5-col grid` · Featured `col-span-3` + Recent stack `col-span-2`.

```tsx
// components/LatestArticles.tsx
export function LatestArticles({ featured, recent }: Props) {
  return (
    <section id="blog" className="py-32 px-6 md:px-16 max-w-[1280px] mx-auto">
      <SectionHeader kicker="JOURNAL · 최근 발행" title="이번 호의 글." linkText="모든 글 보기" linkHref="/blog" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <FeaturedArticleCard article={featured} className="lg:col-span-3" />
        <div className="lg:col-span-2 flex flex-col gap-4">
          {recent.slice(0, 2).map(a => <RecentArticleCard key={a.slug} article={a} />)}
        </div>
      </div>
    </section>
  );
}
```

**FeaturedArticleCard** — 큰 16:9 썸네일 + 카테고리 + 읽기 시간 + 발행일 + 제목(serif italic 32px) + 발췌.
**RecentArticleCard** — 썸네일 없이 메타 + 제목(serif italic 22px) + 1줄 발췌.

둘 다 `grow-line` 클래스 추가 → 스크롤 시 좌측 1px 라인이 위→아래로 그려짐.

---

## PORTFOLIO — Mosaic

**변경 사유 (audit 2.1)** — 동등 무게의 3개 카드는 큐레이션이 아닌 데이터 테이블.

**해결** — Featured 1개(`col-span-2 row-span-2`) + 작은 카드 2개 stack. 시각적 위계 즉시 발생.

```tsx
// components/Portfolio.tsx
export function Portfolio({ projects }: Props) {
  const featured = projects.find(p => p.featured) ?? projects[0];
  const others = projects.filter(p => p.id !== featured.id).slice(0, 2);

  return (
    <section className="py-32 px-6 md:px-16 max-w-[1280px] mx-auto">
      <SectionHeader kicker="PORTFOLIO · 만들어온 것들" title="손으로 빚은 것들." linkText="모든 프로젝트" linkHref="/portfolio" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <FeaturedProjectCard project={featured} className="lg:col-span-2 lg:row-span-2" />
        {others.map(p => <ProjectCard key={p.id} project={p} />)}
      </div>
    </section>
  );
}
```

**Status 처리 (audit 2.2)** — pill 제거. dot + 텍스트 패턴.

```tsx
// components/ui/StatusDot.tsx
const STATUS_CONFIG = {
  running:  { dot: 'status-running', color: 'text-good', label: '운영 중' },
  shipped:  { dot: 'status-shipped', color: 'text-primary', label: '출시 완료' },
  wip:      { dot: 'status-wip',     color: 'text-warn', label: '개발 중' },
} as const;

export function StatusDot({ status }: { status: keyof typeof STATUS_CONFIG }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`font-mono text-[10px] uppercase tracking-[0.12em] flex items-center ${cfg.color}`}>
      <span className={`status-dot ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}
```

**자세히 보기 (audit 2.3)** — 풀와이드 버튼 제거. 텍스트 링크 + 화살표.
**Featured card** — `corner-tl + corner-br` 추가 (시그니처 디테일).
**AI 관련 태그** — `tag-ai` 클래스로 gradient stroke 적용.

---

## CORE VALUES + STATS

**변경 사유** —
- 3.1 "08+" 정직하지 않음 + 통계가 2개뿐 + 영문 라벨만
- 3.2 코너 브래킷 시그니처 살리기
- 시스템 약속 01: 의도적 misalignment 도입처

**해결** — 12-col asymmetric grid (이미지 5col + offset, 텍스트 7col). Stats 4개로 확장.

```tsx
// components/CoreValues.tsx
export function CoreValues({ stats }: Props) {
  return (
    <section className="relative py-40 bg-surface-low/20 overflow-hidden">
      <div className="absolute inset-0 grid-bg-fine opacity-50" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
        {/* 5 cols · 의도적으로 mt-20 offset */}
        <div className="lg:col-span-5 lg:row-span-1 relative lg:mt-20">
          <div className="aspect-square max-w-md relative">
            <CornerBracket position="tl" /><CornerBracket position="tr" />
            <CornerBracket position="bl" /><CornerBracket position="br" />
            <ImagePlaceholder className="absolute inset-4" label="STUDIO · WORKSPACE · GRAYSCALE" />
          </div>
        </div>

        {/* 7 cols */}
        <div className="lg:col-span-7 space-y-10">
          <KickerHeading kicker="CORE VALUES · 운영 철학">
            Exploring the frontier of <span className="text-primary">technical creativity.</span>
          </KickerHeading>
          <p className="text-[17px] text-on-surface-var leading-relaxed max-w-xl">
            단순히 코드를 짜는 것을 넘어, 기술이 우리의 일상과 창작 방식을 어떻게 변화시키는지 탐구합니다.
            AI라는 거대한 도구를 활용해 더 나은 사용자 경험과 효율적인 시스템을 설계하는 것이 저의 목표입니다.
          </p>

          {/* 4 stats — replaces 2 stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-outline-var/15">
            <StatLink value="8.5" label="YEARS · DEV" />
            <StatLink value="124" label="PROJECTS →" href="/portfolio" trend={[4,6,5,9,8,12,14]} />
            <StatLink value="42" label="ARTICLES →" href="/blog" />
            <StatLink value="8.4" suffix="M" label="VIEWS · YT →" href="/youtube" />
          </div>
        </div>
      </div>
    </section>
  );
}
```

**중요** — "08+" → "8.5" 로 변경. leading zero 제거.
**중요** — 통계는 모두 링크 가능(`href` 있는 것만). 단순 장식 아님.

---

## TOOLS + YOUTUBE — NEW SECTION (split)

**변경 사유** — 네비의 "AI 도구"와 "YouTube"가 가리키는 페이지의 홈 노출 부재.

**구조** — 2-col split. 왼쪽 AI 도구 리스트 3개, 오른쪽 YouTube featured + sub thumbs 2개.

```tsx
// components/ToolsAndVideo.tsx
export function ToolsAndVideo({ tools, latestVideo, subVideos }: Props) {
  return (
    <section className="py-32 px-6 md:px-16 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
      <ToolsList tools={tools.slice(0, 3)} />
      <YouTubePreview featured={latestVideo} thumbs={subVideos.slice(0, 2)} />
    </section>
  );
}
```

각 tool 항목은 hover 시 좌측에 2px primary 라인이 growing (pf-card 패턴 재사용).
YouTube featured는 lens-target 클래스 부여 → 호버 시 lens cursor 활성화.

---

## NEWSLETTER — NEW SECTION

**변경 사유** — 잡지 메타포의 핵심은 "정기 발행". 메일링 리스트 필수.

**디자인** — terminal-style 인풋 (bottom-border only). 메타 라벨 mono `[01] EMAIL` 형식 — 코드/명령행 분위기.

```tsx
// components/Newsletter.tsx
export function Newsletter({ subscriberCount }: Props) {
  return (
    <section className="py-32 px-6 md:px-16 border-y border-outline-var/10 bg-surface-lowest/50">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <KickerHeading kicker="SUBSCRIBE · 매주 일요일 발행">
            새로운 글이<br/>도착하면 알려드릴게요.
          </KickerHeading>
          <p>AI, 개인 개발, 콘텐츠 운영에 대한 매주 하나의 길고 정제된 글...</p>
        </div>
        <SubscribeForm subscriberCount={subscriberCount} />
      </div>
    </section>
  );
}
```

**통합** — ConvertKit / Buttondown / Resend 중 선택. 환경 변수 `NEWSLETTER_API_KEY`로.
**검증** — 클라이언트 + 서버 양쪽. zod 권장.

---

## FOOTER — Colophon

**변경 사유 (audit 4.2)** — V1 footer는 © 한 줄 + 약관 4개. 잡지라면 "코로폰"이 되어야.

**구조** — 12-col: Brand 4 / Read 2 / Build 2 / Elsewhere 2 / Contact 2. 하단에 colophon + 법적 링크.

```tsx
// components/Footer.tsx
export function Footer({ lastPublished }: Props) {
  return (
    <footer className="pt-32 pb-12 px-6 md:px-16">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <FooterBrand lastPublished={lastPublished} className="lg:col-span-4" />
          <FooterColumn title="READ" links={READ_LINKS} className="lg:col-span-2" />
          <FooterColumn title="BUILD" links={BUILD_LINKS} className="lg:col-span-2" />
          <FooterColumn title="ELSEWHERE" links={ELSEWHERE_LINKS} className="lg:col-span-2" />
          <FooterColumn title="CONTACT" links={CONTACT_LINKS} className="lg:col-span-2" />
        </div>

        <FooterColophon />
        <FooterLegal />
      </div>
    </footer>
  );
}
```

**Colophon 텍스트** (mono):
```
COLOPHON · SET IN EB GARAMOND & DM SANS · METADATA IN JETBRAINS MONO
BUILT WITH NEXT.JS · HOSTED ON VERCEL · CONTENT VIA NOTION CMS
```

---

## 변경 순서 정리 (Page composition)

```tsx
// app/page.tsx
export default async function HomePage() {
  const [archive, articles, projects, tools, videos, subscriberCount] = await Promise.all([
    getArchiveStats(),
    getLatestArticles(3),
    getProjects(),
    getTools(),
    getYouTubeVideos(),
    getSubscriberCount(),
  ]);

  return (
    <>
      <Nav />
      <Hero archiveStats={archive} latestArticle={articles[0]} />
      <LatestArticles featured={articles[0]} recent={articles.slice(1, 3)} />
      <Portfolio projects={projects} />
      <CoreValues />
      <ToolsAndVideo tools={tools} latestVideo={videos[0]} subVideos={videos.slice(1, 3)} />
      <Newsletter subscriberCount={subscriberCount} />
      <Footer lastPublished={articles[0].publishedAt} />
      <LensCursor />
    </>
  );
}
```
