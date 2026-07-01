import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useAlerts } from '../context/AlertContext'
import './AppLayout.css'

const NavIcon = ({ type }) => {
  const icons = {
    home: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 10l7-7 7 7" />
        <path d="M5 8v8a1 1 0 001 1h3v-5h2v5h3a1 1 0 001-1V8" />
      </svg>
    ),
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
    sun: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
    moon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
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

export default function AppLayout({ onDeploy, onSettings, onNewReport }) {
  const location = useLocation()
  const navigate = useNavigate()
  const pageTitle = pageLabels[location.pathname] || ''
  const { theme, toggleTheme } = useTheme()
  const { unacknowledgedCount } = useAlerts()

  const navItems = [
    { path: '/app/dashboard', label: 'Dashboard', icon: 'grid' },
    { path: '/app/data-sources', label: 'Data Sources', icon: 'database' },
    { path: '/app/workflows', label: 'Workflows', icon: 'workflow' },
    { path: '/app/alerts', label: 'Alerts', icon: 'bell', badge: unacknowledgedCount },
    { path: '/app/performance', label: 'Performance', icon: 'chart' },
  ]

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
          {/* Back to Landing */}
          <button
            className="sidebar-link sidebar-back-btn"
            onClick={() => navigate('/')}
          >
            <span className="sidebar-link-icon">
              <NavIcon type="home" />
            </span>
            <span className="sidebar-link-label">Landing Page</span>
          </button>

          <div className="sidebar-nav-divider" />

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
              {item.badge > 0 && (
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

          {/* Theme Toggle */}
          <button className="sidebar-theme-toggle" onClick={toggleTheme}>
            <span className="sidebar-theme-icon">
              <NavIcon type={theme === 'light' ? 'moon' : 'sun'} />
            </span>
            <span className="sidebar-theme-label">
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </span>
          </button>
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
            <div className="topbar-help-wrapper">
              <button className="topbar-icon-btn">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="10" cy="10" r="8" />
                  <path d="M7 7.5a3 3 0 0 1 5.5 1.5c0 2-3 2.5-3 2.5" />
                  <circle cx="10" cy="14.5" r="0.5" fill="currentColor" />
                </svg>
              </button>
              <div className="topbar-help-tooltip">
                <h4>Oyster Quick Help</h4>
                <p>Monitor real-time AI and GPU telemetry across clusters.</p>
                <ul>
                  <li><strong>Dashboard</strong>: Telemetry overview</li>
                  <li><strong>Data Sources</strong>: Register databases & storage</li>
                  <li><strong>Workflows</strong>: Build pipelines by clicking operators</li>
                  <li><strong>Alerts</strong>: View & resolve system warnings</li>
                </ul>
                <div className="tooltip-footer">System Status: Optimal (42ms)</div>
              </div>
            </div>
            <button className="topbar-icon-btn" title="Toggle Theme" onClick={toggleTheme}>
              <NavIcon type={theme === 'light' ? 'moon' : 'sun'} />
            </button>
            <button className="topbar-settings" onClick={onSettings}>⚙ Settings</button>
            <button className="topbar-new-report" onClick={onNewReport}>+ New Report</button>
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
