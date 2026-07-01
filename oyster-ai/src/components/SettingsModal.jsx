import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import './SettingsModal.css'

export default function SettingsModal({ onClose }) {
  const { theme, toggleTheme } = useTheme()
  const [notifications, setNotifications] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState('30')
  const [dataRetention, setDataRetention] = useState('90')
  const [language, setLanguage] = useState('en')

  return (
    <AnimatePresence>
      <motion.div
        className="settings-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="settings-modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="settings-modal-header">
            <h2>⚙ Settings</h2>
            <button className="settings-close" onClick={onClose}>✕</button>
          </div>

          <div className="settings-modal-body">
            {/* Appearance */}
            <div className="settings-section">
              <h3 className="settings-section-title">Appearance</h3>
              <div className="settings-row">
                <div className="settings-row-info">
                  <span className="settings-row-label">Dark Mode</span>
                  <span className="settings-row-desc">Switch between light and dark themes</span>
                </div>
                <button
                  className={`settings-toggle ${theme === 'dark' ? 'settings-toggle--active' : ''}`}
                  onClick={toggleTheme}
                >
                  <span className="settings-toggle-knob" />
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="settings-section">
              <h3 className="settings-section-title">Notifications</h3>
              <div className="settings-row">
                <div className="settings-row-info">
                  <span className="settings-row-label">Push Notifications</span>
                  <span className="settings-row-desc">Receive alerts for critical events</span>
                </div>
                <button
                  className={`settings-toggle ${notifications ? 'settings-toggle--active' : ''}`}
                  onClick={() => setNotifications(!notifications)}
                >
                  <span className="settings-toggle-knob" />
                </button>
              </div>
              <div className="settings-row">
                <div className="settings-row-info">
                  <span className="settings-row-label">Auto-Refresh Dashboard</span>
                  <span className="settings-row-desc">Automatically update telemetry data</span>
                </div>
                <button
                  className={`settings-toggle ${autoRefresh ? 'settings-toggle--active' : ''}`}
                  onClick={() => setAutoRefresh(!autoRefresh)}
                >
                  <span className="settings-toggle-knob" />
                </button>
              </div>
            </div>

            {/* Data */}
            <div className="settings-section">
              <h3 className="settings-section-title">Data & Performance</h3>
              <div className="settings-row">
                <div className="settings-row-info">
                  <span className="settings-row-label">Refresh Interval</span>
                  <span className="settings-row-desc">How often data updates (seconds)</span>
                </div>
                <select
                  className="settings-select"
                  value={refreshInterval}
                  onChange={(e) => setRefreshInterval(e.target.value)}
                >
                  <option value="10">10s</option>
                  <option value="30">30s</option>
                  <option value="60">60s</option>
                  <option value="300">5min</option>
                </select>
              </div>
              <div className="settings-row">
                <div className="settings-row-info">
                  <span className="settings-row-label">Data Retention</span>
                  <span className="settings-row-desc">How long to keep historical data</span>
                </div>
                <select
                  className="settings-select"
                  value={dataRetention}
                  onChange={(e) => setDataRetention(e.target.value)}
                >
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                  <option value="365">1 year</option>
                </select>
              </div>
              <div className="settings-row">
                <div className="settings-row-info">
                  <span className="settings-row-label">Language</span>
                  <span className="settings-row-desc">Interface language</span>
                </div>
                <select
                  className="settings-select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="ja">日本語</option>
                </select>
              </div>
            </div>
          </div>

          <div className="settings-modal-footer">
            <button className="settings-cancel" onClick={onClose}>Close</button>
            <button className="settings-save" onClick={onClose}>Save Changes</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
