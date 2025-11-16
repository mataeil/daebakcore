# Bootstrap 5 통합 가이드

**daebakcore 프로젝트의 Bootstrap 5 통합 완벽 가이드**

최종 업데이트: 2025-11-17 | 버전: 1.0.1 | SPEC: SPEC-AUTH-LOGIN-UI-REDESIGN-001

## 개요

이 문서는 Bootstrap 5.3.8과 React-Bootstrap 2.10.10을 React 19 프로젝트에 통합하는 방법을 설명합니다.
SPEC-AUTH-LOGIN-UI-REDESIGN-001 완료에 따라 전체 통합 방식이 최적화되었습니다.

## 1. 설치된 Bootstrap 패키지

### npm 패키지

```bash
npm install bootstrap@5.3.8 bootstrap-icons@1.13.1 react-bootstrap@2.10.10
```

### 버전 정보

| 패키지 | 버전 | 용도 |
|--------|------|------|
| **Bootstrap** | 5.3.8 | CSS 프레임워크 |
| **Bootstrap Icons** | 1.13.1 | 아이콘 라이브러리 |
| **React-Bootstrap** | 2.10.10 | React 컴포넌트 |

## 2. Bootstrap 초기화

### CSS 임포트

**src/main.tsx**에서:

```typescript
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
```

### JavaScript 초기화

필요한 경우 Popper.js 임포트:

```typescript
import * as bootstrap from 'bootstrap'
```

## 3. Navbar 컴포넌트

고정 상단 네비게이션 바의 구현:

### HTML 구조

```tsx
<Navbar bg="light" sticky="top" className="border-bottom">
  <Container>
    <Navbar.Brand href="#home">daebakcore</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" className="d-lg-none" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
        <Dropdown align="end" className="ms-auto">
          <Dropdown.Toggle variant="link" className="text-dark">
            <i className="bi bi-person-circle"></i> {user?.username}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleLogout} className="text-danger">
              <i className="bi bi-box-arrow-right"></i> 로그아웃
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
```

### 스타일 클래스

- `navbar navbar-expand-lg`: 992px 이상에서 확장
- `sticky-top`: 스크롤 시 상단 고정
- `border-bottom`: 하단 테두리
- `bg-light`: 밝은 배경

## 4. Sidebar (좌측 메뉴)

### 데스크톱 사이드바

```tsx
<aside className="col-lg-3 bg-light border-end" style={{ minHeight: '100vh' }}>
  <Nav className="flex-column p-3">
    {menuItems.map((item) => (
      <Nav.Link
        key={item.id}
        href={item.path}
        className={`d-flex align-items-center ${
          isActive(item.path) ? 'active bg-blue-50 border-start-4' : ''
        }`}
      >
        <i className={`bi ${item.icon} me-2`}></i>
        {item.label}
      </Nav.Link>
    ))}
  </Nav>
</aside>
```

### 모바일 Offcanvas

```tsx
<Offcanvas show={show} onHide={handleClose} responsive="lg">
  <Offcanvas.Header closeButton>
    <Offcanvas.Title>메뉴</Offcanvas.Title>
  </Offcanvas.Header>
  <Offcanvas.Body>
    <Nav className="flex-column">
      {/* 메뉴 항목 */}
    </Nav>
  </Offcanvas.Body>
</Offcanvas>
```

### 메뉴 아이콘

Bootstrap Icons 사용:

| 메뉴 | 아이콘 | 클래스 |
|------|--------|--------|
| 대시보드 | 홈 | `bi-house-door` |
| 보고서 | 차트 | `bi-bar-chart` |
| 설정 | 기어 | `bi-gear` |
| 로그 | 문서 | `bi-file-text` |
| 프로필 | 사람 | `bi-person-circle` |
| 로그아웃 | 화살표 | `bi-box-arrow-right` |

## 5. 로그인 페이지 (Bootstrap 공식 패턴)

### 레이아웃

```tsx
<div
  className="d-flex align-items-center justify-content-center min-vh-100"
  style={{
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  }}
>
  <Card className="shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
    <Card.Body className="p-5">
      <h1 className="text-center mb-4">로그인</h1>
      <LoginForm />
    </Card.Body>
  </Card>
</div>
```

### 폼 컴포넌트

```tsx
<Form>
  <Form.Group className="mb-3">
    <Form.Label htmlFor="username">아이디</Form.Label>
    <Form.Control
      id="username"
      type="text"
      placeholder="아이디 입력"
      className="form-control-lg"
      autoFocus
      onChange={(e) => setUsername(e.target.value)}
      isInvalid={!!errors.username}
    />
    <Form.Control.Feedback type="invalid">
      {errors.username}
    </Form.Control.Feedback>
  </Form.Group>

  <Form.Group className="mb-4">
    <Form.Label htmlFor="password">비밀번호</Form.Label>
    <Form.Control
      id="password"
      type="password"
      placeholder="비밀번호 입력"
      className="form-control-lg"
      onChange={(e) => setPassword(e.target.value)}
      isInvalid={!!errors.password}
    />
    <Form.Control.Feedback type="invalid">
      {errors.password}
    </Form.Control.Feedback>
  </Form.Group>

  <Button variant="primary" className="btn-lg w-100" onClick={handleLogin}>
    로그인
  </Button>
</Form>
```

## 6. 반응형 그리드

### Bootstrap 그리드 시스템

```tsx
<Container fluid>
  <Row className="g-4">
    {/* 모바일: 1칼럼, 태블릿: 2칼럼, 데스크톱: 4칼럼 */}
    <Col xs={12} md={6} lg={3}>
      <Card className="h-100 shadow-sm hover:shadow-lg">
        <Card.Body>
          <h5>통계 카드</h5>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>
```

### 브레이크포인트

| 화면 | 너비 | 클래스 | 설명 |
|------|------|--------|------|
| xs | < 576px | `-` | 모바일 |
| sm | ≥ 576px | `sm` | 작은 스마트폰 |
| md | ≥ 768px | `md` | 태블릿 |
| lg | ≥ 992px | `lg` | 노트북 |
| xl | ≥ 1200px | `xl` | 큰 화면 |

## 7. 색상 팔레트

### SPEC 정의 색상

| 용도 | 색상명 | HEX | RGB | 사용 |
|------|--------|-----|-----|------|
| 주요 | Primary Blue | #667eea | 102, 126, 234 | 로그인 배경 |
| 보조 | Purple | #764ba2 | 118, 75, 162 | 그라디언트 |
| 활성 | Active Blue | #0d6efd | 13, 110, 253 | 활성 메뉴 |
| 위험 | Danger Red | #dc3545 | 220, 53, 69 | 로그아웃 |
| 배경 | Light Gray | #f8f9fa | 248, 249, 250 | 카드 배경 |

### Bootstrap 기본 색상

```tsx
<div className="btn-primary">Primary</div>
<div className="btn-success">Success</div>
<div className="btn-danger">Danger</div>
<div className="btn-warning">Warning</div>
<div className="btn-info">Info</div>
<div className="btn-light">Light</div>
<div className="btn-dark">Dark</div>
```

## 8. 주요 컴포넌트

### Card

```tsx
<Card className="shadow-sm mb-3">
  <Card.Header className="bg-primary text-white">
    <Card.Title className="mb-0">Title</Card.Title>
  </Card.Header>
  <Card.Body>
    <p className="card-text">Content</p>
  </Card.Body>
</Card>
```

### Button

```tsx
<Button variant="primary" className="btn-lg">Primary</Button>
<Button variant="outline-primary">Outline</Button>
<Button variant="danger" size="sm">Danger</Button>
<Button variant="success" disabled>Disabled</Button>
```

### Form

```tsx
<Form>
  <Form.Group className="mb-3">
    <Form.Label htmlFor="email">이메일</Form.Label>
    <Form.Control
      id="email"
      type="email"
      placeholder="이메일 입력"
      isInvalid={!!error}
    />
    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
  </Form.Group>
</Form>
```

### Alert

```tsx
<Alert variant="success" dismissible>
  로그인 성공했습니다!
</Alert>
<Alert variant="danger">
  오류가 발생했습니다.
</Alert>
```

### Modal

```tsx
<Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>제목</Modal.Title>
  </Modal.Header>
  <Modal.Body>본문</Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      닫기
    </Button>
  </Modal.Footer>
</Modal>
```

## 9. 접근성 기준

### WCAG 2.1 AA 준수

#### 색상 대비

```
최소 비율: 4.5:1 (일반 텍스트)
최소 비율: 3:1 (큰 텍스트)
```

#### ARIA 속성

```tsx
<button aria-label="메뉴 토글" aria-expanded={isOpen}>
  메뉴
</button>

<nav aria-label="주 메뉴">
  {/* 네비게이션 항목 */}
</nav>
```

#### 키보드 네비게이션

- Tab 키로 포커스 이동
- Enter/Space로 버튼 활성화
- Esc 키로 모달 닫기

#### 시맨틱 HTML

```tsx
<nav>네비게이션</nav>
<main>메인 콘텐츠</main>
<aside>사이드바</aside>
<article>기사</article>
<section>섹션</section>
<footer>푸터</footer>
```

## 10. 제스처 및 상호작용

### 호버 효과

```tsx
<Card className="shadow-sm transition-shadow" style={{
  cursor: 'pointer',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  }
}}>
  호버 시 shadow-lg로 변경
</Card>
```

### 로딩 상태

```tsx
<Button disabled>
  <Spinner as="span" animation="border" size="sm" className="me-2" />
  로딩 중...
</Button>
```

### Toast 알림

```tsx
<Toast show={show} onClose={() => setShow(false)}>
  <Toast.Header>
    <strong>알림</strong>
  </Toast.Header>
  <Toast.Body>메시지</Toast.Body>
</Toast>
```

## 11. 성능 최적화

### 동적 로딩

```tsx
import { Suspense, lazy } from 'react'

const DashboardPage = lazy(() => import('./DashboardPage'))

export default function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <DashboardPage />
    </Suspense>
  )
}
```

### 메모이제이션

```tsx
import { memo } from 'react'

const SidebarItem = memo(({ item, isActive }) => (
  <Nav.Link className={isActive ? 'active' : ''}>
    {item.label}
  </Nav.Link>
))
```

## 12. 테스트 가이드

### Bootstrap 컴포넌트 테스트

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('로그인 폼 제출', async () => {
  const user = userEvent.setup()
  render(<LoginForm />)

  const submitButton = screen.getByRole('button', { name: /로그인/i })
  await user.click(submitButton)

  expect(screen.getByText(/오류/i)).toBeInTheDocument()
})
```

## 유용한 리소스

- [Bootstrap 공식 문서](https://getbootstrap.com)
- [Bootstrap Icons](https://icons.getbootstrap.com)
- [React-Bootstrap 문서](https://react-bootstrap.github.io)
- [WCAG 2.1 AA 기준](https://www.w3.org/WAI/WCAG21/quickref)

---

**최종 업데이트**: 2025-11-17
**상태**: 프로덕션 완료
**버전**: 1.0.1
**SPEC**: SPEC-AUTH-LOGIN-UI-REDESIGN-001 완료
**테스트 커버리지**: 88.83%
