import { useState } from 'react'
import { workflowNodes, workflowOperators } from '../data/mockData'
import { motion } from 'framer-motion'
import './Workflows.css'

export default function Workflows() {
  const [zoom, setZoom] = useState(100)
  const [filterText, setFilterText] = useState('')

  return (
    <div className="workflows">
      {/* ── Toolbar ── */}
      <div className="wf-toolbar">
        <div className="wf-toolbar-controls">
          <button className="wf-tool-btn" title="Undo">↩</button>
          <button className="wf-tool-btn" title="Redo">↪</button>
          <button className="wf-tool-btn" onClick={() => setZoom(Math.max(50, zoom - 10))} title="Zoom out">🔍−</button>
          <span className="wf-zoom-label">{zoom}%</span>
          <button className="wf-tool-btn" onClick={() => setZoom(Math.min(200, zoom + 10))} title="Zoom in">🔍+</button>
        </div>
        <span className="wf-unsaved-badge">Unsaved Changes</span>
      </div>

      <div className="wf-main">
        {/* ── Canvas ── */}
        <div className="wf-canvas" style={{ transform: `scale(${zoom / 100})` }}>
          {/* Grid background */}
          <svg className="wf-grid-bg" width="100%" height="100%">
            <defs>
              <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(42,51,40,0.06)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Connector line */}
          <svg className="wf-connectors" width="100%" height="100%">
            <path
              d="M 430 195 C 480 195, 520 290, 560 290"
              fill="none"
              stroke="var(--sage-300)"
              strokeWidth="2"
              strokeDasharray="8 6"
              className="wf-dash-path"
            />
            <circle cx="430" cy="195" r="5" fill="var(--sage-300)" />
            <circle cx="560" cy="290" r="5" fill="var(--accent-lime)" />
          </svg>

          {/* Nodes */}
          {workflowNodes.map((node) => (
            <motion.div
              key={node.id}
              className={`wf-node wf-node--${node.type}`}
              style={{ left: node.x, top: node.y }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(42,51,40,0.15)' }}
            >
              <div className="wf-node-header">
                <span className="wf-node-icon">{node.icon}</span>
                <span className="wf-node-label">{node.label}</span>
                {node.status === 'active' && <span className="wf-node-check">✓</span>}
              </div>
              <pre className="wf-node-detail">{node.detail}</pre>
              {node.subDetail && (
                <span className="wf-node-sub">{node.subDetail}</span>
              )}
            </motion.div>
          ))}
        </div>

        {/* ── Operators Panel ── */}
        <aside className="wf-operators">
          <h3 className="wf-operators-title">Operators</h3>
          <div className="wf-operators-search">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="var(--sage-400)" strokeWidth="1.5">
              <circle cx="7" cy="7" r="5" />
              <path d="M11 11l3.5 3.5" />
            </svg>
            <input
              type="text"
              placeholder="Filter operators..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>

          {Object.entries(workflowOperators).map(([category, ops]) => {
            const filteredOps = ops.filter((op) =>
              op.label.toLowerCase().includes(filterText.toLowerCase())
            )
            if (filteredOps.length === 0) return null
            return (
              <div className="wf-op-category" key={category}>
                <h4 className="wf-op-cat-title">{category}</h4>
                <div className="wf-op-grid">
                  {filteredOps.map((op) => (
                    <motion.button
                      key={op.id}
                      className="wf-op-btn"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="wf-op-icon">{op.icon}</span>
                      <span className="wf-op-label">{op.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )
          })}
        </aside>
      </div>

      {/* ── Status Bar ── */}
      <div className="wf-status-bar">
        <div className="wf-status-left">
          <span className="wf-status-dot" />
          <span>Cluster Status: Healthy</span>
          <span className="wf-status-sep">|</span>
          <span>Active Deployments: 3</span>
        </div>
        <div className="wf-status-right">
          <span>Latency: 42ms</span>
          <span className="wf-status-sep">|</span>
          <span>v2.4.1-rc</span>
        </div>
      </div>
    </div>
  )
}
