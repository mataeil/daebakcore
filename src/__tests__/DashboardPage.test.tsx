import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DashboardPage } from '../pages/DashboardPage'
import { AuthProvider } from '../context/AuthContext'
import { ProtectedRoute } from '../components/Auth/ProtectedRoute'
import { MainLayout } from '../components/Layout/MainLayout'
import { AUTH_STORAGE_KEY } from '../utils/constants'

/**
 * DashboardPage Component Tests
 * Tests for dashboard page accessibility and content
 * AC-Dashboard Acceptance Criteria Tests
 */

const renderProtectedDashboard = () => {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <ProtectedRoute>
          <MainLayout>
            <DashboardPage />
          </MainLayout>
        </ProtectedRoute>
      </AuthProvider>
    </MemoryRouter>
  )
}

const renderDashboardWithAuth = () => {
  const token = {
    userId: 'admin',
    userName: 'Admin',
    isAuthenticated: true,
    rememberMe: false,
    timestamp: Date.now(),
  }
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(token))

  return render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <AuthProvider>
        <ProtectedRoute>
          <MainLayout>
            <DashboardPage />
          </MainLayout>
        </ProtectedRoute>
      </AuthProvider>
    </MemoryRouter>
  )
}

describe('DashboardPage Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('AC-Dashboard-001: Unauthenticated Redirect', () => {
    it('should not render dashboard when user is not authenticated', () => {
      renderProtectedDashboard()
      expect(screen.queryByText(/환영합니다/i)).not.toBeInTheDocument()
    })

    it('should not display user information when not authenticated', () => {
      renderProtectedDashboard()
      expect(screen.queryByText(/ID: admin/i)).not.toBeInTheDocument()
    })

    it('should protect dashboard from unauthenticated access', () => {
      const { container } = renderProtectedDashboard()
      expect(container).toBeTruthy()
    })
  })

  describe('AC-Dashboard-002: Authenticated Access', () => {
    it('should display dashboard when user is authenticated', () => {
      renderDashboardWithAuth()
      expect(screen.getByText(/환영합니다/i)).toBeInTheDocument()
    })

    it('should render main layout when authenticated', () => {
      renderDashboardWithAuth()
      expect(screen.getByRole('banner')).toBeInTheDocument()
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('should display dashboard title with proper greeting', () => {
      renderDashboardWithAuth()
      expect(screen.getByText(/환영합니다, Admin!/i)).toBeInTheDocument()
    })

    it('should display confirmation message for authenticated user', () => {
      renderDashboardWithAuth()
      expect(screen.getByText(/daebakcore 관리 시스템에 로그인되었습니다/i)).toBeInTheDocument()
    })
  })

  describe('AC-Dashboard-003: User Information Display', () => {
    it('should display user name on dashboard', () => {
      renderDashboardWithAuth()
      expect(screen.getByText(/환영합니다, Admin!/i)).toBeInTheDocument()
    })

    it('should display user info section', () => {
      renderDashboardWithAuth()
      expect(screen.getByText(/정보/i)).toBeInTheDocument()
    })

    it('should display user ID in info card', () => {
      renderDashboardWithAuth()
      expect(screen.getByText(/ID: admin/i)).toBeInTheDocument()
    })

    it('should have proper dashboard structure', () => {
      const { container } = renderDashboardWithAuth()
      expect(container).toBeTruthy()
      expect(screen.getByRole('main')).toBeInTheDocument()
    })
  })

  describe('Dashboard content rendering', () => {
    it('should render dashboard content in main element', () => {
      renderDashboardWithAuth()
      const mainElement = screen.getByRole('main')
      expect(mainElement).toBeInTheDocument()
    })

    it('should display info card', () => {
      renderDashboardWithAuth()
      expect(screen.getByText(/정보/i)).toBeInTheDocument()
    })

    it('should have heading with proper greeting', () => {
      renderDashboardWithAuth()
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading.textContent).toContain('Admin')
    })
  })
})
