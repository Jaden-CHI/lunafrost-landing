---
title: "Supabase로 백엔드 없이 풀스택 앱 만들기"
slug: "fullstack-app-without-backend-with-supabase"
date: "2026-09-07"
category: "App Dev"
tags: ["Supabase", "풀스택", "백엔드리스"]
description: "Supabase를 활용하면 별도의 백엔드 서버 없이도 인증, 데이터베이스, 실시간 기능까지 갖춘 풀스택 앱을 구축할 수 있습니다. 실전 예제와 함께 핵심 기능을 파헤칩니다."
cover: ""
published: false
---

# Supabase로 백엔드 없이 풀스택 앱 만들기

백엔드 개발자가 없어도 괜찮습니다. Supabase 하나면 인증부터 데이터베이스, 실시간 구독, 파일 스토리지까지 한 번에 해결됩니다. 오늘은 Supabase가 왜 "오픈소스 Firebase 대항마"로 불리는지, 그리고 실제로 어떻게 활용하는지 살펴봅니다.

---

## Supabase란 무엇인가?

Supabase는 PostgreSQL을 기반으로 한 **BaaS(Backend as a Service)** 플랫폼입니다. Firebase와 달리 오픈소스이며, 실제 SQL 데이터베이스를 사용한다는 점이 핵심 차별점입니다. 복잡한 관계형 쿼리도 그대로 쓸 수 있고, 필요하다면 셀프호스팅도 가능합니다.

제공되는 주요 기능은 다음과 같습니다.

- **Auth** — 이메일, OAuth, Magic Link 인증
- **Database** — PostgreSQL + RESTful API 자동 생성
- **Realtime** — 데이터 변경을 WebSocket으로 구독
- **Storage** — 파일 업로드 및 CDN 제공
- **Edge Functions** — Deno 기반 서버리스 함수

---

## 프로젝트 시작: 5분 셋업

```bash
npm install @supabase/supabase-js
```

클라이언트 초기화는 단 두 줄입니다.

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

Supabase 대시보드에서 프로젝트를 생성하면 URL과 anon key를 즉시 발급받을 수 있습니다. 별도의 서버 설정이 전혀 필요 없습니다.

---

## 인증 구현: 이메일 로그인

```typescript
// 회원가입
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
})

// 로그인
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
})

// 현재 세션 확인
const { data: { session } } = await supabase.auth.getSession()
```

Google, GitHub OAuth도 대시보드에서 토글 하나로 활성화됩니다. 콜백 URL만 등록하면 끝입니다.

---

## 데이터 CRUD: SQL을 몰라도 됩니다

Supabase는 테이블을 생성하는 순간 RESTful API와 타입스크립트 타입을 자동으로 생성합니다.

```typescript
// 데이터 삽입
const { data, error } = await supabase
  .from('posts')
  .insert({ title: '첫 번째 글', content: '내용입니다', user_id: session.user.id })

// 데이터 조회 (필터 포함)
const { data: posts } = await supabase
  .from('posts')
  .select('*, profiles(username)')
  .eq('published', true)
  .order('created_at', { ascending: false })
```

JOIN도 `.select('*, profiles(username)')` 처럼 직관적으로 표현됩니다.

---

## 실시간 구독: 채팅 앱도 간단하게

```typescript
const channel = supabase
  .channel('public:messages')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'messages'
  }, (payload) => {
    console.log('새 메시지:', payload.new)
    setMessages(prev => [...prev, payload.new])
  })
  .subscribe()
```

WebSocket 설정이나 별도 소켓 서버 없이 실시간 채팅, 알림, 협업 기능을 구현할 수 있습니다.

---

## RLS: 보안은 데이터베이스 레벨에서

Supabase의 가장 강력한 ���능 중 하나는 **Row Level Security(RLS)** 입니다. 클라이언트가 anon key를 직접 사용하더라도, 데이터베이스 정책으로 접근을 세밀하게 제어합니다.

```sql
-- 본인 글만 수정 가능하도록 정책 설정
CREATE POLICY "Users can update own posts"
ON posts FOR UPDATE
USING (auth.uid() = user_id);
```

프런트엔드에서 키가 노출되어도 RLS가 데이터를 보호합니다.

---

## 언제 Supabase를 선택해야 할까?

Supabase는 **MVP 개발**, **솔로 개발자**, **빠른 프로토타이핑**에 특히 강력합니다. 복잡한 비즈니스 로직이 필요하다면 Edge Functions로 확장하면 됩니다. 단, 트래픽이 매우 크거나 커스텀 인프라가 필요한 경우에는 셀프호스팅 또는 전통적인 백엔드 아키텍처를 고려해야 합니다.

백엔드를 모른다는 것이 더 이상 핑계가 될 수 없는 시대입니다. Supabase와 함께라면, 아이디어에서 배포까지의 거리가 훨씬 짧아집니다.
