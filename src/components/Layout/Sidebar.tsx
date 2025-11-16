import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Sidebar: React.FC = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(true)

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-20 left-4 z-40 p-2 bg-gray-800 text-white rounded"
      >
        ☰
      </button>

      <aside
        className={isOpen ? 'translate-x-0' : '-translate-x-full'}
        style={{ minWidth: '256px' }}
        role="navigation"
      >
        <nav className="p-6 space-y-2 bg-gray-800 text-white h-screen">
          <Link
            to="/dashboard"
            className={isActive('/dashboard')
              ? 'block px-4 py-2 rounded bg-blue-600 text-white'
              : 'block px-4 py-2 rounded text-gray-300 hover:bg-gray-700'}
          >
            대시보드
          </Link>
        </nav>
      </aside>
    </>
  )
}
