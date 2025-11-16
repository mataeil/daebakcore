import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { NotFoundPage } from '../pages/NotFoundPage'

/**
 * NotFoundPage Component Tests
 * Tests for 404 error page
 */

const renderNotFoundPage = () => {
  return render(
    <BrowserRouter>
      <NotFoundPage />
    </BrowserRouter>
  )
}

describe('NotFoundPage Component', () => {
  describe('AC-404-001: 404 Page Content', () => {
    it('should display 404 heading', () => {
      renderNotFoundPage()

      expect(screen.getByRole('heading', { name: /404/i })).toBeInTheDocument()
    })

    it('should display 404 error message', () => {
      renderNotFoundPage()

      expect(screen.getByText(/페이지를 찾을 수 없습니다/i)).toBeInTheDocument()
    })

    it('should display home navigation link', () => {
      renderNotFoundPage()

      const homeLink = screen.getByRole('link', { name: /홈으로 돌아가기/i })
      expect(homeLink).toBeInTheDocument()
    })

    it('should have link pointing to home page', () => {
      renderNotFoundPage()

      const homeLink = screen.getByRole('link', { name: /홈으로 돌아가기/i })
      expect(homeLink).toHaveAttribute('href', '/')
    })

    it('should display all required 404 page elements', () => {
      renderNotFoundPage()

      expect(screen.getByRole('heading', { name: /404/i })).toBeInTheDocument()
      expect(screen.getByText(/페이지를 찾을 수 없습니다/i)).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /홈으로 돌아가기/i })).toBeInTheDocument()
    })

    it('should have clickable home link', () => {
      renderNotFoundPage()

      const homeLink = screen.getByRole('link', { name: /홈으로 돌아가기/i })
      expect(homeLink.tagName).toBe('A')
      expect(homeLink).toHaveAttribute('href', '/')
    })

    it('should render 404 text with proper formatting', () => {
      renderNotFoundPage()

      const heading = screen.getByRole('heading', { name: /404/i })
      expect(heading).toBeInTheDocument()
      expect(heading.className).toContain('text-6xl')
    })

    it('should display error message in proper text size', () => {
      renderNotFoundPage()

      const errorMessage = screen.getByText(/페이지를 찾을 수 없습니다/i)
      expect(errorMessage).toBeInTheDocument()
      expect(errorMessage.className).toContain('text-2xl')
    })
  })

  describe('NotFoundPage accessibility', () => {
    it('should have semantic heading structure', () => {
      renderNotFoundPage()

      const heading = screen.getByRole('heading', { name: /404/i })
      expect(heading).toBeInTheDocument()
    })

    it('should have proper link semantics', () => {
      renderNotFoundPage()

      const homeLink = screen.getByRole('link', { name: /홈으로 돌아가기/i })
      expect(homeLink).toBeInTheDocument()
      expect(homeLink.getAttribute('href')).toBe('/')
    })

    it('should have button-like styling on home link', () => {
      renderNotFoundPage()

      const homeLink = screen.getByRole('link', { name: /홈으로 돌아가기/i })
      expect(homeLink.className).toContain('rounded-lg')
      expect(homeLink.className).toContain('px-6')
      expect(homeLink.className).toContain('py-2')
    })
  })

  describe('NotFoundPage rendering', () => {
    it('should be full screen centered', () => {
      const { container } = renderNotFoundPage()

      const centerDiv = container.querySelector('.min-h-screen')
      expect(centerDiv).toBeInTheDocument()
    })

    it('should have center alignment', () => {
      const { container } = renderNotFoundPage()

      const centerDiv = container.querySelector('.flex.flex-col.items-center.justify-center')
      expect(centerDiv).toBeInTheDocument()
    })

    it('should render in flexbox container', () => {
      const { container } = renderNotFoundPage()

      const flexContainer = container.querySelector('.flex')
      expect(flexContainer).toBeInTheDocument()
    })
  })
})
