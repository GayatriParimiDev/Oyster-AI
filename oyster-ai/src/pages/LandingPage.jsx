import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { enterpriseLogos } from '../data/mockData'
import './LandingPage.css'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' },
  }),
}

const techStack = [
  {
    name: 'NVIDIA CUDA',
    desc: 'Parallel computing platform enabling GPU-accelerated inference with up to 14x speedup over traditional CPU-bound pipelines.',
    icon: '⚡',
    tag: 'GPU Computing',
  },
  {
    name: 'TensorRT',
    desc: 'High-performance deep learning inference optimizer and runtime that delivers low-latency, high-throughput model deployment.',
    icon: '🧠',
    tag: 'Inference Engine',
  },
  {
    name: 'NVIDIA Triton',
    desc: 'Open-source inference serving software that standardizes AI model deployment at scale across GPU and CPU clusters.',
    icon: '🔺',
    tag: 'Model Serving',
  },
  {
    name: 'NeMo Framework',
    desc: 'Scalable generative AI framework for building, customizing, and deploying large language models with enterprise guardrails.',
    icon: '🌊',
    tag: 'LLM Framework',
  },
  {
    name: 'RAPIDS cuDF',
    desc: 'GPU-accelerated DataFrame library that processes billions of rows in seconds, dramatically reducing ETL pipeline latency.',
    icon: '📊',
    tag: 'Data Processing',
  },
  {
    name: 'InfiniBand Fabric',
    desc: 'Ultra-low-latency interconnect enabling sub-microsecond node-to-node communication across distributed GPU clusters.',
    icon: '🔗',
    tag: 'Networking',
  },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="landing">
      {/* ── Header ── */}
      <header className="landing-header">
        <div className="landing-logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="12" stroke="var(--sage-700)" strokeWidth="2" />
            <circle cx="14" cy="14" r="4" fill="var(--accent-lime)" />
          </svg>
          <span className="landing-logo-text">Oyster</span>
        </div>
        <nav className="landing-nav">
          <a href="#features">Features</a>
          <a href="#technology">Technology</a>
          <a href="#partners">Partners</a>
        </nav>
        <button
          className="landing-cta-enter"
          onClick={() => navigate('/app/dashboard')}
        >
          Enter Dashboard →
        </button>
      </header>

      {/* ── Hero Section ── */}
      <section className="landing-hero">
        <motion.div
          className="hero-left"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <h1 className="hero-title">
            <span>Intelligence</span>
            <span>at</span>
            <span>Command</span>
          </h1>
          <p className="hero-desc">
            A tactile, high-density AI command center designed for precision. Harness
            real-time telemetry and advanced workflows with clarity and focus.
          </p>
          <div className="hero-actions">
            <button
              className="hero-cta-primary"
              onClick={() => navigate('/app/dashboard')}
            >
              Enter the Command Center →
            </button>
            <button className="hero-cta-secondary">Documentation</button>
          </div>
        </motion.div>

        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <div className="hero-card">
            <div className="hero-card-header">
              <span className="hero-card-label">SYSTEM STATUS</span>
              <span className="hero-card-dot" />
            </div>
            <div className="hero-card-grid">
              <div className="hero-metric-box">
                <span className="hero-metric-label">CPU Load</span>
                <div className="hero-metric-visual">
                  <div className="hero-glow-block" />
                </div>
                <span className="hero-metric-value">42%</span>
              </div>
              <div className="hero-metric-box">
                <span className="hero-metric-label">Active Models</span>
                <div className="hero-metric-visual">
                  <div className="hero-glow-block hero-glow-block--alt" />
                </div>
                <span className="hero-metric-value">12</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Features Section ── */}
      <section className="landing-features" id="features">
        <motion.div
          className="features-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <h2 className="features-title">Tactile Precision</h2>
          <p className="features-subtitle">
            Engineered for high-density data intelligence environments.
          </p>
        </motion.div>

        <div className="features-grid">
          {[
            {
              title: 'REAL-TIME TELEMETRY',
              desc: 'Monitor system performance and data streams with microsecond latency. Our UI reduces cognitive fatigue in data-heavy platforms.',
              visual: 'chart',
            },
            {
              title: 'AI WORKFLOWS',
              desc: 'Deploy and manage complex machine learning models with a clear mental model of information hierarchy.',
              visual: 'workflow',
            },
            {
              title: 'NVIDIA GPU ACCELERATION',
              desc: 'Harness raw computational power. Layered elevations provide focus on critical hardware utilization metrics.',
              visual: 'gpu',
            },
          ].map((f, i) => (
            <motion.div
              className="feature-card"
              key={f.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              custom={i}
              variants={fadeUp}
            >
              <div className="feature-card-top">
                <span className="feature-card-title">{f.title}</span>
                <span className="feature-card-icon">
                  {f.visual === 'chart' && '📈'}
                  {f.visual === 'workflow' && '⚙️'}
                  {f.visual === 'gpu' && '🔧'}
                </span>
              </div>
              <p className="feature-card-desc">{f.desc}</p>
              <div className="feature-card-visual">
                {f.visual === 'chart' && (
                  <div className="feature-bars">
                    {[35, 28, 42, 55, 38, 60, 48].map((h, j) => (
                      <motion.div
                        key={j}
                        className="feature-bar"
                        style={{ '--bar-height': `${h}%` }}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: j * 0.08, duration: 0.4 }}
                      />
                    ))}
                  </div>
                )}
                {f.visual === 'workflow' && (
                  <div className="feature-workflow-visual">
                    <div className="feature-wf-dot" />
                    <div className="feature-wf-line" />
                    <div className="feature-wf-dot feature-wf-dot--check">✓</div>
                  </div>
                )}
                {f.visual === 'gpu' && (
                  <div className="feature-gpu-visual">
                    <div className="feature-gpu-row">
                      <span className="feature-gpu-label">GPU T4</span>
                      <span className="feature-gpu-pct">85%</span>
                    </div>
                    <div className="feature-gpu-bar-track">
                      <motion.div
                        className="feature-gpu-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: '85%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Technology Section ── */}
      <section className="landing-technology" id="technology">
        <motion.div
          className="tech-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <h2 className="tech-title">Powered by NVIDIA</h2>
          <p className="tech-subtitle">
            Enterprise-grade AI infrastructure built on NVIDIA's full-stack accelerated computing platform,
            delivering unprecedented performance for real-time decision intelligence.
          </p>
        </motion.div>

        <div className="tech-grid">
          {techStack.map((tech, i) => (
            <motion.div
              className="tech-card"
              key={tech.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              custom={i}
              variants={fadeUp}
            >
              <div className="tech-card-top">
                <span className="tech-card-icon">{tech.icon}</span>
                <span className="tech-card-tag">{tech.tag}</span>
              </div>
              <h3 className="tech-card-name">{tech.name}</h3>
              <p className="tech-card-desc">{tech.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="tech-architecture"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
        >
          <div className="tech-arch-card">
            <h3 className="tech-arch-title">System Architecture</h3>
            <div className="tech-arch-flow">
              <div className="tech-arch-node">
                <span className="tech-arch-icon">📥</span>
                <span className="tech-arch-label">Data Ingestion</span>
                <span className="tech-arch-sub">PostgreSQL, S3, REST APIs</span>
              </div>
              <div className="tech-arch-connector">→</div>
              <div className="tech-arch-node">
                <span className="tech-arch-icon">⚡</span>
                <span className="tech-arch-label">GPU Processing</span>
                <span className="tech-arch-sub">CUDA + RAPIDS cuDF</span>
              </div>
              <div className="tech-arch-connector">→</div>
              <div className="tech-arch-node">
                <span className="tech-arch-icon">🧠</span>
                <span className="tech-arch-label">AI Inference</span>
                <span className="tech-arch-sub">TensorRT + Triton</span>
              </div>
              <div className="tech-arch-connector">→</div>
              <div className="tech-arch-node">
                <span className="tech-arch-icon">📊</span>
                <span className="tech-arch-label">Real-time Insights</span>
                <span className="tech-arch-sub">Dashboard Telemetry</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Trust / Partners ── */}
      <section className="landing-trust" id="partners">
        <p className="trust-label">TRUSTED BY ENTERPRISE LEADERS</p>
        <div className="trust-logos">
          {enterpriseLogos.map((name) => (
            <span key={name} className="trust-logo">
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="landing-footer">
        <div className="footer-left">
          <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="12" stroke="var(--sage-400)" strokeWidth="2" />
            <circle cx="14" cy="14" r="4" fill="var(--sage-400)" />
          </svg>
          <span className="footer-logo-text">Oyster</span>
        </div>
        <span className="footer-copyright">© 2024 Oyster AI. All rights reserved.</span>
      </footer>
    </div>
  )
}
