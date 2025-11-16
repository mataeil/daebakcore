import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthProvider, useAuth } from '../context/AuthContext'
import { AUTH_STORAGE_KEY } from '../utils/constants'

const TestComponent = () => {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <div>
      <div data-testid="auth-status">
        {isAuthenticated ? `Authenticated: ${user?.name}` : 'Not authenticated'}
      </div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should initialize with unauthenticated state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Not authenticated')
  })

  it('should load auth token from localStorage on mount', () => {
    const token = {
      userId: 'admin',
      userName: 'Admin',
      isAuthenticated: true,
      rememberMe: true,
    }
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(token))

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated: Admin')
  })

  it('should clear token on logout', async () => {
    const token = {
      userId: 'admin',
      userName: 'Admin',
      isAuthenticated: true,
    }
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(token))

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated: Admin')

    const logoutButton = screen.getByRole('button', { name: /Logout/i })
    await userEvent.click(logoutButton)

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Not authenticated')
    })
    expect(localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull()
  })
})
