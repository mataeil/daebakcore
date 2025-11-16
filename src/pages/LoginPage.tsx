/**
 * 로그인 페이지
 */

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '../components/Auth/LoginForm'
import { useAuth } from '../context/AuthContext'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  // 이미 인증된 사용자는 대시보드로 리다이렉트
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">daebakcore</h1>
          <p className="text-center text-gray-600 mb-8">관리자 로그인</p>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
