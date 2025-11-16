import '@testing-library/jest-dom'
import { render, screen, getAllByRole } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { Navbar } from '../components/Layout/Navbar'
import { AuthProvider } from '../context/AuthContext'

/**
 * Navbar Component Tests
 * AC-007 to AC-011 Acceptance Criteria Tests
 */

const renderNavbar = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('Navbar Component', () => {
  describe('AC-007: Navbar Rendering', () => {
    it('should render navbar with daebakcore logo', () => {
      renderNavbar()
      const logo = screen.getByText(/daebakcore/i)
      expect(logo).toBeInTheDocument()
    })

    it('should render navbar with dark background', () => {
      renderNavbar()
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('navbar-dark')
      expect(nav).toHaveClass('bg-dark')
    })

    it('should render navbar with sticky-top class', () => {
      renderNavbar()
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('sticky-top')
    })

    it('should render logged-in user name', () => {
      renderNavbar()
      const userName = screen.getByText(/Admin/i)
      expect(userName).toBeInTheDocument()
    })
  })

  describe('AC-008: Dropdown Menu (Profile)', () => {
    it('should render dropdown menu button', () => {
      renderNavbar()
      const dropdownButton = screen.getByRole('button', { name: /Admin/i })
      expect(dropdownButton).toBeInTheDocument()
    })

    it('should render logout button in dropdown menu', () => {
      renderNavbar()
      const logoutButtons = screen.getAllByRole('button', { name: /로그아웃/i })
      expect(logoutButtons.length).toBeGreaterThan(0)
    })

    it('should have dropdown styling', () => {
      renderNavbar()
      const dropdownButton = screen.getByRole('button', { name: /Admin/i })
      expect(dropdownButton).toHaveClass('dropdown-toggle')
    })
  })

  describe('AC-009: Logout Button Functionality', () => {
    it('should have logout buttons (dropdown and independent)', () => {
      renderNavbar()
      const logoutButtons = screen.getAllByRole('button', { name: /로그아웃/i })
      expect(logoutButtons.length).toBe(2)
    })
  })

  describe('AC-010: Mobile Menu Button', () => {
    it('should render mobile menu toggle button on small screens', () => {
      renderNavbar()
      const toggler = screen.getByRole('button', { name: /Toggle navigation/i })
      expect(toggler).toBeInTheDocument()
    })

    it('should have correct aria-label for accessibility', () => {
      renderNavbar()
      const toggler = screen.getByRole('button', { name: /Toggle navigation/i })
      expect(toggler).toHaveAttribute('aria-label', 'Toggle navigation')
    })
  })

  describe('AC-011: Responsive Navbar', () => {
    it('should have Bootstrap navbar classes', () => {
      renderNavbar()
      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('navbar')
      expect(nav).toHaveClass('navbar-expand-lg')
    })

    it('should render navbar-brand with logo', () => {
      renderNavbar()
      const brand = screen.getByText(/daebakcore/i).closest('.navbar-brand')
      expect(brand).toBeInTheDocument()
    })
  })
})
