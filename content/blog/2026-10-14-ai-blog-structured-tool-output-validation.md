---
title: AI 글쓰기 자동화에서 JSON 파싱 오류 줄이기
slug: ai-blog-structured-tool-output-validation
date: '2026-10-14'
category: App Dev
tags:
  - Claude
  - JSON
  - 자동화
  - 검증
description: 코드와 표가 포함된 AI 초안을 안정적으로 저장하기 위해 구조화된 도구 응답과 콘텐츠 검증을 분리하는 방법을 설명합니다.
published: true
automated: true
recoveredAt: '2026-10-19T04:50:29.958Z'
cover: /images/posts/ai-blog-structured-tool-output-validation/commons-115250264.webp
coverAlt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
coverCredit:
  author: >-
    Wang, Tianming, Zhu Chen, Quanliang Shang, Cong Ma, Xiangyu Chen, and Enhua
    Xiao
  title: >-
    The relationship and main types of artificial intelligence, machine learning
    and deep learning
  source: 'https://commons.wikimedia.org/w/index.php?curid=115250264'
  license: CC BY 4.0
  licenseUrl: 'https://creativecommons.org/licenses/by/4.0/'
  alt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
  provider: Wikimedia Commons / Openverse
  imageId: 2e4fcd37-ffbc-4b2c-bdc4-c410607b871c
  originalUrl: >-
    https://upload.wikimedia.org/wikipedia/commons/5/55/The_relationship_and_main_types_of_artificial_intelligence%2C_machine_learning_and_deep_learning.webp?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
  originalHash: 9e91948d6074791a7ee15ae01c9fd3c676fe9890f86f486ab20974431e3c0788
  verifiedAt: '2026-10-19T04:50:29.958Z'
  originalArtist: >-
    Wang, Tianming, Zhu Chen, Quanliang Shang, Cong Ma, Xiangyu Chen, and Enhua
    Xiao
  changes: Resized and converted to WebP
---
## TL;DR

- JSON으로 답하라는 요청만으로는 운영 코드가 기대하는 형식을 항상 얻을 수 없습니다.
- 도구 입력 스키마를 사용하면 본문을 일반 텍스트에서 다시 추출하는 과정을 줄일 수 있습니다.
- 응답 형식 검증과 글 내용의 사실 검증은 별개의 작업입니다.

## 본문에 코드가 들어가면 더 까다로워집니다

블로그 글에는 따옴표, 코드 블록, 여러 줄 문자열이 자주 들어갑니다. 모델이 작성한 JSON 문자열을 그대로 파싱하는 구조에서는 이스케이프 하나가 잘못돼도 전체 글 저장이 실패합니다. Markdown 코드 울타리를 제거하는 정도로 모든 형식 오류가 해결되는 것은 아닙니다.

문제가 생겼을 때 문자열 치환을 계속 덧붙이면 본문의 코드나 인용문까지 훼손할 수 있습니다. 파서를 느슨하게 만드는 것보다 처음부터 구조화된 경로로 데이터를 받는 편이 추적하기 쉽습니다.

## 도구 입력으로 글의 구조 정의하기

[Claude 도구 사용 문서](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)는 도구의 입력 스키마를 정의하고 응답의 도구 호출 블록에서 입력값을 받는 방식을 설명합니다. 글 생성에서는 제목, 슬러그, 설명, 태그, 본문을 하나의 도구 입력으로 정의할 수 있습니다.

예를 들어 제목과 본문은 문자열, 태그는 문자열 배열로 정의하고 필수 항목을 지정합니다. 반환된 객체를 받으면 일반 텍스트를 찾아 코드 울타리를 벗겨내는 단계가 필요 없어집니다. 어떤 모델이 강제 도구 선택을 지원하는지는 [도구 정의 문서](https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools)에서 확인해야 합니다.

## 정상 종료인지 먼저 확인하기

응답에 데이터가 있다는 사실만으로 완료를 판단하면 안 됩니다. 출력 길이 제한으로 중단됐거나 예상한 도구가 호출되지 않았을 수 있습니다. 종료 이유, 도구 이름, 필수 필드 존재 여부를 확인한 뒤 다음 단계로 넘깁니다.

| 검사 | 확인할 내용 |
|---|---|
| 응답 완료 | 예상한 종료 상태인지 |
| 구조 | 제목·본문·태그의 자료형이 맞는지 |
| 파일 경로 | 슬러그가 허용된 문자만 포함하는지 |
| 게시물 중복 | 기존 제목이나 슬러그와 겹치지 않는지 |
| 콘텐츠 | 인용과 코드가 출처에 부합하는지 |

구조 검사는 빠르고 반복 가능하지만, 사실 확인까지 대신하지는 못합니다. 형식이 완벽한 JSON 안에도 잘못된 모델명이나 오래된 가격이 들어갈 수 있습니다.

## 실패한 응답은 복구 자료로 남기기

실패한 경우 원본 응답을 접근이 제한된 복구 산출물로 저장하면 다시 생성하는 비용을 줄일 수 있습니다. 단, API 키나 요청 헤더까지 함께 저장해서는 안 됩니다. 보관 기간을 정하고 공개 콘텐츠 경로와 분리하는 것도 필요합니다.

최종 게시까지는 구조 확인, 사실 확인, 이미지 확인, 빌드 확인을 각각 통과하도록 구성합니다. 어느 단계가 실패했는지 로그에 명확히 남으면 다음 수정이 문자열 추측 작업으로 흐르지 않습니다.

커버 이미지: [Wang, Tianming, Zhu Chen, Quanliang Shang, Cong Ma, Xiangyu Chen, and Enhua Xiao](https://commons.wikimedia.org/w/index.php?curid=115250264) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.
