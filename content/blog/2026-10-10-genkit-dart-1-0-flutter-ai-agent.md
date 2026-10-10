---
title: 'Genkit Dart 1.0, Flutter 앱에 AI 에이전트 붙이기'
slug: genkit-dart-1-0-flutter-ai-agent
date: '2026-10-10'
category: App Dev
tags:
  - Genkit
  - Flutter
  - Dart
  - AI Agent
  - pub.dev
  - Human-in-the-loop
description: >-
  2026년 10월 8일 정식 출시된 Genkit Dart 1.0의 핵심 기능과 Flutter 풀스택 AI 앱 개발 패턴을 공식 자료 기반으로
  정리합니다.
cover: /images/posts/genkit-dart-1-0-flutter-ai-agent/developer-workspace.webp
published: true
automated: true
sources:
  - 'https://openai.com/index/devday-2026-recap/'
  - 'https://developers.openai.com/api/docs/changelog'
  - 'https://ai.google.dev/gemini-api/docs/changelog'
  - >-
    https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/
  - 'https://developer.android.com/jetpack/androidx/releases/core'
  - 'https://flutter.dev/blog'
  - 'https://developer.android.com/jetpack/androidx/releases/benchmark'
  - 'https://developers.openai.com/codex/changelog'
  - 'https://openai.com/news/product-releases/'
  - 'https://openai.com/products/release-notes/'
  - 'https://developer.apple.com/news/'
  - 'https://developer.apple.com/news/?id=kkphp5qo'
  - 'https://openai.com/index/introducing-apps-in-chatgpt/'
  - 'https://developer.apple.com/news/releases/'
  - 'https://blog.flutter.dev/flutter-darts-2026-roadmap-89378f17ebbd'
  - 'https://developer.android.com/blog'
  - 'https://developer.android.com/jetpack/androidx/releases/compose-animation'
  - 'https://developer.apple.com/hello/october26/'
  - 'https://developer.android.com/studio/releases'
  - 'https://flutter.dev/blog/flutter-darts-2026-roadmap'
  - 'https://flutter.dev/blog/announcing-genkit-dart-1-0'
  - 'https://dart.dev/blog/announcing-genkit-dart-1-0'
  - >-
    https://dart.dev/blog/announcing-genkit-dart-build-full-stack-ai-apps-with-dart-and-flutter
  - 'https://dart.dev/blog'
  - >-
    https://flutter.dev/blog/rich-and-dynamic-user-interfaces-with-flutter-and-generative-ui
  - 'https://dart.dev/blog/announcing-dart-3-12'
  - 'https://docs.flutter.dev/install/archive'
  - 'https://flutter.dev/blog/whats-new-in-flutter-3-44'
coverAlt: 여러 모니터와 태블릿이 있는 개발 작업환경 사진
coverCredit:
  author: Jakub Zerdzicki
  source: >-
    https://unsplash.com/photos/developer-working-on-multiple-screens-in-a-dark-office-v9iowyOH7QQ
  license: Unsplash License
  licenseUrl: 'https://unsplash.com/license'
  alt: 여러 모니터와 태블릿이 있는 개발 작업환경 사진
---
## TL;DR

Google이 2026년 10월 8일 **Genkit Dart 1.0** 안정 버전을 [공식 발표](https://flutter.dev/blog/announcing-genkit-dart-1-0)했다. Gemini, Claude, OpenAI를 단일 API로 교체할 수 있고, 타입 안전한 flow, Human-in-the-loop 인터럽트, 로컬 개발자 UI까지 갖춘 프로덕션 수준 AI 에이전트 프레임워크가 [pub.dev](https://dart.dev/blog/announcing-genkit-dart-1-0)에서 지금 바로 사용 가능하다.

---

## 왜 지금 Genkit Dart인가

Flutter로 앱을 만드는 개발자라면 AI 기능을 붙이는 순간 딜레마에 빠진다. Python 백엔드를 따로 유지하거나, 각 모델 SDK를 개별 연동하거나, 타입 안전성을 포기하거나. Genkit Dart 1.0은 이 세 가지 문제를 Dart 생태계 안에서 한 번에 해결하려는 시도다.

프리뷰 기간 동안 Flutter·Dart 커뮤니티 피드백을 반영해 API를 다듬었고, 이번 1.0 릴리스는 프로덕션 워크로드를 공식적으로 지원하는 첫 안정 버전이다.

---

## 핵심 기능 4가지

### 1. 단일 API로 멀티 모델 전환

[공식 발표](https://dart.dev/blog/announcing-genkit-dart-1-0)에 따르면 Google Gemini, Anthropic Claude, OpenAI, 그리고 OpenAI 호환 모델을 **애플리케이션 로직 재작성 없이** 교체할 수 있다. 모델을 바꾸고 싶을 때 플러그인 설정만 수정하면 된다.

```dart
// Gemini에서 Claude로 전환할 때 비즈니스 로직은 그대로
final ai = Genkit(plugins: [claude()]); // 또는 gemini(), openai()

final response = await ai.generate(
  model: claudeSonnet,
  prompt: '사용자 요청 내용',
);
```

벤더 락인 없이 비용이나 성능 기준으로 모델을 A/B 테스트하는 워크플로가 자연스럽게 가능해진다.

### 2. 엔드투엔드 타입 안전성과 Flow

`schemantic` 패키지로 데이터 스키마를 Dart에서 한 번 정의하면 구조화된 모델 출력 생성과 서버·클라이언트 간 타입 공유가 된다. AI 로직은 **flow**로 감싸 관찰 가능하게 만든다.

```dart
final summarizeFlow = defineFlow(
  name: 'summarize',
  inputSchema: Schema.string(),
  outputSchema: Schema.object({'summary': Schema.string()}),
  fn: (text) async {
    final result = await ai.generate(prompt: '요약해줘: $text');
    return {'summary': result.text};
  },
);
```

flow 단위로 실행 결과를 추적할 수 있어 디버깅과 모니터링이 훨씬 명확해진다.

### 3. Human-in-the-loop 인터럽트

결제 확인, 민감 정보 처리, 사용자 동의가 필요한 액션에서 에이전트를 멈추고 싶을 때 `defineTool` 내부에서 `.interrupt(...)`를 반환하면 된다. 이후 사용자가 확인하면 중단 지점부터 생성이 재개된다.

```dart
final paymentTool = defineTool(
  name: 'processPayment',
  fn: (amount) async {
    // 사용자 확인이 필요한 경우 인터럽트
    return ToolResult.interrupt(
      message: '${amount}원 결제를 진행할까요?',
      metadata: {'amount': amount},
    );
  },
);
```

자율 에이전트가 임의로 돈을 쓰거나 데이터를 삭제하는 사고를 방지하는 안전망이다. 크리에이터 도구나 커머스 앱에서 특히 유용하다.

### 4. 클라이언트·서버 유연 배포

- `GenkitRouter`: Dart 서버에서 flow 실행
- `defineRemoteAction`: 클라이언트에서 서버 flow 호출
- `defineRemoteModel`: AI 로직은 클라이언트에 두되, 모델 요청은 안전한 백엔드를 통해 라우팅

API 키를 클라이언트에 노출하지 않으면서도 Flutter 앱에서 직접 AI 기능을 호출하는 구조를 만들 수 있다.

---

## 로컬 개발 워크플로

`genkit start` 명령어를 실행하면 로컬 개발자 UI가 뜨고, flow를 직접 실행해보며 실행 트레이스를 검사할 수 있다. 프로덕션에서는 `genkit_otel`로 OpenTelemetry 트레이스와 메트릭을 내보낼 수 있다.

개발 → 검증 → 프로덕션 모니터링까지 하나의 툴체인으로 이어지는 구조다.

---

## 실험적 기능: 상태형 에이전트와 A2UI

`package:genkit/experimental.dart`를 import하면 `defineAgent`, `remoteAgent`로 멀티턴 영속 에이전트를, `genkit_a2ui`로 인터랙티브 네이티브 UI 스트리밍을 시도해볼 수 있다. 아직 실험적 단계이며 정식 출시 일정은 공개되지 않았지만, [공식 블로그](https://flutter.dev/blog/announcing-genkit-dart-1-0)는 조기 사용자 피드백이 API 설계에 반영된다고 밝혔다.

---

## 지금 시작하려면

Genkit Dart 1.0은 pub.dev에서 바로 사용할 수 있다. 공식 레퍼런스는 [dart.dev 블로그](https://dart.dev/blog/announcing-genkit-dart-1-0)와 [flutter.dev 블로그](https://flutter.dev/blog/announcing-genkit-dart-1-0)에 있다. 모델별 API 사용 비용은 각 모델 제공자 정책을 별도로 확인해야 한다.

Flutter 단일 코드베이스로 AI 에이전트 앱을 만들고 싶었다면, 이번 1.0 릴리스가 그 진입점이 될 수 있다.

## 참고 자료
- [공식 자료 1](https://openai.com/index/devday-2026-recap/)
- [공식 자료 2](https://developers.openai.com/api/docs/changelog)
- [공식 자료 3](https://ai.google.dev/gemini-api/docs/changelog)
- [공식 자료 4](https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/)
- [공식 자료 5](https://developer.android.com/jetpack/androidx/releases/core)
- [공식 자료 6](https://flutter.dev/blog)
- [공식 자료 7](https://developer.android.com/jetpack/androidx/releases/benchmark)
- [공식 자료 8](https://developers.openai.com/codex/changelog)
- [공식 자료 9](https://openai.com/news/product-releases/)
- [공식 자료 10](https://openai.com/products/release-notes/)
- [공식 자료 11](https://developer.apple.com/news/)
- [공식 자료 12](https://developer.apple.com/news/?id=kkphp5qo)
- [공식 자료 13](https://openai.com/index/introducing-apps-in-chatgpt/)
- [공식 자료 14](https://developer.apple.com/news/releases/)
- [공식 자료 15](https://blog.flutter.dev/flutter-darts-2026-roadmap-89378f17ebbd)
- [공식 자료 16](https://developer.android.com/blog)
- [공식 자료 17](https://developer.android.com/jetpack/androidx/releases/compose-animation)
- [공식 자료 18](https://developer.apple.com/hello/october26/)
- [공식 자료 19](https://developer.android.com/studio/releases)
- [공식 자료 20](https://flutter.dev/blog/flutter-darts-2026-roadmap)
- [공식 자료 21](https://flutter.dev/blog/announcing-genkit-dart-1-0)
- [공식 자료 22](https://dart.dev/blog/announcing-genkit-dart-1-0)
- [공식 자료 23](https://dart.dev/blog/announcing-genkit-dart-build-full-stack-ai-apps-with-dart-and-flutter)
- [공식 자료 24](https://dart.dev/blog)
- [공식 자료 25](https://flutter.dev/blog/rich-and-dynamic-user-interfaces-with-flutter-and-generative-ui)
- [공식 자료 26](https://dart.dev/blog/announcing-dart-3-12)
- [공식 자료 27](https://docs.flutter.dev/install/archive)
- [공식 자료 28](https://flutter.dev/blog/whats-new-in-flutter-3-44)

커버 이미지: [Jakub Zerdzicki](https://unsplash.com/photos/developer-working-on-multiple-screens-in-a-dark-office-v9iowyOH7QQ) · [Unsplash License](https://unsplash.com/license). 본문 이해를 돕기 위한 자료 이미지입니다.
