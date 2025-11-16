import React from 'react'
import { useAuth } from '../context/AuthContext'

export const DashboardPage: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">환영합니다, {user?.name}!</h1>
      <p className="text-gray-600 mb-8">daebakcore 관리 시스템에 로그인되었습니다.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">정보</h3>
          <p className="text-gray-600 text-sm">사용자: {user?.name}</p>
          <p className="text-gray-600 text-sm">ID: {user?.id}</p>
        </div>
      </div>
    </div>
  )
}
