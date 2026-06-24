---
title: "Supabase로 백엔드 없이 풀스택 앱 만들기"
slug: "fullstack-app-without-backend-supabase"
date: "2026-06-23"
category: "App Dev"
tags: ["Supabase", "풀스택", "백엔드리스"]
description: "Supabase를 활용하면 별도의 백엔드 서버 없이도 인증, 데이터베이스, 스토리지까지 완성된 풀스택 앱을 구축할 수 있습니다. 실전 구조와 핵심 패턴을 정리했습니다."
cover: ""
published: true
---

# Supabase로 백엔드 없이 풀스택 앱 만들기

"백엔드를 따로 짜야 하나?" — 솔직히, 꼭 그럴 필요는 없습니다.

Supabase는 PostgreSQL 기반의 오픈소스 BaaS(Backend as a Service)로, Firebase의 대안으로 자주 언급되지만 실제로 쓰다 보면 훨씬 더 개발자 친화적이라는 걸 느끼게 됩니다. SQL을 그대로 쓸 수 있고, Row Level Security(RLS)로 데이터 접근을 세밀하게 제어할 수 있으며, 실시간 구독까지 기본 제공됩니다.

이 글에서는 Supabase로 실제 풀스택 앱을 만들 때 알아야 할 핵심 구조와 패턴을 정리합니다.

---

## Supabase가 대체하는 것들

기존 풀스택 앱이라면 다음 레이어를 직접 구축해야 했습니다:

- **인증 서버** (JWT 발급, 세션 관리)
- **REST API 또는 GraphQL 서버**
- **데이터베이스 + ORM**
- **파일 스토리지**
- **실시간 이벤트 처리**

Supabase는 이 다섯 가지를 단일 프로젝트 안에서 제공합니다. 프론트엔드(Next.js, React, Flutter 등)에서 Supabase 클라이언트를 직접 호출하면 끝입니다.

---

## 프로젝트 구조 설계

백엔드리스라고 해서 구조가 없는 건 아닙니다. 오히려 **데이터베이스 설계와 RLS 정책이 비즈니스 로직의 핵심**이 됩니다.

```
/app
  /lib
    supabase.ts       ← 클라이언트 초기화
  /hooks
    useAuth.ts        ← 인증 상태 관리
    usePosts.ts       ← 데이터 훅
  /components
    PostList.tsx
    AuthForm.tsx
```

`supabase.ts`는 단순합니다:

```typescript
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

---

## 인증: 10줄로 끝내기

Supabase Auth는 이메일/패스워드, OAuth(GitHub, Google 등), Magic Link를 지원합니다.

```typescript
// 회원가입
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword'
})

// 로그인
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securepassword'
})

// 현재 유저 가져오기
const { data: { user } } = await supabase.auth.getUser()
```

세션은 자동으로 localStorage에 유지되며, `onAuthStateChange`로 상태 변화를 구독할 수 있습니다.

---

## Row Level Security: 진짜 백엔드 로직

RLS는 Supabase의 핵심입니다. 데이터베이스 레벨에서 접근 권한을 정의하기 때문에, 프론트에서 실수로 잘못된 쿼리를 보내도 데이터가 보호됩니다.

```sql
-- 자신의 게시글만 수정 가능
CREATE POLICY "users can update own posts"
ON posts FOR UPDATE
USING (auth.uid() = user_id);

-- 모든 사용자가 공개 게시글 읽기 가능
CREATE POLICY "public posts are visible"
ON posts FOR SELECT
USING (is_public = true);
```

RLS를 잘 설계하면 API 서버에서 하던 권한 검사 로직 대부분을 DB 레벨로 내릴 수 있습니다.

---

## 실시간 구독으로 라이브 기능 추가

채팅, 알림, 협업 기능이 필요하다면 Realtime을 사용합니다:

```typescript
const channel = supabase
  .channel('posts-changes')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'posts'
  }, (payload) => {
    console.log('새 게시글:', payload.new)
  })
  .subscribe()
```

WebSocket 연결이 자동으로 관리되며, 필터 조건도 세밀하게 설정할 수 있습니다.

---

## Edge Functions: 꼭 필요한 서버 로직만

결제 처리, 외부 API 연동처럼 서버에서만 실행해야 하는 로직은 **Supabase Edge Functions**으로 처리합니다. Deno 런타임 기반으로, 필요한 부분만 서버리스 함수로 작성하면 됩니다.

---

## 언제 Supabase가 최선인가

Supabase는 **스타트업 초기 제품, 1인 개발자, 사이드 프로젝트**에 특히 강력합니다. 인프라 관리 없이 빠르게 프로덕션 수준의 앱을 출시할 수 있고, 트래픽이 늘어나도 PostgreSQL의 성능 위에서 수직 확장이 가능합니다.

복잡한 마이크로서비스가 필요한 엔터프라이즈 환경이 아니라면, Supabase 하나로 충분히 멀리 갈 수 있습니다.

> "Don't build a backend. Build a product."

백엔드를 구축하는 데 쓰던 시간을, 이제 사용자 경험을 다듬는 데 쓰세요.
