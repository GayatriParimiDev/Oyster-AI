import { useState } from 'react'
import { workflowNodes as initialNodes, workflowOperators } from '../data/mockData'
import { motion, AnimatePresence } from 'framer-motion'
import './Workflows.css'

export default function Workflows() {
  const [zoom, setZoom] = useState(100)
  const [filterText, setFilterText] = useState('')
  const [nodes, setNodes] = useState(initialNodes)

  const handleAddOperator = (op) => {
    // Determine type (use original class names 'source' and 'transform')
    let type = 'transform'
    if (op.id === 'sql' || op.id === 'rest') type = 'source'

    let detail = 'process()'
    let subDetail = ''
    if (op.id === 'sql') {
      detail = 'SELECT * FROM system_metrics'
      subDetail = 'Records: Stream'
    } else if (op.id === 'rest') {
      detail = 'GET https://api.oyster.ai/telemetry'
      subDetail = 'Interval: 5s'
    } else if (op.id === 'filter') {
      detail = "status = 'active' AND\nlast_login > NOW() - INTERVAL\n'30 days'"
      subDetail = 'Matches: 4.2%'
    } else if (op.id === 'join') {
      detail = 'INNER JOIN alerts ON\nlogs.id = alerts.log_id'
      subDetail = 'Key: log_id'
    } else if (op.id === 'aggregate') {
      detail = 'AVG(latency) GROUP BY\nnode_id'
      subDetail = 'Window: 1h'
    } else if (op.id === 'predict') {
      detail = 'model.predict(vram_load)'
      subDetail = 'Accuracy: 98.4%'
    } else if (op.id === 'anomaly') {
      detail = 'isolation_forest(contam=0.01)'
      subDetail = 'F1-Score: 0.94'
    }

    // Position new node relative to the last one (x: 80 -> 520 -> 960)
    const lastNode = nodes[nodes.length - 1]
    const nextX = lastNode ? lastNode.x + 440 : 80
    const nextY = lastNode ? (lastNode.y === 140 ? 240 : 140) : 140

    const newNode = {
      id: `${op.id}-${Date.now()}`,
      type,
      label: op.label,
      icon: op.icon,
      detail,
      subDetail,
      x: nextX,
      y: nextY,
      status: 'active',
    }

    setNodes((prev) => [...prev, newNode])
  }

  const handleDeleteNode = (id) => {
    setNodes((prev) => prev.filter((node) => node.id !== id))
  }

  return (
    <div className="workflows">
      {/* ── Toolbar ── */}
      <div className="wf-toolbar">
        <div className="wf-toolbar-controls">
          <button className="wf-tool-btn" onClick={() => setNodes(initialNodes)} title="Reset Canvas">🔄 Reset</button>
          <span style={{ color: 'var(--sage-300)', fontSize: '0.8rem', margin: '0 4px' }}>|</span>
          <button className="wf-tool-btn" onClick={() => setZoom(Math.max(50, zoom - 10))} title="Zoom out">🔍−</button>
          <span className="wf-zoom-label">{zoom}%</span>
          <button className="wf-tool-btn" onClick={() => setZoom(Math.min(200, zoom + 10))} title="Zoom in">🔍+</button>
        </div>
        <span className="wf-unsaved-badge">
          {nodes.length !== initialNodes.length ? 'Modified' : 'Unsaved Changes'}
        </span>
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

          {/* Connector lines */}
          <svg className="wf-connectors" width="100%" height="100%">
            {nodes.map((node, index) => {
              if (index === 0) return null
              const prevNode = nodes[index - 1]
              // Original formula matching original coordinates exactly
              const startX = prevNode.x + 350
              const startY = prevNode.y + 55
              const endX = node.x + 40
              const endY = node.y + 50

              const controlX1 = startX + 50
              const controlY1 = startY
              const controlX2 = endX - 40
              const controlY2 = endY

              return (
                <g key={`conn-${node.id}`}>
                  <path
                    d={`M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`}
                    fill="none"
                    stroke="var(--sage-300)"
                    strokeWidth="2"
                    strokeDasharray="8 6"
                    className="wf-dash-path"
                  />
                  <circle cx={startX} cy={startY} r="5" fill="var(--sage-300)" />
                  <circle cx={endX} cy={endY} r="5" fill="var(--accent-lime)" />
                </g>
              )
            })}
          </svg>

          {/* Nodes */}
          <AnimatePresence>
            {nodes.map((node) => (
              <motion.div
                key={node.id}
                className={`wf-node wf-node--${node.type}`}
                style={{ left: node.x, top: node.y }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(42,51,40,0.15)' }}
              >
                <div className="wf-node-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="wf-node-icon">{node.icon}</span>
                    <span className="wf-node-label">{node.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {node.status === 'active' && <span className="wf-node-check">✓</span>}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDeleteNode(node.id)
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--sage-400)',
                        cursor: 'pointer',
                        fontSize: '0.72rem',
                        padding: '2px 4px',
                        borderRadius: '4px',
                        transition: 'all 0.15s ease'
                      }}
                      className="wf-delete-btn"
                      title="Delete Node"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <pre className="wf-node-detail">{node.detail}</pre>
                {node.subDetail && (
                  <span className="wf-node-sub">{node.subDetail}</span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
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
                      onClick={() => handleAddOperator(op)}
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
          <span>Active Deployments: {nodes.length}</span>
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
