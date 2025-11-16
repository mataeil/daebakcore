import React from 'react'
import { useAuth } from '../context/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css'

export const DashboardPage: React.FC = () => {
  const { user } = useAuth()

  // Statistic data
  const stats = [
    { label: 'Users', value: '1,234', icon: '👥', color: '#0d6efd' },
    { label: 'Orders', value: '5,678', icon: '📦', color: '#198754' },
    { label: 'Revenue', value: '$45,678', icon: '💰', color: '#ffc107' },
    { label: 'Growth', value: '23.5%', icon: '📈', color: '#dc3545' },
  ]

  return (
    <main>
      <div className="container-fluid p-4">
        {/* Page Header */}
        <div className="mb-5">
          <h1 className="display-5 fw-bold text-dark">환영합니다, {user?.name}!</h1>
          <p className="text-muted">daebakcore 관리 시스템에 로그인되었습니다.</p>
        </div>

        {/* Statistic Cards */}
        <div className="row mb-5" data-testid="stat-container">
          {stats.map((stat, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-3 mb-4">
              <div
                className="card border-0 h-100"
                data-testid="stat-card"
                style={{
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget
                  card.style.transform = 'translateY(-8px)'
                  card.style.boxShadow = '0 1.5rem 3rem rgba(0, 0, 0, 0.15)'
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget
                  card.style.transform = 'translateY(0)'
                  card.style.boxShadow = '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)'
                }}
              >
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <p className="text-muted small mb-1">{stat.label}</p>
                      <h3
                        className="card-title h3 mb-0"
                        data-testid="stat-value"
                        style={{ color: stat.color }}
                      >
                        {stat.value}
                      </h3>
                    </div>
                    <div
                      style={{
                        fontSize: '2.5rem',
                        opacity: 0.8,
                      }}
                    >
                      {stat.icon}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* System Information Card */}
        <div className="row">
          <div className="col-12 col-lg-8 mb-4">
            <div className="card border-0 shadow-sm" data-testid="info-card">
              <div className="card-header bg-white border-bottom">
                <h5 className="mb-0 fw-bold">사용자 정보</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <p className="mb-1 text-muted small">사용자명</p>
                    <p className="mb-0 fw-semibold">{user?.name}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <p className="mb-1 text-muted small">아이디</p>
                    <p className="mb-0 fw-semibold">{user?.id}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <p className="mb-1 text-muted small">버전</p>
                    <p className="mb-0 fw-semibold">v0.0.0</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <p className="mb-1 text-muted small">상태</p>
                    <p className="mb-0">
                      <span className="badge bg-success">온라인</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
              <div className="card-header bg-white border-bottom">
                <h5 className="mb-0 fw-bold">빠른 통계</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted">활성 사용자</span>
                  <span className="badge bg-primary">128</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted">오늘 주문</span>
                  <span className="badge bg-success">45</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">대기 중인 작업</span>
                  <span className="badge bg-warning">12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
