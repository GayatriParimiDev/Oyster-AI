import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './AddSourceModal.css'

const sourceTypes = [
  { id: 'postgres', label: 'PostgreSQL', icon: '🗄️', category: 'Database' },
  { id: 'mysql', label: 'MySQL', icon: '🔷', category: 'Database' },
  { id: 'mongo', label: 'MongoDB', icon: '🍃', category: 'Database' },
  { id: 's3', label: 'AWS S3', icon: '☁️', category: 'Cloud Storage' },
  { id: 'gcs', label: 'Google Cloud', icon: '🌐', category: 'Cloud Storage' },
  { id: 'rest', label: 'REST API', icon: '🔗', category: 'API' },
  { id: 'graphql', label: 'GraphQL', icon: '◈', category: 'API' },
  { id: 'kafka', label: 'Kafka', icon: '📡', category: 'Streaming' },
]

export default function AddSourceModal({ onClose, onAdd }) {
  const [selectedSource, setSelectedSource] = useState('')
  const [connName, setConnName] = useState('')
  const [host, setHost] = useState('')
  const [port, setPort] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [connected, setConnected] = useState(false)

  const handleConnect = () => {
    if (!selectedSource || !connName) return
    setIsConnecting(true)
    setTimeout(() => {
      setIsConnecting(false)
      setConnected(true)
      const sourceInfo = sourceTypes.find((s) => s.id === selectedSource)
      if (onAdd) {
        onAdd({
          id: Date.now(),
          name: connName,
          icon: sourceInfo.icon,
          status: 'syncing',
          statusLabel: 'SYNCING',
          metrics: [
            { label: 'Total Volume', value: '—' },
            { label: 'Latency', value: 'Measuring...' },
            { label: 'Last Sync', value: 'Just now' },
            { label: 'Ingestion Rate', value: 'Initializing' },
          ],
        })
      }
    }, 2000)
  }

  return (
    <AnimatePresence>
      <motion.div
        className="addsource-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="addsource-modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="addsource-modal-header">
            <h2>🔌 Add Data Source</h2>
            <button className="addsource-close" onClick={onClose}>✕</button>
          </div>

          <div className="addsource-modal-body">
            {!connected ? (
              <>
                <div className="addsource-field">
                  <label>Connection Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Production Database"
                    value={connName}
                    onChange={(e) => setConnName(e.target.value)}
                  />
                </div>

                <div className="addsource-field">
                  <label>Source Type</label>
                  <div className="addsource-type-grid">
                    {sourceTypes.map((source) => (
                      <button
                        key={source.id}
                        className={`addsource-type-card ${selectedSource === source.id ? 'addsource-type-card--active' : ''}`}
                        onClick={() => setSelectedSource(source.id)}
                      >
                        <span className="addsource-type-icon">{source.icon}</span>
                        <span className="addsource-type-label">{source.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="addsource-row">
                  <div className="addsource-field addsource-field--flex">
                    <label>Host / Endpoint</label>
                    <input
                      type="text"
                      placeholder="e.g., db.example.com"
                      value={host}
                      onChange={(e) => setHost(e.target.value)}
                    />
                  </div>
                  <div className="addsource-field addsource-field--small">
                    <label>Port</label>
                    <input
                      type="text"
                      placeholder="5432"
                      value={port}
                      onChange={(e) => setPort(e.target.value)}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="addsource-success">
                <div className="addsource-success-icon">✓</div>
                <h3 className="addsource-success-title">Source Connected</h3>
                <p className="addsource-success-desc">
                  "{connName}" has been successfully added and is now syncing data.
                </p>
              </div>
            )}
          </div>

          <div className="addsource-modal-footer">
            <button className="addsource-cancel" onClick={onClose}>
              {connected ? 'Close' : 'Cancel'}
            </button>
            {!connected && (
              <button
                className="addsource-connect"
                onClick={handleConnect}
                disabled={!selectedSource || !connName || isConnecting}
              >
                {isConnecting ? '⏳ Connecting...' : '🔌 Connect Source'}
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
