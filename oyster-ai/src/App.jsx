import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AppLayout from './layouts/AppLayout'
import Dashboard from './pages/Dashboard'
import DataSources from './pages/DataSources'
import Workflows from './pages/Workflows'
import Alerts from './pages/Alerts'
import Performance from './pages/Performance'
import DeployModal from './components/DeployModal'
import './App.css'

function App() {
  const [showDeploy, setShowDeploy] = useState(false)

  const openDeploy = useCallback(() => setShowDeploy(true), [])
  const closeDeploy = useCallback(() => setShowDeploy(false), [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<AppLayout onDeploy={openDeploy} />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="data-sources" element={<DataSources />} />
          <Route path="workflows" element={<Workflows />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="performance" element={<Performance />} />
        </Route>
      </Routes>
      {showDeploy && <DeployModal onClose={closeDeploy} />}
    </BrowserRouter>
  )
}

export default App
