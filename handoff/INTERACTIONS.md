# Interactions — Behavior Specs

> 3개 시그니처 인터랙션의 동작 사양 + React 구현.

---

## 1. Lens Cursor (DESIGN.md 약속 이행)

**무엇** — 데스크탑에서 마우스를 따라다니는 80px 원형 "렌즈". 특정 요소(`.lens-target`) 위에 올라가면 활성화 + 배경 밝기/채도 증폭.

**왜** — DESIGN.md 컴포넌트 가이드: *"a custom circular lens cursor that creates a localized frost-clear effect or slight magnification when hovering over portfolio images"*

**언제 활성** — 포트폴리오 카드, 블로그 featured 이미지, YouTube 썸네일, 워크스페이스 이미지.

**구현 (Next.js — 클라이언트 컴포넌트):**

```tsx
'use client';
// components/ui/LensCursor.tsx
import { useEffect, useRef } from 'react';

export function LensCursor() {
  const lensRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lens = lensRef.current;
    if (!lens) return;

    let mouseX = 0, mouseY = 0, lensX = 0, lensY = 0;
    let raf: number | null = null;

    const update = () => {
      lensX += (mouseX - lensX) * 0.18;
      lensY += (mouseY - lensY) * 0.18;
      lens.style.left = `${lensX}px`;
      lens.style.top = `${lensY}px`;
      if (Math.abs(mouseX - lensX) > 0.1 || Math.abs(mouseY - lensY) > 0.1) {
        raf = requestAnimationFrame(update);
      } else {
        raf = null;
      }
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    };

    document.addEventListener('mousemove', onMove);

    // Event delegation — works for elements added later
    const onEnter = (e: Event) => {
      if ((e.target as HTMLElement).closest?.('.lens-target')) {
        lens.classList.add('active');
      }
    };
    const onLeave = (e: Event) => {
      if ((e.target as HTMLElement).closest?.('.lens-target')) {
        lens.classList.remove('active', 'zoom');
      }
    };
    const onDown = (e: Event) => {
      if ((e.target as HTMLElement).closest?.('.lens-target')) {
        lens.classList.add('zoom');
      }
    };
    const onUp = () => lens.classList.remove('zoom');

    document.addEventListener('mouseover', onEnter, true);
    document.addEventListener('mouseout', onLeave, true);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter, true);
      document.removeEventListener('mouseout', onLeave, true);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={lensRef} className="lens-cursor" />;
}
```

**스타일 (globals.css):** `TOKENS.md` Lens cursor 섹션 참조.

**사용:**
```tsx
// 활성 영역에 className 추가
<article className="pf-card lens-target ...">
```

**모바일** — CSS에서 `@media (max-width: 1023px) { .lens-cursor { display: none; } }` 처리. JS는 그대로 실행되지만 시각적으로 비활성.

**접근성** — 키보드 포커스에는 영향 없음. 마우스 사용자 전용 enhancement.

---

## 2. Growing Lines (Scroll-triggered)

**무엇** — 스크롤 시 화면에 진입하는 라인이 0%에서 100%로 "그려지듯" 등장.

**왜** — DESIGN.md: *"Interactive Lines: thin vertical and horizontal lines as separators that appear to grow or animate in as the user scrolls"*

**두 종류:**
- `.grow-line` — 좌측 1px 수직 라인 (위에서 아래로) — 블로그 카드, AI 도구 항목
- `.grow-rule` — 가로 1px 라인 (왼쪽에서 오른쪽으로) — 섹션 사이 separator

**구현 (커스텀 훅):**

```tsx
'use client';
// lib/useGrowingLine.ts
import { useEffect } from 'react';

export function useGrowingLine(selector = '.grow-line, .grow-rule', threshold = 0.15) {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target); // 한 번만 — 다시 안 함
          }
        });
      },
      { threshold }
    );

    document.querySelectorAll(selector).forEach(el => io.observe(el));

    return () => io.disconnect();
  }, [selector, threshold]);
}
```

**클라이언트 컴포넌트에서 호출:**
```tsx
'use client';
// components/ScrollAnimations.tsx
export function ScrollAnimations() {
  useGrowingLine();
  return null;
}
```

`app/page.tsx`에 단순 마운트만 하면 전역 적용:
```tsx
<ScrollAnimations />
```

**reduced-motion 대응 (권장 — 접근성):**
```css
@media (prefers-reduced-motion: reduce) {
  .grow-line::before, .grow-rule {
    transform: none !important;
  }
}
```

---

## 3. Live Clock (Hero 우상단)

**무엇** — Hero 우상단의 "SEOUL · KST 14:22" 시계가 실시간 업데이트.

**왜** — 정적 시계는 거짓말. 잡지 메타포에서 "지금 작가가 어딘가에 있다"는 신호.

**구현 (서버 컴포넌트 안전):**

```tsx
'use client';
// components/ui/LiveClock.tsx
import { useEffect, useState } from 'react';

export function LiveClock() {
  const [time, setTime] = useState<string>('—:—'); // SSR-safe initial

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const kst = new Intl.DateTimeFormat('ko-KR', {
        timeZone: 'Asia/Seoul',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(now);
      setTime(kst);
    };
    tick();
    const id = setInterval(tick, 30_000); // 30초마다
    return () => clearInterval(id);
  }, []);

  return (
    <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-on-surface-var/40 mt-1">
      {time}
    </div>
  );
}
```

**SSR hydration 미스매치 방지** — 초기 값을 placeholder("—:—")로 → 클라이언트 마운트 후 첫 tick에서 실제 값으로 교체.

---

## 4. CTA Bloom (마우스 호버 시 외광)

**무엇** — Primary CTA에 마우스 올리면 `box-shadow`로 외광이 부드럽게 켜짐.

**구현** — CSS만으로 처리. JS 불필요. `TOKENS.md`의 `.cta-primary:hover` 정의 참조.

**추가 detail** — `transform: translateY(-1px)`로 미세한 부양감.

---

## 5. PF Card Hover — Left Line Growing

**무엇** — 포트폴리오/도구 카드에 호버 시 좌측에 2px primary 라인이 위→아래로 grow.

**구현** — CSS만. `TOKENS.md`의 `.pf-card::before` 정의 참조.

**왜 단순 hover transition이 아닌가?** — `transform: scaleY()`가 `transform-origin: top`과 결합되어 "라인이 그려지는" 메타포를 시각적으로 명확히 함. opacity transition은 "그려진다"가 아닌 "나타난다"라서 다른 의미.

---

## 6. 키보드 / 터치 / 접근성

| 인터랙션 | 키보드 | 터치 | 보조기술 |
|:---------|:------:|:----:|:--------:|
| Lens cursor | 영향 없음 (시각만) | 비활성 | aria-hidden 권장 |
| Growing line | 영향 없음 | 정상 작동 | prefers-reduced-motion 대응 필수 |
| Live clock | 영향 없음 | 정상 | aria-live="polite" 가능 |
| CTA bloom | :focus-visible에도 적용 권장 | tap에 정상 | 색대비 ≥ 4.5:1 확인 |
| Card grow | :focus-within에도 적용 권장 | tap 시 instant | tabIndex 있어야 |

```css
/* 키보드 포커스에도 그로우 효과 적용 */
.pf-card:focus-within::before { transform: scaleY(1); }
.pf-card:focus-within {
  background-color: rgba(28, 32, 38, 0.6);
  border-color: rgba(170, 212, 249, 0.3);
  outline: none;
}
```

---

## 7. 성능 노트

- Lens cursor의 `backdrop-filter` 는 Safari/Firefox에서 비싸므로 `will-change: transform` 사용 금지. 대신 60fps RAF로 충분.
- Growing line은 IntersectionObserver 한 번만 관찰 → `unobserve` 처리.
- Live clock은 30초 interval — 1초마다 update할 필요 없음 (분 단위만 표시).
- 이미지 placeholder는 CSS gradient — 실제 이미지 적용 시 `next/image` 사용 + blur placeholder.
