import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { Navbar } from '../components/Layout/Navbar'
import { Sidebar } from '../components/Layout/Sidebar'
import { MainLayout } from '../components/Layout/MainLayout'
import { AuthProvider } from '../context/AuthContext'
import { AUTH_STORAGE_KEY } from '../utils/constants'

/**
 * Layout Component Tests
 * Tests for Navbar, Sidebar, and MainLayout components
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

  describe('AC-Layout-001: Navbar Logo Display', () => {
    it('should render navbar with logo text', () => {
      renderWithAuth(<Navbar />)
      expect(screen.getByText('daebakcore')).toBeInTheDocument()
    })

    it('should display logo in navbar', () => {
      renderWithAuth(<Navbar />)
      const navbar = screen.getByRole('navigation')
      expect(navbar).toBeInTheDocument()
      expect(navbar).toHaveTextContent('daebakcore')
    })

    it('should have Bootstrap navbar classes', () => {
      renderWithAuth(<Navbar />)
      const navbar = screen.getByRole('navigation')
      expect(navbar).toHaveClass('navbar')
      expect(navbar).toHaveClass('navbar-dark')
    })
  })

  describe('AC-Layout-002: Navbar User Name Display', () => {
    it('should display user name in navbar', () => {
      renderWithAuth(<Navbar />)
      expect(screen.getByText(/Admin/i)).toBeInTheDocument()
    })

    it('should show user name in dropdown', () => {
      renderWithAuth(<Navbar />)
      const userButton = screen.getByRole('button', { name: /Admin/i })
      expect(userButton).toBeInTheDocument()
    })
  })

  describe('AC-Layout-003: Navbar Logout Button', () => {
    it('should render logout buttons in navbar', () => {
      renderWithAuth(<Navbar />)
      const logoutButtons = screen.getAllByRole('button', { name: /로그아웃/i })
      expect(logoutButtons.length).toBeGreaterThan(0)
    })

    it('should execute logout when logout button is clicked', async () => {
      renderWithAuth(<Navbar />)
      const logoutButtons = screen.getAllByRole('button', { name: /로그아웃/i })
      await userEvent.click(logoutButtons[0])

      await waitFor(() => {
        expect(localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull()
      })
    })
  })

  describe('AC-Layout-004: Sidebar Menu Display', () => {
    it('should render sidebar navigation', () => {
      const { container } = renderWithAuth(<Sidebar />)
      const navs = container.querySelectorAll('nav')
      expect(navs.length).toBeGreaterThan(0)
    })

    it('should display menu items in sidebar', () => {
      renderWithAuth(<Sidebar />)
      expect(screen.getAllByText(/Dashboard/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Reports/i).length).toBeGreaterThan(0)
    })

    it('should have offcanvas structure', () => {
      const { container } = renderWithAuth(<Sidebar />)
      const offcanvas = container.querySelector('.offcanvas')
      expect(offcanvas).toBeInTheDocument()
    })
  })

  describe('MainLayout Component', () => {
    it('should render main layout with navbar and sidebar', () => {
      renderWithAuth(
        <MainLayout>
          <div>Test Content</div>
        </MainLayout>
      )

      const navs = screen.getAllByRole('navigation')
      expect(navs.length).toBeGreaterThan(0)
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
      const navs = screen.getAllByRole('navigation')
      expect(navs.length).toBeGreaterThan(0)
      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByText('daebakcore')).toBeInTheDocument()
    })
  })

  describe('Navbar and Sidebar Integration', () => {
    it('should display both navbar and sidebar in main layout', () => {
      renderWithAuth(
        <MainLayout>
          <div>Content</div>
        </MainLayout>
      )

      const navs = screen.getAllByRole('navigation')
      expect(navs.length).toBeGreaterThan(0)
      expect(screen.getByText('daebakcore')).toBeInTheDocument()
      expect(screen.getAllByText(/Dashboard/i).length).toBeGreaterThan(0)
    })

    it('should show user info in navbar', () => {
      renderWithAuth(
        <MainLayout>
          <div>Content</div>
        </MainLayout>
      )

      expect(screen.getByText(/Admin/i)).toBeInTheDocument()
    })

    it('should have logout buttons in navbar and menu in sidebar', () => {
      renderWithAuth(
        <MainLayout>
          <div>Content</div>
        </MainLayout>
      )

      const logoutButtons = screen.getAllByRole('button', { name: /로그아웃/i })
      expect(logoutButtons.length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Dashboard/i).length).toBeGreaterThan(0)
    })
  })
})
