import { useState } from 'react'
import { performanceData } from '../data/mockData'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { motion } from 'framer-motion'
import './Performance.css'

const timeRanges = ['1H', '24H', '7D']

export default function Performance() {
  const [activeRange, setActiveRange] = useState('1H')

  const getLatencyColor = (val) => {
    if (val <= 20) return 'var(--sage-700)'
    if (val <= 35) return 'var(--sage-500)'
    if (val <= 45) return 'var(--sage-300)'
    return 'var(--olive-200)'
  }

  return (
    <div className="perf-page">
      {/* ── Page Header ── */}
      <div className="perf-page-header">
        <div>
          <h1 className="perf-page-title">NVIDIA GPU Acceleration</h1>
          <p className="perf-page-desc">
            Real-time telemetry and historical analysis of Tensor Core utilization, VRAM
            allocation, and throughput improvements versus legacy processing pipelines.
          </p>
        </div>
        <div className="perf-time-range">
          {timeRanges.map((r) => (
            <button
              key={r}
              className={`perf-range-btn ${activeRange === r ? 'perf-range-btn--active' : ''}`}
              onClick={() => setActiveRange(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* ── Top Metric Cards ── */}
      <div className="perf-metrics-row">
        <motion.div
          className="perf-metric-card"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <div className="perf-mc-header">
            <span className="perf-mc-label">Global GPU Utilization</span>
            <span className="perf-mc-icon">⊕</span>
          </div>
          <span className="perf-mc-value">
            {performanceData.gpuUtilization.value}
            <span className="perf-mc-unit">%</span>
          </span>
          <span className="perf-mc-trend perf-mc-trend--up">
            ↗ {performanceData.gpuUtilization.trend}
          </span>
        </motion.div>

        <motion.div
          className="perf-metric-card"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="perf-mc-header">
            <span className="perf-mc-label">Active Tensor Cores</span>
            <span className="perf-mc-icon">⊞</span>
          </div>
          <span className="perf-mc-value">{performanceData.tensorCores.value}</span>
          <span className="perf-mc-trend">— {performanceData.tensorCores.trend}</span>
        </motion.div>

        <motion.div
          className="perf-metric-card perf-metric-card--accent"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <span className="perf-mc-label-light">Acceleration Alpha</span>
          <div className="perf-mc-accel">
            <span className="perf-mc-accel-value">
              {performanceData.acceleration.value}
              <span className="perf-mc-accel-x">{performanceData.acceleration.unit}</span>
            </span>
            <span className="perf-mc-accel-desc">{performanceData.acceleration.desc}</span>
          </div>
          <div className="perf-mc-accel-blocks">
            <div className="perf-accel-block perf-accel-block--dark" />
            <div className="perf-accel-block perf-accel-block--light" />
          </div>
        </motion.div>
      </div>

      {/* ── Chart Row ── */}
      <div className="perf-chart-row">
        {/* Area Chart */}
        <motion.div
          className="perf-chart-card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="perf-chart-header">
            <span className="perf-chart-title">
              ✦ VRAM Allocation vs Core Utilization
            </span>
            <div className="perf-chart-legend">
              <span className="perf-legend-item">
                <span className="perf-legend-dot" style={{ background: 'var(--sage-600)' }} />
                Core Load
              </span>
              <span className="perf-legend-item">
                <span className="perf-legend-dot" style={{ background: 'var(--olive-300)' }} />
                VRAM Usage
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={performanceData.chartData}>
              <defs>
                <linearGradient id="coreFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--sage-500)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--sage-500)" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="vramFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--olive-300)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="var(--olive-300)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(42,51,40,0.06)" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 11, fill: 'var(--sage-400)', fontFamily: 'var(--font-mono)' }}
                axisLine={{ stroke: 'rgba(42,51,40,0.1)' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: 'var(--sage-400)', fontFamily: 'var(--font-mono)' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                contentStyle={{
                  background: 'var(--cream-50)',
                  border: 'var(--border-card)',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                }}
              />
              <Area
                type="monotone"
                dataKey="coreLoad"
                stroke="var(--sage-600)"
                strokeWidth={2}
                fill="url(#coreFill)"
                name="Core Load"
              />
              <Area
                type="monotone"
                dataKey="vram"
                stroke="var(--olive-400)"
                strokeWidth={2}
                fill="url(#vramFill)"
                name="VRAM Usage"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* PCIe Latency Matrix */}
        <motion.div
          className="perf-latency-card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h3 className="perf-latency-title">⊞ PCIe Bus Latency</h3>
          <p className="perf-latency-desc">
            Node-to-Node communication latency across the InfiniBand fabric. Darker green
            indicates lower latency (optimal).
          </p>
          <div className="perf-latency-matrix">
            <div className="perf-matrix-header">
              <span />
              {['N-01', 'N-02', 'N-03', 'N-04', 'N-05'].map((n) => (
                <span key={n} className="perf-matrix-col">{n}</span>
              ))}
            </div>
            {performanceData.pcieLatency.map((row, ri) => (
              <div className="perf-matrix-row" key={ri}>
                <span className="perf-matrix-row-label">N-{String(ri + 1).padStart(2, '0')}</span>
                {row.map((val, ci) => (
                  <div
                    key={ci}
                    className="perf-matrix-cell"
                    style={{ background: getLatencyColor(val) }}
                    title={`${val}μs`}
                  />
                ))}
              </div>
            ))}
            <div className="perf-matrix-legend">
              <span>Optimal (&lt;20μs)</span>
              <div className="perf-matrix-legend-bar" />
              <span>Degraded (&gt;50μs)</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Nodes Table ── */}
      <motion.div
        className="perf-nodes-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="perf-nodes-header">
          <h3 className="perf-nodes-title">⊟ Accelerated Nodes Status</h3>
          <button className="perf-nodes-link">View Detailed Logs →</button>
        </div>
        <table className="perf-nodes-table">
          <thead>
            <tr>
              <th>NODE ID</th>
              <th>ARCHITECTURE</th>
              <th>TEMP</th>
              <th>POWER DRAW</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {performanceData.nodes.map((node) => (
              <tr key={node.id}>
                <td className="perf-node-id">{node.id}</td>
                <td>{node.arch}</td>
                <td>{node.temp}</td>
                <td>{node.power}</td>
                <td>
                  <span
                    className={`perf-node-status perf-node-status--${node.status.toLowerCase()}`}
                  >
                    {node.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}
