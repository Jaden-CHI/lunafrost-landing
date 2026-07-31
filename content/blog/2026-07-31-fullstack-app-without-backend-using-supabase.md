---
title: "Supabase로 백엔드 없이 풀스택 앱 만들기"
slug: "fullstack-app-without-backend-using-supabase"
date: "2026-07-31"
category: "App Dev"
tags: ["Supabase", "풀스택", "백엔드리스"]
description: "Supabase 하나로 인증, 데이터베이스, 실시간 기능까지 — 별도 서버 없이 풀스택 앱을 완성하는 실전 전략을 소개합니다."
cover: ""
published: true
---

# Supabase로 백엔드 없이 풀스택 앱 만들기

"백엔드를 직접 구축하지 않으면 진짜 개발자가 아니다."

한때는 이 말이 맞았다. 하지만 2024년, Supabase는 그 명제를 조용히 무너뜨리고 있다. 인증, 데이터베이스, 파일 스토리지, 실시간 구독까지 — 단 하나의 플랫폼으로 백엔드 서버 없이 프로덕션 수준의 앱을 만드는 시대가 열렸다.

## Supabase란 무엇인가

Supabase는 Firebase의 오픈소스 대안으로 시작했지만, 지금은 그 이상이다. 내부적으로 PostgreSQL을 사용하기 때문에 관계형 데이터 모델링이 가능하고, SQL의 모든 표현력을 그대로 활용할 수 있다. Firebase처럼 NoSQL 구조에 억지로 끼워 ��출 필요가 없다.

핵심 기능을 정리하면 다음과 같다.

- **Auth** — 이메일, OAuth(Google, GitHub 등), Magic Link 지원
- **Database** — PostgreSQL + Row Level Security(RLS)
- **Storage** — 이미지, 파일 업로드 및 CDN 제공
- **Realtime** — DB 변경사항을 WebSocket으로 실시간 구독
- **Edge Functions** — Deno 기반 서버리스 함수

이 모든 것이 하나의 프로젝트 대시보드 안에 통합되어 있다.

## 가장 강력한 기능: Row Level Security

많은 개발자들이 Supabase를 쓰다가 "근데 보안은?"이라는 의문을 품는다. 답은 **Row Level Security(RLS)** 에 있다.

RLS는 PostgreSQL 레벨에서 동작하는 접근 제어 정책이다. 예를 들어 `posts` 테이블에 다음과 같은 정책을 설정할 수 있다.

```sql
CREATE POLICY "사용자는 자신의 글만 수정 가능"
ON posts FOR UPDATE
USING (auth.uid() = user_id);
```

이 한 줄로 서버 미들웨어 없이도 클라이언트가 직접 DB에 접근할 때 권한 제어가 된다. 백엔드 API 레이어를 별도로 만들 필요가 없는 이유가 바로 여기에 있다.

## 실전 패턴: Next.js + Supabase

가장 많이 사용되는 조합은 **Next.js App Router + Supabase JS SDK** 다.

```typescript
// lib/supabase.ts
import { createBrowserClient } from '@supabase/ssr'

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

클라이언트 컴포넌트에서 직접 데이터를 가져오는 것도 가능하지만, 서버 컴포넌트에서 `createServerClient`를 사용하면 SSR 환경에서도 세션 기반 인증이 자연스럽게 연동된다.

실시간 기능도 단 몇 줄이면 구현된다.

```typescript
supabase
  .channel('posts')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, 
    (payload) => console.log('새 게시글:', payload.new)
  )
  .subscribe()
```

채팅 앱, 협업 툴, 알림 시스템을 별도 WebSocket 서버 없이 구현할 수 있다.

## 언제 Edge Functions가 필요한가

모든 로직을 클라이언트에서 처리할 수는 없다. 결제 처리, 외부 API 연동, 민감한 비즈니스 로직은 **Edge Functions**에 위임한다.

Supabase Edge Functions는 Deno 런타임 기반으로 동작하며, 배포 역시 CLI 한 줄이다.

```bash
supabase functions deploy send-welcome-email
```

이 구조는 기존 BFF(Backend for Frontend) 패턴을 대체한다. 굳이 Express 서버를 따로 운영할 필요가 없다.

## 한계를 알고 쓰는 것이 진짜 실력

Supabase가 모든 ��을 해결해주지는 않는다. 복잡한 트랜잭션 처리나 대규모 배치 작업은 여전히 전용 백엔드가 유리하다. 또한 RLS 정책을 잘못 설계하면 오히려 보안 허점이 생긴다.

하지만 **MVP를 빠르게 검증**하거나, **소규모 SaaS**를 혼자 운영해야 하는 상황이라면 Supabase는 현재 존재하는 가장 합리적인 선택지 중 하나다.

백엔드를 직접 만들지 않는 것은 게으름이 아니다. 핵심에 집중하기 위한 전략적 선택이다.
