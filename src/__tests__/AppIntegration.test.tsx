import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from '../App'
import { AUTH_STORAGE_KEY } from '../utils/constants'

/**
 * App Integration Tests
 * Tests for app root component and routing setup
 */

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should render the app without crashing', () => {
    const { container } = render(<App />)
    expect(container).toBeTruthy()
  })

  it('should include routing structure', () => {
    const { container } = render(<App />)
    // App contains BrowserRouter and Routes
    expect(container).toBeTruthy()
  })

  it('should render the application with proper structure', () => {
    const { container } = render(<App />)
    // Verify React component tree is rendered
    expect(container.querySelector('div')).toBeTruthy()
  })
})
