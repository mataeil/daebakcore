# 테스트 가이드

daebakcore의 테스트 전략, 작성 방법, 실행 방법을 설명합니다.

## 테스트 개요

### 테스트 프레임워크

| 도구 | 버전 | 용도 |
|------|------|------|
| Jest | 29.7.0 | 테스트 러너 |
| React Testing Library | 16.3.0 | 컴포넌트 테스트 |
| @testing-library/jest-dom | 6.9.1 | 커스텀 매처 |

### 현재 테스트 현황

- **전체 테스트 수**: 106개
- **테스트 커버리지**: 88.64%
- **통과한 테스트**: 102개
- **실패한 테스트**: 4개

### 커버리지 분석

| 파일 | 구문 | 분기 | 함수 | 라인 |
|------|-----|------|------|------|
| 전체 | 88.64% | 80.30% | 91.42% | 88.02% |
| App.tsx | 92.3% | 0% | 100% | 92.3% |
| AuthContext.tsx | 72.97% | 50% | 66.66% | 73.52% |
| LoginForm.tsx | 80.43% | 85.71% | 91.66% | 79.06% |
| Layout 컴포넌트 | 100% | 100% | 100% | 100% |
| Utils | 100% | 100% | 100% | 100% |

## 테스트 실행

### 테스트 실행 방법

```bash
# 모든 테스트 실행 (한 번만)
npm test

# 테스트 감시 모드 (파일 변경 시 자동 재실행)
npm run test:watch

# 커버리지 리포트 생성
npm run test:coverage
```

### 테스트 필터링

```bash
# 특정 테스트 파일만 실행
npm test LoginForm

# 특정 테스트 케이스만 실행
npm test -- -t "should login successfully"

# 변경된 파일의 테스트만 실행
npm test -- --onlyChanged
```

## 테스트 구조

### 테스트 파일 위치

```
src/__tests__/
├── App.test.tsx                      # 앱 통합 테스트
├── AppIntegration.test.tsx           # 라우팅 통합 테스트
├── AuthContext.test.tsx              # 인증 Context 테스트
├── DashboardPage.test.tsx            # 대시보드 페이지 테스트
├── Layout.test.tsx                   # 레이아웃 컴포넌트 테스트
├── LoginForm.test.tsx                # 로그인 폼 테스트
├── LoginPage.test.tsx                # 로그인 페이지 테스트
├── NotFoundPage.test.tsx             # 404 페이지 테스트
└── ProtectedRoute.test.tsx           # 보호된 라우트 테스트
```

## React Testing Library 사용 방법

### 렌더링

```typescript
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'

// 기본 렌더링
render(<LoginForm />)

// Router가 필요한 경우
render(
  <BrowserRouter>
    <LoginPage />
  </BrowserRouter>
)

// AuthProvider가 필요한 경우
render(
  <AuthProvider>
    <YourComponent />
  </AuthProvider>
)
```

### 요소 선택

```typescript
// 텍스트로 선택
screen.getByText('로그인')

// 역할(Role)로 선택 - 권장
screen.getByRole('button', { name: '로그인' })
screen.getByRole('textbox', { name: /이메일/i })

// 라벨로 선택
screen.getByLabelText('이메일')

// ID로 선택 - 마지막 수단
screen.getByTestId('login-button')
```

### 사용자 상호작용

```typescript
import userEvent from '@testing-library/user-event'

// 입력 필드에 텍스트 입력
await userEvent.type(emailInput, 'admin')

// 체크박스 체크
await userEvent.click(rememberMeCheckbox)

// 버튼 클릭
await userEvent.click(loginButton)

// 폼 제출
await userEvent.click(submitButton)
```

### 비동기 처리

```typescript
import { waitFor } from '@testing-library/react'

// 요소가 나타날 때까지 대기
await waitFor(() => {
  expect(screen.getByText('로그인 성공')).toBeInTheDocument()
})

// 특정 조건 대기
await waitFor(() => {
  expect(loginButton).toBeDisabled()
})
```

## 테스트 작성 예제

### 1. 컴포넌트 렌더링 테스트

```typescript
describe('LoginForm', () => {
  it('should render login form fields', () => {
    render(<LoginForm />)
    
    expect(screen.getByLabelText(/이메일/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/비밀번호/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /로그인/i })).toBeInTheDocument()
  })
})
```

### 2. 사용자 상호작용 테스트

```typescript
it('should update email input value', async () => {
  render(<LoginForm />)
  
  const emailInput = screen.getByLabelText(/이메일/i)
  await userEvent.type(emailInput, 'admin')
  
  expect(emailInput).toHaveValue('admin')
})
```

### 3. 비동기 작업 테스트

```typescript
it('should login successfully with valid credentials', async () => {
  render(
    <AuthProvider>
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    </AuthProvider>
  )
  
  const emailInput = screen.getByLabelText(/이메일/i)
  const passwordInput = screen.getByLabelText(/비밀번호/i)
  const loginButton = screen.getByRole('button', { name: /로그인/i })
  
  await userEvent.type(emailInput, 'admin')
  await userEvent.type(passwordInput, 'admin1234')
  await userEvent.click(loginButton)
  
  await waitFor(() => {
    expect(screen.queryByText(/아이디 또는 비밀번호/i)).not.toBeInTheDocument()
  })
})
```

### 4. 에러 메시지 테스트

```typescript
it('should show error message for invalid email', async () => {
  render(<LoginForm />)
  
  const emailInput = screen.getByLabelText(/이메일/i)
  
  // 올바른 형식이 아닌 이메일 입력
  await userEvent.type(emailInput, 'invalid-email')
  await userEvent.click(document.body) // Blur 이벤트 발생
  
  await waitFor(() => {
    expect(screen.getByText(/올바른 이메일 형식/i)).toBeInTheDocument()
  })
})
```

## 테스트 모범 사례

### 1. 사용자 관점으로 테스트

```typescript
// Good - 사용자가 보는 텍스트로 선택
screen.getByRole('button', { name: /로그인/i })

// Bad - 구현 세부사항에 의존
screen.getByTestId('login-button-123')
```

### 2. 접근성 고려

```typescript
// Good - 시맨틱 HTML + 접근성
<button aria-label="로그인">로그인</button>

// 테스트
screen.getByRole('button', { name: /로그인/i })
```

### 3. 테스트 설정 재사용

```typescript
// Setup 함수로 반복되는 렌더링 로직 제거
const renderLoginForm = () => {
  return render(
    <AuthProvider>
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    </AuthProvider>
  )
}

describe('LoginForm', () => {
  it('should login successfully', async () => {
    renderLoginForm()
    // ... 테스트 로직
  })
})
```

### 4. 명확한 테스트 명명

```typescript
// Good - 무엇을 테스트하는지 명확
it('should show error message when email is invalid')

// Bad - 모호함
it('should work correctly')
it('test email validation')
```

## Acceptance Criteria (AC) 매핑

### 로그인 폼 AC

```
AC1: 사용자는 이메일과 비밀번호를 입력할 수 있다
테스트: it('should accept email and password input')

AC2: admin/admin1234로 로그인할 수 있다
테스트: it('should login successfully with admin credentials')

AC3: 유효하지 않은 자격증명으로는 로그인할 수 없다
테스트: it('should show error for invalid credentials')

AC4: 이메일 형식 검증을 한다
테스트: it('should validate email format')

AC5: 비밀번호는 최소 8자 이상이어야 한다
테스트: it('should validate password length')
```

## 개발 중 테스트

### TDD 워크플로우

```
1. 테스트 작성 (Red)
   - 기능을 설명하는 테스트 작성
   - 테스트 실행 → FAIL

2. 코드 구현 (Green)
   - 테스트를 통과하는 코드 작성
   - 테스트 실행 → PASS

3. 리팩토링 (Refactor)
   - 코드 정리 및 개선
   - 테스트 재실행 → PASS 유지

4. 반복
   - 다음 기능으로 이동
```

### 테스트 감시 모드

```bash
npm run test:watch
```

- 파일 저장 시 자동으로 관련 테스트 실행
- 빠른 피드백 루프

## CI/CD 테스트

### GitHub Actions 예제

```yaml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm test -- --coverage
      - run: npm run build
```

## 테스트 커버리지 향상

### 커버리지 목표

- **구문(Statements)**: 85% 이상 (현재 88.64%)
- **분기(Branches)**: 80% 이상 (현재 80.30%)
- **함수(Functions)**: 85% 이상 (현재 91.42%)
- **라인(Lines)**: 85% 이상 (현재 88.02%)

### 커버리지 리포트 분석

```bash
npm run test:coverage
```

생성되는 리포트:
- `coverage/lcov-report/index.html` - 시각적 리포트 (브라우저에서 열기)
- `coverage/lcov.info` - LCOV 포맷 리포트

### 미덮인 코드 찾기

HTML 리포트에서 빨간색으로 표시된 부분:
- 실행되지 않은 코드
- 테스트되지 않은 분기
- 테스트 필요 영역

## 실패한 테스트 해결

### 현재 실패한 테스트

```
DashboardPage.test.tsx:
- "should have heading with proper greeting" (4개 실패 중 일부)
```

### 실패 원인

- 다중 헤딩 요소 (h1, h2, h3 등)
- getByRole('heading', { level: 1 })로 유일한 h1을 찾으려 했으나 여러 개 존재

### 해결 방법

```typescript
// Before (실패)
const heading = screen.getByRole('heading', { level: 1 })

// After (성공)
const headings = screen.getAllByRole('heading', { level: 1 })
const heading = headings.find(h => h.textContent?.includes('Admin'))
```

## 디버깅 팁

### 테스트 디버깅

```typescript
import { screen } from '@testing-library/react'

// 화면에 렌더링된 모든 요소 출력
screen.debug()

// 특정 요소의 HTML 출력
screen.debug(screen.getByRole('button'))

// 로깅
console.log('상태:', isAuthenticated)
```

### Node Debugger

```bash
node --inspect-brk ./node_modules/.bin/jest --runInBand
```

## 다음 단계

1. 실패한 테스트 수정
2. 새로운 기능에 대한 테스트 추가
3. 커버리지 90% 이상 유지
4. E2E 테스트 추가 (Cypress, Playwright)

---

**최종 업데이트**: 2025-11-16
**버전**: 1.0
