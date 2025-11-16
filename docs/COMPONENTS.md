# 컴포넌트 가이드

daebakcore의 모든 주요 컴포넌트를 상세히 설명합니다.

## 컴포넌트 개요

| 컴포넌트 | 경로 | 설명 |
|---------|------|------|
| `LoginForm` | src/components/Auth/LoginForm.tsx | 로그인 입력 폼 |
| `ProtectedRoute` | src/components/Auth/ProtectedRoute.tsx | 인증 라우트 보호 |
| `MainLayout` | src/components/Layout/MainLayout.tsx | 메인 레이아웃 |
| `Header` | src/components/Layout/Header.tsx | 상단 헤더 |
| `Sidebar` | src/components/Layout/Sidebar.tsx | 좌측 내비게이션 |

## Auth 컴포넌트

### LoginForm

**경로**: `src/components/Auth/LoginForm.tsx`

**역할**: 사용자 로그인을 위한 입력 폼

#### Props

```typescript
interface LoginFormProps {
  // 현재 props 없음 (useAuth Hook 사용)
}
```

#### State

```typescript
const [email, setEmail] = useState('')           // 이메일 입력값
const [password, setPassword] = useState('')     // 비밀번호 입력값
const [rememberMe, setRememberMe] = useState(false)  // 기억하기 체크박스
const [errors, setErrors] = useState<Record<string, string>>({})  // 필드 에러
const [globalError, setGlobalError] = useState('')  // 전역 에러 메시지
const [isLoading, setIsLoading] = useState(false)   // 로딩 상태
```

#### 주요 메서드

**handleBlur(field: string, value: string)**
- 필드에서 포커스를 잃을 때 호출
- 해당 필드의 유효성 검사 수행
- 에러 메시지 업데이트

**handleSubmit(e: React.FormEvent)**
- 폼 제출 시 호출
- 전체 폼 유효성 검사
- 로그인 API 호출
- 성공 시 대시보드로 리다이렉트
- 실패 시 에러 메시지 표시

**handleKeyPress(e: React.KeyboardEvent)**
- Enter 키 입력 감지
- 폼이 유효하고 로딩 중이 아니면 자동 제출

#### 특징

1. **실시간 유효성 검사**: Blur 이벤트에서 필드별 검증
2. **에러 표시**: 각 필드 아래에 에러 메시지 표시
3. **전역 에러**: 로그인 실패 시 상단에 에러 메시지
4. **로딩 상태**: 제출 중 버튼 비활성화
5. **기억하기**: 체크박스로 로그인 유지 옵션 제공
6. **Enter 키 지원**: Enter 키로 폼 제출 가능

#### 렌더링

```
<form>
  ├── 전역 에러 메시지
  ├── 이메일 입력필드
  ├── 비밀번호 입력필드
  ├── 기억하기 체크박스
  └── 로그인 버튼
```

#### 스타일 클래스

- `space-y-4`: 요소 간 수직 간격
- `bg-red-50`, `border-red-200`, `text-red-700`: 에러 스타일
- `focus:ring-2 focus:ring-blue-500`: 포커스 스타일
- `disabled:bg-gray-400 disabled:cursor-not-allowed`: 비활성화 상태

#### 사용 예

```typescript
import { LoginForm } from '@/components/Auth/LoginForm'

export const LoginPage: React.FC = () => {
  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">로그인</h1>
      <LoginForm />
    </div>
  )
}
```

---

### ProtectedRoute

**경로**: `src/components/Auth/ProtectedRoute.tsx`

**역할**: 인증된 사용자만 접근 가능한 라우트 보호

#### Props

```typescript
interface ProtectedRouteProps {
  children: React.ReactNode  // 보호할 컴포넌트
}
```

#### 동작

```
인증 여부 확인
  ├── 인증됨 → children 렌더링
  └── 미인증 → /login으로 리다이렉트
```

#### 특징

1. **간단한 구현**: 인증 체크만 수행
2. **자동 리다이렉트**: 미인증 사용자를 로그인 페이지로 이동
3. **재렌더링 최소화**: useAuth Hook으로 최소 렌더링

#### 사용 예

```typescript
// App.tsx에서
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <MainLayout>
        <DashboardPage />
      </MainLayout>
    </ProtectedRoute>
  }
/>
```

---

## Layout 컴포넌트

### MainLayout

**경로**: `src/components/Layout/MainLayout.tsx`

**역할**: 대시보드의 메인 레이아웃 (헤더 + 사이드바 + 콘텐츠)

#### Props

```typescript
interface MainLayoutProps {
  children: React.ReactNode  // 메인 콘텐츠
}
```

#### 구조

```
MainLayout
├── Header
├── Sidebar
└── main (children)
```

#### 레이아웃 구조

```
┌─────────────────────────────────────┐
│         Header (로고, 사용자명)       │
├──────────────┬──────────────────────┤
│              │                      │
│  Sidebar     │   메인 콘텐츠       │
│  (메뉴)      │   (children)        │
│              │                      │
├──────────────┴──────────────────────┤
```

#### 스타일

```
컨테이너:
- flex flex-col h-screen: 전체 높이 차지, 수직 정렬
- bg-gray-100: 밝은 회색 배경

메인 콘텐츠:
- flex-1 overflow-y-auto: 남은 공간 차지, 세로 스크롤
- p-6: 패딩
- md:ml-0: 중간 이상 화면에서 마진 제거
```

#### 특징

1. **반응형**: 모바일과 데스크톱 모두 지원
2. **높이 100%**: 화면 전체를 차지
3. **스크롤**: 메인 콘텐츠만 스크롤 가능
4. **구조화**: 명확한 3단 레이아웃

#### 사용 예

```typescript
<ProtectedRoute>
  <MainLayout>
    <DashboardPage />
  </MainLayout>
</ProtectedRoute>
```

---

### Header

**경로**: `src/components/Layout/Header.tsx`

**역할**: 상단 헤더 (로고, 사용자명, 로그아웃)

#### State

```typescript
// useAuth Hook에서 제공
const { user, logout } = useAuth()
```

#### 메서드

**handleLogout()**
- 로그아웃 버튼 클릭 시 호출
- `logout()` 함수 실행
- `/login`으로 리다이렉트

#### 렌더링 요소

```
Header
├── 로고 "daebakcore" (h1)
├── 사용자명 표시
└── 로그아웃 버튼
```

#### 스타일

```
헤더:
- bg-blue-600: 파란색 배경
- text-white: 흰색 텍스트
- shadow-md: 그림자

버튼:
- bg-blue-700: 더 진한 파란색
- hover:bg-blue-800: 호버 시 더 진한 색
- px-4 py-2: 패딩
- rounded: 둥근 모서리
```

#### 특징

1. **로고**: 프로젝트 이름 표시
2. **사용자 정보**: 로그인한 사용자명 표시
3. **로그아웃**: 한 클릭으로 로그아웃
4. **Flexbox**: 요소가 좌우로 정렬

---

### Sidebar

**경로**: `src/components/Layout/Sidebar.tsx`

**역할**: 좌측 내비게이션 메뉴

#### State

```typescript
const [isOpen, setIsOpen] = useState(true)  // 사이드바 열림/닫힘 상태
```

#### 메서드

**isActive(path: string): boolean**
- 현재 경로와 링크 경로 비교
- 일치하면 활성 스타일 적용

#### 구조

```
Sidebar
├── 토글 버튼 (모바일에서만 표시)
└── 네비게이션 메뉴
    └── 링크: /dashboard (대시보드)
```

#### 스타일 클래스

**토글 버튼**:
- `md:hidden`: 모바일에서만 표시
- `fixed`: 고정 위치
- `top-20 left-4`: 헤더 아래, 왼쪽

**사이드바**:
- `translate-x-0`: 열림 상태
- `-translate-x-full`: 닫힘 상태

**메뉴 링크**:
- `active`: 파란색 배경 (bg-blue-600)
- `inactive`: 회색 텍스트, 호버 시 진한 회색

#### 특징

1. **모바일 토글**: 모바일에서 버튼으로 메뉴 열고 닫기
2. **활성 상태**: 현재 페이지에 해당하는 링크 강조
3. **반응형**: `md` 이상에서 항상 표시
4. **단일 링크**: 현재는 대시보드 링크만 포함

#### 사용 예

```typescript
// MainLayout 내부에서 사용
<MainLayout>
  {/* Sidebar와 Header는 자동 렌더링 */}
  <DashboardPage />
</MainLayout>
```

---

## Page 컴포넌트

### LoginPage

**경로**: `src/pages/LoginPage.tsx`

**역할**: 로그인 페이지

**구성**: LoginForm을 감싸는 페이지

```typescript
export const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">로그인</h1>
        <LoginForm />
      </div>
    </div>
  )
}
```

---

### DashboardPage

**경로**: `src/pages/DashboardPage.tsx`

**역할**: 대시보드 페이지 (인증 후)

**특징**: 로그인한 사용자 정보 표시

---

### NotFoundPage

**경로**: `src/pages/NotFoundPage.tsx`

**역할**: 404 에러 페이지

**특징**: 존재하지 않는 경로에 표시

---

## 컴포넌트 트리

```
App
└── BrowserRouter
    ├── Routes
    │   ├── Route path="/"
    │   │   └── RootRedirect
    │   ├── Route path="/login"
    │   │   └── LoginPage
    │   │       └── LoginForm
    │   ├── Route path="/dashboard"
    │   │   └── ProtectedRoute
    │   │       └── MainLayout
    │   │           ├── Header
    │   │           ├── Sidebar
    │   │           └── DashboardPage
    │   └── Route path="*"
    │       └── NotFoundPage
```

---

## 스타일링 가이드

### Tailwind CSS 사용

모든 스타일링은 Tailwind CSS 유틸리티 클래스를 사용합니다.

**색상 팔레트**:
- 주색: blue-600 (헤더, 버튼)
- 배경: gray-100, gray-800 (sidebar)
- 텍스트: white, gray-700
- 에러: red-600, red-50

**레이아웃**:
- `flex`, `grid`: 레이아웃
- `flex-1`: 남은 공간 차지
- `space-y-4`: 세로 간격
- `p-6`: 패딩

**반응형**:
- `md:hidden`: 모바일에서만
- `md:ml-0`: 중간 이상 화면
- `max-w-md`: 최대 너비

---

## 테스트 가능성

모든 컴포넌트는 다음을 고려하여 설계되었습니다:

1. **Accessibility**: role, aria-label 속성 사용
2. **testability**: data-testid 없이 semantic HTML로 테스트 가능
3. **재사용성**: Props를 통한 유연한 구성

---

**최종 업데이트**: 2025-11-16
**버전**: 1.0
