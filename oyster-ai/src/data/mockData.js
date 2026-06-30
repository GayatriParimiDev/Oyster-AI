/* ═══════════════════════════════════════════════════════
   MOCK DATA — JSON state streams for Oyster AI
   ═══════════════════════════════════════════════════════ */

export const dashboardData = {
  decisions: [
    { id: 1, label: 'Fraud Model Drift', value: 92, severity: 'critical' },
    { id: 2, label: 'Latency Spike API', value: 78, severity: 'warning' },
    { id: 3, label: 'Data Sync Delay', value: 45, severity: 'info' },
  ],
  performanceMetrics: {
    accelerated: '1.2s',
    legacy: '4.5s',
    label: 'Insight Delivery',
    barData: [
      { name: 'Mon', value: 32 },
      { name: 'Tue', value: 38 },
      { name: 'Wed', value: 35 },
      { name: 'Thu', value: 42 },
      { name: 'Fri', value: 55 },
      { name: 'Sat', value: 70 },
      { name: 'Now', value: 85 },
    ],
  },
  pipeline: [
    { id: 'source', label: 'Source', icon: '☁️' },
    { id: 'transform', label: 'Transform', icon: '⇅' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'insight', label: 'Insight', icon: '💡' },
  ],
  alerts: [
    {
      id: 1,
      title: 'API Rate Limit Nearing',
      desc: 'Endpoint /v2/query at 85% capacity.',
      type: 'warning',
    },
    {
      id: 2,
      title: 'Model Retraining Complete',
      desc: 'Vision-X.2 deployed successfully.',
      type: 'info',
    },
  ],
}

export const dataSourcesData = [
  {
    id: 1,
    name: 'PostgreSQL Prod',
    icon: '🗄️',
    status: 'syncing',
    statusLabel: 'SYNCING',
    metrics: [
      { label: 'Total Volume', value: '4.2 TB' },
      { label: 'Latency', value: '12ms' },
      { label: 'Last Sync', value: 'Just now' },
      { label: 'Ingestion Rate', value: '45k rows/s' },
    ],
  },
  {
    id: 2,
    name: 'AWS S3 Data Lake',
    icon: '☁️',
    status: 'healthy',
    statusLabel: 'HEALTHY',
    metrics: [
      { label: 'Total Objects', value: '1.8M' },
      { label: 'Bandwidth', value: '850 MB/s' },
      { label: 'Last Scan', value: '5 mins ago' },
      { label: 'Delta Changes', value: '+12k today' },
    ],
  },
  {
    id: 3,
    name: 'Stripe API',
    icon: '💳',
    status: 'degraded',
    statusLabel: 'DEGRADED',
    metrics: [
      { label: 'Requests/min', value: '450', highlight: false },
      { label: 'Error Rate', value: '4.2%', highlight: true },
      { label: 'Last Sync', value: 'Failed (10m ago)', highlight: true },
      { label: 'Retry Queue', value: '1,204' },
    ],
  },
]

export const workflowNodes = [
  {
    id: 'postgres',
    type: 'source',
    label: 'PostgreSQL Raw',
    icon: '🗄️',
    detail: 'SELECT * FROM user_events',
    subDetail: 'Records: ~2.4M',
    x: 80,
    y: 140,
    status: 'active',
  },
  {
    id: 'filter',
    type: 'transform',
    label: 'Filter: Active Users',
    icon: '🔽',
    detail: "status = 'active' AND\nlast_login > NOW() - INTERVAL\n'30 days'",
    x: 520,
    y: 240,
    status: 'active',
  },
]

export const workflowOperators = {
  'Data I/O': [
    { id: 'sql', label: 'SQL Input', icon: '🗄️' },
    { id: 'rest', label: 'REST API', icon: '🔗' },
  ],
  Transform: [
    { id: 'filter', label: 'Filter', icon: '🔽' },
    { id: 'join', label: 'Join', icon: '🔗' },
    { id: 'aggregate', label: 'Aggregate', icon: 'Σ' },
  ],
  'Machine Learning': [
    { id: 'predict', label: 'Predictive Model', icon: '🧠' },
    { id: 'anomaly', label: 'Anomaly Detect', icon: '📈' },
  ],
}

export const alertsData = {
  critical: {
    count: 3,
    label: 'CRITICAL',
    desc: 'Action required immediately to prevent system failure.',
  },
  warning: {
    count: 14,
    label: 'WARNING',
    desc: 'Anomalies detected. Performance degradation likely.',
  },
  systemHealth: {
    value: 92.4,
    bars: [28, 35, 42, 50, 68, 80],
  },
  logs: [
    {
      id: 1,
      title: 'Database connection timeout',
      severity: 'critical',
      time: '10:42:05 AM',
      node: 'NODE-ALPHA-1',
      desc: 'Connection to primary replica refused after 3000ms. Failover initia...',
    },
    {
      id: 2,
      title: 'High Memory Utilization Detected',
      severity: 'warning',
      time: '10:38:12 AM',
      node: 'POD-CACHE-4',
      desc: 'Memory usage exceeded 85% threshold (8.2GB/9.6GB) for 5 minutes.',
    },
    {
      id: 3,
      title: 'Model Retraining Completed',
      severity: 'info',
      time: '10:15:00 AM',
      node: 'WORKFLOW-ML-OP',
      desc: 'Pipeline V2 successfully completed. Accuracy improved by +0....',
    },
    {
      id: 4,
      title: 'User Session Purge',
      severity: 'info',
      time: '09:00:01 AM',
      node: 'SYS-CRON',
      desc: 'Routine cleanup of 1,204 expired sessions completed.',
    },
  ],
  totalAlerts: 128,
}

export const performanceData = {
  gpuUtilization: { value: 87.4, trend: '+2.1% from last hour' },
  tensorCores: { value: '14,392', trend: 'Steady capacity' },
  acceleration: { value: '14.2', unit: 'x', desc: 'Faster than legacy CPUs' },
  chartData: Array.from({ length: 25 }, (_, i) => {
    const time = `09:${String(i * 2 + 10).padStart(2, '0').slice(0, 2)}:00`
    const coreLoad = 20 + Math.sin(i / 3) * 25 + Math.random() * 15
    const vram = 15 + Math.sin(i / 4 + 1) * 20 + Math.random() * 10
    return {
      time: `${9 + Math.floor(i / 12)}:${String((i * 5) % 60).padStart(2, '0')}`,
      coreLoad: Math.min(100, Math.max(0, coreLoad)),
      vram: Math.min(100, Math.max(0, vram)),
    }
  }),
  pcieLatency: [
    [12, 18, 22, 35, 42],
    [15, 10, 28, 20, 38],
    [22, 15, 12, 25, 30],
    [30, 22, 18, 14, 28],
    [40, 32, 25, 20, 15],
  ],
  nodes: [
    { id: 'N-01-A100', arch: 'NVIDIA Ampere', temp: '68°C', power: '320W', status: 'Active' },
    { id: 'N-02-H100', arch: 'NVIDIA Hopper', temp: '72°C', power: '680W', status: 'Active' },
    { id: 'N-03-A100', arch: 'NVIDIA Ampere', temp: '65°C', power: '290W', status: 'Standby' },
  ],
}

export const enterpriseLogos = ['ACME Corp', 'GlobalData', 'Nexus AI', 'Quantum']
