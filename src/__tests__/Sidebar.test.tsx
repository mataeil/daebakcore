import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Sidebar } from '../components/Layout/Sidebar'
import { AuthProvider } from '../context/AuthContext'

/**
 * Sidebar Component Tests
 * AC-012 to AC-015 Acceptance Criteria Tests
 */

const renderSidebar = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Sidebar />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('Sidebar Component', () => {
  describe('AC-012: Sidebar Rendering', () => {
    it('should render sidebar container', () => {
      renderSidebar()
      const sidebar = document.querySelector('aside')
      expect(sidebar).toBeInTheDocument()
    })

    it('should render menu items', () => {
      renderSidebar()
      expect(screen.getAllByText(/Dashboard/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Reports/i).length).toBeGreaterThan(0)
      expect(screen.getAllByText(/Settings/i).length).toBeGreaterThan(0)
    })

    it('should have fixed sidebar on large screens', () => {
      renderSidebar()
      const sidebar = document.querySelector('.d-none.d-lg-block')
      expect(sidebar).toBeInTheDocument()
    })
  })

  describe('AC-013: Active Menu Highlight', () => {
    it('should highlight active menu item', () => {
      renderSidebar()
      const links = screen.getAllByText(/Dashboard/i)
      const activeLink = links.find(link => link.closest('a')?.classList.contains('active'))
      expect(activeLink).toBeDefined()
    })

    it('should have correct active class styling', () => {
      renderSidebar()
      const dashboardLinks = screen.getAllByText(/Dashboard/i)
      dashboardLinks.forEach(link => {
        const anchor = link.closest('a')
        if (anchor?.classList.contains('active')) {
          expect(anchor).toHaveClass('nav-link')
          expect(anchor).toHaveClass('active')
        }
      })
    })
  })

  describe('AC-014: Menu Link Functionality', () => {
    it('should render dashboard link', () => {
      renderSidebar()
      const dashboardLinks = screen.getAllByText(/Dashboard/i)
      expect(dashboardLinks.some(link => link.closest('a')?.href.includes('/dashboard'))).toBe(true)
    })

    it('should render reports link', () => {
      renderSidebar()
      const reportsLinks = screen.getAllByText(/Reports/i)
      expect(reportsLinks.some(link => link.closest('a')?.href.includes('/reports'))).toBe(true)
    })

    it('should render settings link', () => {
      renderSidebar()
      const settingsLinks = screen.getAllByText(/Settings/i)
      expect(settingsLinks.some(link => link.closest('a')?.href.includes('/settings'))).toBe(true)
    })
  })

  describe('AC-015: Offcanvas on Mobile', () => {
    it('should have offcanvas styling', () => {
      renderSidebar()
      const offcanvas = document.querySelector('.offcanvas')
      expect(offcanvas).toHaveClass('offcanvas-start')
    })

    it('should have nav list styling', () => {
      renderSidebar()
      const navList = document.querySelector('.nav')
      expect(navList).toHaveClass('nav')
      expect(navList).toHaveClass('flex-column')
    })
  })

  describe('Menu Items Structure', () => {
    it('should render all menu items in list', () => {
      renderSidebar()
      const menuItems = screen.getAllByRole('link')
      expect(menuItems.length).toBeGreaterThanOrEqual(3)
    })

    it('should have proper navigation structure', () => {
      renderSidebar()
      const nav = document.querySelector('nav')
      expect(nav).toBeInTheDocument()
      expect(nav?.classList.contains('nav')).toBe(true)
    })
  })
})
