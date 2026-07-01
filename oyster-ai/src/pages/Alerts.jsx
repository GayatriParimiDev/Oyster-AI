import { useState, useMemo } from 'react'
import { useAlerts } from '../context/AlertContext'
import { motion, AnimatePresence } from 'framer-motion'
import './Alerts.css'

const severityIcons = {
  critical: '⊘',
  warning: '△',
  info: 'ⓘ',
}

const severityColors = {
  critical: 'var(--alert-red)',
  warning: 'var(--alert-yellow)',
  info: 'var(--info-green)',
}

export default function Alerts() {
  const { alerts, acknowledgeAlert, acknowledgeAll } = useAlerts()
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [severityFilter, setSeverityFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter logs based on severity, read status, and search query
  const filteredLogs = useMemo(() => {
    return alerts.logs.filter((log) => {
      // Severity Filter
      if (severityFilter !== 'all' && log.severity !== severityFilter) {
        return false
      }
      // Status Filter
      if (statusFilter === 'unread' && log.acknowledged) {
        return false
      }
      if (statusFilter === 'read' && !log.acknowledged) {
        return false
      }
      // Search Query Filter
      if (
        searchQuery &&
        !log.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !log.desc.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !log.node.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }
      return true
    })
  }, [alerts.logs, severityFilter, statusFilter, searchQuery])

  // Pagination Settings
  const PAGE_SIZE = 5
  const totalFiltered = filteredLogs.length
  const totalPages = Math.ceil(totalFiltered / PAGE_SIZE) || 1
  const currentPage = Math.min(page, totalPages)

  const paginatedLogs = useMemo(() => {
    return filteredLogs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  }, [filteredLogs, currentPage, PAGE_SIZE])

  // Export logs to a JSON file
  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filteredLogs, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', `oyster_alerts_export_${severityFilter}_${statusFilter}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  const handleResetFilters = () => {
    setSeverityFilter('all')
    setStatusFilter('all')
    setSearchQuery('')
    setPage(1)
  }

  const handlePrevPage = () => {
    setPage((prev) => Math.max(1, prev - 1))
  }

  const handleNextPage = () => {
    setPage((prev) => Math.min(totalPages, prev + 1))
  }

  return (
    <div className="alerts-page">
      {/* ── Page Header ── */}
      <div className="alerts-header">
        <div>
          <h1 className="alerts-title">System Alerts</h1>
          <p className="alerts-subtitle">Real-time monitoring and anomaly detection logs.</p>
        </div>
        <div className="alerts-header-actions">
          <button className="alerts-ack-all-btn" onClick={acknowledgeAll}>
            <span>✓</span> Acknowledge All
          </button>
          <button
            className={`alerts-filter-btn ${showFilters || severityFilter !== 'all' || statusFilter !== 'all' || searchQuery ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <span>⚙</span> Filter {showFilters ? '▲' : '▼'}
          </button>
          <button className="alerts-export-btn" onClick={handleExport} title="Export current results as JSON">
            <span>↓</span> Export
          </button>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="alerts-filter-bar"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="filter-bar-inner">
              <div className="filter-group filter-search">
                <label>Search Text:</label>
                <input
                  type="text"
                  placeholder="Search logs, nodes..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                />
              </div>
              <div className="filter-group">
                <label>Severity:</label>
                <select
                  value={severityFilter}
                  onChange={(e) => { setSeverityFilter(e.target.value); setPage(1); }}
                >
                  <option value="all">All Severities</option>
                  <option value="critical">🔴 Critical Only</option>
                  <option value="warning">🟡 Warning Only</option>
                  <option value="info">🟢 Info Only</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Status:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                >
                  <option value="all">All Statuses</option>
                  <option value="unread">📩 Unread (Active)</option>
                  <option value="read">📖 Read (Acknowledged)</option>
                </select>
              </div>
              <button className="alerts-reset-filters-btn" onClick={handleResetFilters}>
                Reset Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="alerts-layout">
        {/* ── Left Summary ── */}
        <div className="alerts-summary">
          {/* Critical */}
          <motion.div
            className="alert-summary-card alert-summary-card--critical"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div className="alert-summary-top">
              <span className="alert-severity-label alert-severity--critical">
                <span className="alert-severity-icon">⊘</span> CRITICAL
              </span>
              <span className="alert-summary-count">{alerts.critical.count}</span>
            </div>
            <p className="alert-summary-desc">{alerts.critical.desc}</p>
          </motion.div>

          {/* Warning */}
          <motion.div
            className="alert-summary-card alert-summary-card--warning"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="alert-summary-top">
              <span className="alert-severity-label alert-severity--warning">
                <span className="alert-severity-icon">△</span> WARNING
              </span>
              <span className="alert-summary-count">{alerts.warning.count}</span>
            </div>
            <p className="alert-summary-desc">{alerts.warning.desc}</p>
          </motion.div>

          {/* System Health */}
          <motion.div
            className="alert-summary-card alert-summary-card--health"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <h4 className="alert-health-label">System Health</h4>
            <div className="alert-health-value">
              <span className="alert-health-num">{alerts.systemHealth.value}</span>
              <span className="alert-health-unit">%</span>
            </div>
            <div className="alert-health-bars">
              {alerts.systemHealth.bars.map((h, i) => (
                <motion.div
                  key={i}
                  className="alert-health-bar"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Right Log Stream ── */}
        <div className="alerts-log">
          <div className="alerts-log-header">
            <h3 className="alerts-log-title">
              Alert Log
              {totalFiltered > 0 && (
                <span className="alerts-log-count"> ({totalFiltered} results)</span>
              )}
            </h3>
            <div className="alerts-log-controls">
              <label className="alerts-autorefresh">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                />
                <span className="alerts-checkbox-visual" />
                Auto-refresh
              </label>
              <span className="alerts-last-updated">Last updated: Just now</span>
            </div>
          </div>

          <div className="alerts-log-list">
            <AnimatePresence mode="popLayout">
              {paginatedLogs.length === 0 ? (
                <motion.div
                  className="alerts-empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="alerts-empty-icon">✓</span>
                  <h4>No matching alerts found</h4>
                  <p>Try resetting the filters or modifying your search query.</p>
                </motion.div>
              ) : (
                paginatedLogs.map((log, i) => (
                  <motion.div
                    key={log.id}
                    className={`alert-log-item alert-log-item--${log.severity} ${log.acknowledged ? 'alert-log-item--acked' : ''}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span
                      className="alert-log-icon"
                      style={{ color: severityColors[log.severity] }}
                    >
                      {severityIcons[log.severity]}
                    </span>
                    <div className="alert-log-content">
                      <div className="alert-log-top">
                        <h4 className="alert-log-name">{log.title}</h4>
                        <div className="alert-log-actions">
                          <span className="alert-log-time">{log.time}</span>
                          {!log.acknowledged && (
                            <button
                              className="alert-ack-btn"
                              onClick={() => acknowledgeAlert(log.id)}
                              title="Mark as read"
                            >
                              ✓
                            </button>
                          )}
                          {log.acknowledged && (
                            <span className="alert-acked-badge">Read</span>
                          )}
                        </div>
                      </div>
                      <div className="alert-log-meta">
                        <span className="alert-log-node">{log.node}</span>
                        <p className="alert-log-desc">{log.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          <div className="alerts-pagination">
            <span className="alerts-page-info">
              Showing {totalFiltered > 0 ? (currentPage - 1) * PAGE_SIZE + 1 : 0}-{Math.min(currentPage * PAGE_SIZE, totalFiltered)} of {totalFiltered} alerts
            </span>
            <div className="alerts-page-controls">
              <button
                className="alerts-page-btn"
                disabled={currentPage === 1}
                onClick={handlePrevPage}
              >
                ‹
              </button>
              <span className="alerts-page-number">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="alerts-page-btn"
                disabled={currentPage === totalPages}
                onClick={handleNextPage}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
