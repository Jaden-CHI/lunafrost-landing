# lunafrost — V2 Handoff Package

> lunafrost 홈페이지 V1 → V2 개선 작업을 Claude Code에서 진행하기 위한 핸드오프 패키지입니다.

## 📦 패키지 구성

```
handoff/
├── README.md             ← 시작하기 (이 파일)
├── HANDOFF.md            ← 전체 개요 + Sprint Plan
├── TOKENS.md             ← Tailwind config + globals.css 디자인 토큰 diff
├── SECTIONS.md           ← 각 섹션의 before/after + Next.js 컴포넌트 시그니처
├── INTERACTIONS.md       ← Lens cursor / Growing line / Live clock 구현 사양
│
├── audit/
│   └── Lunafrost Design Audit.html    ← 변경 근거가 된 감사 리포트
│
└── prototype/
    └── lunafrost v2.html              ← 모든 변경이 적용된 정적 HTML 프로토타입
```

---

## 🚀 시작하기 — Claude Code에서

### 1️⃣ 패키지 열기

```bash
# zip을 codebase 옆에 압축 풀기
unzip lunafrost-handoff.zip -d ~/projects/

# 프로토타입을 브라우저에서 먼저 열어 시각적으로 확인
open ~/projects/handoff/prototype/lunafrost\ v2.html
```

### 2️⃣ Claude Code 세션 시작

`~/projects/lunafrost/` (기존 코드베이스)에서 Claude Code 실행 후:

```
@/path/to/handoff 디렉토리의 문서를 모두 읽고, V2 개선안을
Next.js 코드베이스에 적용해줘. 우선순위는 HANDOFF.md의 Sprint Plan을 따르고,
P0 작업부터 시작해줘.
```

또는 더 작은 단위로:

```
@handoff/SECTIONS.md 의 HERO 섹션 변경사항을 components/Hero.tsx에 적용해줘.
프로토타입 파일은 @handoff/prototype/lunafrost\ v2.html 에서 확인할 수 있어.
```

### 3️⃣ 읽는 순서 (권장)

1. **README.md** ← 이 문서 (개요)
2. **HANDOFF.md** ← Sprint Plan + 파일 매트릭스 + 우선순위
3. **prototype/lunafrost v2.html** ← 브라우저에서 직접 보기 (가장 빠른 컨텍스트)
4. **TOKENS.md** ← 작업 시작 전 토큰 먼저 추가
5. **SECTIONS.md** ← 섹션별 작업 시 참조
6. **INTERACTIONS.md** ← 인터랙션 구현 시 참조
7. **audit/Lunafrost Design Audit.html** ← "왜 이렇게 바꿨지?" 의문이 들 때 참조

---

## 🎯 V2 변경 요약

| 영역 | V1 | V2 |
|:-----|:---|:---|
| **Hero** | 명함 (제목 + 두 버튼) | 4-corner 메타 + 위계 있는 CTA + 라이브 시계 |
| **Stats** | 2개 ("08+", "124+") | 4개 (8.5 / 124 / 42 / 8.4M) + 모두 링크 |
| **Portfolio** | 3개 균등 카드 | Featured 1 + 2 stack (mosaic) |
| **Status** | 무작위 pill | dot + 텍스트 (running/shipped/wip) |
| **신규 섹션** | — | 최근 글 / AI 도구 / YouTube / Newsletter |
| **Footer** | © 한 줄 + 약관 4개 | 5-col 사이트맵 + Colophon |
| **인터랙션** | hover color만 | Lens cursor + Growing lines + Live clock |
| **그리드** | opacity 0.03 (안 보임) | 0.06 + spacing 80px |
| **rim-light** | 0.05 (거의 없음) | 0.08 + inner shadow |

---

## ⚠️ 주의사항

1. **이미지 영역은 모두 placeholder (`img-ph` 클래스)** — 실제 작품 스크린샷, 워크스페이스 사진, YouTube 썸네일은 별도 준비 필요.
2. **데이터 의존성 확인 필수** — Hero NOW, Tools DB, Newsletter 통합은 신규 데이터 소스 필요. `HANDOFF.md` Section 4 참조.
3. **모바일 검증** — 프로토타입은 데스크탑 위주 검증. 모바일에서 4-corner 메타가 어떻게 정리될지 별도 결정 필요 (현재는 hidden 가능성 검토).
4. **i18n** — 현재 한국어 기준. 향후 영어 지원 시 NAV_ITEMS 구조가 활용 가능.

---

## 📞 다음 액션

V2 작업 완료 후:
- [ ] Lighthouse 점수 측정 (모바일 ≥ 90 유지)
- [ ] 실제 이미지/스크린샷 교체
- [ ] Newsletter 백엔드 연결
- [ ] Vercel 프리뷰 배포 + 검토
- [ ] 머지 → 프로덕션

---

*Made with care · 2026.05.13*
