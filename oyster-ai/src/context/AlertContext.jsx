import { createContext, useContext, useState, useCallback } from 'react'

const initialLogs = [
  { id: 1, title: 'Database connection timeout', severity: 'critical', time: '10:42:05 AM', node: 'NODE-ALPHA-1', desc: 'Connection to primary replica refused after 3000ms. Failover initiated.', acknowledged: false },
  { id: 2, title: 'High Memory Utilization Detected', severity: 'warning', time: '10:38:12 AM', node: 'POD-CACHE-4', desc: 'Memory usage exceeded 85% threshold (8.2GB/9.6GB) for 5 minutes.', acknowledged: false },
  { id: 3, title: 'Model Retraining Completed', severity: 'info', time: '10:15:00 AM', node: 'WORKFLOW-ML-OP', desc: 'Pipeline V2 successfully completed. Accuracy improved by +0.8%.', acknowledged: false },
  { id: 4, title: 'User Session Purge', severity: 'info', time: '09:00:01 AM', node: 'SYS-CRON', desc: 'Routine cleanup of 1,204 expired sessions completed.', acknowledged: false },
  { id: 5, title: 'VRAM Exhausted on Node-02-H100', severity: 'critical', time: '08:45:12 AM', node: 'NODE-02-H100', desc: 'Out of memory during large LLM inference run. Batch size was too large.', acknowledged: false },
  { id: 6, title: 'PCIe bus bandwidth saturation', severity: 'warning', time: '08:30:55 AM', node: 'NODE-01-A100', desc: 'PCIe link utilization reached 98.4%. Data transfer bottleneck detected.', acknowledged: false },
  { id: 7, title: 'Unscheduled Node Restart', severity: 'critical', time: '07:12:44 AM', node: 'NODE-03-A100', desc: 'Hardware fault or power supply failure triggered automated failover.', acknowledged: false },
  { id: 8, title: 'Ingestion rate dropped by 40%', severity: 'warning', time: '06:05:00 AM', node: 'CONNECTOR-KAFKA', desc: 'Message throughput fell below baseline of 25k/s. Checking partitions.', acknowledged: false },
  { id: 9, title: 'Stripe API request timeouts', severity: 'warning', time: '05:40:22 AM', node: 'GATEWAY-PAY', desc: '5% of Stripe requests returned 504 Gateway Timeout. Automatic retry queued.', acknowledged: false },
  { id: 10, title: 'Nightly Database Backup Completed', severity: 'info', time: '03:00:15 AM', node: 'SYS-BACKUP', desc: 'Compressed archive of 4.2TB uploaded to S3 Data Lake successfully.', acknowledged: false },
  { id: 11, title: 'Task Scheduler Delay Detected', severity: 'info', time: '02:15:00 AM', node: 'SYS-CRON', desc: 'Cron worker execution delayed by 45s due to high queue backlog.', acknowledged: false },
  { id: 12, title: 'GPU Core Temp Spike (82°C)', severity: 'critical', time: '01:50:33 AM', node: 'NODE-02-H100', desc: 'Thermal throttling warning. Checking cooling fan performance.', acknowledged: false },
  { id: 13, title: 'Invalid API Token Payloads', severity: 'warning', time: '12:05:11 AM', node: 'AUTH-SERVER', desc: '14 request validation failures within 1 minute from IP 192.168.1.104.', acknowledged: false },
  { id: 14, title: 'High Throughput Alert', severity: 'warning', time: 'Yesterday', node: 'CONNECTOR-REST', desc: 'HTTP request rate exceeded 12,000 req/min for more than 10 minutes.', acknowledged: false },
  { id: 15, title: 'SSL Certificate Renewal Success', severity: 'info', time: 'Yesterday', node: 'AUTH-SERVER', desc: 'Let\'s Encrypt certificate renewed successfully. Valid for 90 days.', acknowledged: true },
  { id: 16, title: 'DB Replica Lag Spike', severity: 'warning', time: 'Yesterday', node: 'NODE-ALPHA-2', desc: 'Replication lag rose to 12.4s. Caught up in 45s.', acknowledged: true },
  { id: 17, title: 'Weights download complete', severity: 'info', time: 'Yesterday', node: 'NODE-02-H100', desc: 'Llama-3-70B model checkpoint downloaded and loaded into memory cache.', acknowledged: true },
  { id: 18, title: 'DNS Resolution Failures', severity: 'critical', time: '2 days ago', node: 'GATEWAY-API', desc: 'Could not resolve domain name registry.local. Internal DNS reset.', acknowledged: true },
  { id: 19, title: 'Weekly Security Audit', severity: 'info', time: '3 days ago', node: 'SYS-AUDIT', desc: '0 vulnerabilities found in package lock files and operating systems.', acknowledged: true },
  { id: 20, title: 'S3 Ingestion Storage Limit', severity: 'warning', time: '3 days ago', node: 'SYS-BACKUP', desc: 'S3 bucket size near 80% soft limit. Archiving older logs recommended.', acknowledged: true },
]

const AlertContext = createContext()

export function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState(() => ({
    critical: { count: 4, desc: 'Action required immediately to prevent system failure.' },
    warning: { count: 9, desc: 'Anomalies detected. Performance degradation likely.' },
    systemHealth: { value: 92.4, bars: [28, 35, 42, 50, 68, 80] },
    logs: initialLogs,
    totalAlerts: initialLogs.length,
  }))

  const unacknowledgedCount = alerts.logs.filter((l) => !l.acknowledged).length

  const acknowledgeAlert = useCallback((id) => {
    setAlerts((prev) => ({
      ...prev,
      logs: prev.logs.map((log) =>
        log.id === id ? { ...log, acknowledged: true } : log
      ),
    }))
  }, [])

  const acknowledgeAll = useCallback(() => {
    setAlerts((prev) => ({
      ...prev,
      logs: prev.logs.map((log) => ({ ...log, acknowledged: true })),
    }))
  }, [])

  return (
    <AlertContext.Provider
      value={{ alerts, unacknowledgedCount, acknowledgeAlert, acknowledgeAll }}
    >
      {children}
    </AlertContext.Provider>
  )
}

export function useAlerts() {
  const ctx = useContext(AlertContext)
  if (!ctx) throw new Error('useAlerts must be used within AlertProvider')
  return ctx
}
