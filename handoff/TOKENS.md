# Design Tokens — V2 Diff

> V1 기반 디자인 시스템에 추가/변경되는 토큰. `tailwind.config.ts`와 `globals.css`에 반영.

## 1. Tailwind Config 변경

### colors — 신규 시맨틱 토큰
기존 컬러는 유지. 다음 3개만 추가 — status 의미화용.

```ts
// tailwind.config.ts
colors: {
  // ... 기존 컬러 그대로
  good: '#9bd6b3',   // status "운영 중" · success
  warn: '#f5c98a',   // status "개발 중" · in-progress
  bad:  '#f59890',   // status "오류" · error (현재는 미사용, 향후 폼 validation용)
}
```

### fontFamily — 변경 없음
EB Garamond · DM Sans · JetBrains Mono 그대로.

### spacing — 변경 없음
8px 베이스 그리드 · container-max 1280px · gutter 24px · section-gap 160px 그대로.

---

## 2. globals.css 변경

### 그리드 배경 — opacity 강화
```css
/* BEFORE: opacity 0.03 — 거의 보이지 않음 */
.technical-grid {
  background-image:
    linear-gradient(rgba(200, 223, 245, 0.03) 0.5px, transparent 0.5px),
    linear-gradient(90deg, rgba(200, 223, 245, 0.03) 0.5px, transparent 0.5px);
  background-size: 60px 60px;
}

/* AFTER: opacity 0.06 · spacing 80px */
.grid-bg {
  background-image:
    linear-gradient(rgba(200, 223, 245, 0.06) 0.5px, transparent 0.5px),
    linear-gradient(90deg, rgba(200, 223, 245, 0.06) 0.5px, transparent 0.5px);
  background-size: 80px 80px;
}

/* 작은 그리드 — 보조 섹션용 */
.grid-bg-fine {
  background-image:
    linear-gradient(rgba(200, 223, 245, 0.04) 0.5px, transparent 0.5px),
    linear-gradient(90deg, rgba(200, 223, 245, 0.04) 0.5px, transparent 0.5px);
  background-size: 40px 40px;
}
```

### Hero glow — 2겹 radial
```css
.hero-glow {
  background:
    radial-gradient(ellipse at 50% 40%, rgba(170, 212, 249, 0.10) 0%, rgba(16, 20, 26, 0) 55%),
    radial-gradient(ellipse at 80% 80%, rgba(143, 184, 220, 0.06) 0%, rgba(16, 20, 26, 0) 50%);
}
```

### rim-light — 더 강하게
```css
/* BEFORE: 0.05 — 거의 안 보임 */
.rim-light {
  box-shadow: inset 0.5px 0.5px 0px rgba(255, 255, 255, 0.05);
}

/* AFTER: 0.08 + 하단 음영 추가로 입체감 */
.rim-light {
  box-shadow:
    inset 1px 1px 0 rgba(255, 255, 255, 0.08),
    inset -1px -1px 0 rgba(255, 255, 255, 0.02);
}
```

### Primary CTA — bloom hover
```css
.cta-primary {
  background: theme('colors.primary.DEFAULT'); /* #aad4f9 */
  color: theme('colors.on-primary');           /* #003350 */
  box-shadow:
    inset 1px 1px 0 rgba(255, 255, 255, 0.25),
    0 0 0 rgba(170, 212, 249, 0);
  transition: box-shadow 0.5s ease, transform 0.3s ease;
}

.cta-primary:hover {
  box-shadow:
    inset 1px 1px 0 rgba(255, 255, 255, 0.25),
    0 0 48px rgba(170, 212, 249, 0.28);
  transform: translateY(-1px);
}
```

### Secondary CTA — text link with underline
```css
.cta-secondary {
  color: theme('colors.on-surface.DEFAULT');
  position: relative;
  padding-bottom: 6px;
}
.cta-secondary::after {
  content: '';
  position: absolute; inset: auto 0 0 0;
  height: 1px; background: rgba(140, 145, 152, 0.4);
  transition: background 0.3s ease;
}
.cta-secondary:hover::after { background: theme('colors.primary.DEFAULT'); }
```

### Growing line — scroll triggered
```css
/* 좌측 1px 라인이 위에서 아래로 "그려지듯" 등장 */
.grow-line {
  position: relative;
  overflow: hidden;
}
.grow-line::before {
  content: '';
  position: absolute; left: 0; top: 0; bottom: 0;
  width: 1px; background: theme('colors.primary.DEFAULT');
  transform: scaleY(0); transform-origin: top;
  transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.grow-line.in::before { transform: scaleY(1); }

/* 가로 separator 라인 */
.grow-rule {
  height: 1px; background: rgba(140, 145, 152, 0.25);
  transform: scaleX(0); transform-origin: left;
  transition: transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.grow-rule.in { transform: scaleX(1); }
```

### Status dot — 3종
```css
.status-dot { width: 6px; height: 6px; border-radius: 999px; display: inline-block; margin-right: 8px; }
.status-running { background: theme('colors.good'); box-shadow: 0 0 8px rgba(155, 214, 179, 0.5); }
.status-shipped { background: theme('colors.primary.DEFAULT'); box-shadow: 0 0 8px rgba(170, 212, 249, 0.5); }
.status-wip { background: theme('colors.warn'); box-shadow: 0 0 8px rgba(245, 201, 138, 0.5); animation: pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
```

### AI gradient tag — DESIGN.md 약속 이행
```css
.tag-ai {
  background:
    linear-gradient(135deg, rgba(170, 212, 249, 0.08), rgba(143, 184, 220, 0.04)) padding-box,
    linear-gradient(135deg, rgba(170, 212, 249, 0.6), rgba(186, 160, 240, 0.4)) border-box;
  border: 1px solid transparent;
}
```

### Image placeholder — 임시 영역
```css
.img-ph {
  background:
    linear-gradient(135deg, rgba(143, 184, 220, 0.12), rgba(143, 184, 220, 0.02)),
    repeating-linear-gradient(45deg,
      rgba(140, 145, 152, 0.04) 0px,
      rgba(140, 145, 152, 0.04) 1px,
      transparent 1px,
      transparent 8px);
  border: 1px dashed rgba(170, 212, 249, 0.18);
  display: flex; align-items: center; justify-content: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px; letter-spacing: 0.12em;
  color: rgba(140, 145, 152, 0.8);
  text-transform: uppercase;
}
```
이미지가 들어올 때까지 placeholder로 사용. 실제 이미지 적용 시 클래스 교체.

### Corner brackets — 시그니처 디테일
```css
.corner-tl, .corner-tr, .corner-bl, .corner-br {
  position: absolute; width: 16px; height: 16px; pointer-events: none;
}
.corner-tl { top: -1px; left: -1px;
  border-top: 1px solid theme('colors.primary.DEFAULT');
  border-left: 1px solid theme('colors.primary.DEFAULT'); }
.corner-tr { top: -1px; right: -1px;
  border-top: 1px solid theme('colors.primary.DEFAULT');
  border-right: 1px solid theme('colors.primary.DEFAULT'); }
.corner-bl { bottom: -1px; left: -1px;
  border-bottom: 1px solid theme('colors.primary.DEFAULT');
  border-left: 1px solid theme('colors.primary.DEFAULT'); }
.corner-br { bottom: -1px; right: -1px;
  border-bottom: 1px solid theme('colors.primary.DEFAULT');
  border-right: 1px solid theme('colors.primary.DEFAULT'); }
```

### Terminal input — DESIGN.md 약속 이행
```css
.term-input {
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(140, 145, 152, 0.4);
  padding: 12px 0;
  color: theme('colors.on-surface.DEFAULT');
  font-family: 'DM Sans', sans-serif;
  width: 100%;
  transition: border-color 0.3s ease;
  outline: none;
}
.term-input:focus { border-bottom-color: theme('colors.primary.DEFAULT'); }
.term-input::placeholder { color: rgba(140, 145, 152, 0.6); }
```

### Lens cursor — DESIGN.md 약속 이행
```css
.lens-cursor {
  position: fixed; pointer-events: none; z-index: 100;
  width: 80px; height: 80px; border-radius: 50%;
  border: 1px solid rgba(170, 212, 249, 0.5);
  backdrop-filter: brightness(1.4) saturate(1.3);
  -webkit-backdrop-filter: brightness(1.4) saturate(1.3);
  opacity: 0;
  transition: opacity 0.3s ease, width 0.4s ease, height 0.4s ease;
  transform: translate(-50%, -50%);
}
.lens-cursor::after {
  content: ''; position: absolute; inset: 8px; border-radius: 50%;
  border: 1px solid rgba(170, 212, 249, 0.15);
}
.lens-cursor.active { opacity: 1; }
.lens-cursor.zoom { width: 120px; height: 120px; }

@media (max-width: 1023px) { .lens-cursor { display: none; } }
```

### PF card hover — left line grows
```css
.pf-card {
  position: relative;
  transition: background-color 0.4s ease, border-color 0.4s ease;
}
.pf-card::before {
  content: ''; position: absolute;
  left: 0; top: 0; height: 100%; width: 2px;
  background: theme('colors.primary.DEFAULT');
  transform: scaleY(0); transform-origin: top;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.pf-card:hover::before { transform: scaleY(1); }
.pf-card:hover {
  background-color: rgba(28, 32, 38, 0.6);
  border-color: rgba(170, 212, 249, 0.3);
}
```

---

## 3. 타이포그래피 — 확정 사용처

| 토큰 | 사용처 | 예시 |
|:-----|:-------|:-----|
| `serif italic 112px` | Hero 메인 타이틀 | "lunafrost" |
| `serif italic 56px` | Section 헤드라인 | "이번 호의 글" |
| `serif italic 42px` | Sub-section 헤드라인 | "직접 만든 작은 AI 도구들" |
| `serif italic 32px` | Featured article 제목 | 블로그 카드 |
| `serif italic 24px` | Sub article / card title | 일반 글 카드 |
| `serif italic 22px` | Nav 로고 | "lunafrost" |
| `serif italic 20px` | List item title | AI 도구 항목 |
| `sans 18px` | Body lead | Hero 설명 |
| `sans 16px` | Body | Featured 본문 |
| `sans 14px` | Sub body | 카드 본문 |
| `sans 13px` | Caption | 메타 설명 |
| `mono 11px tracking-[0.12em]` | Section kicker | "PORTFOLIO · 만들어온 것들" |
| `mono 10px tracking-[0.12em]` | Tags · metadata | 기술 태그 |
| `mono 9px tracking-[0.5em]` | Decorative metadata | 좌표 |

---

## 4. 변경 요약 한 줄

> "그리드는 보이게, glow는 느껴지게, status는 의미 있게, hover는 살아 있게."
