import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './NewReportModal.css'

const reportTypes = [
  { id: 'performance', label: 'Performance Report', icon: '📊', desc: 'GPU utilization, latency, and throughput analysis' },
  { id: 'anomaly', label: 'Anomaly Detection', icon: '🔍', desc: 'Automated anomaly detection across all data pipelines' },
  { id: 'compliance', label: 'Compliance Audit', icon: '📋', desc: 'System compliance and security posture review' },
  { id: 'cost', label: 'Cost Analysis', icon: '💰', desc: 'Resource allocation and cost optimization insights' },
]

export default function NewReportModal({ onClose }) {
  const [selectedType, setSelectedType] = useState('')
  const [reportName, setReportName] = useState('')
  const [dateRange, setDateRange] = useState('7d')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)

  const handleGenerate = () => {
    if (!selectedType || !reportName) return
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setGenerated(true)
    }, 2000)
  }

  return (
    <AnimatePresence>
      <motion.div
        className="report-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="report-modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="report-modal-header">
            <h2>📝 New Report</h2>
            <button className="report-close" onClick={onClose}>✕</button>
          </div>

          <div className="report-modal-body">
            {!generated ? (
              <>
                <div className="report-field">
                  <label>Report Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Weekly GPU Performance"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                  />
                </div>

                <div className="report-field">
                  <label>Report Type</label>
                  <div className="report-type-grid">
                    {reportTypes.map((type) => (
                      <button
                        key={type.id}
                        className={`report-type-card ${selectedType === type.id ? 'report-type-card--active' : ''}`}
                        onClick={() => setSelectedType(type.id)}
                      >
                        <span className="report-type-icon">{type.icon}</span>
                        <span className="report-type-label">{type.label}</span>
                        <span className="report-type-desc">{type.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="report-field">
                  <label>Date Range</label>
                  <div className="report-date-options">
                    {[
                      { value: '24h', label: 'Last 24h' },
                      { value: '7d', label: 'Last 7 days' },
                      { value: '30d', label: 'Last 30 days' },
                      { value: '90d', label: 'Last 90 days' },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        className={`report-date-btn ${dateRange === opt.value ? 'report-date-btn--active' : ''}`}
                        onClick={() => setDateRange(opt.value)}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="report-success">
                <div className="report-success-icon">✓</div>
                <h3 className="report-success-title">Report Generated</h3>
                <p className="report-success-desc">
                  "{reportName}" has been successfully created and is ready for download.
                </p>
                <div className="report-success-meta">
                  <span>Type: {reportTypes.find((t) => t.id === selectedType)?.label}</span>
                  <span>Range: {dateRange}</span>
                  <span>Generated: Just now</span>
                </div>
              </div>
            )}
          </div>

          <div className="report-modal-footer">
            <button className="report-cancel" onClick={onClose}>
              {generated ? 'Close' : 'Cancel'}
            </button>
            {!generated && (
              <button
                className="report-generate"
                onClick={handleGenerate}
                disabled={!selectedType || !reportName || isGenerating}
              >
                {isGenerating ? '⏳ Generating...' : '🚀 Generate Report'}
              </button>
            )}
            {generated && (
              <button className="report-generate" onClick={onClose}>
                📥 Download Report
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
