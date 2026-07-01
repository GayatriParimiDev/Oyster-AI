import { useState, useMemo } from 'react'
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

function generateChartData(range) {
  const count = range === '1H' ? 12 : range === '24H' ? 24 : 30
  const seed = range === '1H' ? 1 : range === '24H' ? 2 : 3

  return Array.from({ length: count }, (_, i) => {
    let time
    if (range === '1H') {
      time = `${String(i * 5).padStart(2, '0')}m`
    } else if (range === '24H') {
      time = `${String(i).padStart(2, '0')}:00`
    } else {
      const d = new Date()
      d.setDate(d.getDate() - (count - 1 - i))
      time = `${d.getMonth() + 1}/${d.getDate()}`
    }

    const base = 20 + seed * 5
    const coreLoad = Math.min(100, Math.max(5, base + Math.sin(i / (3 + seed)) * 25 + (Math.sin(i * seed * 0.7) * 15)))
    const vram = Math.min(100, Math.max(5, base - 5 + Math.sin(i / (4 + seed) + 1) * 20 + (Math.cos(i * seed * 0.5) * 10)))

    return { time, coreLoad: Math.round(coreLoad * 10) / 10, vram: Math.round(vram * 10) / 10 }
  })
}

function generateMetrics(range) {
  const rangeMultiplier = range === '1H' ? 1 : range === '24H' ? 0.95 : 0.88
  return {
    gpuUtilization: {
      value: Math.round(87.4 * rangeMultiplier * 10) / 10,
      trend: range === '1H' ? '+2.1% from last hour' : range === '24H' ? '+5.8% from yesterday' : '+12.3% from last week',
    },
    tensorCores: {
      value: range === '1H' ? '14,392' : range === '24H' ? '13,847' : '12,103',
      trend: range === '1H' ? 'Steady capacity' : range === '24H' ? '+3.2% daily average' : '+8.1% weekly average',
    },
    acceleration: {
      value: range === '1H' ? '14.2' : range === '24H' ? '13.8' : '12.6',
      unit: 'x',
      desc: 'Faster than legacy CPUs',
    },
  }
}

function generateLatency(range) {
  const base = range === '1H' ? 0 : range === '24H' ? 3 : 6
  return [
    [12 + base, 18 + base, 22 + base, 35, 42],
    [15 + base, 10, 28 + base, 20, 38],
    [22, 15, 12 + base, 25, 30 + base],
    [30, 22 + base, 18, 14 + base, 28],
    [40, 32, 25 + base, 20, 15 + base],
  ]
}

function generateNodes(range) {
  const temps = range === '1H' ? ['68°C', '72°C', '65°C'] : range === '24H' ? ['71°C', '75°C', '67°C'] : ['74°C', '78°C', '70°C']
  const powers = range === '1H' ? ['320W', '680W', '290W'] : range === '24H' ? ['340W', '700W', '310W'] : ['360W', '720W', '330W']
  return [
    { id: 'N-01-A100', arch: 'NVIDIA Ampere', temp: temps[0], power: powers[0], status: 'Active' },
    { id: 'N-02-H100', arch: 'NVIDIA Hopper', temp: temps[1], power: powers[1], status: 'Active' },
    { id: 'N-03-A100', arch: 'NVIDIA Ampere', temp: temps[2], power: powers[2], status: range === '7D' ? 'Active' : 'Standby' },
  ]
}

export default function Performance() {
  const [activeRange, setActiveRange] = useState('1H')

  const chartData = useMemo(() => generateChartData(activeRange), [activeRange])
  const metrics = useMemo(() => generateMetrics(activeRange), [activeRange])
  const pcieLatency = useMemo(() => generateLatency(activeRange), [activeRange])
  const nodes = useMemo(() => generateNodes(activeRange), [activeRange])

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
          key={`gpu-${activeRange}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <div className="perf-mc-header">
            <span className="perf-mc-label">Global GPU Utilization</span>
            <span className="perf-mc-icon">⊕</span>
          </div>
          <span className="perf-mc-value">
            {metrics.gpuUtilization.value}
            <span className="perf-mc-unit">%</span>
          </span>
          <span className="perf-mc-trend perf-mc-trend--up">
            ↗ {metrics.gpuUtilization.trend}
          </span>
        </motion.div>

        <motion.div
          className="perf-metric-card"
          key={`tensor-${activeRange}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="perf-mc-header">
            <span className="perf-mc-label">Active Tensor Cores</span>
            <span className="perf-mc-icon">⊞</span>
          </div>
          <span className="perf-mc-value">{metrics.tensorCores.value}</span>
          <span className="perf-mc-trend">— {metrics.tensorCores.trend}</span>
        </motion.div>

        <motion.div
          className="perf-metric-card perf-metric-card--accent"
          key={`accel-${activeRange}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <span className="perf-mc-label-light">Acceleration Alpha</span>
          <div className="perf-mc-accel">
            <span className="perf-mc-accel-value">
              {metrics.acceleration.value}
              <span className="perf-mc-accel-x">{metrics.acceleration.unit}</span>
            </span>
            <span className="perf-mc-accel-desc">{metrics.acceleration.desc}</span>
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
          key={`chart-${activeRange}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="perf-chart-header">
            <span className="perf-chart-title">
              ✦ VRAM Allocation vs Core Utilization ({activeRange})
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
            <AreaChart data={chartData}>
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
          key={`latency-${activeRange}`}
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
            {pcieLatency.map((row, ri) => (
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
        key={`nodes-${activeRange}`}
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
            {nodes.map((node) => (
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
