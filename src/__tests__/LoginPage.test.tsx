import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { LoginPage } from '../pages/LoginPage'
import { AuthProvider } from '../context/AuthContext'

/**
 * LoginPage Tests
 * Tests for login page and form integration
 */

const renderLoginPage = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('LoginPage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should display login page with form', () => {
    renderLoginPage()
    expect(screen.getByText(/daebakcore/i)).toBeInTheDocument()
    expect(screen.getByText(/관리자 로그인/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/이메일/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/비밀번호/i)).toBeInTheDocument()
  })

  it('should display login form with all fields', () => {
    renderLoginPage()
    expect(screen.getByLabelText(/이메일/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/비밀번호/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/기억하기/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /로그인/i })).toBeInTheDocument()
  })

  it('should validate email format on login page', async () => {
    renderLoginPage()
    const emailInput = screen.getByLabelText(/이메일/i)
    const passwordInput = screen.getByLabelText(/비밀번호/i)

    await userEvent.type(emailInput, 'invalid')
    await userEvent.type(passwordInput, 'validpassword')
    await userEvent.click(screen.getByRole('button', { name: /로그인/i }))

    expect(screen.getByText(/올바른 이메일 형식을 입력하세요/i)).toBeInTheDocument()
  })

  it('should validate password length on login page', async () => {
    renderLoginPage()
    const emailInput = screen.getByLabelText(/이메일/i)
    const passwordInput = screen.getByLabelText(/비밀번호/i)

    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'short')
    await userEvent.click(screen.getByRole('button', { name: /로그인/i }))

    expect(screen.getByText(/비밀번호는 최소 8자 이상이어야 합니다/i)).toBeInTheDocument()
  })

  it('should have page title and heading', () => {
    renderLoginPage()
    expect(screen.getByText('daebakcore')).toBeInTheDocument()
    expect(screen.getByText(/관리자 로그인/i)).toBeInTheDocument()
  })
})
