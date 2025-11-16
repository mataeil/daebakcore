/**
 * 헤더 컴포넌트
 */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export const Header: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="bg-blue-600 text-white shadow-md" role="banner">
      <div className="max-w-full px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">daebakcore</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm">사용자: {user?.name}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded text-sm font-medium transition-colors"
          >
            로그아웃
          </button>
        </div>
      </div>
    </header>
  )
}
