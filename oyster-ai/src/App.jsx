import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AlertProvider } from './context/AlertContext'
import LandingPage from './pages/LandingPage'
import AppLayout from './layouts/AppLayout'
import Dashboard from './pages/Dashboard'
import DataSources from './pages/DataSources'
import Workflows from './pages/Workflows'
import Alerts from './pages/Alerts'
import Performance from './pages/Performance'
import DeployModal from './components/DeployModal'
import SettingsModal from './components/SettingsModal'
import NewReportModal from './components/NewReportModal'
import './App.css'

function App() {
  const [showDeploy, setShowDeploy] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showNewReport, setShowNewReport] = useState(false)

  const openDeploy = useCallback(() => setShowDeploy(true), [])
  const closeDeploy = useCallback(() => setShowDeploy(false), [])
  const openSettings = useCallback(() => setShowSettings(true), [])
  const closeSettings = useCallback(() => setShowSettings(false), [])
  const openNewReport = useCallback(() => setShowNewReport(true), [])
  const closeNewReport = useCallback(() => setShowNewReport(false), [])

  return (
    <ThemeProvider>
      <AlertProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/app"
              element={
                <AppLayout
                  onDeploy={openDeploy}
                  onSettings={openSettings}
                  onNewReport={openNewReport}
                />
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="data-sources" element={<DataSources />} />
              <Route path="workflows" element={<Workflows />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="performance" element={<Performance />} />
            </Route>
          </Routes>
          {showDeploy && <DeployModal onClose={closeDeploy} />}
          {showSettings && <SettingsModal onClose={closeSettings} />}
          {showNewReport && <NewReportModal onClose={closeNewReport} />}
        </BrowserRouter>
      </AlertProvider>
    </ThemeProvider>
  )
}

export default App
