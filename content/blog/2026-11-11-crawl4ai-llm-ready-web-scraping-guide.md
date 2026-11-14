---
title: Crawl4AI로 웹 페이지를 LLM 먹이로 만들기
slug: crawl4ai-llm-ready-web-scraping-guide
date: '2026-11-11'
category: AI Tools
tags:
  - Crawl4AI
  - RAG
  - 웹크롤링
  - 로컬AI
  - Ollama
  - LLM
  - Python
  - 셀프호스트
description: >-
  페이지당 요금 없이 웹을 LLM-ready 마크다운으로 변환하는 오픈소스 크롤러 Crawl4AI의 설치부터 Ollama 연동 로컬 RAG
  파이프라인까지 실전 가이드.
cover: /images/posts/daily-2026-11-11/commons-138494876.webp
published: true
automated: true
sources:
  - 'https://hatchworks.com/blog/ai-agents/n8n-guide/'
  - 'https://github.com/n8n-io'
  - 'https://www.bitdoze.com/n8n-self-host-workflow-automation/'
  - 'https://github.com/n8n-io/n8n'
  - 'https://www.frankx.ai/blog/ultimate-n8n-workflow-2026'
  - >-
    https://tech-insider.org/n8n-tutorial-workflow-automation-complete-guide-2026/
  - 'https://www.codmaker.com/blog/n8n-workflow-automation-complete-guide'
  - 'https://lvato.com/blog/self-hosting-n8n-guide/'
  - 'https://nextgrowth.ai/what-is-n8n/'
  - 'https://scrapeops.io/web-scraping-playbook/best-ai-web-scraping-tools/'
  - >-
    https://dev.to/devstackcommunity/best-ai-web-scraper-tools-in-2026-i-tested-7-these-are-worth-it-n2e
  - 'https://www.scrapingbee.com/blog/crawl4ai/'
  - 'https://proxidize.com/blog/crawl4ai/'
  - 'https://scrapfly.io/blog/posts/crawl4AI-explained'
  - 'https://webscraping.cc/blog/crawl4ai-guide/'
  - >-
    https://dibi8.com/resources/llm-frameworks/crawl4ai-tutorial-llm-ready-web-scraping-2026/
  - 'https://localaimaster.com/blog/crawl4ai-setup-guide'
  - 'https://webscraping.cc/tool/crawl4ai/'
  - 'https://modal.com/resources/best-serverless-gpu-platforms-inference'
  - 'https://modal.com/resources/best-serverless-gpu-platforms-model-training'
  - 'https://www.subconscious.dev/providers/modal'
  - 'https://aitrendtool.com/tools/modal'
  - 'https://pythondatabench.com/article/modal-python-serverless-gpu-ml-2026'
  - 'https://doolpa.com/article/modal'
  - 'https://itirupati.com/modal/'
  - 'https://pristren.com/blog/modal-gpu-serverless-ml/'
  - 'https://gpuhosted.com/en/modal-serverless-guide/'
  - 'https://github.com/unclecode/crawl4ai/blob/main/CHANGELOG.md'
  - 'https://releasealert.dev/github/unclecode/crawl4ai'
  - 'https://github.com/unclecode/crawl4ai/blob/main/docs/blog/release-v0.9.4.md'
  - 'https://github.com/unclecode/crawl4ai/blob/main/docs/blog/release-v0.8.0.md'
  - 'https://github.com/XavieraWood/dsh-u-20261026-unclecode__crawl4ai'
  - 'https://github.com/Link-Start/crawl4ai_unclecode'
  - 'https://github.com/unclecode/crawl4ai?tab=readme-ov-file'
  - 'https://github.com/unclecode/crawl4ai/releases/tag/v0.7.5'
  - 'https://www.aiagent.club/p/github/unclecode/crawl4ai/'
editorialLane: practical
recoveredAt: '2026-11-14T02:01:22.260Z'
coverAlt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
coverCredit:
  author: Robin Fensom
  title: NES Motherboard.png
  source: 'https://commons.wikimedia.org/w/index.php?curid=138494876'
  license: CC BY 2.0
  licenseUrl: 'https://creativecommons.org/licenses/by/2.0/'
  alt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
  provider: Wikimedia Commons direct
  imageId: commons-138494876
  originalUrl: >-
    https://upload.wikimedia.org/wikipedia/commons/8/83/NES_Motherboard.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
  originalHash: 8dd38bc973861d42e5ceb190a40057e6ecbe59dbef51030a02a69bffa213fd65
  verifiedAt: '2026-11-14T01:58:13.432Z'
  originalArtist: Robin Fensom
  changes: Resized and converted to WebP
---
> 2026-11-11 누락분을 2026-11-14에 보완 발행한 글입니다.

> **TL;DR** Crawl4AI는 Playwright 기반 오픈소스 Python 크롤러로, 광고·네비게이션·쿠키 배너를 걷어내고 웹 페이지를 LLM-ready 마크다운 또는 구조화 JSON으로 변환합니다. Apache 2.0 라이선스, 페이지당 요금 없음. Ollama와 연결하면 추출 비용도 $0입니다. Docker API 셀프호스트 사용자는 보안 취약점 패치가 집중된 최신 버전으로 즉시 업그레이드하세요.

---

## 왜 Crawl4AI인가

RAG 파이프라인이나 AI 에이전트를 구축할 때 가장 먼저 막히는 지점은 **"어떻게 웹에서 깨끗한 텍스트를 가져오느냐"** 입니다. 선택지는 대개 세 가지입니다.

- **Firecrawl 같은 유료 SaaS** — 클린 마크다운을 주지만 페이지당 크레딧이 나갑니다.
- **Scrapy** — 무료지만 JavaScript 렌더링이 기본 지원되지 않아 SPA나 동적 페이지에서 막힙니다.
- **Crawl4AI** — 무료 오픈소스, Playwright로 실제 브라우저를 구동해 JS를 렌더링하고, 로컬 LLM으로 구조화 추출까지 가능합니다.

[Crawl4AI 공식 README](https://github.com/unclecode/crawl4ai?tab=readme-ov-file)에 따르면 이 라이브러리는 RAG 파이프라인, AI 에이전트, 훈련 데이터셋 구축을 명시적 목적으로 설계되었으며 Apache 2.0 라이선스로 상업적 사용이 가능합니다.

기존 편성과의 관계를 짚자면, 이전에 다룬 Dify RAG편이 *downstream*(벡터 DB → 챗봇 UI)을 담당했다면, 이 글은 *upstream*(웹 데이터 수집·정제) 단계를 채웁니다. 두 도구는 경쟁이 아니라 파이프라인의 앞뒤를 잇는 관계입니다.

---

## 최신 버전 현황 (공식 CHANGELOG 기준)

[공식 CHANGELOG](https://github.com/unclecode/crawl4ai/blob/main/CHANGELOG.md)를 기준으로 최근 릴리스 흐름을 정리합니다.

**v0.9.5 (2026-10-14)** — 보안 집중 릴리스. Docker 서버의 비신뢰 요청 바디 처리에서 발생한 6건의 조율 공개(coordinated-disclosure) 취약점을 수정합니다. 패치 대상에는 에그레스 프록시 외부의 추가 SSRF 경로, `css_selector` 및 `wait_for`를 통한 페이지 JavaScript 주입, `CosineStrategy`의 HuggingFace 모델 선택 허용, 호출자 제공 정규식을 통한 ReDoS, 비제한 delay 필드, 인증서 검사 비활성화로 실행되는 Chromium이 포함됩니다.

**v0.9.4 (2026-09-23)** — [릴리스 노트](https://github.com/unclecode/crawl4ai/blob/main/docs/blog/release-v0.9.4.md)에 따르면 3건의 보안 취약점 수정, 콘텐츠 프루닝 약 10배 속도 개선, breaking change 없음.

> ⚠️ **Docker API 셀프호스트 사용자 주의**: v0.8.7은 AST 샌드박스 탈출 RCE, 훅 샌드박스 RCE, 하드코딩 JWT 시크릿, SSRF, 임의 파일 쓰기 등 치명적 취약점을 패치했습니다. 구버전을 Docker API로 공개 운영 중이라면 즉시 v0.9.5로 업그레이드하세요.

---

## 준비물

| 항목 | 최솟값 |
|------|--------|
| Python | 3.10 이상 권장 (공식 문서는 3.9+ 명시, v0.9.x에서 요구사항 변동 가능) |
| 디스크 | Playwright Chromium 포함 약 500MB+ |
| RAM | 1GB+ (로컬 LLM 추출 시 모델 크기에 따라 추가) |
| Ollama (선택) | 로컬 LLM 추출을 무료로 돌리려면 별도 설치 |
| Docker (선택) | MCP 엔드포인트·REST API 운영 시 |

---

## 설치 — 세 명령으로 완료

[공식 README](https://github.com/unclecode/crawl4ai?tab=readme-ov-file)에 명시된 설치 순서입니다. 가장 흔한 실수는 중간 `crawl4ai-setup` 명령을 건너뛰는 것입니다.

```bash
pip install -U crawl4ai
crawl4ai-setup      # Playwright Chromium 설치 등 초기화
crawl4ai-doctor     # 환경 확인
```

### 첫 번째 크롤

```python
import asyncio
from crawl4ai import AsyncWebCrawler

async def main():
    async with AsyncWebCrawler() as crawler:
        result = await crawler.arun(url="https://docs.example.com")
        print(result.markdown[:500])

asyncio.run(main())
```

`AsyncWebCrawler`는 헤드리스 Chromium 인스턴스를 실행하고 JavaScript가 렌더링될 때까지 기다린 뒤 결과 객체를 반환합니다.

---

## 추출 전략 선택

### CSS 기반 추출 — 토큰 비용 없음

구조가 예측 가능한 사이트라면 CSS 셀렉터로 JSON을 뽑는 것이 가장 빠르고 비용도 없습니다.

```python
from crawl4ai.extraction_strategy import JsonCssExtractionStrategy
from crawl4ai import CrawlerRunConfig

schema = {
    "name": "Articles",
    "baseSelector": "article.post",
    "fields": [
        {"name": "title", "selector": "h2",  "type": "text"},
        {"name": "url",   "selector": "a",   "type": "attribute", "attribute": "href"},
    ]
}
strategy = JsonCssExtractionStrategy(schema)
result = await crawler.arun(
    url="https://example.com/blog",
    config=CrawlerRunConfig(extraction_strategy=strategy)
)
```

### LLM 기반 추출 — Ollama로 완전 무료

[공식 문서](https://github.com/unclecode/crawl4ai?tab=readme-ov-file)에 따르면 기본 크롤링과 마크다운 생성에는 API 키가 필요 없습니다. LLM은 LLM 기반 추출에만 쓰이며, Crawl4AI 내부적으로 LiteLLM을 사용하므로 프로바이더를 `ollama/`로 지정하면 추출이 완전히 로컬에서 무료로 실행됩니다.

```python
from crawl4ai import AsyncWebCrawler, CrawlerRunConfig, LLMConfig, CacheMode
from crawl4ai.extraction_strategy import LLMExtractionStrategy
from pydantic import BaseModel

class Article(BaseModel):
    title: str
    summary: str

strategy = LLMExtractionStrategy(
    llm_config=LLMConfig(
        provider="ollama/llama3.3",  # 로컬 모델, API 키 불필요
        api_token=None,
    ),
    schema=Article.model_json_schema(),
    instruction="Extract the article title and a one-sentence summary.",
)

async with AsyncWebCrawler() as crawler:
    result = await crawler.arun(
        url="https://example.com/article",
        config=CrawlerRunConfig(
            extraction_strategy=strategy,
            cache_mode=CacheMode.BYPASS,
        )
    )
    print(result.extracted_content)
```

지원 LLM 백엔드는 OpenAI(gpt-4o), Anthropic Claude, Groq/DeepSeek, 로컬 Ollama 모델입니다.

---

## Docker로 MCP + REST API 운영

[공식 릴리스 노트](https://github.com/unclecode/crawl4ai/blob/main/docs/blog/release-v0.9.4.md)에 따르면 Docker 이미지를 실행하면 REST API와 MCP 엔드포인트가 함께 노출되어 Claude Code 같은 AI 도구가 직접 크롤을 호출할 수 있습니다.

```bash
docker pull unclecode/crawl4ai:latest
docker run -d -p 11235:11235 --name crawl4ai \
  --shm-size=1g unclecode/crawl4ai:latest
```

Docker 구현에는 실시간 모니터링 대시보드, 브라우저 풀링(페이지 사전 웜업), 대화형 플레이그라운드, MCP 통합, HTML·스크린샷·PDF·JS 실행 API 엔드포인트가 포함됩니다.

---

## 대안 비교

[공식 README](https://github.com/unclecode/crawl4ai?tab=readme-ov-file)는 Crawl4AI가 대용량 오픈 페이지를 자체 스택에서 볼륨 스크래핑하는 팀에 적합하고, Firecrawl은 서버를 직접 운영하고 싶지 않을 때 적합하다고 설명합니다.

| | Crawl4AI | Firecrawl | Scrapy |
|--|----------|-----------|--------|
| 비용 | 무료 (인프라만) | 페이지당 유료 | 무료 |
| JS 렌더링 | ✅ Playwright | ✅ | ❌ 기본 없음 |
| 로컬 LLM 추출 | ✅ Ollama 연동 | ❌ | ❌ |
| 셀프호스트 | ✅ | ❌ SaaS | ✅ |
| 대규모 분산 | 제한적 | API 의존 | ✅ 강점 |

대규모 분산 크롤에는 Scrapy가 여전히 우세하지만, 렌더링된 페이지의 LLM 파워드 파싱에는 Crawl4AI가 보통 더 빠르게 출시 가능합니다.

---

## 주의사항 및 미확인 사항

- **pip 버전 간격**: [releasealert.dev](https://releasealert.dev/github/unclecode/crawl4ai)의 pip 릴리스 목록과 CHANGELOG의 버전 번호 사이에 간격이 있습니다. `pip install -U crawl4ai` 설치 후 직접 버전을 확인하세요.
- **Cloud API 베타**: 공식 채널에서 Cloud API Closed Beta 예정이 공지된 상태이나, 출시 일정·가격은 2026-11-11 기준 미확인입니다.
- **코드 예시 미검증**: 본 글의 코드 예시는 공식 문서 패턴을 기반으로 작성했으며 필자가 직접 실행하지 않았습니다. 실행 전 공식 문서와 대조하세요.

---

## 정리

Crawl4AI는 RAG 파이프라인의 첫 단계, 즉 "웹에서 깨끗한 텍스트 가져오기"를 비용 없이 해결합니다. CSS 추출로 구조화 JSON을, Ollama 연동으로 완전 로컬 LLM 파싱을, Docker MCP로 AI 도구 직접 연동을 지원합니다. 단, Docker API 셀프호스트 환경에서는 보안 릴리스가 집중되어 있으므로 최신 버전 유지가 필수입니다.

**다음 단계**: Crawl4AI로 수집한 마크다운을 Dify에 연결해 RAG 챗봇을 완성하는 흐름을 시도해보세요.


## 참고 자료
- [참고 자료 1](https://hatchworks.com/blog/ai-agents/n8n-guide/)
- [참고 자료 2](https://github.com/n8n-io)
- [참고 자료 3](https://www.bitdoze.com/n8n-self-host-workflow-automation/)
- [참고 자료 4](https://github.com/n8n-io/n8n)
- [참고 자료 5](https://www.frankx.ai/blog/ultimate-n8n-workflow-2026)
- [참고 자료 6](https://tech-insider.org/n8n-tutorial-workflow-automation-complete-guide-2026/)
- [참고 자료 7](https://www.codmaker.com/blog/n8n-workflow-automation-complete-guide)
- [참고 자료 8](https://lvato.com/blog/self-hosting-n8n-guide/)
- [참고 자료 9](https://nextgrowth.ai/what-is-n8n/)
- [참고 자료 10](https://scrapeops.io/web-scraping-playbook/best-ai-web-scraping-tools/)
- [참고 자료 11](https://dev.to/devstackcommunity/best-ai-web-scraper-tools-in-2026-i-tested-7-these-are-worth-it-n2e)
- [참고 자료 12](https://www.scrapingbee.com/blog/crawl4ai/)
- [참고 자료 13](https://proxidize.com/blog/crawl4ai/)
- [참고 자료 14](https://scrapfly.io/blog/posts/crawl4AI-explained)
- [참고 자료 15](https://webscraping.cc/blog/crawl4ai-guide/)
- [참고 자료 16](https://dibi8.com/resources/llm-frameworks/crawl4ai-tutorial-llm-ready-web-scraping-2026/)
- [참고 자료 17](https://localaimaster.com/blog/crawl4ai-setup-guide)
- [참고 자료 18](https://webscraping.cc/tool/crawl4ai/)
- [참고 자료 19](https://modal.com/resources/best-serverless-gpu-platforms-inference)
- [참고 자료 20](https://modal.com/resources/best-serverless-gpu-platforms-model-training)
- [참고 자료 21](https://www.subconscious.dev/providers/modal)
- [참고 자료 22](https://aitrendtool.com/tools/modal)
- [참고 자료 23](https://pythondatabench.com/article/modal-python-serverless-gpu-ml-2026)
- [참고 자료 24](https://doolpa.com/article/modal)
- [참고 자료 25](https://itirupati.com/modal/)
- [참고 자료 26](https://pristren.com/blog/modal-gpu-serverless-ml/)
- [참고 자료 27](https://gpuhosted.com/en/modal-serverless-guide/)
- [참고 자료 28](https://github.com/unclecode/crawl4ai/blob/main/CHANGELOG.md)
- [참고 자료 29](https://releasealert.dev/github/unclecode/crawl4ai)
- [참고 자료 30](https://github.com/unclecode/crawl4ai/blob/main/docs/blog/release-v0.9.4.md)
- [참고 자료 31](https://github.com/unclecode/crawl4ai/blob/main/docs/blog/release-v0.8.0.md)
- [참고 자료 32](https://github.com/XavieraWood/dsh-u-20261026-unclecode__crawl4ai)
- [참고 자료 33](https://github.com/Link-Start/crawl4ai_unclecode)
- [참고 자료 34](https://github.com/unclecode/crawl4ai?tab=readme-ov-file)
- [참고 자료 35](https://github.com/unclecode/crawl4ai/releases/tag/v0.7.5)
- [참고 자료 36](https://www.aiagent.club/p/github/unclecode/crawl4ai/)

커버 이미지: [Robin Fensom](https://commons.wikimedia.org/w/index.php?curid=138494876) · [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.
