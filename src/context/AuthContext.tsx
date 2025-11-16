import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContextType, User, AuthToken } from '../types/auth'
import { AUTH_STORAGE_KEY, DEFAULT_ADMIN_ID, DEFAULT_ADMIN_NAME, DEFAULT_ADMIN_PASSWORD } from '../utils/constants'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem(AUTH_STORAGE_KEY)
    if (storedToken) {
      try {
        const token: AuthToken = JSON.parse(storedToken)
        if (token.isAuthenticated) {
          setIsAuthenticated(true)
          setUser({
            id: token.userId,
            name: token.userName,
          })
        }
      } catch (error) {
        console.error('Failed to parse auth token:', error)
        localStorage.removeItem(AUTH_STORAGE_KEY)
      }
    }
  }, [])

  const login = async (id: string, password: string, rememberMe: boolean): Promise<boolean> => {
    if (id === DEFAULT_ADMIN_ID && password === DEFAULT_ADMIN_PASSWORD) {
      const token: AuthToken = {
        userId: DEFAULT_ADMIN_ID,
        userName: DEFAULT_ADMIN_NAME,
        isAuthenticated: true,
        rememberMe,
        timestamp: Date.now(),
      }
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(token))
      setIsAuthenticated(true)
      setUser({
        id: DEFAULT_ADMIN_ID,
        name: DEFAULT_ADMIN_NAME,
      })
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
