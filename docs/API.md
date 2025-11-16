# API / Context 문서

daebakcore의 인증 시스템 API, Context, 타입 정의를 상세히 설명합니다.

## AuthContext API

### AuthContext 개요

AuthContext는 애플리케이션 전체의 인증 상태를 관리하는 React Context입니다.
로그인/로그아웃 기능과 사용자 정보를 전역으로 제공합니다.

### AuthProvider 컴포넌트

```typescript
<AuthProvider>
  <App />
</AuthProvider>
```

**역할**:
- 인증 상태 관리
- 로그인/로그아웃 메서드 제공
- 세션 복구 (페이지 새로고침 시)
- 모든 자식 컴포넌트에 인증 정보 제공

### useAuth Hook

```typescript
const { isAuthenticated, user, login, logout } = useAuth()
```

**반환 값**:

| 속성 | 타입 | 설명 |
|------|------|------|
| `isAuthenticated` | boolean | 현재 인증 상태 |
| `user` | User \| null | 로그인한 사용자 정보 또는 null |
| `login` | function | 로그인 함수 |
| `logout` | function | 로그아웃 함수 |

**사용 예**:

```typescript
export const Header: React.FC = () => {
  const { user, logout } = useAuth()
  
  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  
  return (
    <header>
      <span>사용자: {user?.name}</span>
      <button onClick={handleLogout}>로그아웃</button>
    </header>
  )
}
```

## API 메서드

### login()

사용자를 로그인 처리합니다.

```typescript
login(email: string, password: string, rememberMe: boolean): Promise<boolean>
```

**파라미터**:

| 파라미터 | 타입 | 설명 |
|---------|------|------|
| `email` | string | 이메일 (현재는 "admin" 고정) |
| `password` | string | 비밀번호 (현재는 "admin1234" 고정) |
| `rememberMe` | boolean | 로그인 유지 옵션 |

**반환 값**:

| 값 | 설명 |
|----|------|
| `true` | 로그인 성공 |
| `false` | 로그인 실패 |

**동작**:

1. email과 password를 검증
2. 일치 시:
   - AuthToken 생성
   - LocalStorage에 저장
   - 상태 업데이트
   - true 반환
3. 불일치 시:
   - false 반환

**사용 예**:

```typescript
const handleLogin = async () => {
  const success = await login('admin', 'admin1234', true)
  if (success) {
    navigate('/dashboard')
  } else {
    setError('로그인 실패')
  }
}
```

### logout()

사용자를 로그아웃 처리합니다.

```typescript
logout(): void
```

**동작**:

1. LocalStorage에서 토큰 제거
2. isAuthenticated를 false로 설정
3. user를 null로 설정

**사용 예**:

```typescript
const handleLogout = () => {
  logout()  // 로그아웃
  navigate('/login')  // 로그인 페이지로 이동
}
```

## 타입 정의

### User 타입

```typescript
interface User {
  id: string      // 사용자 ID (예: "admin")
  name: string    // 사용자 이름 (예: "Admin")
}
```

**사용 예**:

```typescript
const { user } = useAuth()
if (user) {
  console.log(`${user.id} (${user.name})`)
}
```

### AuthToken 타입

```typescript
interface AuthToken {
  userId: string            // 사용자 ID
  userName: string          // 사용자 이름
  isAuthenticated: boolean  // 인증 여부
  rememberMe?: boolean      // 기억하기 옵션
  timestamp?: number        // 토큰 생성 시간 (타임스탬프)
}
```

**저장소**: LocalStorage에 JSON 형식으로 저장

**예시**:

```json
{
  "userId": "admin",
  "userName": "Admin",
  "isAuthenticated": true,
  "rememberMe": true,
  "timestamp": 1731766800000
}
```

### LoginCredentials 타입

```typescript
interface LoginCredentials {
  email: string       // 이메일
  password: string    // 비밀번호
  rememberMe: boolean // 기억하기
}
```

**사용 예**:

```typescript
const credentials: LoginCredentials = {
  email: 'admin',
  password: 'admin1234',
  rememberMe: true
}
await login(credentials.email, credentials.password, credentials.rememberMe)
```

### AuthContextType 타입

```typescript
interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string, rememberMe: boolean) => Promise<boolean>
  logout: () => void
}
```

## 상수

### 인증 관련 상수

```typescript
// localStorage 저장 키
export const AUTH_STORAGE_KEY = 'daebakcore_auth_token'

// 기본 관리자 계정
export const DEFAULT_ADMIN_ID = 'admin'
export const DEFAULT_ADMIN_PASSWORD = 'admin1234'
export const DEFAULT_ADMIN_NAME = 'Admin'

// 로그인 후 대시보드로 리다이렉트 딜레이 (밀리초)
export const LOGIN_REDIRECT_DELAY = 300

// 입력값 검증 패턴
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const MIN_PASSWORD_LENGTH = 8
```

## 유효성 검사 함수

### validateEmail()

이메일 형식을 검증합니다.

```typescript
validateEmail(email: string): string | null
```

**반환 값**:
- `null`: 유효함
- `string`: 에러 메시지

**검증 규칙**:
1. 필수 입력
2. 이메일 형식 (example@domain.com)

**사용 예**:

```typescript
const error = validateEmail('admin@example.com')
if (error) {
  console.error(error)
} else {
  console.log('유효한 이메일')
}
```

### validatePassword()

비밀번호를 검증합니다.

```typescript
validatePassword(password: string): string | null
```

**반환 값**:
- `null`: 유효함
- `string`: 에러 메시지

**검증 규칙**:
1. 필수 입력
2. 최소 8자 이상

**사용 예**:

```typescript
const error = validatePassword('admin1234')
if (error) {
  console.error(error)
} else {
  console.log('유효한 비밀번호')
}
```

### validateLoginForm()

로그인 폼 전체를 검증합니다.

```typescript
validateLoginForm(email: string, password: string): Record<string, string>
```

**반환 값**:
- 빈 객체 `{}`: 모두 유효함
- `{ email: "에러" }`: 이메일 에러
- `{ password: "에러" }`: 비밀번호 에러
- `{ email: "에러", password: "에러" }`: 둘 다 에러

**사용 예**:

```typescript
const errors = validateLoginForm('admin', 'admin1234')
if (Object.keys(errors).length > 0) {
  console.error('유효성 검사 실패:', errors)
} else {
  console.log('유효성 검사 통과')
}
```

### validateCredentials()

로그인 자격증명을 검증합니다.

```typescript
validateCredentials(email: string, password: string): boolean
```

**반환 값**:
- `true`: 유효한 자격증명
- `false`: 무효한 자격증명

**현재 구현**:
- email === 'admin' && password === 'admin1234' 일 때만 true

**참고**: 이 함수는 내부적으로 AuthContext.login()에서 사용됩니다.

## 사용 흐름

### 1. 로그인 흐름

```
사용자가 이메일/비밀번호 입력
  ↓
validateLoginForm() → 클라이언트 검증
  ↓
유효한 경우 login() 호출
  ↓
validateCredentials() → 자격증명 확인
  ↓
성공 → AuthToken 생성 및 LocalStorage 저장 → 상태 업데이트 → true 반환
실패 → false 반환
```

### 2. 세션 복구 흐름

```
페이지 로드
  ↓
AuthProvider 마운트
  ↓
useEffect() → LocalStorage에서 토큰 조회
  ↓
토큰 존재 및 유효
  ↓
JSON.parse() → 상태 복구
  ↓
전체 앱에서 인증 상태 사용 가능
```

### 3. 로그아웃 흐름

```
로그아웃 버튼 클릭
  ↓
logout() 호출
  ↓
LocalStorage 토큰 제거 → 상태 초기화
  ↓
/login으로 리다이렉트
```

## 에러 처리

### AuthProvider에서의 에러

```typescript
try {
  const token: AuthToken = JSON.parse(storedToken)
  if (token.isAuthenticated) {
    // 상태 복구
  }
} catch (error) {
  console.error('Failed to parse auth token:', error)
  localStorage.removeItem(AUTH_STORAGE_KEY)
}
```

### useAuth Hook 에러

```typescript
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
```

**주의**: useAuth는 반드시 AuthProvider 내부에서만 사용해야 합니다.

## LocalStorage 관리

### 저장

```typescript
const token: AuthToken = {
  userId: 'admin',
  userName: 'Admin',
  isAuthenticated: true,
  rememberMe: true,
  timestamp: Date.now()
}
localStorage.setItem('daebakcore_auth_token', JSON.stringify(token))
```

### 읽기

```typescript
const storedToken = localStorage.getItem('daebakcore_auth_token')
if (storedToken) {
  const token = JSON.parse(storedToken)
}
```

### 삭제

```typescript
localStorage.removeItem('daebakcore_auth_token')
```

## 향후 확장 API

### 계획된 메서드

```typescript
// JWT 토큰 기반 로그인
async login(credentials: LoginCredentials): Promise<AuthToken>

// 사용자 정보 조회
async getUserProfile(): Promise<User>

// 토큰 갱신
async refreshToken(): Promise<AuthToken>

// 비밀번호 변경
async changePassword(oldPassword: string, newPassword: string): Promise<boolean>
```

---

**최종 업데이트**: 2025-11-16
**버전**: 1.0
