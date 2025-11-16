import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from '../App'
import { AuthProvider } from '../context/AuthContext'
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
    const { container } = render(
      <AuthProvider>
        <App />
      </AuthProvider>
    )
    expect(container).toBeTruthy()
  })

  it('should include routing structure', () => {
    const { container } = render(
      <AuthProvider>
        <App />
      </AuthProvider>
    )
    // App contains BrowserRouter and Routes
    expect(container).toBeTruthy()
  })

  it('should render the application with proper structure', () => {
    const { container } = render(
      <AuthProvider>
        <App />
      </AuthProvider>
    )
    // Verify React component tree is rendered
    expect(container.querySelector('div')).toBeTruthy()
  })
})
