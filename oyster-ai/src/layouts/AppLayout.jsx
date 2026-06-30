import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './AppLayout.css'

const navItems = [
  { path: '/app/dashboard', label: 'Dashboard', icon: 'grid' },
  { path: '/app/data-sources', label: 'Data Sources', icon: 'database' },
  { path: '/app/workflows', label: 'Workflows', icon: 'workflow' },
  { path: '/app/alerts', label: 'Alerts', icon: 'bell', badge: 12 },
  { path: '/app/performance', label: 'Performance', icon: 'chart' },
]

const NavIcon = ({ type }) => {
  const icons = {
    grid: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="7" height="7" rx="1.5" />
        <rect x="11" y="2" width="7" height="7" rx="1.5" />
        <rect x="2" y="11" width="7" height="7" rx="1.5" />
        <rect x="11" y="11" width="7" height="7" rx="1.5" />
      </svg>
    ),
    database: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="10" cy="5" rx="7" ry="3" />
        <path d="M3 5v10c0 1.66 3.13 3 7 3s7-1.34 7-3V5" />
        <path d="M3 10c0 1.66 3.13 3 7 3s7-1.34 7-3" />
      </svg>
    ),
    workflow: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="1" width="6" height="6" rx="1" />
        <rect x="13" y="1" width="6" height="6" rx="1" />
        <rect x="7" y="13" width="6" height="6" rx="1" />
        <path d="M7 4h6M10 7v6" />
      </svg>
    ),
    bell: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 2a5.5 5.5 0 0 0-5.5 5.5c0 3.5-2 5-2 5h15s-2-1.5-2-5A5.5 5.5 0 0 0 10 2z" />
        <path d="M8 15a2 2 0 1 0 4 0" />
      </svg>
    ),
    chart: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 18V8l4-3 4 5 4-7 4 4v11H2z" />
        <path d="M2 18h16" />
      </svg>
    ),
  }
  return icons[type] || null
}

const pageLabels = {
  '/app/dashboard': 'Dashboard',
  '/app/data-sources': 'Data Sources',
  '/app/workflows': 'Workflow Builder',
  '/app/alerts': 'System Alerts',
  '/app/performance': 'Performance Analytics',
}

export default function AppLayout({ onDeploy }) {
  const location = useLocation()
  const pageTitle = pageLabels[location.pathname] || ''

  return (
    <div className="app-layout">
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="12" stroke="var(--sidebar-text)" strokeWidth="2" />
              <circle cx="14" cy="14" r="4" fill="var(--accent-lime)" />
              <path d="M14 2v4M14 22v4M2 14h4M22 14h4" stroke="var(--sidebar-text)" strokeWidth="1.5" />
            </svg>
          </div>
          <div>
            <h1 className="sidebar-title">Oyster AI</h1>
            <span className="sidebar-subtitle">Command Center</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`
              }
            >
              <span className="sidebar-link-icon">
                <NavIcon type={item.icon} />
              </span>
              <span className="sidebar-link-label">{item.label}</span>
              {item.badge && (
                <span className="sidebar-badge">{item.badge}</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="deploy-btn" onClick={onDeploy}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 2L2 9l7 7 7-7-7-7z" />
              <circle cx="9" cy="9" r="2" />
            </svg>
            Deploy Model
          </button>

          <div className="sidebar-user">
            <div className="sidebar-avatar">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="15" fill="var(--sage-600)" stroke="var(--sage-400)" strokeWidth="1" />
                <circle cx="16" cy="12" r="5" fill="var(--sage-300)" />
                <path d="M6 28c0-5.5 4.5-10 10-10s10 4.5 10 10" fill="var(--sage-300)" />
              </svg>
            </div>
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">Admin User</span>
              <span className="sidebar-user-role">SysOps</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="main-area">
        {/* ── Top Bar ── */}
        <header className="topbar">
          <div className="topbar-left">
            <span className="topbar-breadcrumb">Oyster</span>
            <span className="topbar-divider">|</span>
            <h2 className="topbar-title">{pageTitle}</h2>
            <div className="topbar-search">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--sage-400)" strokeWidth="1.5">
                <circle cx="7" cy="7" r="5" />
                <path d="M11 11l3.5 3.5" />
              </svg>
              <input type="text" placeholder="Search operations, models, queries..." />
            </div>
          </div>
          <div className="topbar-right">
            <button className="topbar-icon-btn" title="Help">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="10" cy="10" r="8" />
                <path d="M7 7.5a3 3 0 0 1 5.5 1.5c0 2-3 2.5-3 2.5" />
                <circle cx="10" cy="14.5" r="0.5" fill="currentColor" />
              </svg>
            </button>
            <button className="topbar-icon-btn" title="Apps">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <circle cx="4" cy="4" r="1.5" />
                <circle cx="10" cy="4" r="1.5" />
                <circle cx="16" cy="4" r="1.5" />
                <circle cx="4" cy="10" r="1.5" />
                <circle cx="10" cy="10" r="1.5" />
                <circle cx="16" cy="10" r="1.5" />
                <circle cx="4" cy="16" r="1.5" />
                <circle cx="10" cy="16" r="1.5" />
                <circle cx="16" cy="16" r="1.5" />
              </svg>
            </button>
            <span className="topbar-settings">Settings</span>
            <button className="topbar-new-report">+ New Report</button>
            <div className="topbar-avatar">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="15" fill="var(--sage-200)" stroke="var(--sage-300)" strokeWidth="1" />
                <circle cx="16" cy="12" r="5" fill="var(--sage-400)" />
                <path d="M6 28c0-5.5 4.5-10 10-10s10 4.5 10 10" fill="var(--sage-400)" />
              </svg>
            </div>
          </div>
        </header>

        {/* ── Page Content ── */}
        <main className="page-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{ height: '100%' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
