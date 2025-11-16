# daebakcore - 대박코아 관리 시스템

**React 19 + TypeScript 기반 웹사이트 기초 구조**

## 개요

daebakcore는 관리자 인증 시스템을 포함한 모던 웹 애플리케이션의 기초 구조입니다.
Context API 기반 인증, 라우팅 보호, 반응형 레이아웃을 제공합니다.

## 주요 기능

- **관리자 로그인**: 고정 계정 (admin/admin1234)으로 로그인
- **Context API 기반 인증**: 전역 상태 관리를 통한 사용자 인증 처리
- **라우팅 보호**: ProtectedRoute로 인증된 사용자만 대시보드 접근 가능
- **대시보드 레이아웃**: 헤더, 사이드바, 메인 콘텐츠 3단 레이아웃
- **모바일 반응형**: Tailwind CSS로 구현한 완전한 반응형 디자인
- **입력 유효성 검사**: 이메일 형식, 비밀번호 길이 검증

## 기술 스택

| 기술 | 버전 | 설명 |
|------|------|------|
| React | 19.2.0 | UI 라이브러리 |
| TypeScript | 5.9.3 | 타입 안전성 |
| Tailwind CSS | 4.1.17 | 유틸리티 CSS 프레임워크 |
| Vite | 7.2.2 | 빌드 도구 |
| React Router | 7.9.6 | 라우팅 |
| Jest | 29.7.0 | 테스트 프레임워크 |

## 설치 방법

### 사전 요구사항
- Node.js 18 이상
- npm 10 이상

### 설치 단계

```bash
# 1. 프로젝트 클론
git clone <repository-url>
cd daebakcore

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev
```

개발 서버는 `http://localhost:5173`에서 실행됩니다.

## 사용 방법

### 로그인

1. 브라우저에서 http://localhost:5173 접속
2. 로그인 페이지에서 다음 계정으로 로그인:
   - **ID**: admin
   - **비밀번호**: admin1234
3. 로그인 성공 시 대시보드로 리다이렉트

### 로그아웃

헤더의 "로그아웃" 버튼을 클릭하여 로그아웃

## 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm build

# 빌드 결과 미리보기
npm run preview

# 테스트 실행
npm test

# 테스트 감시 모드
npm run test:watch

# 커버리지 리포트 생성
npm run test:coverage

# 타입 검사
npm run type-check

# 코드 린트
npm run lint
```

## 테스트

### 테스트 프레임워크

- **Jest**: 테스트 러너
- **React Testing Library**: 컴포넌트 테스트 유틸리티

### 테스트 실행

```bash
# 모든 테스트 실행
npm test

# 커버리지 리포트 생성
npm run test:coverage
```

### 테스트 커버리지

현재 테스트 커버리지: **88.64%**

| 메트릭 | 달성도 |
|--------|-------|
| 구문(Statements) | 88.64% |
| 분기(Branches) | 80.30% |
| 함수(Functions) | 91.42% |
| 라인(Lines) | 88.02% |

목표 커버리지: 85% 이상 (달성 완료)

## 프로젝트 구조

```
daebakcore/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── LoginForm.tsx          # 로그인 폼 컴포넌트
│   │   │   └── ProtectedRoute.tsx     # 보호된 라우트
│   │   └── Layout/
│   │       ├── MainLayout.tsx         # 메인 레이아웃
│   │       ├── Header.tsx             # 헤더
│   │       └── Sidebar.tsx            # 사이드바
│   ├── context/
│   │   └── AuthContext.tsx            # 인증 Context
│   ├── pages/
│   │   ├── LoginPage.tsx              # 로그인 페이지
│   │   ├── DashboardPage.tsx          # 대시보드 페이지
│   │   └── NotFoundPage.tsx           # 404 페이지
│   ├── types/
│   │   └── auth.ts                    # 인증 타입 정의
│   ├── utils/
│   │   ├── constants.ts               # 애플리케이션 상수
│   │   └── validation.ts              # 입력값 유효성 검사
│   ├── __tests__/                     # 테스트 파일
│   ├── App.tsx                        # 루트 컴포넌트
│   └── main.tsx                       # 엔트리 포인트
├── docs/                              # 문서
├── public/                            # 정적 파일
├── dist/                              # 빌드 결과
├── coverage/                          # 테스트 커버리지
└── package.json                       # 프로젝트 설정
```

## 개발 가이드라인

### 코드 스타일

- **TypeScript**: 모든 코드에 타입 지정 (tsconfig.json strict 모드)
- **컴포넌트**: 함수형 컴포넌트 + Hooks 사용
- **스타일링**: Tailwind CSS 유틸리티 클래스
- **네이밍**: PascalCase (컴포넌트), camelCase (함수/변수)

### 컴포넌트 작성 규칙

1. 모든 컴포넌트에 JSDoc 주석 작성
2. Props 타입을 인터페이스로 정의
3. 재사용 가능한 구조로 설계
4. 단위 테스트 필수 (coverage 85% 이상)

### 테스트 작성 규칙

1. 사용자 관점의 테스트 (React Testing Library)
2. 각 컴포넌트별 테스트 파일 생성
3. AC(Acceptance Criteria) 기반 테스트
4. 엣지 케이스 테스트 포함

## 문서

- [아키텍처 가이드](./docs/ARCHITECTURE.md) - 시스템 구조 및 설계
- [API/Context 문서](./docs/API.md) - AuthContext 및 타입 정의
- [컴포넌트 가이드](./docs/COMPONENTS.md) - 주요 컴포넌트 설명
- [개발 환경 설정](./docs/SETUP.md) - 개발 환경 구축
- [테스트 가이드](./docs/TESTING.md) - 테스트 작성 방법

## 향후 계획

### Phase 1: 기본 기능 완성 (완료)
- [x] 로그인/로그아웃 기능
- [x] 인증 시스템 (Context API)
- [x] 라우팅 보호
- [x] 기본 레이아웃
- [x] 입력값 검증

### Phase 2: 백엔드 연결 (계획)
- [ ] JWT 기반 인증 API 연결
- [ ] 사용자 정보 API
- [ ] 에러 핸들링 개선
- [ ] 토큰 갱신 로직

### Phase 3: 기능 확장 (계획)
- [ ] 사용자 프로필 관리
- [ ] 권한 관리 시스템 (RBAC)
- [ ] 다국어 지원
- [ ] 테마 (다크모드) 지원

### Phase 4: 배포 및 최적화 (계획)
- [ ] 프로덕션 빌드 최적화
- [ ] 성능 모니터링
- [ ] 보안 감사
- [ ] CI/CD 파이프라인

## 주요 파일 설명

### 인증 관련

- **AuthContext.tsx**: 전역 인증 상태 관리
  - `login()`: 자격증명 검증 및 로그인 처리
  - `logout()`: 세션 종료
  - `useAuth()`: 인증 정보 접근 훅

- **LoginForm.tsx**: 로그인 입력 폼
  - 이메일, 비밀번호 입력
  - 실시간 유효성 검사
  - 기억하기 옵션

- **ProtectedRoute.tsx**: 인증 라우트 보호
  - 미인증 사용자를 로그인 페이지로 리다이렉트
  - 인증된 사용자만 대시보드 접근 가능

### 레이아웃 관련

- **MainLayout.tsx**: 메인 레이아웃 구조
  - 헤더, 사이드바, 메인 콘텐츠
  - 반응형 디자인 (모바일/데스크톱)

- **Header.tsx**: 상단 헤더
  - 로고, 사용자명 표시
  - 로그아웃 버튼

- **Sidebar.tsx**: 좌측 내비게이션
  - 메뉴 링크
  - 모바일 토글 버튼

## 지원

문제가 발생하거나 질문이 있으신 경우:

1. [이슈](../../issues) 생성
2. 문서 확인: `docs/` 디렉토리
3. 테스트 실행: `npm test`

## 라이센스

프로젝트 라이센스는 LICENSE 파일을 참고하세요.

---

**최종 업데이트**: 2025-11-16
**상태**: 프로덕션 준비 완료
**버전**: 0.0.0
