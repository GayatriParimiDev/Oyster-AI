import { dashboardData } from '../data/mockData'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { motion } from 'framer-motion'
import './Dashboard.css'

const severityColors = {
  critical: 'var(--alert-red)',
  warning: 'var(--alert-yellow)',
  info: 'var(--accent-lime)',
}

export default function Dashboard() {
  const { decisions, performanceMetrics, pipeline, alerts } = dashboardData

  return (
    <div className="dashboard">
      <div className="dash-grid">
        {/* ── Decisions at a Glance ── */}
        <motion.div
          className="dash-card dash-decisions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <div className="dash-card-header">
            <h3 className="dash-card-title">DECISIONS AT A GLANCE</h3>
            <span className="dash-card-icon">☑</span>
          </div>
          <div className="dash-card-divider" />
          <div className="decisions-list">
            {decisions.map((d) => (
              <div className="decision-row" key={d.id}>
                <span
                  className="decision-dot"
                  style={{ background: severityColors[d.severity] }}
                />
                <span className="decision-label">{d.label}</span>
                <span
                  className="decision-value"
                  style={{ color: severityColors[d.severity] }}
                >
                  {d.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Performance Metrics ── */}
        <motion.div
          className="dash-card dash-perf"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="dash-card-header">
            <h3 className="dash-card-title">PERFORMANCE METRICS</h3>
            <span className="dash-card-icon">📊</span>
          </div>
          <div className="dash-card-divider" />
          <div className="perf-content">
            <div className="perf-labels">
              <p className="perf-insight-label">{performanceMetrics.label}</p>
              <div className="perf-compare">
                <div className="perf-stat">
                  <span className="perf-stat-tag perf-stat-tag--accel">[Accelerated]</span>
                  <span className="perf-stat-value">{performanceMetrics.accelerated}</span>
                </div>
                <span className="perf-vs">vs</span>
                <div className="perf-stat">
                  <span className="perf-stat-tag">[Legacy]</span>
                  <span className="perf-stat-value">{performanceMetrics.legacy}</span>
                </div>
              </div>
            </div>
            <div className="perf-chart">
              <div className="perf-chart-now">Now</div>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={performanceMetrics.barData} barCategoryGap="20%">
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--cream-50)',
                      border: 'var(--border-card)',
                      borderRadius: '8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                    }}
                  />
                  <Bar dataKey="value" fill="var(--olive-200)" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* ── Active Data Pipeline ── */}
        <motion.div
          className="dash-card dash-pipeline"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="dash-card-header">
            <h3 className="dash-card-title">ACTIVE DATA PIPELINE</h3>
            <span className="dash-card-icon">⚙️</span>
          </div>
          <div className="dash-card-divider" />
          <div className="pipeline-flow">
            {pipeline.map((step, i) => (
              <div className="pipeline-step" key={step.id}>
                <div className="pipeline-node">
                  <div className="pipeline-node-icon">{step.icon}</div>
                </div>
                <span className="pipeline-node-label">{step.label}</span>
                {i < pipeline.length - 1 && <div className="pipeline-connector" />}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── System Alerts ── */}
        <motion.div
          className="dash-card dash-alerts"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="dash-card-header">
            <h3 className="dash-card-title">SYSTEM ALERTS</h3>
            <span className="dash-card-icon">🔔</span>
          </div>
          <div className="dash-card-divider" />
          <div className="dash-alerts-list">
            {alerts.map((a) => (
              <div className={`dash-alert-item dash-alert-item--${a.type}`} key={a.id}>
                <span className="dash-alert-icon">
                  {a.type === 'warning' ? '⚠' : 'ℹ'}
                </span>
                <div>
                  <p className="dash-alert-title">{a.title}</p>
                  <p className="dash-alert-desc">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
