---
title: "Supabase로 백엔드 없이 풀스택 앱 만들기"
slug: "fullstack-app-without-backend-with-supabase"
date: "2026-08-10"
category: "App Dev"
tags: ["Supabase", "풀스택", "백엔드리스", "PostgreSQL", "인증"]
description: "Supabase를 활용해 별도의 백엔드 서버 없이 인증, 데이터베이스, 실시간 기능까지 갖춘 풀스택 앱을 구축하는 방법을 단계별로 알아봅니다."
cover: ""
published: true
---

# Supabase로 백엔드 없이 풀스택 앱 만들기

"백엔드를 직접 짜야 한다"는 생각이 사이드 프로젝트의 발목을 잡은 경험, 한 번쯤 있지 않으신가요? Express 서버 세팅, 인증 로직 구현, DB 스키마 설계... 시작도 전에 지쳐버리는 그 느낌. Supabase는 바로 그 문제를 정면으로 해결합니다.

## Supabase란 무엇인가

Supabase는 **오픈소스 Firebase 대안**으로 불리지만, 내부적으로는 PostgreSQL 기반입니다. 즉, NoSQL이 아닌 진짜 관계형 DB를 사용하면서도 Firebase처럼 클라이언트에서 직접 호출할 수 있는 API를 제공합니다.

핵심 기능을 정리하면 다음과 같습니다:

- **Database** — PostgreSQL 기반의 완전한 관계형 DB
- **Auth** — 이메일/소셜 로그인, JWT 기반 인증 내장
- **Storage** — S3 호환 파일 스토리지
- **Realtime** — WebSocket 기반 실시간 데이터 구독
- **Edge Functions** — Deno 기반 서버리스 함수

이 모든 것이 하나의 프로젝트 대시보드에서 관리됩니다.

## 프로젝트 초기 설정

Supabase 대시보드에서 새 프로젝트를 생성하면 즉시 PostgreSQL DB와 API 엔드포인트가 준비됩니다. 클라이언트 SDK 설치는 단 한 줄이면 충분합니다.

```bash
npm install @supabase/supabase-js
```

클라이언트 초기화도 간단합니다:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

환경변수 두 개만 있으면 프론트엔드에서 DB와 직접 통신할 준비가 완료됩니다.

## 인증 구현: 10줄 이하로 끝내기

전통적인 방식이라면 JWT 발급 로직, 리프레시 토큰 관리, 미들웨어 설정까지 수십 줄의 코드가 필요합니다. Supabase에서는 다릅니다:

```typescript
// 회원가입
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123'
})

// 로그인
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
})

// 현재 유저 확인
const { data: { user } } = await supabase.auth.getUser()
```

소셜 로그인(Google, GitHub 등)도 `provider` 파라미터 하나로 처리됩니다. 세션은 자동으로 로컬스토리지에 관리되며, SSR 환경에서는 `@supabase/ssr` 패키지로 쿠키 기반 처리가 가능합니다.

## Row Level Security: 보안은 DB 레벨에서

백엔드 없이 클라이언트가 DB에 직접 접근한다는 게 불안하게 느껴질 수 있습니다. 여기서 **RLS(Row Level Security)** 가 핵심 역할을 합니다.

예를 들어, 사용자가 자신의 데이터만 읽을 수 있도록 정책을 설정할 수 있습니다:

```sql
-- 본인 데이터만 조회 허용
CREATE POLICY "users can view own data"
  ON posts FOR SELECT
  USING (auth.uid() = user_id);
```

이 한 줄의 SQL 정책으로 서버 미들웨어 없이도 데이터 접근 제어가 완성됩니다. RLS를 활성화하면 anon key가 노출되더라도 권한 없는 데이터 접근은 DB 레벨에서 차단됩니다.

## 실시간 기능 구현

채팅, 협업 툴, 라이브 대시보드 같은 기능도 추가 인프라 없이 구현할 수 있습니다:

```typescript
const channel = supabase
  .channel('messages')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'messages' },
    (payload) => {
      console.log('새 메시지:', payload.new)
    }
  )
  .subscribe()
```

PostgreSQL의 변경 이벤트를 WebSocket으로 구독하는 구조입니다. DB에 데이터가 삽입되는 순간 연결된 모든 클라이언트에 실시간으로 전파됩니다.

## 언제 Supabase가 최선의 선택인가

Supabase가 모든 상황의 정답은 아닙니다. 복잡한 비즈니스 로직이나 대규모 트랜잭션 처리가 필요하다면 여전히 전용 백엔드가 필요할 수 있습니다. 그러나 다음 시나리오라면 Supabase는 압도적으로 효율적입니다:

- **빠른 MVP 검증**이 필요한 사이드 프로젝트
- 1인 개발자 또는 소규모 팀의 SaaS 제품
- 관계형 데이터 모델이 필요한 앱
- 실시간 기능이 포함된 협업 도구

인프라 고민 없이 아이디어를 코드로 빠르게 옮기고 싶다면, Supabase는 현재 존재하는 가장 강력한 도구 중 하나입니다. 백엔드를 직접 짜는 시간을 아껴 실제 사용자 가치를 만드는 데 집중하세요.
