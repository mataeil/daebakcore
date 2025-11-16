/**
 * 로그인 폼 컴포넌트
 * Bootstrap form-control-lg 스타일 적용
 */

import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { validateLoginForm } from '../../utils/validation'
import { LOGIN_REDIRECT_DELAY } from '../../utils/constants'
import 'bootstrap/dist/css/bootstrap.min.css'

export const LoginForm: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const idInputRef = useRef<HTMLInputElement>(null)

  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [globalError, setGlobalError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  React.useEffect(() => {
    if (idInputRef.current) {
      idInputRef.current.focus()
    }
  }, [])

  const handleBlur = (field: string, value: string) => {
    const validationErrors = validateLoginForm(field === 'id' ? value : id, field === 'password' ? value : password)
    setErrors(prev => ({
      ...prev,
      [field]: validationErrors[field] || '',
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGlobalError('')

    const validationErrors = validateLoginForm(id, password)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsLoading(true)
    try {
      const success = await login(id, password, rememberMe)
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
    if (e.key === 'Enter' && !isLoading && !errors.id && !errors.password) {
      handleSubmit(e as any)
    }
  }

  const isFormValid = id.trim() !== '' && password.trim() !== '' && !errors.id && !errors.password

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {globalError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm" role="alert">
          {globalError}
        </div>
      )}

      <div>
        <label htmlFor="id" className="form-label fw-semibold">
          아이디
        </label>
        <input
          ref={idInputRef}
          id="id"
          type="text"
          placeholder="Enter id"
          value={id}
          onChange={e => setId(e.target.value)}
          onBlur={() => handleBlur('id', id)}
          autoFocus
          className="form-control form-control-lg"
        />
        {errors.id && <p className="text-danger text-sm mt-1">{errors.id}</p>}
      </div>

      <div>
        <label htmlFor="password" className="form-label fw-semibold">
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
          className="form-control form-control-lg"
        />
        {errors.password && <p className="text-danger text-sm mt-1">{errors.password}</p>}
      </div>

      <div className="form-check">
        <input
          id="remember"
          type="checkbox"
          checked={rememberMe}
          onChange={e => setRememberMe(e.target.checked)}
          className="form-check-input"
        />
        <label htmlFor="remember" className="form-check-label">
          기억하기
        </label>
      </div>

      <button
        type="submit"
        disabled={!isFormValid || isLoading}
        className="btn btn-primary btn-lg w-100"
      >
        {isLoading ? '로그인 중...' : '로그인'}
      </button>
    </form>
  )
}
