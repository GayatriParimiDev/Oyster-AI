import { useState } from 'react'
import { dataSourcesData } from '../data/mockData'
import { motion, AnimatePresence } from 'framer-motion'
import './DataSources.css'

const tabs = ['All Sources', 'Active', 'Failing']

export default function DataSources() {
  const [activeTab, setActiveTab] = useState('All Sources')

  const filtered = dataSourcesData.filter((ds) => {
    if (activeTab === 'Active') return ds.status === 'syncing' || ds.status === 'healthy'
    if (activeTab === 'Failing') return ds.status === 'degraded'
    return true
  })

  return (
    <div className="datasources">
      <div className="ds-top-bar">
        <div className="ds-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`ds-tab ${activeTab === tab ? 'ds-tab--active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <button className="ds-add-btn">+ Add Source</button>
      </div>

      <div className="ds-grid">
        <AnimatePresence mode="popLayout">
          {filtered.map((ds) => (
            <motion.div
              key={ds.id}
              className={`ds-card ${ds.status === 'degraded' ? 'ds-card--degraded' : ''}`}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <div className="ds-card-header">
                <div className="ds-card-name">
                  <span className="ds-card-icon">{ds.icon}</span>
                  <span className="ds-card-title">{ds.name}</span>
                </div>
                <span className={`ds-status ds-status--${ds.status}`}>
                  <span className="ds-status-dot" />
                  {ds.statusLabel}
                </span>
              </div>
              <div className="ds-card-metrics">
                {ds.metrics.map((m) => (
                  <div className="ds-metric" key={m.label}>
                    <span className="ds-metric-label">{m.label}</span>
                    <span
                      className={`ds-metric-value ${m.highlight ? 'ds-metric-value--alert' : ''}`}
                    >
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
