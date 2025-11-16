import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { Header } from '../components/Layout/Header'
import { Sidebar } from '../components/Layout/Sidebar'
import { MainLayout } from '../components/Layout/MainLayout'
import { AuthProvider } from '../context/AuthContext'
import { AUTH_STORAGE_KEY } from '../utils/constants'

/**
 * Layout Component Tests
 * Tests for Header, Sidebar, and MainLayout components
 * AC-Layout Acceptance Criteria Tests
 */

const renderWithAuth = (component: React.ReactNode) => {
  const token = {
    userId: 'admin',
    userName: 'Admin',
    isAuthenticated: true,
    rememberMe: false,
    timestamp: Date.now(),
  }
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(token))

  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('Layout Components', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('AC-Layout-001: Header Logo Display', () => {
    it('should render header with logo text', () => {
      renderWithAuth(<Header />)
      expect(screen.getByText('daebakcore')).toBeInTheDocument()
    })

    it('should display logo in header banner', () => {
      renderWithAuth(<Header />)
      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
      expect(header).toHaveTextContent('daebakcore')
    })

    it('should have logo with proper styling', () => {
      renderWithAuth(<Header />)
      const logo = screen.getByText('daebakcore')
      expect(logo).toBeInTheDocument()
      expect(logo.className).toContain('font-bold')
    })
  })

  describe('AC-Layout-002: Header User Name Display', () => {
    it('should display user name in header', () => {
      renderWithAuth(<Header />)
      expect(screen.getByText(/사용자: Admin/i)).toBeInTheDocument()
    })

    it('should show user name with proper format', () => {
      renderWithAuth(<Header />)
      const userInfo = screen.getByText(/사용자: Admin/i)
      expect(userInfo).toBeInTheDocument()
    })

    it('should render user info in header element', () => {
      renderWithAuth(<Header />)
      const header = screen.getByRole('banner')
      expect(header).toHaveTextContent('사용자: Admin')
    })
  })

  describe('AC-Layout-003: Header Logout Button', () => {
    it('should render logout button in header', () => {
      renderWithAuth(<Header />)
      const logoutButton = screen.getByRole('button', { name: /로그아웃/i })
      expect(logoutButton).toBeInTheDocument()
    })

    it('should execute logout when logout button is clicked', async () => {
      renderWithAuth(<Header />)
      const logoutButton = screen.getByRole('button', { name: /로그아웃/i })
      await userEvent.click(logoutButton)

      await waitFor(() => {
        expect(localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull()
      })
    })

    it('should clear auth token on logout', async () => {
      renderWithAuth(<Header />)
      expect(localStorage.getItem(AUTH_STORAGE_KEY)).toBeTruthy()

      const logoutButton = screen.getByRole('button', { name: /로그아웃/i })
      await userEvent.click(logoutButton)

      await waitFor(() => {
        expect(localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull()
      })
    })

    it('should have logout button styled correctly', () => {
      renderWithAuth(<Header />)
      const logoutButton = screen.getByRole('button', { name: /로그아웃/i })
      expect(logoutButton.className).toContain('bg-blue')
    })
  })

  describe('AC-Layout-004: Sidebar Menu Display', () => {
    it('should render sidebar navigation', () => {
      const { container } = renderWithAuth(<Sidebar />)
      const navs = container.querySelectorAll('nav')
      expect(navs.length).toBeGreaterThan(0)
    })

    it('should display dashboard menu item in sidebar', () => {
      renderWithAuth(<Sidebar />)
      expect(screen.getByText(/대시보드/i)).toBeInTheDocument()
    })

    it('should have dashboard link in sidebar', () => {
      renderWithAuth(<Sidebar />)
      const dashboardLink = screen.getByRole('link', { name: /대시보드/i })
      expect(dashboardLink).toBeInTheDocument()
      expect(dashboardLink).toHaveAttribute('href', '/dashboard')
    })

    it('should have navigation structure', () => {
      renderWithAuth(<Sidebar />)
      const dashboardLink = screen.getByRole('link', { name: /대시보드/i })
      expect(dashboardLink).toBeInTheDocument()
    })
  })

  describe('AC-Layout-005: Mobile Sidebar Toggle', () => {
    it('should render toggle button on mobile', () => {
      renderWithAuth(<Sidebar />)
      const toggleButton = screen.getByRole('button', { name: /☰/i })
      expect(toggleButton).toBeInTheDocument()
    })

    it('should have toggle button with menu icon', () => {
      renderWithAuth(<Sidebar />)
      const toggleButton = screen.getByRole('button', { name: /☰/i })
      expect(toggleButton).toBeInTheDocument()
      expect(toggleButton.textContent).toBe('☰')
    })

    it('should have toggle button styled for mobile', () => {
      renderWithAuth(<Sidebar />)
      const toggleButton = screen.getByRole('button', { name: /☰/i })
      expect(toggleButton.className).toContain('md:hidden')
    })

    it('should be clickable without errors', async () => {
      renderWithAuth(<Sidebar />)
      const toggleButton = screen.getByRole('button', { name: /☰/i })
      await userEvent.click(toggleButton)
      expect(toggleButton).toBeInTheDocument()
    })

    it('should handle multiple toggle clicks', async () => {
      renderWithAuth(<Sidebar />)
      const toggleButton = screen.getByRole('button', { name: /☰/i })
      await userEvent.click(toggleButton)
      await userEvent.click(toggleButton)
      await userEvent.click(toggleButton)
      expect(toggleButton).toBeInTheDocument()
    })
  })

  describe('MainLayout Component', () => {
    it('should render main layout with header and sidebar', () => {
      renderWithAuth(
        <MainLayout>
          <div>Test Content</div>
        </MainLayout>
      )

      expect(screen.getByRole('banner')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('should render children in main element', () => {
      renderWithAuth(
        <MainLayout>
          <div>Dashboard Content</div>
        </MainLayout>
      )

      const mainElement = screen.getByRole('main')
      expect(mainElement).toBeInTheDocument()
      expect(mainElement).toHaveTextContent('Dashboard Content')
    })

    it('should have proper layout structure', () => {
      const { container } = renderWithAuth(
        <MainLayout>
          <div>Content</div>
        </MainLayout>
      )

      const flexContainer = container.querySelector('.flex.flex-col')
      expect(flexContainer).toBeInTheDocument()
    })

    it('should render all layout components together', () => {
      renderWithAuth(<MainLayout><div>Test</div></MainLayout>)
      expect(screen.getByRole('banner')).toBeInTheDocument()
      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByText('daebakcore')).toBeInTheDocument()
    })
  })

  describe('Header and Sidebar Integration', () => {
    it('should display both header and sidebar in main layout', () => {
      renderWithAuth(
        <MainLayout>
          <div>Content</div>
        </MainLayout>
      )

      expect(screen.getByRole('banner')).toBeInTheDocument()
      expect(screen.getByText('daebakcore')).toBeInTheDocument()
      expect(screen.getByText(/대시보드/i)).toBeInTheDocument()
    })

    it('should show user info in header', () => {
      renderWithAuth(
        <MainLayout>
          <div>Content</div>
        </MainLayout>
      )

      expect(screen.getByText(/사용자: Admin/i)).toBeInTheDocument()
    })

    it('should have logout button in header and menu in sidebar', () => {
      renderWithAuth(
        <MainLayout>
          <div>Content</div>
        </MainLayout>
      )

      expect(screen.getByRole('button', { name: /로그아웃/i })).toBeInTheDocument()
      expect(screen.getByText(/대시보드/i)).toBeInTheDocument()
    })
  })
})
