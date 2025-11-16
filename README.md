# daebakcore - 대박코아 관리 시스템

**React 19 + TypeScript + Bootstrap 5 기반 웹사이트 기초 구조**

## 개요

daebakcore는 Bootstrap 공식 예제 기반의 현대적 UI/UX를 갖춘 관리자 인증 시스템입니다.
Context API 기반 인증, 라우팅 보호, 반응형 레이아웃을 제공하며, Bootstrap Icons를 활용한 시각적 일관성을 유지합니다.

## 주요 기능

- **Bootstrap 기반 로그인**: Bootstrap 5.3 공식 디자인 패턴을 따른 현대적 로그인 UI
- **관리자 인증**: 고정 계정 (admin/admin1234)으로 로그인
- **Context API 기반 인증**: 전역 상태 관리를 통한 사용자 인증 처리
- **라우팅 보호**: ProtectedRoute로 인증된 사용자만 대시보드 접근 가능
- **3단 레이아웃**: Navbar + Sidebar + Content 반응형 레이아웃
- **Bootstrap Icons**: 메뉴 항목의 일관된 아이콘 표시
- **대시보드 통계**: 4개 통계 카드 및 정보 카드 표시
- **모바일 최적화**: xs/md/lg/xl 브레이크포인트 기반 완벽한 반응형 디자인
- **입력 유효성 검사**: 폼 필드 검증 및 오류 메시지
- **높은 테스트 커버리지**: 88.83% (목표: 85%)

## 최근 업데이트 (v1.0.1)

### SPEC-AUTH-LOGIN-UI-REDESIGN-001 완료

2025-11-17에 Bootstrap 기반 로그인/인증 UI 재설계 SPEC이 완료되었습니다.

**구현 내용**:
- LoginPage.tsx: Bootstrap form-control을 사용한 현대적 로그인 페이지
- Navbar.tsx: 프로필 드롭다운 메뉴 및 로그아웃 기능
- Sidebar.tsx: Bootstrap Icons 아이콘 및 활성 메뉴 강조
- DashboardPage.tsx: 4개 통계 카드 및 반응형 그리드 레이아웃
- 접근성 기준: WCAG AA 충족, 색상 대비 4.5:1 이상

**테스트 결과**:
- 테스트 케이스: 117개 (모두 통과)
- 테스트 커버리지: 88.83%
- Acceptance Criteria: 25개 (모두 구현)

## 기술 스택

| 기술 | 버전 | 설명 |
|------|------|------|
| React | 19.2.0 | UI 라이브러리 |
| TypeScript | 5.9.3 | 타입 안전성 |
| Bootstrap | 5.3.8 | UI 프레임워크 |
| React-Bootstrap | 2.10.10 | Bootstrap 컴포넌트 |
| Bootstrap Icons | 1.13.1 | 아이콘 라이브러리 |
| Tailwind CSS | 4.1.17 | 유틸리티 CSS |
| React Router | 7.9.6 | 라우팅 |
| Vite | 7.2.2 | 빌드 도구 |
| Jest | 29.7.0 | 테스트 프레임워크 |
| React Testing Library | 16.3.0 | 컴포넌트 테스트 |

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

두 가지 방법으로 로그아웃 가능:
1. Navbar 오른쪽의 프로필 드롭다운 메뉴에서 로그아웃 선택
2. Navbar의 독립 로그아웃 버튼(빨간색) 클릭

### 대시보드 네비게이션

- **Sidebar**: 좌측 메뉴로 대시보드, 보고서, 설정 페이지 이동
- **반응형 모드**: 모바일 화면에서 햄버거 메뉴(≡) 아이콘으로 Sidebar 토글

## 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

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

현재 테스트 커버리지: **88.83%**

| 메트릭 | 달성도 |
|--------|-------|
| 구문(Statements) | 88.83% |
| 분기(Branches) | 80.64% |
| 함수(Functions) | 86.04% |
| 라인(Lines) | 88.26% |

목표 커버리지: 85% 이상 (달성 완료)

## 프로젝트 구조

```
daebakcore/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── LoginForm.tsx          # 로그인 폼 컴포넌트
│   │   │   ├── LoginForm.test.tsx     # 로그인 폼 테스트
│   │   │   └── ProtectedRoute.tsx     # 보호된 라우트
│   │   └── Layout/
│   │       ├── MainLayout.tsx         # 메인 레이아웃 (3단)
│   │       ├── Navbar.tsx             # 상단 네비게이션
│   │       ├── Sidebar.tsx            # 좌측 메뉴
│   │       └── Header.tsx             # 헤더
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
├── docs/                              # 문서 디렉토리
│   ├── API.md                         # API/Context 문서
│   ├── ARCHITECTURE.md                # 아키텍처 가이드
│   ├── BOOTSTRAP-INTEGRATION.md       # Bootstrap 통합 가이드
│   ├── COMPONENTS.md                  # 컴포넌트 설명
│   ├── TEST-RESULTS.md                # 테스트 결과
│   ├── TESTING.md                     # 테스트 작성 가이드
│   └── SETUP.md                       # 개발 환경 설정
├── .moai/
│   ├── specs/                         # SPEC 문서
│   │   ├── SPEC-AUTH-LOGIN-UI-REDESIGN-001/
│   │   │   ├── spec.md                # SPEC 요구사항
│   │   │   ├── acceptance.md          # 수용 기준
│   │   │   └── plan.md                # 구현 계획
│   │   └── ...
│   ├── docs/                          # 관리 문서
│   └── reports/                       # 동기화 보고서
├── public/                            # 정적 파일
├── dist/                              # 빌드 결과
├── coverage/                          # 테스트 커버리지
└── package.json                       # 프로젝트 설정
```

## 개발 가이드라인

### 코드 스타일

- **TypeScript**: 모든 코드에 타입 지정 (tsconfig.json strict 모드)
- **컴포넌트**: 함수형 컴포넌트 + Hooks 사용
- **스타일링**: Tailwind CSS + Bootstrap CSS 클래스 조합
- **네이밍**: PascalCase (컴포넌트), camelCase (함수/변수)

### 컴포넌트 작성 규칙

1. 모든 컴포넌트에 JSDoc 주석 작성
2. Props 타입을 인터페이스로 정의
3. 재사용 가능한 구조로 설계
4. 단위 테스트 필수 (coverage 85% 이상)

### 테스트 작성 규칙

1. 사용자 관점의 테스트 (React Testing Library)
2. 각 컴포넌트별 테스트 파일 생성
3. Acceptance Criteria 기반 테스트
4. 엣지 케이스 테스트 포함

### Bootstrap 통합 가이드

자세한 Bootstrap 통합 방법은 [BOOTSTRAP-INTEGRATION.md](./docs/BOOTSTRAP-INTEGRATION.md)를 참고하세요.

**주요 패턴**:
```tsx
// Form 컴포넌트
<Form.Group className="mb-3">
  <Form.Label htmlFor="username">아이디</Form.Label>
  <Form.Control
    id="username"
    type="text"
    placeholder="아이디 입력"
    className="form-control-lg"
  />
</Form.Group>

// Navbar with Dropdown
<Navbar bg="light" sticky="top">
  <Dropdown align="end" className="ms-auto">
    <Dropdown.Toggle variant="link">프로필</Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</Navbar>

// Sidebar with Icons
<Nav className="flex-column">
  <Nav.Link href="/dashboard" className={isActive ? 'active' : ''}>
    <i className="bi bi-house-door me-2"></i> 대시보드
  </Nav.Link>
</Nav>
```

## 문서

- [아키텍처 가이드](./docs/ARCHITECTURE.md) - 시스템 구조 및 설계
- [API/Context 문서](./docs/API.md) - AuthContext 및 타입 정의
- [컴포넌트 가이드](./docs/COMPONENTS.md) - 주요 컴포넌트 설명
- [Bootstrap 통합](./docs/BOOTSTRAP-INTEGRATION.md) - Bootstrap 사용 가이드
- [테스트 결과](./docs/TEST-RESULTS.md) - 테스트 커버리지 상세 정보
- [개발 환경 설정](./docs/SETUP.md) - 개발 환경 구축
- [테스트 가이드](./docs/TESTING.md) - 테스트 작성 방법

## 향후 계획

### Phase 1: 기본 기능 완성 (완료)
- [x] 로그인/로그아웃 기능
- [x] 인증 시스템 (Context API)
- [x] 라우팅 보호
- [x] Bootstrap 기반 레이아웃
- [x] 입력값 검증
- [x] 높은 테스트 커버리지

### Phase 2: 백엔드 연결 (계획)
- [ ] JWT 기반 인증 API 연결
- [ ] 사용자 정보 API
- [ ] 에러 핸들링 개선
- [ ] 토큰 갱신 로직

### Phase 3: 기능 확장 (계획)
- [ ] 사용자 프로필 관리
- [ ] 권한 관리 시스템 (RBAC)
- [ ] 다국어 지원
- [ ] 다크 모드 지원

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
  - Bootstrap form-control 스타일링
  - 실시간 유효성 검사
  - 오류 메시지 표시

- **ProtectedRoute.tsx**: 인증 라우트 보호
  - 미인증 사용자를 로그인 페이지로 리다이렉트
  - 인증된 사용자만 대시보드 접근 가능

### 레이아웃 관련

- **MainLayout.tsx**: 메인 레이아웃 구조
  - 3단 레이아웃: Navbar + Sidebar + Content
  - 반응형 디자인 (모바일/데스크톱)

- **Navbar.tsx**: 상단 네비게이션
  - 프로필 드롭다운 메뉴
  - 로그아웃 기능
  - Bootstrap Icons 아이콘

- **Sidebar.tsx**: 좌측 메뉴
  - Bootstrap Icons 메뉴 아이콘
  - 활성 메뉴 강조 표시
  - 모바일 Offcanvas 모드

- **DashboardPage.tsx**: 대시보드 페이지
  - 4개 통계 카드 (사용자, 매출, 주문, 리뷰)
  - 정보 카드 그리드
  - 반응형 레이아웃

## 지원

문제가 발생하거나 질문이 있으신 경우:

1. [이슈](../../issues) 생성
2. 문서 확인: `docs/` 및 `.moai/docs/` 디렉토리
3. 테스트 실행: `npm test`
4. SPEC 확인: `.moai/specs/` 디렉토리

## 라이센스

프로젝트 라이센스는 LICENSE 파일을 참고하세요.

---

**최종 업데이트**: 2025-11-17
**상태**: 프로덕션 준비 완료
**버전**: 1.0.1
**테스트 커버리지**: 88.83%
