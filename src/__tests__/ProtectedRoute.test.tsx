import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from '../components/Auth/ProtectedRoute'
import { AuthProvider } from '../context/AuthContext'
import { AUTH_STORAGE_KEY } from '../utils/constants'

const TestContent = () => <div>Protected Content</div>

describe('ProtectedRoute', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should render children when user is authenticated', () => {
    const token = {
      userId: 'admin',
      userName: 'Admin',
      isAuthenticated: true,
    }
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(token))

    render(
      <BrowserRouter>
        <AuthProvider>
          <ProtectedRoute>
            <TestContent />
          </ProtectedRoute>
        </AuthProvider>
      </BrowserRouter>
    )

    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })

  it('should redirect to login when user is not authenticated', () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ProtectedRoute>
            <TestContent />
          </ProtectedRoute>
        </AuthProvider>
      </BrowserRouter>
    )

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })
})
