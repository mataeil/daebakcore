/**
 * 인증 관련 타입 정의
 */

export interface User {
  id: string
  name: string
}

export interface AuthToken {
  userId: string
  userName: string
  isAuthenticated: boolean
  rememberMe?: boolean
  timestamp?: number
}

export interface LoginCredentials {
  id: string
  password: string
  rememberMe: boolean
}

export interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (id: string, password: string, rememberMe: boolean) => Promise<boolean>
  logout: () => void
}
