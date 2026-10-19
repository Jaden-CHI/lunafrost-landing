---
title: Markdown 블로그 초안이 공개되지 않게 막는 법
slug: markdown-blog-draft-publication-guard
date: '2026-10-08'
category: App Dev
tags:
  - Markdown
  - Next.js
  - 블로그
  - 테스트
description: Markdown 기반 블로그에서 공개 여부를 엄격하게 검사하고 목록·상세 페이지·사이트맵이 같은 규칙을 따르도록 구성하는 방법입니다.
published: true
automated: true
recoveredAt: '2026-10-19T04:55:35.603Z'
cover: /images/posts/markdown-blog-draft-publication-guard/commons-85252170.webp
coverAlt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
coverCredit:
  author: tony_duell
  title: Microprocessor PCB fitted
  source: 'https://commons.wikimedia.org/w/index.php?curid=85252170'
  license: CC BY 2.0
  licenseUrl: 'https://creativecommons.org/licenses/by/2.0/'
  alt: AI와 기술 관련 공유 자료 이미지 (제품 화면 아님)
  provider: Wikimedia Commons / Openverse
  imageId: a05868b8-4246-40c6-b915-669b4adcdee2
  originalUrl: >-
    https://upload.wikimedia.org/wikipedia/commons/4/45/Microprocessor_PCB_fitted.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=original
  originalHash: 7e4f3dabf03dea7db72f6b8574508b05e205a3c8b4c7a08644f0c480b3636a27
  verifiedAt: '2026-10-19T04:55:35.603Z'
  originalArtist: tony_duell
  changes: Resized and converted to WebP
---
## TL;DR

- 공개 상태는 제목이나 파일 경로가 아니라 명확한 메타데이터로 관리합니다.
- 목록에서만 초안을 숨기면 주소를 아는 사람이 상세 페이지에 접근할 수 있습니다.
- 문자열과 불리언을 구별하는 검증을 테스트에 포함해야 합니다.

## 파일이 있다고 공개된 글은 아닙니다

Markdown 블로그는 별도 데이터베이스 없이도 운영할 수 있습니다. 파일 앞부분의 메타데이터에 제목, 날짜, 슬러그, 공개 여부를 기록하고 본문과 함께 버전 관리합니다. [gray-matter](https://github.com/jonschlinkert/gray-matter)는 이런 frontmatter를 데이터와 본문으로 나누는 데 사용하는 도구입니다.

하지만 파일을 읽을 수 있다는 사실과 독자에게 공개해도 된다는 판단은 다릅니다. 초안, 검토 중인 글, 발행 완료 글을 같은 폴더에 저장한다면 읽기 단계에서 공개 조건을 분명히 적용해야 합니다.

```yaml
title: 검토 중인 글
slug: draft-example
date: '2026-10-08'
published: false
```

## 참인지 엄격하게 비교하기

JavaScript에서 문자열은 비어 있지 않으면 참으로 평가됩니다. 따라서 `published` 값이 실수로 문자열 `"false"`로 들어갔을 때 단순 조건문을 쓰면 초안이 노출될 수 있습니다. 공개 값은 불리언 `true`만 허용하는 편이 분명합니다.

```javascript
function isPublished(metadata) {
  return metadata.published === true;
}
```

값이 빠졌거나 문자열이면 기본적으로 비공개로 처리합니다. 작성 단계에서는 자료형 오류를 검출하고, 읽기 단계에서는 공개 조건을 좁게 적용하는 두 장치를 함께 두면 실수에 강해집니다.

## 목록과 상세 페이지를 함께 검사하기

목록에서 초안을 제거해도 상세 페이지가 파일명을 기준으로 그대로 열어 준다면 접근 제어가 완성된 것이 아닙니다. 상세 조회에서도 같은 공개 조건을 적용해야 합니다. Next.js에서는 없는 콘텐츠를 처리하는 [notFound 함수](https://nextjs.org/docs/app/api-reference/functions/not-found)를 사용할 수 있습니다.

목록, 상세, 검색 결과, 사이트맵, 피드가 각각 독립적으로 파일을 읽으면 규칙이 달라지기 쉽습니다. 가능하면 공통 공개 필터를 사용하고, 각 출력 경로가 초안 데이터를 받지 않도록 구성합니다. 미리보기 화면은 공개 사이트와 분리하고 별도 인증을 둡니다.

## 최소 테스트 네 가지

첫째, `published: true`인 글만 목록에 나타나야 합니다. 둘째, `false`와 누락 값은 비공개여야 합니다. 셋째, 문자열 `"true"`나 `"false"`는 잘못된 입력으로 처리해야 합니다. 넷째, 초안의 슬러그를 직접 요청해도 본문이 노출되지 않아야 합니다.

공개 상태를 바꾼 뒤에는 배포 방식도 확인해야 합니다. 정적 빌드에 포함된 글이라면 파일만 수정하고 배포하지 않은 상태에서 화면이 바뀌기를 기대할 수 없습니다. 변경 커밋, 빌드 결과, 실제 상세 페이지를 순서대로 확인하는 습관이 도움이 됩니다.

이 원칙은 초안을 숨기는 기능에만 해당하지 않습니다. 자동화가 잘못된 메타데이터를 만들더라도 검증되지 않은 글이 바로 공개되지 않도록 하는 마지막 방어선이기도 합니다.

커버 이미지: [tony\_duell](https://commons.wikimedia.org/w/index.php?curid=85252170) · [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). 자료 이미지이며 제품 화면은 아닙니다. 크기 조정 및 WebP 변환.
