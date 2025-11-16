/**
 * Navbar 컴포넌트 (Bootstrap 5.3)
 * 로그아웃 버튼 강화 + Bootstrap Icons 적용
 */

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

export const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [isExpanded, setIsExpanded] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top"
      role="navigation"
    >
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="/">
          daebakcore
        </a>

        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${isExpanded ? 'show' : ''}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <button
                className="btn btn-dark dropdown-toggle"
                role="button"
                id="userDropdown"
                aria-expanded="false"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-person-circle me-2"></i>
                {user?.name || 'Admin'}
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                id="userDropdownMenu"
                aria-labelledby="userDropdown"
              >
                <li>
                  <a className="dropdown-item" href="/profile">
                    <i className="bi bi-person me-2"></i>프로필
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/settings">
                    <i className="bi bi-gear me-2"></i>설정
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={handleLogout}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>로그아웃
                  </button>
                </li>
              </ul>
            </li>
            <li className="nav-item ms-2">
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-1"></i>로그아웃
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
