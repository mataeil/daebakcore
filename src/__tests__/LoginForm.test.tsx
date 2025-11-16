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
 * AC-001 to AC-006 Acceptance Criteria Tests
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

  describe('AC-001: Form Rendering with id field', () => {
    it('should render login form with id input field', () => {
      renderLoginForm()
      const idInput = screen.getByLabelText(/아이디/i)
      expect(idInput).toBeInTheDocument()
      expect(idInput).toHaveAttribute('type', 'text')
      expect(idInput).toHaveAttribute('placeholder', 'Enter id')
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
      expect(screen.getByLabelText(/아이디/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/비밀번호/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/기억하기/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /로그인/i })).toBeInTheDocument()
    })
  })

  describe('AC-002: Id field auto focus', () => {
    it('should focus id field on component mount', () => {
      renderLoginForm()
      const idInput = screen.getByLabelText(/아이디/i) as HTMLInputElement

      // Check if it has autoFocus attribute
      expect(idInput).toHaveFocus()
    })
  })

  describe('AC-003: Id validation', () => {
    it('should show id error message for empty id', async () => {
      renderLoginForm()
      const idInput = screen.getByLabelText(/아이디/i)
      const passwordInput = screen.getByLabelText(/비밀번호/i)

      await userEvent.click(passwordInput)

      await waitFor(() => {
        expect(screen.getByText(/필수 입력항목입니다/i)).toBeInTheDocument()
      })
    })

    it('should accept valid id format', async () => {
      renderLoginForm()
      const idInput = screen.getByLabelText(/아이디/i) as HTMLInputElement
      const passwordInput = screen.getByLabelText(/비밀번호/i)

      await userEvent.type(idInput, 'admin')
      await userEvent.click(passwordInput)

      await waitFor(() => {
        expect(idInput.value).toBe('admin')
      })
    })
  })

  describe('AC-004: Password validation (minimum 8 characters)', () => {
    it('should show password error message for password shorter than 8 characters', async () => {
      renderLoginForm()
      const passwordInput = screen.getByLabelText(/비밀번호/i)

      await userEvent.type(passwordInput, 'short')
      await userEvent.click(screen.getByLabelText(/아이디/i))

      await waitFor(() => {
        expect(screen.getByText(/비밀번호는 최소 8자 이상이어야 합니다/i)).toBeInTheDocument()
      })
    })

    it('should clear password error when valid password is entered', async () => {
      renderLoginForm()
      const passwordInput = screen.getByLabelText(/비밀번호/i)

      await userEvent.type(passwordInput, 'short')
      await userEvent.click(screen.getByLabelText(/아이디/i))

      await waitFor(() => {
        expect(screen.getByText(/비밀번호는 최소 8자 이상이어야 합니다/i)).toBeInTheDocument()
      })

      await userEvent.clear(passwordInput)
      await userEvent.type(passwordInput, 'validpassword')
      await userEvent.click(screen.getByLabelText(/아이디/i))

      await waitFor(() => {
        expect(screen.queryByText(/비밀번호는 최소 8자 이상이어야 합니다/i)).not.toBeInTheDocument()
      })
    })
  })

  describe('AC-005: Login success with admin/admin1234', () => {
    it('should successfully login with correct credentials', async () => {
      renderLoginForm()
      const idInput = screen.getByLabelText(/아이디/i)
      const passwordInput = screen.getByLabelText(/비밀번호/i)

      await userEvent.type(idInput, 'admin')
      await userEvent.type(passwordInput, 'admin1234')
      await userEvent.click(screen.getByRole('button', { name: /로그인/i }))

      await waitFor(() => {
        const storedToken = localStorage.getItem(AUTH_STORAGE_KEY)
        expect(storedToken).not.toBeNull()
        const token = JSON.parse(storedToken!)
        expect(token.userId).toBe('admin')
        expect(token.isAuthenticated).toBe(true)
      })
    })
  })

  describe('AC-006: Login failure with invalid credentials', () => {
    it('should show error message for invalid credentials', async () => {
      renderLoginForm()
      const idInput = screen.getByLabelText(/아이디/i)
      const passwordInput = screen.getByLabelText(/비밀번호/i)

      await userEvent.type(idInput, 'admin')
      await userEvent.type(passwordInput, 'wrongpassword')
      await userEvent.click(screen.getByRole('button', { name: /로그인/i }))

      await waitFor(() => {
        expect(screen.getByText(/아이디 또는 비밀번호가 일치하지 않습니다/i)).toBeInTheDocument()
      })
    })

    it('should not set auth token for invalid credentials', async () => {
      renderLoginForm()
      const idInput = screen.getByLabelText(/아이디/i)
      const passwordInput = screen.getByLabelText(/비밀번호/i)

      await userEvent.type(idInput, 'wrongid')
      await userEvent.type(passwordInput, 'admin1234')
      await userEvent.click(screen.getByRole('button', { name: /로그인/i }))

      await waitFor(() => {
        expect(localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull()
      })
    })
  })

  describe('Form state management', () => {
    it('should update id input value on change', async () => {
      renderLoginForm()
      const idInput = screen.getByLabelText(/아이디/i) as HTMLInputElement

      await userEvent.type(idInput, 'testuser')

      expect(idInput.value).toBe('testuser')
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

  describe('Button state management', () => {
    it('should disable login button when id is empty', async () => {
      renderLoginForm()
      const loginButton = screen.getByRole('button', { name: /로그인/i })
      const passwordInput = screen.getByLabelText(/비밀번호/i)

      await userEvent.type(passwordInput, 'validpassword123')

      expect(loginButton).toBeDisabled()
    })

    it('should disable login button when password is empty', async () => {
      renderLoginForm()
      const loginButton = screen.getByRole('button', { name: /로그인/i })
      const idInput = screen.getByLabelText(/아이디/i)

      await userEvent.type(idInput, 'admin')

      expect(loginButton).toBeDisabled()
    })

    it('should enable login button when valid id and password are entered', async () => {
      renderLoginForm()
      const loginButton = screen.getByRole('button', { name: /로그인/i })
      const idInput = screen.getByLabelText(/아이디/i)
      const passwordInput = screen.getByLabelText(/비밀번호/i)

      await userEvent.type(idInput, 'admin')
      await userEvent.type(passwordInput, 'admin1234')

      expect(loginButton).not.toBeDisabled()
    })
  })
})
