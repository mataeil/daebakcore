/**
 * 로그인 폼 컴포넌트
 */

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { validateLoginForm } from '../../utils/validation'
import { LOGIN_REDIRECT_DELAY } from '../../utils/constants'

export const LoginForm: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [globalError, setGlobalError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleBlur = (field: string, value: string) => {
    const validationErrors = validateLoginForm(field === 'email' ? value : email, field === 'password' ? value : password)
    setErrors(prev => ({
      ...prev,
      [field]: validationErrors[field] || '',
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGlobalError('')

    const validationErrors = validateLoginForm(email, password)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)
    try {
      const success = await login(email, password, rememberMe)
      if (success) {
        setTimeout(() => {
          navigate('/dashboard')
        }, LOGIN_REDIRECT_DELAY)
      } else {
        setGlobalError('아이디 또는 비밀번호가 일치하지 않습니다')
        setPassword('')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading && !errors.email && !errors.password) {
      handleSubmit(e as any)
    }
  }

  const isFormValid = email.trim() !== '' && password.trim() !== '' && !errors.email && !errors.password

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {globalError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm" role="alert">
          {globalError}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          이메일
        </label>
        <input
          id="email"
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={() => handleBlur('email', email)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onBlur={() => handleBlur('password', password)}
          onKeyPress={handleKeyPress}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
      </div>

      <div className="flex items-center">
        <input
          id="remember"
          type="checkbox"
          checked={rememberMe}
          onChange={e => setRememberMe(e.target.checked)}
          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
        />
        <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
          기억하기
        </label>
      </div>

      <button
        type="submit"
        disabled={!isFormValid || isLoading}
        className="w-full py-2 px-4 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? '로그인 중...' : '로그인'}
      </button>
    </form>
  )
}
