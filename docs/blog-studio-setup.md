# Blog Studio 설정

관리자 주소: `https://moonyth.app/admin/blog`

## 1. GitHub OAuth App

GitHub `Settings > Developer settings > OAuth Apps > New OAuth App`에서 생성합니다.

- Application name: `lunafrost Blog Studio`
- Homepage URL: `https://moonyth.app`
- Authorization callback URL: `https://moonyth.app/api/studio/auth/callback`

발급된 Client ID와 Client Secret을 Vercel 환경변수로 등록합니다.

## 2. 저장소 전용 토큰

GitHub `Settings > Developer settings > Personal access tokens > Fine-grained tokens`에서 토큰을 생성합니다.

- Repository access: `Jaden-CHI/lunafrost-landing`만 선택
- Repository permissions > Contents: `Read and write`
- 그 외 권한은 추가하지 않음

## 3. Vercel 환경변수

Production, Preview, Development에 아래 값을 등록하고 재배포합니다.

```text
GITHUB_OAUTH_CLIENT_ID=
GITHUB_OAUTH_CLIENT_SECRET=
STUDIO_SESSION_SECRET=
STUDIO_ALLOWED_GITHUB_LOGIN=Jaden-CHI
GITHUB_CONTENT_TOKEN=
GITHUB_REPO_OWNER=Jaden-CHI
GITHUB_REPO_NAME=lunafrost-landing
GITHUB_BRANCH=main
```

`STUDIO_SESSION_SECRET`은 최소 32바이트의 무작위 문자열을 사용합니다.

```bash
openssl rand -base64 32
```

## 작동 방식

- GitHub OAuth는 관리자 신원 확인에만 사용합니다.
- 저장소 전용 토큰은 서버 환경변수에만 보관하며 브라우저로 전달하지 않습니다.
- 임시저장과 발행 모두 Markdown 파일로 GitHub에 커밋됩니다.
- `published: false`인 글은 공개 블로그에서 제외됩니다.
- 발행 커밋 이후 Vercel이 자동으로 새 버전을 배포합니다.
