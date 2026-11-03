---
title: 'LTX-2.5 완전 가이드: 로컬 멀티샷 영상·오디오 생성'
slug: ltx-2-5-local-multishot-video-audio-guide
date: '2026-11-03'
category: AI Tools
tags:
  - LTX-2.5
  - Lightricks
  - 로컬AI
  - 영상생성
  - 오픈소스
  - ComfyUI
  - 멀티샷
  - 오디오생성
  - 파인튜닝
description: >-
  Lightricks가 2026년 8월 공개한 22B 오픈웨이트 모델 LTX-2.5로 ComfyUI에서 멀티샷 영상·오디오를 로컬 생성하는
  방법을 1차 출처 기반으로 정리했습니다.
cover: /images/posts/daily-2026-11-03/commons-134006119.webp
published: true
automated: true
sources:
  - 'https://github.com/topics/ai-video-generation-api'
  - 'https://github.com/topics/video-automation'
  - >-
    https://medium.com/@2315610426/the-best-open-source-alternative-to-ai-video-platforms-2026-af9402b36974
  - 'https://locallyuncensored.com/blog/local-ai-image-and-video-generator.html'
  - >-
    https://www.blog.brightcoding.dev/2026/10/01/crisng95flowboard-local-ai-video-generation-with-node-based-workflows
  - 'https://en.wikipedia.org/wiki/Fotor'
  - 'https://zeroskillai.com/faceless-youtube-ai-automation/'
  - >-
    https://www.emergingtechdaily.com/post/open-source-ai-video-generator-best-tools-in-2026
  - 'https://hardwarepedia.com/blog/local-ai-image-video-generation-guide-2026'
  - 'https://offlinecreator.com/blog/ai-image-to-video-local-uncensored'
  - 'https://brunch.co.kr/@skychang44/698'
  - 'https://www.youtube.com/watch?v=0NcAEkYVEh4'
  - 'https://www.heygen.com/'
  - 'https://www.youtube.com/watch?v=ZPx3Kn-SDck'
  - 'https://neomindstd.github.io/%EA%B8%B0%ED%83%80/creative-ai-guide-2026/'
  - 'https://www.aistudios.com/'
  - 'https://deevid.ai/ko'
  - 'https://www.atlascloud.ai/blog/tips/best-ai-video-generation-models-2026'
  - 'https://apps.apple.com/KR/app/id6478868302'
  - 'https://en.wikipedia.org/wiki/LTX_(text-to-video_model)'
  - 'https://en.wikipedia.org/wiki/LTX-2'
  - 'https://www.youtube.com/watch?v=freXJx-gcME'
  - 'https://www.youtube.com/watch?v=Mks4jDu1uQU'
  - 'https://www.youtube.com/watch?v=XY2uZhgrTyo'
  - 'https://www.youtube.com/watch?v=geSIepK8ekQ'
  - 'https://www.youtube.com/watch?v=TGwog_02a8g'
  - 'https://www.youtube.com/watch?v=GJOYDqvNOtQ'
  - 'https://www.youtube.com/watch?v=Tqf8OIrImPw'
  - 'https://www.firecrawl.dev/blog/best-browser-agents'
  - 'https://en.wikipedia.org/wiki/AI_browser'
  - 'https://en.wikipedia.org/wiki/BrowserStack'
  - 'https://www.youtube.com/watch?v=YQJ0mV8Ddic&xstg=CAMSBhUDzO3xHw%3D%3D'
  - 'https://www.youtube.com/watch?v=Nw9a2k92I1w'
  - 'https://nohacks.co/blog/agentic-browser-landscape-2026'
  - 'https://www.youtube.com/watch?v=84YGJRBKjB4'
  - 'https://www.youtube.com/watch?v=j3bLIAEjaSE'
  - 'https://www.youtube.com/@Browserbots'
  - 'https://en.wikipedia.org/wiki/LTX_(world_model)'
  - 'https://comfyui-wiki.com/en/news/2026-08-11-ltx-2-5-open-weights-release'
  - 'https://en.wikipedia.org/wiki/LTX_Studio'
  - 'https://truescho.com/en/blog/ltx-25-lightricks-video-generation'
  - >-
    https://studio.aifilms.ai/blog/ltx-2-5-open-weights-world-model-multishot-2026
  - 'https://en.wikipedia.org/wiki/Lightricks'
  - 'https://llm-stats.com/blog/research/ltx-2.5-launch'
  - 'https://github.com/sfast/skyvern'
  - 'https://webscraping.fyi/lib/python/skyvern/'
  - 'https://news.ycombinator.com/item?id=39706004'
  - 'https://theaiagentindex.com/agents/skyvern'
  - 'https://webscraping.fyi/lib/compare/python-browser-use-vs-python-skyvern/'
  - 'https://webscraping.fyi/lib/compare/go-rod-vs-python-skyvern/'
  - 'https://www.youtube.com/watch?v=zkj5_WPHcv4'
  - 'https://webscraping.fyi/lib/compare/go-chromedp-vs-python-skyvern/'
editorialLane: youtube
coverAlt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
coverCredit:
  author: Jernej Furman from Slovenia
  title: AI Artificial Intelligence concept (52917075159).jpg
  source: 'https://commons.wikimedia.org/w/index.php?curid=134006119'
  license: CC BY 2.0
  licenseUrl: 'https://creativecommons.org/licenses/by/2.0/'
  alt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
  provider: Wikimedia Commons direct
  imageId: commons-134006119
  originalUrl: >-
    https://upload.wikimedia.org/wikipedia/commons/5/5a/AI_Artificial_Intelligence_concept_%2852917075159%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
  originalHash: dfdecc48b1b78393268a57f44baf4f0206f275bc4deb2e115a1c22041f5f9a30
  verifiedAt: '2026-11-03T05:18:33.879Z'
  originalArtist: >-
    <a rel="nofollow" class="external text"
    href="https://www.flickr.com/people/91261194@N06">Jernej Furman</a> from
    Slovenia
  changes: Resized and converted to WebP
---
> **TL;DR** Lightricks가 2026년 8월 11일 공개한 LTX-2.5는 22B 파라미터 오픈웨이트 영상+오디오 모델이다. ComfyUI 공식 워크플로만으로 로컬 GPU에서 멀티샷 시퀀스, 4K HDR 클립, 텍스트-투-오디오를 한 번에 생성할 수 있다. 클라우드 API 없이 고화질 영상을 만들고 싶은 개발자·크리에이터에게 현재 가장 현실적인 선택지 중 하나다.

---

## LTX-2.5란 무엇인가

Lightricks는 2026년 8월 11일 LTX-2.5를 출시했다. 22B 파라미터 규모의 오픈웨이트 **오디오·비디오 파운데이션 모델**로, [ComfyUI Wiki 릴리스 노트](https://comfyui-wiki.com/en/news/2026-08-11-ltx-2-5-open-weights-release)에 따르면 출시 당일부터 공식 ComfyUI 워크플로 템플릿이 함께 제공되었다.

[Wikipedia LTX 월드 모델 항목](https://en.wikipedia.org/wiki/LTX_(world_model))에 따르면 LTX-2.5는 단순한 영상 생성 모델을 넘어 로봇 훈련에 사용되는 **월드 모델** 방향으로 전환하고 있으며, 네이티브 멀티샷 생성과 도메인 특화 파인튜닝용 사전 학습 체크포인트가 추가됐다.

텍스트 인코더로는 **Gemma 4 12B** 모델에 학습된 프로젝션 레이어를 사용한다.

---

## 핵심 기능 한눈에 보기

[ComfyUI Wiki](https://comfyui-wiki.com/en/news/2026-08-11-ltx-2-5-open-weights-release)와 [Wikipedia](https://en.wikipedia.org/wiki/LTX_(world_model))에서 교차 확인한 기능 목록이다.

| 기능 | 설명 |
|---|---|
| **네이티브 멀티샷** | 단일 패스에서 캐릭터·조명·음성 연속성 유지 |
| **자동 재생 시간** | 장면 내용에 따라 클립 길이 자동 산정 |
| **4K HDR 출력** | 업스케일 워크플로 포함 |
| **텍스트-투-오디오** | 영상 생성과 동일 파이프라인에서 오디오 동시 생성 |
| **ICLoRA 인페인팅·아웃페인팅** | 기존 클립 일부 수정 또는 확장 |
| **모션 트래킹·유니온 컨트롤** | 오브젝트 움직임 제어 |
| **LTX Trainer** | 커스텀 학습 인프라 없이 파인튜닝 가능 |

Lightricks 공식 발표에 따르면 distilled 모델 기준 NVIDIA 슈퍼칩에서 10초 클립을 약 6~8초에 생성할 수 있다. 다만 이 수치는 **공식 발표 기준**이며 일반 소비자 GPU에서의 재현은 별도로 확인이 필요하다.

---

## 라이선스와 배포 구조

LTX-2.5는 **LTX-2.x Community 라이선스**가 적용된다. [llm-stats.com 분석](https://llm-stats.com/blog/research/ltx-2.5-launch)에서도 동일하게 확인된 내용이다.

- **연 매출 1,000만 달러 미만**: 무료 사용 가능
- **연 매출 1,000만 달러 초과**: 유료 라이선스 필요
- Apache 라이선스가 **아님** — 상업 프로젝트 적용 전 [원문 라이선스 확인](https://huggingface.co/Lightricks/LTX-2.5) 권장

배포는 Hugging Face의 `Lightricks/LTX-2.5` 저장소를 통해 이루어지며 Diffusers 라이브러리를 지원한다.

---

## ComfyUI 워크플로 실전 예제

Lightricks는 공식 `ComfyUI-LTXVideo` 래퍼를 LTX-2.5 예제 워크플로로 업데이트했다. [ComfyUI Wiki](https://comfyui-wiki.com/en/news/2026-08-11-ltx-2-5-open-weights-release)에 따르면 포함된 워크플로는 다음과 같다.

### 예제 1 — 텍스트→영상 (T2V)

```
1. ComfyUI에서 공식 T2V 워크플로 JSON 불러오기
2. "Positive Prompt" 노드에 장면 설명 입력
   예: "A golden retriever runs across a sunlit field, 
        tracking shot, 4K HDR, cinematic"
3. 해상도·프레임 수 설정 후 Queue 실행
4. 4K HDR .mp4 클립 출력
```

### 예제 2 — 이미지→영상 (I2V) + 멀티샷

```
1. 공식 I2V 워크플로 불러오기
2. "Load Image" 노드에 레퍼런스 이미지 연결
3. "Multi-Shot Config" 노드에 컷 수와 카메라 각도 지정
   예: shot_1: "wide angle", shot_2: "close-up", shot_3: "tracking"
4. 캐릭터·조명·음성이 연속된 멀티샷 시퀀스 출력
```

LTX-2.3 이전 버전 대비 멀티샷 일관성이 핵심 신규 기능이다. 이전에는 컷이 바뀔 때마다 캐릭터 외형이 달라지는 문제가 빈번했으나, [Wikipedia 항목](https://en.wikipedia.org/wiki/LTX_(world_model))에 따르면 2.5에서 네이티브 멀티샷 생성이 공식 기능으로 추가됐다.

### 예제 3 — 파인튜닝 (LTX Trainer)

```
1. LTX Trainer 저장소 클론
2. 브랜드 스타일 영상 클립 10~30개 준비
3. 학습 스크립트 실행 (사전 학습 체크포인트 활용)
4. 커스텀 체크포인트를 ComfyUI 워크플로에 로드
```

LTX Trainer는 커스텀 학습 인프라 없이 파인튜닝 경로를 이용할 수 있다는 점이 특징이다. 특정 시각 스타일이나 캐릭터를 고정하고 싶은 크리에이터에게 유용하다.

---

## 오픈소스 영상 생태계에서의 위치

[llm-stats.com](https://llm-stats.com/blog/research/ltx-2.5-launch)의 분석에 따르면 2026년 오픈소스 비디오 생태계는 대략 다음과 같이 정리된다.

| 모델 | 강점 |
|---|---|
| **Wan 2.1** | 범용성 |
| **HunyuanVideo** | 고화질 목표 |
| **LTX-Video 계열** | 빠른 로컬 워크플로 특화 |

LTX-2.5는 속도와 로컬 실행 편의성을 중심으로 포지셔닝되어 있다. ComfyUI 공식 통합이 day-one에 제공된다는 점은 파이프라인 구축 속도 측면에서 실질적인 이점이다.

---

## 주의할 점 — 아직 확인 안 된 항목

다음 항목은 현재 공식 문서에서 명확히 확인되지 않거나 출처 간 불일치가 있어 **직접 확인 후 적용**을 권장한다.

- **API 가격**: [llm-stats.com](https://llm-stats.com/blog/research/ltx-2.5-launch)은 FAQ 상의 가격과 라이브 문서 수치가 불일치한다고 명시했다. 최신 가격은 공식 문서(`docs.ltx.io`)에서 직접 확인해야 한다.
- **최소 VRAM 요건**: 공식 문서에서 직접 확인하지 못했다. 모델 크기(22B)를 고려할 때 소비자급 GPU에서의 요건은 별도 검토가 필요하다.
- **생성 속도 6~8초**: NVIDIA 슈퍼칩 기준 공식 발표 수치이며, 일반 GPU 환경에서의 재현은 확인되지 않았다.
- **라이선스 세부 조건**: 상업 프로젝트 적용 전 LTX-2.x Community 라이선스 원문 확인을 권장한다.

---

## 시작하는 방법

1. Hugging Face에서 `Lightricks/LTX-2.5` 모델 가중치 다운로드
2. ComfyUI에 `ComfyUI-LTXVideo` 커스텀 노드 설치
3. 공식 워크플로 JSON 예제 로드 후 텍스트 프롬프트 입력
4. 파인튜닝이 필요하다면 LTX Trainer 저장소 참고

클라우드 API 의존 없이 로컬에서 멀티샷 영상과 오디오를 한 번에 생성할 수 있는 파이프라인을 원하는 개발자·크리에이터라면, LTX-2.5는 현재 확인 가능한 옵션 중 ComfyUI 생태계와의 통합이 가장 공식적으로 잘 갖춰진 모델이다.


## 참고 자료
- [참고 자료 1](https://github.com/topics/ai-video-generation-api)
- [참고 자료 2](https://github.com/topics/video-automation)
- [참고 자료 3](https://medium.com/@2315610426/the-best-open-source-alternative-to-ai-video-platforms-2026-af9402b36974)
- [참고 자료 4](https://locallyuncensored.com/blog/local-ai-image-and-video-generator.html)
- [참고 자료 5](https://www.blog.brightcoding.dev/2026/10/01/crisng95flowboard-local-ai-video-generation-with-node-based-workflows)
- [참고 자료 6](https://en.wikipedia.org/wiki/Fotor)
- [참고 자료 7](https://zeroskillai.com/faceless-youtube-ai-automation/)
- [참고 자료 8](https://www.emergingtechdaily.com/post/open-source-ai-video-generator-best-tools-in-2026)
- [참고 자료 9](https://hardwarepedia.com/blog/local-ai-image-video-generation-guide-2026)
- [참고 자료 10](https://offlinecreator.com/blog/ai-image-to-video-local-uncensored)
- [참고 자료 11](https://brunch.co.kr/@skychang44/698)
- [참고 자료 12](https://www.youtube.com/watch?v=0NcAEkYVEh4)
- [참고 자료 13](https://www.heygen.com/)
- [참고 자료 14](https://www.youtube.com/watch?v=ZPx3Kn-SDck)
- [참고 자료 15](https://neomindstd.github.io/%EA%B8%B0%ED%83%80/creative-ai-guide-2026/)
- [참고 자료 16](https://www.aistudios.com/)
- [참고 자료 17](https://deevid.ai/ko)
- [참고 자료 18](https://www.atlascloud.ai/blog/tips/best-ai-video-generation-models-2026)
- [참고 자료 19](https://apps.apple.com/KR/app/id6478868302)
- [참고 자료 20](https://en.wikipedia.org/wiki/LTX_(text-to-video_model))
- [참고 자료 21](https://en.wikipedia.org/wiki/LTX-2)
- [참고 자료 22](https://www.youtube.com/watch?v=freXJx-gcME)
- [참고 자료 23](https://www.youtube.com/watch?v=Mks4jDu1uQU)
- [참고 자료 24](https://www.youtube.com/watch?v=XY2uZhgrTyo)
- [참고 자료 25](https://www.youtube.com/watch?v=geSIepK8ekQ)
- [참고 자료 26](https://www.youtube.com/watch?v=TGwog_02a8g)
- [참고 자료 27](https://www.youtube.com/watch?v=GJOYDqvNOtQ)
- [참고 자료 28](https://www.youtube.com/watch?v=Tqf8OIrImPw)
- [참고 자료 29](https://www.firecrawl.dev/blog/best-browser-agents)
- [참고 자료 30](https://en.wikipedia.org/wiki/AI_browser)
- [참고 자료 31](https://en.wikipedia.org/wiki/BrowserStack)
- [참고 자료 32](https://www.youtube.com/watch?v=YQJ0mV8Ddic&xstg=CAMSBhUDzO3xHw%3D%3D)
- [참고 자료 33](https://www.youtube.com/watch?v=Nw9a2k92I1w)
- [참고 자료 34](https://nohacks.co/blog/agentic-browser-landscape-2026)
- [참고 자료 35](https://www.youtube.com/watch?v=84YGJRBKjB4)
- [참고 자료 36](https://www.youtube.com/watch?v=j3bLIAEjaSE)
- [참고 자료 37](https://www.youtube.com/@Browserbots)
- [참고 자료 38](https://en.wikipedia.org/wiki/LTX_(world_model))
- [참고 자료 39](https://comfyui-wiki.com/en/news/2026-08-11-ltx-2-5-open-weights-release)
- [참고 자료 40](https://en.wikipedia.org/wiki/LTX_Studio)
- [참고 자료 41](https://truescho.com/en/blog/ltx-25-lightricks-video-generation)
- [참고 자료 42](https://studio.aifilms.ai/blog/ltx-2-5-open-weights-world-model-multishot-2026)
- [참고 자료 43](https://en.wikipedia.org/wiki/Lightricks)
- [참고 자료 44](https://llm-stats.com/blog/research/ltx-2.5-launch)
- [참고 자료 45](https://github.com/sfast/skyvern)
- [참고 자료 46](https://webscraping.fyi/lib/python/skyvern/)
- [참고 자료 47](https://news.ycombinator.com/item?id=39706004)
- [참고 자료 48](https://theaiagentindex.com/agents/skyvern)
- [참고 자료 49](https://webscraping.fyi/lib/compare/python-browser-use-vs-python-skyvern/)
- [참고 자료 50](https://webscraping.fyi/lib/compare/go-rod-vs-python-skyvern/)
- [참고 자료 51](https://www.youtube.com/watch?v=zkj5_WPHcv4)
- [참고 자료 52](https://webscraping.fyi/lib/compare/go-chromedp-vs-python-skyvern/)

커버 이미지: [Jernej Furman from Slovenia](https://commons.wikimedia.org/w/index.php?curid=134006119) · [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.
