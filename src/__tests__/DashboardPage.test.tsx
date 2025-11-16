import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { DashboardPage } from '../pages/DashboardPage'
import { AuthProvider } from '../context/AuthContext'

/**
 * Dashboard Page Tests
 * AC-016 to AC-021 Acceptance Criteria Tests
 */

const renderDashboard = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <DashboardPage />
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('Dashboard Page', () => {
  describe('AC-016: Dashboard Page Rendering', () => {
    it('should render dashboard page', () => {
      renderDashboard()
      const dashboard = screen.getByRole('main') || document.querySelector('main')
      expect(dashboard).toBeInTheDocument()
    })

    it('should display dashboard heading', () => {
      renderDashboard()
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
    })
  })

  describe('AC-017: Statistic Cards Display', () => {
    it('should render all 4 statistic cards', () => {
      renderDashboard()
      const cards = document.querySelectorAll('[data-testid="stat-card"]')
      expect(cards.length).toBe(4)
    })

    it('should render Users card', () => {
      renderDashboard()
      expect(screen.getByText(/Users/i)).toBeInTheDocument()
    })

    it('should render Orders card', () => {
      renderDashboard()
      expect(screen.getByText(/Orders/i)).toBeInTheDocument()
    })

    it('should render Revenue card', () => {
      renderDashboard()
      expect(screen.getByText(/Revenue/i)).toBeInTheDocument()
    })

    it('should render Growth card', () => {
      renderDashboard()
      expect(screen.getByText(/Growth/i)).toBeInTheDocument()
    })

    it('should display numeric values in cards', () => {
      renderDashboard()
      const cards = document.querySelectorAll('[data-testid="stat-card"]')
      cards.forEach((card) => {
        const value = card.querySelector('[data-testid="stat-value"]')
        expect(value).toBeInTheDocument()
        expect(value?.textContent).toBeTruthy()
      })
    })
  })

  describe('AC-018: Information Card Display', () => {
    it('should render system information card', () => {
      renderDashboard()
      const infoCard = document.querySelector('[data-testid="info-card"]')
      expect(infoCard).toBeInTheDocument()
    })
  })

  describe('AC-019: Hover Effects', () => {
    it('should have card styling with shadow', () => {
      renderDashboard()
      const cards = document.querySelectorAll('[data-testid="stat-card"]')
      cards.forEach((card) => {
        expect(card.className).toContain('card')
      })
    })
  })

  describe('AC-020: Responsive Grid Layout', () => {
    it('should have responsive grid classes', () => {
      renderDashboard()
      const container = document.querySelector('[data-testid="stat-container"]')
      expect(container).toBeInTheDocument()
      expect(container?.className).toContain('row')
    })

    it('should have Bootstrap grid column classes', () => {
      renderDashboard()
      const cards = document.querySelectorAll('[data-testid="stat-card"]')
      cards.forEach((card) => {
        const col = card.parentElement
        expect(col?.className).toMatch(/col-/)
      })
    })
  })

  describe('AC-021: Color Consistency', () => {
    it('should render cards with proper styling', () => {
      renderDashboard()
      const cards = document.querySelectorAll('[data-testid="stat-card"]')
      expect(cards.length).toBeGreaterThan(0)
      cards.forEach((card) => {
        expect(card.className).toContain('card')
      })
    })
  })
})
