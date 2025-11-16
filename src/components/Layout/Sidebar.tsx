import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

export const Sidebar: React.FC = () => {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path || (path === '/dashboard' && location.pathname === '/')

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard', icon: 'bi-house-door' },
    { label: 'Reports', href: '/reports', icon: 'bi-bar-chart' },
    { label: 'Settings', href: '/settings', icon: 'bi-gear' },
    { label: 'Logs', href: '/logs', icon: 'bi-file-text' },
  ]

  return (
    <>
      <aside
        className="offcanvas offcanvas-start d-none d-lg-block"
        tabIndex={-1}
        id="sidebar"
        role="navigation"
        style={{
          width: '256px',
          backgroundColor: '#f8f9fa',
          borderRight: '1px solid #dee2e6',
        }}
      >
        <div className="offcanvas-header bg-light border-bottom">
          <h5 className="offcanvas-title fw-bold">Menu</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body p-0">
          <nav className="nav flex-column w-100">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`nav-link d-flex align-items-center px-3 py-2 ${
                  isActive(item.href) ? 'active' : ''
                }`}
                style={{
                  color: isActive(item.href) ? '#0d6efd' : '#6c757d',
                  backgroundColor: isActive(item.href) ? 'rgba(13, 110, 253, 0.1)' : 'transparent',
                  borderLeft: isActive(item.href) ? '4px solid #0d6efd' : '4px solid transparent',
                  fontWeight: isActive(item.href) ? 600 : 400,
                }}
              >
                <i className={`bi ${item.icon} me-2`}></i>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      <div
        className="offcanvas offcanvas-start d-lg-none"
        tabIndex={-1}
        id="sidebarMobile"
        role="navigation"
        style={{ backgroundColor: '#f8f9fa' }}
      >
        <div className="offcanvas-header bg-light border-bottom">
          <h5 className="offcanvas-title fw-bold">Menu</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body p-0">
          <nav className="nav flex-column w-100">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`nav-link d-flex align-items-center px-3 py-2 ${
                  isActive(item.href) ? 'active' : ''
                }`}
                data-bs-dismiss="offcanvas"
                style={{
                  color: isActive(item.href) ? '#0d6efd' : '#6c757d',
                  backgroundColor: isActive(item.href) ? 'rgba(13, 110, 253, 0.1)' : 'transparent',
                  borderLeft: isActive(item.href) ? '4px solid #0d6efd' : '4px solid transparent',
                  fontWeight: isActive(item.href) ? 600 : 400,
                }}
              >
                <i className={`bi ${item.icon} me-2`}></i>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}
