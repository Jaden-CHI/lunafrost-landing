---
title: 'Wan 2.2 × ComfyUI: 노코드 로컬 AI 영상 생성 가이드'
slug: wan-2-2-comfyui-local-ai-video-guide
date: '2026-11-13'
category: AI Tools
tags:
  - Wan 2.2
  - ComfyUI
  - AI 영상 생성
  - 로컬 AI
  - 오픈소스
  - MoE
  - 텍스트-투-비디오
description: >-
  Alibaba Tongyi Lab의 오픈소스 MoE 영상 모델 Wan 2.2를 ComfyUI 노코드 워크플로로 로컬 실행하는 방법을 공식
  문서 기반으로 정리합니다.
cover: /images/posts/daily-2026-11-13/commons-195948357.webp
published: true
automated: true
sources:
  - 'https://github.com/mudler/LocalAI'
  - 'https://locallyuncensored.com/blog/local-ai-image-and-video-generator.html'
  - 'https://en.wikipedia.org/wiki/LTX-2'
  - 'https://localai.io/docs/features/video-generation/index.html'
  - 'https://localai.io/docs/features/video-generation/'
  - 'https://localaimaster.com/blog/local-ai-video-generation'
  - 'https://techiehub.blog/best-local-ai-video-generator/'
  - 'https://zeroskillai.com/faceless-youtube-ai-automation/'
  - 'https://hardwarepedia.com/blog/local-ai-image-video-generation-guide-2026'
  - 'https://brunch.co.kr/@skychang44/698'
  - 'https://www.youtube.com/watch?v=ZPx3Kn-SDck'
  - >-
    https://www.gpters.org/nocode/post/images-videos-narration-even-htZizFfXxBGRumE
  - 'https://www.gpters.org/media/post/ainocode-too-can-become-aOqnnTkroIs0OQS'
  - 'https://imaginevid.io/ko/blog/make-youtube-shorts-with-ai'
  - >-
    https://word.toy0727.co.kr/2026%EB%85%84-%EC%B5%9C%EC%8B%A0-ai-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%B0%8F-%EC%98%81%EC%83%81-%EC%83%9D%EC%84%B1%ED%88%B4-%EA%B8%B0%EB%8A%A5-%EB%B9%84%EA%B5%90%EC%99%80-%EC%A0%9C%EC%9E%91-%EA%B0%80/
  - 'https://pxz.ai/ko/blog/how-to-create-youtube-videos-with-ai'
  - 'https://openart.ai/blog/ai-youtube-channel-ideas/'
  - >-
    https://apps.apple.com/us/app/ai-%EB%B9%84%EB%94%94%EC%98%A4-%EC%83%9D%EC%84%B1%EA%B8%B0-%ED%85%8D%EC%8A%A4%ED%8A%B8%EC%99%80-%EC%9D%B4%EB%AF%B8%EC%A7%80%EB%A1%9C-%EC%98%81%EC%83%81-%EC%A0%9C%EC%9E%91/id6751633020?l=ko
  - 'https://github.com/Comfy-Org/ComfyUI/discussions/13660'
  - 'https://github.com/Comfy-Org/ComfyUI-Manager/discussions/2846'
  - 'https://github.com/pawapawa007/comfyui-guide'
  - 'https://github.com/comfy-org'
  - 'https://github.com/Comfy-Org/ComfyUI-Manager/blob/main/README.md'
  - 'https://github.com/comfy-org/comfyui-manager/blob/main/glob/README.md'
  - 'https://github.com/comfy-org/ComfyUI-Manager'
  - 'https://en.wikipedia.org/wiki/ComfyUI'
  - >-
    https://github.com/ZHO-ZHO-ZHO/ComfyUI-Manager-Zh-Chinese/blob/main/README.md
  - 'https://www.youtube.com/watch?v=rev1UOLM2-E'
  - 'https://www.youtube.com/watch?v=Z_-cUmaK9z4'
  - 'https://www.youtube.com/watch?v=ymjQ3KKsSHk'
  - 'https://www.youtube.com/watch?v=baz2OFKeqSw'
  - 'https://www.youtube.com/watch?v=QpjxFWwc9zw'
  - 'https://www.youtube.com/watch?v=YZTvL8C_xz4'
  - 'https://www.youtube.com/watch?v=kDgOhDQZMy0'
  - 'https://www.youtube.com/watch?v=SVDKYwt-DBg'
  - 'https://www.mindstudio.ai/models/wan-2-2'
  - >-
    https://huggingface.co/alibaba-pai/Wan2.2-VACE-Fun-A14B/blob/main/README_en.md
  - 'https://huggingface.co/Comfy-Org/Wan-2.2/blob/main/README.md'
  - 'https://huggingface.co/alibaba-pai/Wan2.2-Fun-5B-InP/blob/main/README_en.md'
  - >-
    https://huggingface.co/Wan-AI/Wan2.2-S2V-14B/blob/314f4779dae5684c5a3b08d5236c2cd9c14577b4/README.md
  - 'https://en.wikipedia.org/wiki/Qwen'
  - 'https://huggingface.co/Wan-AI/Wan2.2-T2V-A14B/raw/main/README.md'
  - 'https://huggingface.co/Wan-AI/Wan2.2-T2V-A14B/blob/main/README.md'
  - >-
    https://tech-now.io/en/blogs/alibaba-wan-2-2-the-open-source-ai-video-model-that-aims-to-democratize-cinematic-creation/
  - 'https://huggingface.co/Wan-AI/Wan2.2-TI2V-5B/blob/main/README.md'
  - 'https://huggingface.co/Wan-AI/Wan2.2-T2V-A14B'
  - 'https://docs.comfy.org/tutorials/video/wan/wan2_2'
  - 'https://www.youtube.com/watch?v=6XL6cJipSsc'
  - >-
    https://www.stablediffusiontutorials.com/2025/08/wan-2.2-video-generation.html
  - 'https://localaimaster.com/blog/wan-video-generation-guide'
  - 'https://offlinecreator.com/tool/comfyui/for/video-generation'
  - 'https://www.sozee.ai/resources/uncensored-ai-video-generator-workflow/'
  - 'https://papayabytes.substack.com/p/guide-comfyui-and-wan-22-image-to'
editorialLane: youtube
recoveredAt: '2026-11-14T02:06:24.587Z'
coverAlt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
coverCredit:
  author: Shixart1985
  title: Old computer motherboard with blue neon light.jpg
  source: 'https://commons.wikimedia.org/w/index.php?curid=195948357'
  license: CC BY 2.0
  licenseUrl: 'https://creativecommons.org/licenses/by/2.0/'
  alt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
  provider: Wikimedia Commons direct
  imageId: commons-195948357
  originalUrl: >-
    https://upload.wikimedia.org/wikipedia/commons/4/42/Old_computer_motherboard_with_blue_neon_light.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
  originalHash: fe4c75f2fae55bb4ad437c10354c0a6c72aab871891ec7b5f794c14f1b894070
  verifiedAt: '2026-11-14T02:03:53.910Z'
  originalArtist: >-
    <a href="//commons.wikimedia.org/wiki/User:Shixart1985"
    title="User:Shixart1985">Shixart1985</a>
  changes: Resized and converted to WebP
---
> 2026-11-13 누락분을 2026-11-14에 보완 발행한 글입니다.

> **TL;DR** Wan 2.2는 Alibaba Tongyi Lab이 Apache 2.0으로 공개한 MoE 기반 영상 생성 모델입니다. ComfyUI는 텍스트-투-비디오·이미지-투-비디오 등 5종의 내장 워크플로 템플릿을 제공해, 코드 없이 로컬에서 영상을 생성할 수 있습니다. 최소 12GB VRAM이 필요하며, 24GB를 권장합니다.

---

## Wan 2.2가 무엇인가

[Wan 2.2](https://huggingface.co/Wan-AI/Wan2.2-T2V-A14B)는 Alibaba Tongyi Lab이 개발한 오픈소스 영상 생성 모델 패밀리입니다. Apache 2.0 라이선스로 배포되어 상업·연구 목적 모두 무료로 사용할 수 있습니다. 아키텍처로 Mixture-of-Experts(MoE)를 채택했으며, 영어와 중국어 이중 언어 프롬프트를 지원합니다.

이전 편에서 다룬 LTX-2.5(Lightricks)와 비교하면, 개발사·아키텍처·언어 지원 모두 다릅니다. LTX-2.5가 Diffusion Transformer 기반이라면, Wan 2.2는 MoE 구조를 사용하고 ComfyUI 내장 템플릿도 별도로 5종 제공됩니다.

---

## 모델 패밀리 한눈에 보기

공식 HuggingFace README를 기반으로 주요 모델을 정리했습니다.

| 모델 | 특징 |
|---|---|
| [Wan2.2-T2V-A14B](https://huggingface.co/Wan-AI/Wan2.2-T2V-A14B) | 텍스트-투-비디오, 480P·720P 동시 지원 |
| [Wan2.2-TI2V-5B](https://huggingface.co/Wan-AI/Wan2.2-TI2V-5B) | 텍스트·이미지 투 비디오, 720P·24fps, RTX 4090 단일 GPU 실행 가능 |
| [Wan2.2-Fun-5B-Control](https://huggingface.co/alibaba-pai/Wan2.2-Fun-5B-InP) | Canny·Depth·Pose·MLSD·궤적 등 컨트롤 조건 지원, 121프레임·24FPS 학습 |
| Wan-Animate | 단일 이미지에서 자연스러운 움직임 생성 |
| Wan-Move | 한 영상의 모션 패턴을 다른 피사체에 전이 |

Wan2.2-TI2V-5B는 [공식 README](https://huggingface.co/Wan-AI/Wan2.2-TI2V-5B/blob/main/README.md)에서 RTX 4090 단일 GPU로 실행 가능하다고 명시하고 있습니다. 단, 실제 생성 시간 및 품질은 직접 실행해 확인하지 않았습니다.

---

## ComfyUI 내장 워크플로 5종

[ComfyUI 공식 문서](https://docs.comfy.org/tutorials/video/wan/wan2_2)에 따르면, Wan 2.2를 위한 내장 워크플로 템플릿이 5종 제공됩니다.

1. **텍스트-투-비디오 (T2V)** — 프롬프트만으로 영상 생성
2. **이미지-투-비디오 (I2V)** — 정지 이미지를 영상으로 변환
3. **컨트롤 비디오** — 모션 가이드(Canny, Depth 등)로 움직임 제어
4. **비디오 아웃페인팅** — 영상의 프레임 바깥 영역 확장
5. **첫-마지막 프레임 보간 (FLF2V)** — 시작·끝 프레임을 지정해 그 사이를 채움

ComfyUI 상단 메뉴 → **Templates → Video** 에서 "Wan2.2"를 검색하면 위 워크플로 JSON을 바로 로드할 수 있습니다.

또한 [ComfyUI-Manager](https://github.com/comfy-org/ComfyUI-Manager)는 커스텀 노드를 설치·제거·비활성화·활성화하고 허브 기능을 제공하는 확장입니다. 2026-11-14 관측 기준, [GitHub 마지막 커밋이 2026-11-13](https://github.com/comfy-org/ComfyUI-Manager)으로 활발히 유지되고 있습니다.

---

## 로컬 설치 흐름 (공식 GitHub 기반, 직접 실행 미확인)

[공식 GitHub](https://github.com/Wan-Video/Wan2.2)에 따른 설치 순서입니다. 명령어는 공식 문서에서 확인했으나, 실제 실행 결과는 직접 검증하지 않았습니다.

### 1. 저장소 클론 및 의존성 설치

```bash
git clone https://github.com/Wan-Video/Wan2.2.git
cd Wan2.2
pip install -r requirements.txt
```

PyTorch 2.4.0 이상이 필요합니다.

### 2. 모델 다운로드 (HuggingFace CLI 예시)

```bash
# T2V 14B 모델
huggingface-cli download Wan-AI/Wan2.2-T2V-A14B \
  --local-dir ./Wan2.2-T2V-A14B

# TI2V 5B 모델 (소비자 GPU용)
huggingface-cli download Wan-AI/Wan2.2-TI2V-5B \
  --local-dir ./Wan2.2-TI2V-5B
```

ModelScope CLI도 동일하게 지원됩니다.

### 3. ComfyUI에서 노코드로 실행

1. ComfyUI Desktop 설치 (`comfy.org` 또는 GitHub)
2. ComfyUI-Manager 설치 → 커스텀 노드 허브에서 `ComfyUI-WanVideoWrapper` 검색·설치
3. **Templates → Video → "Wan2.2 5B"** 또는 **"Wan2.2 14B I2V"** 워크플로 로드
4. 프롬프트 입력 후 실행 — 영어·한국어·중국어 모두 입력 가능

---

## VRAM 요건과 현실적 제약

[ComfyUI 공식 문서](https://docs.comfy.org/tutorials/video/wan/wan2_2)는 로컬 영상 생성 시 **최소 12GB VRAM, 권장 24GB**를 명시하고 있습니다. 생성 시간은 분 단위입니다. 소비자 GPU(RTX 4090 기준)로 TI2V-5B 모델이 실행 가능하다고 공식 문서가 밝히고 있으나, 실제 생성 시간과 출력 품질은 직접 확인하지 않았습니다.

12GB 미만 GPU를 사용하는 경우 공식 경로 외 별도 최적화가 필요할 수 있으며, 이에 대한 공식 가이드는 현재 확인하지 못했습니다.

---

## 개발자·크리에이터가 주목할 포인트

- **Apache 2.0**: 상업 프로젝트에 모델 가중치를 직접 통합하거나 API로 감싸서 배포 가능
- **이중 언어 프롬프트**: 한국어 환경에서 영어·중국어 프롬프트를 함께 실험할 수 있음 (단, 한국어 프롬프트 품질은 직접 확인하지 않음)
- **MoE 아키텍처**: 활성화 파라미터 수를 전체 파라미터 수보다 줄여 추론 효율을 높이는 구조. A14B 모델명의 'A'가 활성화(Activated) 파라미터를 의미함
- **FLF2V(첫-마지막 프레임 보간)**: 스토리보드의 키프레임 두 장으로 중간 모션을 자동 생성하는 워크플로로, 애니메이션·광고 콘티 작업에 활용 가능

---

## 확인하지 못한 사항

이 글은 공식 GitHub README, HuggingFace 모델 카드, ComfyUI 공식 문서를 근거로 작성했습니다. 다음 항목은 직접 확인하지 못했습니다.

- YouTube 영상 내 실제 시연 화질 및 생성 속도
- 각 채널의 조회수·구독자 수
- 한국어 프롬프트 입력 시 실제 출력 품질
- 12GB 미만 VRAM 환경에서의 동작 여부

추가 확인이 필요하다면 [공식 GitHub Issues](https://github.com/Wan-Video/Wan2.2)와 [ComfyUI Discussions](https://github.com/Comfy-Org/ComfyUI/discussions/13660)를 참고하세요.


## 참고 자료
- [참고 자료 1](https://github.com/mudler/LocalAI)
- [참고 자료 2](https://locallyuncensored.com/blog/local-ai-image-and-video-generator.html)
- [참고 자료 3](https://en.wikipedia.org/wiki/LTX-2)
- [참고 자료 4](https://localai.io/docs/features/video-generation/index.html)
- [참고 자료 5](https://localai.io/docs/features/video-generation/)
- [참고 자료 6](https://localaimaster.com/blog/local-ai-video-generation)
- [참고 자료 7](https://techiehub.blog/best-local-ai-video-generator/)
- [참고 자료 8](https://zeroskillai.com/faceless-youtube-ai-automation/)
- [참고 자료 9](https://hardwarepedia.com/blog/local-ai-image-video-generation-guide-2026)
- [참고 자료 10](https://brunch.co.kr/@skychang44/698)
- [참고 자료 11](https://www.youtube.com/watch?v=ZPx3Kn-SDck)
- [참고 자료 12](https://www.gpters.org/nocode/post/images-videos-narration-even-htZizFfXxBGRumE)
- [참고 자료 13](https://www.gpters.org/media/post/ainocode-too-can-become-aOqnnTkroIs0OQS)
- [참고 자료 14](https://imaginevid.io/ko/blog/make-youtube-shorts-with-ai)
- [참고 자료 15](https://word.toy0727.co.kr/2026%EB%85%84-%EC%B5%9C%EC%8B%A0-ai-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%B0%8F-%EC%98%81%EC%83%81-%EC%83%9D%EC%84%B1%ED%88%B4-%EA%B8%B0%EB%8A%A5-%EB%B9%84%EA%B5%90%EC%99%80-%EC%A0%9C%EC%9E%91-%EA%B0%80/)
- [참고 자료 16](https://pxz.ai/ko/blog/how-to-create-youtube-videos-with-ai)
- [참고 자료 17](https://openart.ai/blog/ai-youtube-channel-ideas/)
- [참고 자료 18](https://apps.apple.com/us/app/ai-%EB%B9%84%EB%94%94%EC%98%A4-%EC%83%9D%EC%84%B1%EA%B8%B0-%ED%85%8D%EC%8A%A4%ED%8A%B8%EC%99%80-%EC%9D%B4%EB%AF%B8%EC%A7%80%EB%A1%9C-%EC%98%81%EC%83%81-%EC%A0%9C%EC%9E%91/id6751633020?l=ko)
- [참고 자료 19](https://github.com/Comfy-Org/ComfyUI/discussions/13660)
- [참고 자료 20](https://github.com/Comfy-Org/ComfyUI-Manager/discussions/2846)
- [참고 자료 21](https://github.com/pawapawa007/comfyui-guide)
- [참고 자료 22](https://github.com/comfy-org)
- [참고 자료 23](https://github.com/Comfy-Org/ComfyUI-Manager/blob/main/README.md)
- [참고 자료 24](https://github.com/comfy-org/comfyui-manager/blob/main/glob/README.md)
- [참고 자료 25](https://github.com/comfy-org/ComfyUI-Manager)
- [참고 자료 26](https://en.wikipedia.org/wiki/ComfyUI)
- [참고 자료 27](https://github.com/ZHO-ZHO-ZHO/ComfyUI-Manager-Zh-Chinese/blob/main/README.md)
- [참고 자료 28](https://www.youtube.com/watch?v=rev1UOLM2-E)
- [참고 자료 29](https://www.youtube.com/watch?v=Z_-cUmaK9z4)
- [참고 자료 30](https://www.youtube.com/watch?v=ymjQ3KKsSHk)
- [참고 자료 31](https://www.youtube.com/watch?v=baz2OFKeqSw)
- [참고 자료 32](https://www.youtube.com/watch?v=QpjxFWwc9zw)
- [참고 자료 33](https://www.youtube.com/watch?v=YZTvL8C_xz4)
- [참고 자료 34](https://www.youtube.com/watch?v=kDgOhDQZMy0)
- [참고 자료 35](https://www.youtube.com/watch?v=SVDKYwt-DBg)
- [참고 자료 36](https://www.mindstudio.ai/models/wan-2-2)
- [참고 자료 37](https://huggingface.co/alibaba-pai/Wan2.2-VACE-Fun-A14B/blob/main/README_en.md)
- [참고 자료 38](https://huggingface.co/Comfy-Org/Wan-2.2/blob/main/README.md)
- [참고 자료 39](https://huggingface.co/alibaba-pai/Wan2.2-Fun-5B-InP/blob/main/README_en.md)
- [참고 자료 40](https://huggingface.co/Wan-AI/Wan2.2-S2V-14B/blob/314f4779dae5684c5a3b08d5236c2cd9c14577b4/README.md)
- [참고 자료 41](https://en.wikipedia.org/wiki/Qwen)
- [참고 자료 42](https://huggingface.co/Wan-AI/Wan2.2-T2V-A14B/raw/main/README.md)
- [참고 자료 43](https://huggingface.co/Wan-AI/Wan2.2-T2V-A14B/blob/main/README.md)
- [참고 자료 44](https://tech-now.io/en/blogs/alibaba-wan-2-2-the-open-source-ai-video-model-that-aims-to-democratize-cinematic-creation/)
- [참고 자료 45](https://huggingface.co/Wan-AI/Wan2.2-TI2V-5B/blob/main/README.md)
- [참고 자료 46](https://huggingface.co/Wan-AI/Wan2.2-T2V-A14B)
- [참고 자료 47](https://docs.comfy.org/tutorials/video/wan/wan2_2)
- [참고 자료 48](https://www.youtube.com/watch?v=6XL6cJipSsc)
- [참고 자료 49](https://www.stablediffusiontutorials.com/2025/08/wan-2.2-video-generation.html)
- [참고 자료 50](https://localaimaster.com/blog/wan-video-generation-guide)
- [참고 자료 51](https://offlinecreator.com/tool/comfyui/for/video-generation)
- [참고 자료 52](https://www.sozee.ai/resources/uncensored-ai-video-generator-workflow/)
- [참고 자료 53](https://papayabytes.substack.com/p/guide-comfyui-and-wan-22-image-to)

커버 이미지: [Shixart1985](https://commons.wikimedia.org/w/index.php?curid=195948357) · [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.
