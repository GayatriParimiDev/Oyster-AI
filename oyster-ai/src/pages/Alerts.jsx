import { useState } from 'react'
import { alertsData } from '../data/mockData'
import { motion } from 'framer-motion'
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
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [page, setPage] = useState(1)

  return (
    <div className="alerts-page">
      {/* ── Page Header ── */}
      <div className="alerts-header">
        <div>
          <h1 className="alerts-title">System Alerts</h1>
          <p className="alerts-subtitle">Real-time monitoring and anomaly detection logs.</p>
        </div>
        <div className="alerts-header-actions">
          <button className="alerts-filter-btn">
            <span>⚙</span> Filter
          </button>
          <button className="alerts-export-btn">
            <span>↓</span> Export
          </button>
        </div>
      </div>

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
              <span className="alert-summary-count">{alertsData.critical.count}</span>
            </div>
            <p className="alert-summary-desc">{alertsData.critical.desc}</p>
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
              <span className="alert-summary-count">{alertsData.warning.count}</span>
            </div>
            <p className="alert-summary-desc">{alertsData.warning.desc}</p>
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
              <span className="alert-health-num">{alertsData.systemHealth.value}</span>
              <span className="alert-health-unit">%</span>
            </div>
            <div className="alert-health-bars">
              {alertsData.systemHealth.bars.map((h, i) => (
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
            <h3 className="alerts-log-title">Alert Log</h3>
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
            {alertsData.logs.map((log, i) => (
              <motion.div
                key={log.id}
                className={`alert-log-item alert-log-item--${log.severity}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
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
                    <span className="alert-log-time">{log.time}</span>
                  </div>
                  <div className="alert-log-meta">
                    <span className="alert-log-node">{log.node}</span>
                    <p className="alert-log-desc">{log.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="alerts-pagination">
            <span className="alerts-page-info">
              Showing 1-4 of {alertsData.totalAlerts} alerts
            </span>
            <div className="alerts-page-controls">
              <button
                className="alerts-page-btn"
                disabled={page === 1}
                onClick={() => setPage(Math.max(1, page - 1))}
              >
                ‹
              </button>
              <button
                className="alerts-page-btn"
                onClick={() => setPage(page + 1)}
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
