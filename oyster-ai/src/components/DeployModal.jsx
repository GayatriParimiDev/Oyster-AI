import { motion, AnimatePresence } from 'framer-motion'
import './DeployModal.css'

export default function DeployModal({ onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="deploy-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="deploy-modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="deploy-modal-header">
            <h2>Deploy Model</h2>
            <button className="deploy-close" onClick={onClose}>✕</button>
          </div>
          <div className="deploy-modal-body">
            <div className="deploy-field">
              <label>Model Name</label>
              <input type="text" defaultValue="Vision-X.3" />
            </div>
            <div className="deploy-field">
              <label>Target Environment</label>
              <select defaultValue="production">
                <option value="production">Production</option>
                <option value="staging">Staging</option>
                <option value="development">Development</option>
              </select>
            </div>
            <div className="deploy-field">
              <label>GPU Allocation</label>
              <div className="deploy-gpu-options">
                <button className="deploy-gpu-opt active">A100</button>
                <button className="deploy-gpu-opt">H100</button>
                <button className="deploy-gpu-opt">T4</button>
              </div>
            </div>
            <div className="deploy-status-bar">
              <div className="deploy-status-dot" />
              <span>Cluster Status: Healthy — 3 nodes available</span>
            </div>
          </div>
          <div className="deploy-modal-footer">
            <button className="deploy-cancel" onClick={onClose}>Cancel</button>
            <button className="deploy-confirm" onClick={onClose}>
              🚀 Deploy Now
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
