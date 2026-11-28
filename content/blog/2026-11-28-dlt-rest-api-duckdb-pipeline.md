---
title: dlt로 REST API를 DuckDB에 5분 만에 연결하기
slug: dlt-rest-api-duckdb-pipeline
date: '2026-11-28'
category: App Dev
tags:
  - dlt
  - 데이터파이프라인
  - DuckDB
  - REST API
  - Python
  - ELT
  - 오픈소스
description: >-
  오픈소스 Python 라이브러리 dlt로 REST API 데이터를 DuckDB에 적재하는 파이프라인을 구성하는 방법을 공식 문서 기준으로
  정리했습니다.
cover: /images/posts/daily-2026-11-28/commons-64417238.webp
published: true
automated: true
sources:
  - 'https://kanerika.com/blogs/open-source-etl-tools/'
  - 'https://www.dataexpert.io/blog/open-source-etl-tools-comparison-guide-2026'
  - 'https://kestra.io/resources/data/free-etl-tools'
  - >-
    https://medium.com/@natakuz_77617/25-best-etl-tools-reviewed-for-2026-open-source-paid-4fd39e0b0644
  - 'https://getbruin.com/blog/best-open-source-elt-tools-2026/'
  - >-
    https://geekchamp.com/12-best-open-source-etl-tools-for-data-integration-in-2026/
  - 'https://kestra.io/resources/data/open-source-etl-tool'
  - 'https://fastero.com/blog/best-open-source-etl-tools-2026'
  - 'https://opensourcetools.org/category/etl-tools/'
  - 'https://apify.com/reverend_sal/pdf-to-markdown/api/cli'
  - 'https://lobehub.com/skills/neversight-skills_feed-pdf-to-markdown'
  - 'https://pypi.org/project/pdf-to-markdown-cli/'
  - >-
    https://www.blog.brightcoding.dev/2026/09/24/markpdfdownmarkpdfdown-llm-powered-pdf-to-markdown-conversion
  - 'https://github.com/M1ck4/pdfmd'
  - 'https://github.com/PSPDFKit/pdf-to-markdown'
  - 'https://hnshowcase.com/post/47618274/pdf-to-markdown-cli'
  - 'https://doctomd.com/blog/best-document-to-markdown-converters/'
  - 'https://firecrawl.github.io/pdf-inspector/'
  - 'https://hyperping.com/blog/linux-server-monitoring-guide'
  - 'https://en.wikipedia.org/wiki/XorMon'
  - 'https://dev.co/devops/open-source/wtf'
  - 'https://en.wikipedia.org/wiki/Netdata'
  - 'https://en.wikipedia.org/wiki/Graphite_(software)'
  - 'https://bananana.dev/guides/best-homelab-monitoring-dashboard-2026'
  - 'https://en.wikipedia.org/wiki/Grafana'
  - >-
    https://medium.com/@nurulislamrimon/i-built-a-grafana-style-server-monitoring-dashboard-that-runs-in-the-terminal-274729f7f3b4
  - 'https://awesometui.com/system-monitors'
  - 'https://github.com/phaethon/dlt'
  - 'https://pypi.org/project/dlt-core/'
  - 'https://pypi.org/project/dlt/1.33.0a0/'
  - 'https://github.com/dlt-hub'
  - 'https://github.com/TejasLamba2006/dlt'
  - 'https://github.com/dlt-hub/dlt/releases'
  - 'https://github.com/chenyujia1024/dlt'
  - 'https://github.com/sarthakuwar/dlt'
  - >-
    https://github-com.translate.goog/dlt-hub/dlt?_x_tr_sl=en&_x_tr_tl=pt&_x_tr_hl=pt&_x_tr_pto=tc
  - 'https://www.aipotluck.org/product/marker'
  - 'https://github.com/datalab-to/marker/blob/master/README.md'
  - 'https://localaimaster.com/blog/pdf-to-markdown-local'
  - 'https://pypi.org/project/marker-pdf/'
  - 'https://hysenlabs.com/projects/datalab-to-marker'
  - >-
    https://medium.com/@pankaj_pandey/marker-convert-documents-to-markdown-json-html-quickly-and-accurately-a5afc9aa564e
  - 'https://pdftomdconverter.app/blog/marker-pdf-local-markdown-conversion'
  - 'https://softwarethug.com/posts/marker-pdf-llm-extraction-guide/'
  - 'https://en.wikipedia.org/wiki/Poppler_(software)'
  - 'https://en.wikipedia.org/wiki/ExifTool'
  - 'https://dlthub.com/docs/tutorial/rest-api'
  - 'https://dlthub.com/docs/dlt-ecosystem/verified-sources/rest_api/basic'
  - >-
    https://colab.research.google.com/github/dlt-hub/dlt/blob/master/docs/education/dlt-advanced-course/lesson_1_custom_sources_restapi_source_and_restclient.ipynb
  - 'https://dlthub.com/context/source/bp-rest-api'
  - 'https://dlthub.com/docs/intro'
  - 'https://dlthub.com/docs/general-usage/http/overview'
  - 'https://dlthub.com/context/source/api7'
  - 'https://dlthub.com/docs/tutorial/load-data-from-an-api'
  - 'https://dlthub.com/product/dlt'
  - 'https://dlthub.substack.com/p/dlt-april-24-updates-growing-together'
editorialLane: practical
coverAlt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
coverCredit:
  author: Dylan Speidel
  title: Motherboard in school.jpg
  source: 'https://commons.wikimedia.org/w/index.php?curid=64417238'
  license: CC BY 4.0
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/'
  alt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
  provider: Wikimedia Commons direct
  imageId: commons-64417238
  originalUrl: >-
    https://upload.wikimedia.org/wikipedia/commons/5/53/Motherboard_in_school.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
  originalHash: bc6d8684b6b059cb39e27796c8c19ee0fe68f2972624ebb57fa75376189364e3
  verifiedAt: '2026-11-28T06:15:16.949Z'
  originalArtist: >-
    <a
    href="//commons.wikimedia.org/w/index.php?title=User:Variablepuma&amp;action=edit&amp;redlink=1"
    class="new" title="User:Variablepuma (page does not exist)">Dylan
    Speidel</a>
  changes: Resized and converted to WebP
---
> **TL;DR** `pip install dlt` 한 줄로 설치하고, `dlt init rest_api duckdb`로 프로젝트를 초기화하면 REST API → DuckDB 파이프라인 뼈대가 바로 완성됩니다. 스키마 추론·중첩 정규화·증분 로딩을 자동으로 처리해 주기 때문에, 데이터 적재 보일러플레이트를 직접 짤 필요가 없습니다.

---

## dlt란 무엇인가

[dlt(data load tool)](https://dlthub.com/docs/intro)는 Apache License 2.0으로 배포되는 오픈소스 Python 라이브러리입니다. REST API, SQL 데이터베이스, 클라우드 스토리지, Python 데이터 구조 등 다양한 소스에서 데이터를 추출해 DuckDB, BigQuery, Snowflake, Redshift 등 100개 이상의 목적지(destination)로 적재하는 ELT 파이프라인을 Python 코드 몇 줄로 구성할 수 있게 해 줍니다.

핵심 기능을 한 줄씩 요약하면 다음과 같습니다.

- **스키마·타입 자동 추론**: JSON 응답 구조를 분석해 컬럼 타입을 자동으로 결정합니다.
- **중첩 데이터 정규화**: 배열·객체가 중첩된 JSON을 관계형 테이블로 풀어 줍니다.
- **증분 로딩(incremental loading)**: 마지막으로 처리한 커서 값을 추적해 전체 재적재 없이 신규 데이터만 가져옵니다.
- **스키마 진화(schema evolution)**: API 응답 필드가 늘어나거나 타입이 바뀌어도 파이프라인이 중단되지 않고 스키마를 자동으로 업데이트합니다.

GitHub의 [dlt-hub/dlt](https://github.com/dlt-hub) 리포지터리는 2026년 11월 24일 기준 6,135개의 스타를 기록하고 있습니다.

---

## 준비물

| 항목 | 내용 |
|---|---|
| Python | 3.10 ~ 3.14 |
| 설치 | `pip install dlt` |
| 로컬 목적지 | DuckDB (추가 설정 없음) |
| 클라우드 목적지 | BigQuery, Snowflake 등 (별도 자격증명 필요) |
| API 인증 | `.dlt/secrets.toml`에 토큰 저장 |

로컬에서 바로 시작하려면 DuckDB를 선택하세요. 별도 서버를 띄울 필요 없이 파일 기반으로 동작하기 때문에 프로토타이핑에 적합합니다.

---

## 5분 퀵스타트: GitHub Issues → DuckDB

[공식 REST API 튜토리얼](https://dlthub.com/docs/tutorial/rest-api)을 기반으로 GitHub Issues를 DuckDB에 적재하는 파이프라인을 살펴보겠습니다.

### 1단계: 설치 및 프로젝트 초기화

```bash
pip install dlt

# REST API 소스 + DuckDB 목적지 뼈대 생성
dlt init rest_api duckdb
```

`dlt init` 명령을 실행하면 현재 디렉터리에 `pipeline.py`와 `.dlt/` 설정 폴더가 생성됩니다.

### 2단계: 파이프라인 코드 작성

[공식 문서의 RESTClient 사용 예시](https://dlthub.com/docs/general-usage/http/overview)를 참고해 GitHub Issues를 가져오는 파이프라인을 작성합니다.

```python
import dlt
from dlt.sources.rest_api import RESTAPIConfig, rest_api_resources

@dlt.source
def github_source(repo: str = "dlt-hub/dlt"):
    config: RESTAPIConfig = {
        "client": {
            "base_url": "https://api.github.com/",
            "auth": {
                "type": "bearer",
                "token": dlt.secrets["github_token"],
            },
        },
        "resources": [
            {
                "name": "issues",
                "endpoint": {
                    "path": f"repos/{repo}/issues",
                    "params": {
                        "state": "open",
                        "per_page": 100,
                    },
                },
            }
        ],
    }
    yield from rest_api_resources(config)


def run():
    pipeline = dlt.pipeline(
        pipeline_name="github_issues",
        destination="duckdb",
        dataset_name="github_data",
    )
    load_info = pipeline.run(github_source())
    print(load_info)


if __name__ == "__main__":
    run()
```

### 3단계: 시크릿 설정

`.dlt/secrets.toml` 파일에 GitHub Personal Access Token을 추가합니다.

```toml
[sources]
github_token = "ghp_your_token_here"
```

### 4단계: 실행 및 조회

```bash
python pipeline.py
```

파이프라인이 완료되면 Python에서 바로 결과를 조회할 수 있습니다.

```python
# 결과를 Pandas DataFrame으로 조회
df = pipeline.dataset().issues.df()
print(df.head())
```

[공식 문서](https://dlthub.com/docs/tutorial/load-data-from-an-api)에 따르면 `pipeline.dataset().리소스명.df()` 패턴으로 적재된 테이블을 DataFrame으로 바로 가져올 수 있습니다.

---

## 증분 로딩: 매번 전체를 다시 가져오지 않으려면

매 실행마다 Issues 전체를 다시 받으면 API 호출 한도를 금방 소모합니다. dlt의 증분 로딩을 적용하면 마지막 `updated_at` 이후의 데이터만 가져올 수 있습니다.

```python
"resources": [
    {
        "name": "issues",
        "endpoint": {
            "path": f"repos/{repo}/issues",
            "params": {
                "state": "all",
                "sort": "updated",
                "direction": "desc",
                "per_page": 100,
                "since": {
                    "type": "incremental",
                    "cursor_path": "updated_at",
                    "initial_value": "2024-01-01T00:00:00Z",
                },
            },
        },
    }
],
```

[공식 REST API 소스 문서](https://dlthub.com/docs/dlt-ecosystem/verified-sources/rest_api/basic)에 따르면 `RESTAPIConfig`의 `params` 안에 `type: "incremental"`을 선언하는 것만으로 커서 추적이 활성화됩니다.

---

## 페이지네이션은 자동

GitHub API처럼 Link 헤더로 페이지를 넘기는 API는 dlt가 자동으로 처리합니다. [공식 문서](https://dlthub.com/docs/tutorial/rest-api)에 따르면 `RESTClient`의 `paginate()` 메서드가 모든 페이지를 순회하며 결과를 yield하므로, 별도로 페이지 루프를 짤 필요가 없습니다.

---

## 배포 옵션과 비용

**라이브러리 자체**는 Apache 2.0, 무료입니다. **DuckDB 목적지** 역시 무료입니다.

Python이 실행되는 곳이라면 어디든 dlt를 올릴 수 있습니다. Airflow DAG 안에 파이프라인을 넣거나, AWS Lambda·Cloud Run 같은 서버리스 환경에서 스케줄 실행하는 패턴이 모두 지원됩니다.

**클라우드 목적지**(BigQuery, Snowflake 등)를 사용할 경우 각 목적지의 자체 과금이 적용됩니다. 2026년 3월에 런칭된 관리형 플랫폼 **dltHub**도 있으나, 현재 공개된 가격표를 확인하지 못했습니다. 필요하다면 [dlthub.com](https://dlthub.com/product/dlt) 공식 사이트에서 직접 확인하세요.

---

## 대안 도구와의 비교

| 도구 | 특징 |
|---|---|
| **dlt** | Python 코드 중심, 스키마 자동 추론, 경량 |
| **Meltano** | Singer tap/target 기반, CLI + 오케스트레이션 포함 |
| **Sling** | 단일 바이너리, DB 간 복제에 특화 |
| **Apache Airflow** | 워크플로 오케스트레이터, ETL 파이프라인의 사실상 표준 |

dlt는 Airflow의 대체재가 아니라 Airflow DAG 안에서 적재 로직을 담당하는 레이어로 함께 쓰는 패턴이 일반적입니다.

---

## 활용 아이디어

- **Notion API → DuckDB**: 작업 데이터베이스를 로컬로 적재해 SQL로 분석
- **사내 REST API → BigQuery**: CI/CD 파이프라인에 연결해 자동 동기화
- **GitHub Issues → Snowflake**: 증분 동기화로 이슈 트래킹 대시보드 구성
- **중첩 JSON API**: 복잡한 중첩 구조도 자동 정규화되므로 별도 변환 코드 불필요

---

dlt는 "데이터를 어딘가에 넣어야 하는데 파이프라인 보일러플레이트를 짜고 싶지 않다"는 상황에 딱 맞는 도구입니다. 특히 DuckDB와 조합하면 클라우드 없이도 로컬에서 빠르게 프로토타입을 돌려볼 수 있어, 개인 프로젝트나 초기 탐색 단계에서 진입 장벽이 낮습니다.


## 참고 자료
- [참고 자료 1](https://kanerika.com/blogs/open-source-etl-tools/)
- [참고 자료 2](https://www.dataexpert.io/blog/open-source-etl-tools-comparison-guide-2026)
- [참고 자료 3](https://kestra.io/resources/data/free-etl-tools)
- [참고 자료 4](https://medium.com/@natakuz_77617/25-best-etl-tools-reviewed-for-2026-open-source-paid-4fd39e0b0644)
- [참고 자료 5](https://getbruin.com/blog/best-open-source-elt-tools-2026/)
- [참고 자료 6](https://geekchamp.com/12-best-open-source-etl-tools-for-data-integration-in-2026/)
- [참고 자료 7](https://kestra.io/resources/data/open-source-etl-tool)
- [참고 자료 8](https://fastero.com/blog/best-open-source-etl-tools-2026)
- [참고 자료 9](https://opensourcetools.org/category/etl-tools/)
- [참고 자료 10](https://apify.com/reverend_sal/pdf-to-markdown/api/cli)
- [참고 자료 11](https://lobehub.com/skills/neversight-skills_feed-pdf-to-markdown)
- [참고 자료 12](https://pypi.org/project/pdf-to-markdown-cli/)
- [참고 자료 13](https://www.blog.brightcoding.dev/2026/09/24/markpdfdownmarkpdfdown-llm-powered-pdf-to-markdown-conversion)
- [참고 자료 14](https://github.com/M1ck4/pdfmd)
- [참고 자료 15](https://github.com/PSPDFKit/pdf-to-markdown)
- [참고 자료 16](https://hnshowcase.com/post/47618274/pdf-to-markdown-cli)
- [참고 자료 17](https://doctomd.com/blog/best-document-to-markdown-converters/)
- [참고 자료 18](https://firecrawl.github.io/pdf-inspector/)
- [참고 자료 19](https://hyperping.com/blog/linux-server-monitoring-guide)
- [참고 자료 20](https://en.wikipedia.org/wiki/XorMon)
- [참고 자료 21](https://dev.co/devops/open-source/wtf)
- [참고 자료 22](https://en.wikipedia.org/wiki/Netdata)
- [참고 자료 23](https://en.wikipedia.org/wiki/Graphite_(software))
- [참고 자료 24](https://bananana.dev/guides/best-homelab-monitoring-dashboard-2026)
- [참고 자료 25](https://en.wikipedia.org/wiki/Grafana)
- [참고 자료 26](https://medium.com/@nurulislamrimon/i-built-a-grafana-style-server-monitoring-dashboard-that-runs-in-the-terminal-274729f7f3b4)
- [참고 자료 27](https://awesometui.com/system-monitors)
- [참고 자료 28](https://github.com/phaethon/dlt)
- [참고 자료 29](https://pypi.org/project/dlt-core/)
- [참고 자료 30](https://pypi.org/project/dlt/1.33.0a0/)
- [참고 자료 31](https://github.com/dlt-hub)
- [참고 자료 32](https://github.com/TejasLamba2006/dlt)
- [참고 자료 33](https://github.com/dlt-hub/dlt/releases)
- [참고 자료 34](https://github.com/chenyujia1024/dlt)
- [참고 자료 35](https://github.com/sarthakuwar/dlt)
- [참고 자료 36](https://github-com.translate.goog/dlt-hub/dlt?_x_tr_sl=en&_x_tr_tl=pt&_x_tr_hl=pt&_x_tr_pto=tc)
- [참고 자료 37](https://www.aipotluck.org/product/marker)
- [참고 자료 38](https://github.com/datalab-to/marker/blob/master/README.md)
- [참고 자료 39](https://localaimaster.com/blog/pdf-to-markdown-local)
- [참고 자료 40](https://pypi.org/project/marker-pdf/)
- [참고 자료 41](https://hysenlabs.com/projects/datalab-to-marker)
- [참고 자료 42](https://medium.com/@pankaj_pandey/marker-convert-documents-to-markdown-json-html-quickly-and-accurately-a5afc9aa564e)
- [참고 자료 43](https://pdftomdconverter.app/blog/marker-pdf-local-markdown-conversion)
- [참고 자료 44](https://softwarethug.com/posts/marker-pdf-llm-extraction-guide/)
- [참고 자료 45](https://en.wikipedia.org/wiki/Poppler_(software))
- [참고 자료 46](https://en.wikipedia.org/wiki/ExifTool)
- [참고 자료 47](https://dlthub.com/docs/tutorial/rest-api)
- [참고 자료 48](https://dlthub.com/docs/dlt-ecosystem/verified-sources/rest_api/basic)
- [참고 자료 49](https://colab.research.google.com/github/dlt-hub/dlt/blob/master/docs/education/dlt-advanced-course/lesson_1_custom_sources_restapi_source_and_restclient.ipynb)
- [참고 자료 50](https://dlthub.com/context/source/bp-rest-api)
- [참고 자료 51](https://dlthub.com/docs/intro)
- [참고 자료 52](https://dlthub.com/docs/general-usage/http/overview)
- [참고 자료 53](https://dlthub.com/context/source/api7)
- [참고 자료 54](https://dlthub.com/docs/tutorial/load-data-from-an-api)
- [참고 자료 55](https://dlthub.com/product/dlt)
- [참고 자료 56](https://dlthub.substack.com/p/dlt-april-24-updates-growing-together)

커버 이미지: [Dylan Speidel](https://commons.wikimedia.org/w/index.php?curid=64417238) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.
