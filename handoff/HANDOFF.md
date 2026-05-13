# lunafrost V2 — Claude Code Handoff

> **TL;DR** — 이 패키지는 lunafrost 홈페이지 V1 → V2 개선안을 Claude Code가 기존 Next.js 코드베이스에 적용할 수 있도록 정리한 문서입니다.
>
> **읽는 순서:** `HANDOFF.md` (이 문서) → `TOKENS.md` → `SECTIONS.md` → `INTERACTIONS.md` → 필요 시 `components/*.html` 참고
>
> **참조 파일:** `prototype/lunafrost v2.html` — 모든 변경이 적용된 단일 HTML 프로토타입.
> 시각적으로 확인하려면 이 파일을 먼저 브라우저에서 열어보세요.

---

## 0. 작업 컨텍스트

- **현재 스택:** Next.js + Tailwind CSS, 다크모드, Notion CMS, Vercel
- **디자인 시스템:** `DESIGN.md` 참조 — Cold Explorer / Minimal + Glassmorphism / Technical Editorial
- **개선 근거:** `audit/Lunafrost Design Audit.html` — 7개 섹션 감사 리포트
- **타깃:** 홈페이지 단일 페이지 (`app/page.tsx` 또는 동등 위치)

---

## 1. 우선순위 (Sprint Plan)

| Phase | 작업 | 위치 | 영향도 |
|------:|:-----|:-----|:------:|
| **P0 · Day 1-2** | CTA 위계 수정 (primary glow / secondary text-link) | Hero | HIGH |
| **P0 · Day 1-2** | "08+" → 정직한 숫자, 4개 stats로 확장 | Core Values | HIGH |
| **P0 · Day 1-2** | Status pill → status dot 패턴 | Portfolio | MED |
| **P0 · Day 1-2** | 그리드 라인 opacity 0.03 → 0.06 + spacing 80px | Global | MED |
| **P1 · Day 3-5** | 포트폴리오 Mosaic 레이아웃 (Featured + 2 stack) | Portfolio | HIGH |
| **P1 · Day 3-5** | Hero 4-corner 메타 (VOL · KST · NOW · ARCHIVE) | Hero | HIGH |
| **P1 · Day 3-5** | 최근 글 3편 섹션 추가 (Featured 1 + 2 recent) | NEW SECTION | HIGH |
| **P1 · Day 3-5** | 뉴스레터 섹션 + Colophon Footer | NEW SECTION | HIGH |
| **P1 · Day 3-5** | 네비 한·영 mono 서브라벨 | Nav | LOW |
| **P2 · Week 2** | Growing Line scroll 애니메이션 | Global | MED |
| **P2 · Week 2** | Lens cursor 시그니처 인터랙션 | Global | HIGH |
| **P2 · Week 2** | AI 도구 / YouTube 미리보기 섹션 추가 | NEW SECTION | MED |
| **P2 · Week 2** | 의도적 Misalignment (Core Values 12-col asymmetry) | Core Values | MED |

---

## 2. 변경 파일 매트릭스

```
app/
├── page.tsx                ★ 전면 재구성 — 새 섹션 4개 추가
├── layout.tsx              · 폰트 weight 추가 (EB Garamond italic 400 + 300 light)
├── globals.css             ★ 그리드 패턴 / rim-light / lens / grow-line 유틸 추가
└── components/
    ├── Nav.tsx             · 한·영 서브라벨, CONTACT primary 채움
    ├── Hero.tsx            ★ 4-corner 메타 + CTA 위계 + 라이브 시계
    ├── LatestArticles.tsx  ★ NEW — Featured 1 + Recent 2 mosaic
    ├── Portfolio.tsx       ★ 전면 재구성 — Featured (col-span-2 row-span-2) + 2 stack
    ├── CoreValues.tsx      · stats 4개로 확장, "08+" 제거, 비대칭 grid
    ├── ToolsAndVideo.tsx   ★ NEW — AI 도구 리스트 + YouTube 임베드
    ├── Newsletter.tsx      ★ NEW — terminal-style 인풋
    ├── Footer.tsx          ★ Colophon 전면 재구성 (5-col 사이트맵)
    ├── ui/
    │   ├── CTAPrimary.tsx  ★ NEW — bloom hover
    │   ├── CTASecondary.tsx★ NEW — underline text link
    │   ├── StatusDot.tsx   ★ NEW — running / shipped / wip 매핑
    │   ├── CornerBracket.tsx★ NEW — 1px L-shape decoration
    │   ├── ImagePlaceholder.tsx ★ NEW — striped/dashed placeholder
    │   └── LensCursor.tsx  ★ NEW — pointer follower
    └── lib/
        └── useGrowingLine.ts ★ NEW — IntersectionObserver hook
```

★ = 신규 또는 전면 변경  ·  · = 부분 수정

---

## 3. 단계별 적용 방법

### Step 1: 디자인 토큰 추가
`TOKENS.md` 참조 — `tailwind.config.ts`와 `globals.css`에 추가할 컬러·spacing·utility 정의.

### Step 2: UI 프리미티브 생성
`components/ui/` 폴더에 6개 컴포넌트 신규 생성. 각 컴포넌트 코드는 `INTERACTIONS.md`에 포함.

### Step 3: 기존 섹션 리팩토링
`SECTIONS.md`의 Hero / Portfolio / CoreValues 항목 참조. before/after 코드 diff 포함.

### Step 4: 신규 섹션 추가
`LatestArticles`, `ToolsAndVideo`, `Newsletter`, `Footer` Colophon 생성.
`page.tsx`에서 새 순서로 import.

### Step 5: 인터랙션 활성화
Growing Line · Lens Cursor · Live clock 활성화. `INTERACTIONS.md` 참조.

---

## 4. 데이터 의존성

새 섹션이 필요로 하는 데이터:

| 섹션 | 데이터 소스 | 비고 |
|:-----|:------------|:-----|
| Hero NOW | `currently.md` 또는 Notion DB "current" | 수동 업데이트 가능 |
| Hero ARCHIVE | 빌드 타임 통계 | `getStaticProps`에서 collect |
| Latest Articles | Notion CMS (기존) | featured flag 1개 + 최근 2개 |
| Portfolio Mosaic | Notion DB "projects" | `featured: true` 1개 필수 |
| Core Values stats | 하드코딩 또는 Notion DB | 링크 가능하게 |
| Tools | Notion DB "tools" | 신규 DB 필요 |
| YouTube | YouTube Data API v3 | 또는 수동 큐레이션 |
| Newsletter | ConvertKit / Buttondown / Resend | 신규 통합 |
| Footer LAST PUBLISHED | 최근 글 timestamp | 자동 |

---

## 5. 검증 체크리스트

배포 전 확인:

- [ ] CTA 위계: primary는 fill + bloom hover, secondary는 underline text-link
- [ ] Hero 4-corner 메타 모두 채워짐 (placeholder 아닌 실제 데이터)
- [ ] Stats "08+" 제거됨, 4개로 확장, 모두 링크
- [ ] Status dot 3종 모두 사용됨 (운영중 · 출시완료 · 개발중)
- [ ] Portfolio Featured가 col-span-2 row-span-2 차지
- [ ] 모든 새 섹션의 한국어/영어 라벨 톤 통일
- [ ] Growing line이 스크롤 시 실제로 애니메이션
- [ ] Lens cursor가 데스크탑에서만 작동 (모바일 비활성)
- [ ] Newsletter 인풋이 terminal-style (bottom-border only)
- [ ] Footer colophon에 폰트·스택·CMS 정보 명시
- [ ] Lighthouse 모바일 점수 ≥ 90 유지

---

## 6. 다음 단계 — V3 백로그 (이 PR 범위 밖)

이번 V2 이후 검토할 것:

- 다크/라이트 토글 (frosted 컨셉이 라이트 모드와 어울리는지 검증 필요)
- 검색 (블로그 글 늘어나면 필수) — Algolia 또는 Pagefind
- 글 상세 페이지 타이포 시스템
- About 페이지 재디자인
- 한·영 i18n (지금은 한국어 우선)
- 다국어 SEO

---

## 7. 질문이 있다면

핸드오프 문서 + 프로토타입으로도 모호한 부분이 있으면 다음을 확인:

1. **시각적 의도가 불명확하면** → `prototype/lunafrost v2.html` 해당 섹션 DOM 검사
2. **토큰 값이 불명확하면** → `TOKENS.md` 또는 `DESIGN.md` 원본
3. **인터랙션 디테일이 불명확하면** → `INTERACTIONS.md` + 프로토타입에서 직접 인터랙션 확인
4. **그 외** → V1 코드와 비교하면서 변경 의도를 audit 리포트에서 역추적

---

*문서 끝. 행운을 빕니다.*
