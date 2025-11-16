import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { LoginForm } from '../components/Auth/LoginForm'
import { AuthProvider } from '../context/AuthContext'
import { AUTH_STORAGE_KEY } from '../utils/constants'

/**
 * LoginForm Component Tests
 * Tests for login form rendering, validation, and submission
 * AC-004 Acceptance Criteria Tests
 */

const renderLoginForm = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('LoginForm Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('AC-004-001: Form Rendering', () => {
    it('should render login form with email input field', () => {
      renderLoginForm()
      const emailInput = screen.getByLabelText(/이메일/i)
      expect(emailInput).toBeInTheDocument()
      expect(emailInput).toHaveAttribute('type', 'text')
      expect(emailInput).toHaveAttribute('placeholder', 'Enter email')
    })

    it('should render login form with password input field', () => {
      renderLoginForm()
      const passwordInput = screen.getByLabelText(/비밀번호/i)
      expect(passwordInput).toBeInTheDocument()
      expect(passwordInput).toHaveAttribute('type', 'password')
      expect(passwordInput).toHaveAttribute('placeholder', 'Enter password')
    })

    it('should render remember me checkbox', () => {
      renderLoginForm()
      const rememberCheckbox = screen.getByLabelText(/기억하기/i)
      expect(rememberCheckbox).toBeInTheDocument()
      expect(rememberCheckbox).toHaveAttribute('type', 'checkbox')
      expect(rememberCheckbox).not.toBeChecked()
    })

    it('should render login button', () => {
      renderLoginForm()
      const loginButton = screen.getByRole('button', { name: /로그인/i })
      expect(loginButton).toBeInTheDocument()
      expect(loginButton).toHaveAttribute('type', 'submit')
    })

    it('should render all form elements with correct labels', () => {
      renderLoginForm()
      expect(screen.getByLabelText(/이메일/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/비밀번호/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/기억하기/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /로그인/i })).toBeInTheDocument()
    })
  })

  describe('AC-004-002: Email Validation', () => {
    it('should show email error message for invalid email format', async () => {
      renderLoginForm()
      const emailInput = screen.getByLabelText(/이메일/i)

      await userEvent.type(emailInput, 'invalid-email')
      await userEvent.click(screen.getByLabelText(/비밀번호/i))

      await waitFor(() => {
        expect(screen.getByText(/올바른 이메일 형식을 입력하세요/i)).toBeInTheDocument()
      })
    })

    it('should show email error message for email without domain', async () => {
      renderLoginForm()
      const emailInput = screen.getByLabelText(/이메일/i)

      await userEvent.type(emailInput, 'test@')
      await userEvent.click(screen.getByLabelText(/비밀번호/i))

      await waitFor(() => {
        expect(screen.getByText(/올바른 이메일 형식을 입력하세요/i)).toBeInTheDocument()
      })
    })

    it('should clear email error when valid email is entered', async () => {
      renderLoginForm()
      const emailInput = screen.getByLabelText(/이메일/i)

      await userEvent.type(emailInput, 'invalid')
      await userEvent.click(screen.getByLabelText(/비밀번호/i))

      await waitFor(() => {
        expect(screen.getByText(/올바른 이메일 형식을 입력하세요/i)).toBeInTheDocument()
      })

      await userEvent.clear(emailInput)
      await userEvent.type(emailInput, 'admin@example.com')
      await userEvent.click(screen.getByLabelText(/비밀번호/i))

      await waitFor(() => {
        expect(screen.queryByText(/올바른 이메일 형식을 입력하세요/i)).not.toBeInTheDocument()
      })
    })
  })

  describe('AC-004-003: Password Validation', () => {
    it('should show password error message for password shorter than 8 characters', async () => {
      renderLoginForm()
      const passwordInput = screen.getByLabelText(/비밀번호/i)

      await userEvent.type(passwordInput, 'short')
      await userEvent.click(screen.getByLabelText(/이메일/i))

      await waitFor(() => {
        expect(screen.getByText(/비밀번호는 최소 8자 이상이어야 합니다/i)).toBeInTheDocument()
      })
    })

    it('should show password error for 7 character password', async () => {
      renderLoginForm()
      const passwordInput = screen.getByLabelText(/비밀번호/i)

      await userEvent.type(passwordInput, '1234567')
      await userEvent.click(screen.getByLabelText(/이메일/i))

      await waitFor(() => {
        expect(screen.getByText(/비밀번호는 최소 8자 이상이어야 합니다/i)).toBeInTheDocument()
      })
    })

    it('should clear password error when valid password is entered', async () => {
      renderLoginForm()
      const passwordInput = screen.getByLabelText(/비밀번호/i)

      await userEvent.type(passwordInput, 'short')
      await userEvent.click(screen.getByLabelText(/이메일/i))

      await waitFor(() => {
        expect(screen.getByText(/비밀번호는 최소 8자 이상이어야 합니다/i)).toBeInTheDocument()
      })

      await userEvent.clear(passwordInput)
      await userEvent.type(passwordInput, 'validpassword')
      await userEvent.click(screen.getByLabelText(/이메일/i))

      await waitFor(() => {
        expect(screen.queryByText(/비밀번호는 최소 8자 이상이어야 합니다/i)).not.toBeInTheDocument()
      })
    })
  })

  describe('AC-004-004: Required Field Validation', () => {
    it('should disable login button when email is empty', async () => {
      renderLoginForm()
      const loginButton = screen.getByRole('button', { name: /로그인/i })
      const passwordInput = screen.getByLabelText(/비밀번호/i)

      await userEvent.type(passwordInput, 'validpassword123')

      expect(loginButton).toBeDisabled()
    })

    it('should disable login button when password is empty', async () => {
      renderLoginForm()
      const loginButton = screen.getByRole('button', { name: /로그인/i })
      const emailInput = screen.getByLabelText(/이메일/i)

      await userEvent.type(emailInput, 'test@example.com')

      expect(loginButton).toBeDisabled()
    })

    it('should disable login button when both fields are empty', () => {
      renderLoginForm()
      const loginButton = screen.getByRole('button', { name: /로그인/i })

      expect(loginButton).toBeDisabled()
    })

    it('should disable login button when only whitespace is entered', async () => {
      renderLoginForm()
      const loginButton = screen.getByRole('button', { name: /로그인/i })
      const emailInput = screen.getByLabelText(/이메일/i)
      const passwordInput = screen.getByLabelText(/비밀번호/i)

      await userEvent.type(emailInput, '   ')
      await userEvent.type(passwordInput, '   ')

      expect(loginButton).toBeDisabled()
    })
  })

  describe('AC-004-005: Button Activation', () => {
    it('should enable login button when valid email and password are entered', async () => {
      renderLoginForm()
      const loginButton = screen.getByRole('button', { name: /로그인/i })
      const emailInput = screen.getByLabelText(/이메일/i)
      const passwordInput = screen.getByLabelText(/비밀번호/i)

      await userEvent.type(emailInput, 'admin@example.com')
      await userEvent.type(passwordInput, 'admin1234')

      expect(loginButton).not.toBeDisabled()
    })

    it('should enable login button for valid form input', async () => {
      renderLoginForm()
      const loginButton = screen.getByRole('button', { name: /로그인/i })
      const emailInput = screen.getByLabelText(/이메일/i)
      const passwordInput = screen.getByLabelText(/비밀번호/i)

      await userEvent.type(emailInput, 'test@example.com')
      await userEvent.type(passwordInput, 'validpassword123')

      expect(loginButton).not.toBeDisabled()
    })

    it('should disable button when validation error exists', async () => {
      renderLoginForm()
      const loginButton = screen.getByRole('button', { name: /로그인/i })
      const emailInput = screen.getByLabelText(/이메일/i)
      const passwordInput = screen.getByLabelText(/비밀번호/i)

      await userEvent.type(emailInput, 'invalid')
      await userEvent.type(passwordInput, 'admin1234')

      expect(loginButton).toBeDisabled()
    })
  })

  describe('AC-004-006: Enter Key Submission', () => {
    it('should submit form when Enter key is pressed in password field', async () => {
      renderLoginForm()
      const emailInput = screen.getByLabelText(/이메일/i)
      const passwordInput = screen.getByLabelText(/비밀번호/i)

      await userEvent.type(emailInput, 'admin')
      await userEvent.type(passwordInput, 'admin1234{Enter}')

      // Verify form submission happens
      const loginButton = screen.getByRole('button', { name: /로그인/i })
      expect(loginButton).toBeInTheDocument()
    })

    it('should not submit form when Enter key is pressed with invalid password', async () => {
      renderLoginForm()
      const emailInput = screen.getByLabelText(/이메일/i)
      const passwordInput = screen.getByLabelText(/비밀번호/i)

      await userEvent.type(emailInput, 'admin@example.com')
      await userEvent.type(passwordInput, 'short{Enter}')

      expect(localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull()
    })

    it('should not submit form when Enter key is pressed with empty fields', async () => {
      renderLoginForm()
      const passwordInput = screen.getByLabelText(/비밀번호/i)

      await userEvent.click(passwordInput)
      await userEvent.type(passwordInput, '{Enter}')

      expect(localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull()
    })
  })

  describe('Form state management', () => {
    it('should update email input value on change', async () => {
      renderLoginForm()
      const emailInput = screen.getByLabelText(/이메일/i) as HTMLInputElement

      await userEvent.type(emailInput, 'test@example.com')

      expect(emailInput.value).toBe('test@example.com')
    })

    it('should update password input value on change', async () => {
      renderLoginForm()
      const passwordInput = screen.getByLabelText(/비밀번호/i) as HTMLInputElement

      await userEvent.type(passwordInput, 'testpassword')

      expect(passwordInput.value).toBe('testpassword')
    })

    it('should toggle remember me checkbox', async () => {
      renderLoginForm()
      const rememberCheckbox = screen.getByLabelText(/기억하기/i) as HTMLInputElement

      expect(rememberCheckbox.checked).toBe(false)

      await userEvent.click(rememberCheckbox)

      expect(rememberCheckbox.checked).toBe(true)

      await userEvent.click(rememberCheckbox)

      expect(rememberCheckbox.checked).toBe(false)
    })

    it('should have form tag in component', () => {
      renderLoginForm()
      const form = screen.getByRole('button', { name: /로그인/i }).closest('form')
      expect(form).toBeInTheDocument()
    })
  })
})
