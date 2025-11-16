# 아키텍처 가이드

daebakcore의 전체 시스템 아키텍처, 데이터 흐름, 컴포넌트 계층도를 설명합니다.

## 시스템 구조

### 계층 구조

```
Presentation Layer (UI)
├── Pages (LoginPage, DashboardPage, NotFoundPage)
├── Components (LoginForm, MainLayout, Header, Sidebar, ProtectedRoute)
└── Styles (Tailwind CSS)
         ↓
State Management Layer
├── Context API (AuthContext)
├── useAuth Hook
└── Local Storage (Token Persistence)
         ↓
Business Logic Layer
├── Validation (validation.ts)
├── Constants (constants.ts)
└── Types (auth.ts)
         ↓
Routing Layer
├── React Router DOM
├── Route Protection
└── Navigation
```

## 인증 흐름

### 로그인 프로세스

```
사용자 입력
    ↓
LoginForm 유효성 검사
    ↓
AuthContext.login() 호출
    ↓
자격증명 확인 (admin/admin1234)
    ↓
Token 생성 및 LocalStorage 저장
    ↓
상태 업데이트 (isAuthenticated, user)
    ↓
대시보드로 리다이렉트 (300ms 딜레이)
```

### 로그아웃 프로세스

```
로그아웃 버튼 클릭
    ↓
Header의 handleLogout() 호출
    ↓
AuthContext.logout() 호출
    ↓
LocalStorage Token 제거
    ↓
상태 업데이트 (isAuthenticated=false, user=null)
    ↓
로그인 페이지로 리다이렉트
```

### 세션 복구

```
페이지 새로고침
    ↓
AuthProvider useEffect() 실행
    ↓
LocalStorage에서 Token 조회
    ↓
Token 유효성 검사 및 파싱
    ↓
상태 복구 (이전 세션 유지)
```

## 데이터 흐름

### 전역 상태 흐름

```
AuthContext (전역 상태)
├── isAuthenticated: boolean
├── user: User | null
│   ├── id: string
│   └── name: string
├── login: (email, password, rememberMe) => Promise<boolean>
└── logout: () => void

사용 방식:
const { isAuthenticated, user, login, logout } = useAuth()
```

### 컴포넌트 Props 전달

```
App (루트)
  ├── BrowserRouter
  ├── LoginPage
  │   └── LoginForm
  │       └── useAuth() → login()
  └── ProtectedRoute
      ├── MainLayout
      │   ├── Header
      │   │   └── useAuth() → user, logout()
      │   ├── Sidebar
      │   │   └── useLocation()
      │   └── children (DashboardPage)
      │       └── useAuth() → user
```

## 컴포넌트 계층도

### 계층 관계

```
Level 1: Pages
  - LoginPage
  - DashboardPage
  - NotFoundPage

Level 2: Layouts & Route Protection
  - MainLayout (Header + Sidebar + Content)
  - ProtectedRoute (인증 확인)

Level 3: Components
  - Header (로고, 사용자명, 로그아웃)
  - Sidebar (메뉴 네비게이션)
  - LoginForm (입력 폼)

Level 4: Utilities & Context
  - AuthContext (상태 관리)
  - validation (폼 검증)
  - constants (애플리케이션 상수)
```

## 라우팅 구조

### Route 정의

```
Route Tree:
  / (root)
    └── RootRedirect (isAuthenticated 여부에 따라 /login 또는 /dashboard로 리다이렉트)
  
  /login
    └── LoginPage (로그인 폼)
  
  /dashboard
    └── ProtectedRoute (인증 필수)
        └── MainLayout
            └── DashboardPage (대시보드)
  
  /404 또는 /anything
    └── NotFoundPage (404 페이지)
```

### ProtectedRoute 로직

```
ProtectedRoute 컴포넌트:
  isAuthenticated 확인
    ├── YES → children 렌더링
    └── NO → /login으로 리다이렉트
```

## 상태 관리 설계

### AuthContext의 역할

1. **전역 인증 상태 관리**
   - isAuthenticated: 현재 인증 상태
   - user: 로그인한 사용자 정보

2. **인증 메서드 제공**
   - login(): 사용자 로그인 처리
   - logout(): 사용자 로그아웃 처리

3. **세션 영속성**
   - LocalStorage를 통한 토큰 저장
   - 페이지 새로고침 시 세션 복구

### 상태 흐름

```
AuthProvider (Root)
  ├── State: isAuthenticated, user
  ├── useEffect: 초기화 (localStorage 토큰 확인)
  ├── login(): 로그인 처리
  ├── logout(): 로그아웃 처리
  └── 모든 자식 컴포넌트에 상태 공유

useAuth() Hook:
  Context 접근 포인트
  모든 컴포넌트에서 사용 가능
```

## 타입 시스템

### 핵심 타입 정의

```typescript
// 사용자 정보
interface User {
  id: string;        // 사용자 ID (고정: "admin")
  name: string;      // 사용자 이름
}

// 인증 토큰
interface AuthToken {
  userId: string;           // 사용자 ID
  userName: string;         // 사용자 이름
  isAuthenticated: boolean; // 인증 상태
  rememberMe?: boolean;     // 기억하기 옵션
  timestamp?: number;       // 토큰 생성 시간
}

// 로그인 자격증명
interface LoginCredentials {
  email: string;      // 이메일
  password: string;   // 비밀번호
  rememberMe: boolean; // 기억하기
}

// AuthContext 타입
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string, rememberMe: boolean) => Promise<boolean>;
  logout: () => void;
}
```

## 입력값 유효성 검사

### 검증 규칙

```
LoginForm Validation:
├── Email (이메일)
│   ├── 필수 입력: ❌ → "필수 입력항목입니다"
│   └── 형식: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ❌ → "올바른 이메일 형식을 입력하세요"
└── Password (비밀번호)
    ├── 필수 입력: ❌ → "필수 입력항목입니다"
    └── 길이: < 8 ❌ → "비밀번호는 최소 8자 이상이어야 합니다"
```

### 검증 시점

1. **Blur 이벤트**: 필드를 벗어날 때 검증
2. **Submit 이벤트**: 폼 제출 시 전체 검증
3. **실시간 피드백**: 에러 메시지 즉시 표시

## 모바일 반응형 설계

### Breakpoints (Tailwind CSS)

```
md (중간 이상):
  ├── Sidebar: 항상 표시
  └── 메인 콘텐츠: 전체 너비

md 미만 (모바일):
  ├── Sidebar: 토글 버튼으로 전환
  ├── 토글 버튼: 화면 좌상단
  └── Sidebar 상태: -translate-x-full (숨김) ↔ translate-x-0 (표시)
```

### 반응형 클래스

```
md:hidden   - 모바일에서만 표시
md:ml-0     - 중간 이상 화면에서 마진 제거
flex-1      - 남은 공간 전체 사용
overflow-y-auto - 수직 스크롤 활성화
```

## 저장소 구조

### LocalStorage

```
Key: "daebakcore_auth_token"
Value: JSON.stringify({
  userId: "admin",
  userName: "Admin",
  isAuthenticated: true,
  rememberMe: true,
  timestamp: 1731766800000
})
```

### 저장 및 복구

```
저장: AuthContext.login() 완료 시
  → localStorage.setItem("daebakcore_auth_token", JSON.stringify(token))

복구: AuthProvider useEffect() 초기화 시
  → localStorage.getItem("daebakcore_auth_token")
  → JSON.parse() → 상태 복구
```

## 보안 고려사항

### 현재 구현

1. **고정 계정 검증**: admin/admin1234로 하드코딩된 검증
2. **토큰 저장**: LocalStorage (클라이언트 저장소)
3. **HTTPS 미적용**: 개발 단계

### 향후 개선 계획

1. **JWT 토큰**: 백엔드에서 발급한 JWT 토큰 사용
2. **HttpOnly Cookie**: 보안이 높은 쿠키 저장
3. **HTTPS 강제**: 프로덕션 환경에서 HTTPS 필수
4. **토큰 갱신**: 만료 전 자동 갱신 로직
5. **보안 헤더**: HSTS, CSP 등 보안 헤더 추가

## 확장성 고려

### 향후 백엔드 연결

```
현재:
사용자 입력 → 클라이언트 검증 → 고정 계정 확인 → 로그인

향후:
사용자 입력 → 클라이언트 검증 → API 요청 → 서버 인증 → JWT 토큰 → 로그인
```

### 권한 관리 확장

```
현재:
isAuthenticated (boolean만 저장)

향후:
user: {
  id: string,
  name: string,
  role: 'admin' | 'user' | 'viewer',
  permissions: string[]
}
```

## 성능 최적화

### 현재 최적화

1. **Code Splitting**: React Router 자동 코드 분할
2. **CSS Tree-shaking**: Tailwind CSS 불필요한 스타일 제거
3. **조건부 렌더링**: ProtectedRoute로 불필요한 컴포넌트 로드 방지

### 향후 최적화 계획

1. **Lazy Loading**: 컴포넌트 동적 임포트
2. **메모이제이션**: React.memo, useMemo, useCallback
3. **캐싱**: API 응답 캐싱
4. **번들 분석**: 번들 크기 최적화

---

**최종 업데이트**: 2025-11-16
**버전**: 1.0
