import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

/* ── Inline animated AI illustration (replaces Lottie — zero dependencies) ── */
function AiIllustration() {
  return (
    <svg
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      <defs>
        <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ring1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="ring2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e879f9" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <filter id="blur1">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      {/* Bg glow blobs */}
      <ellipse cx="200" cy="200" rx="140" ry="140" fill="url(#glow1)" filter="url(#blur1)" className="svg-pulse" />
      <ellipse cx="200" cy="200" rx="90" ry="90" fill="url(#glow2)" filter="url(#blur1)" className="svg-pulse-alt" />

      {/* Outer orbit ring */}
      <circle cx="200" cy="200" r="155" fill="none" stroke="rgba(0,212,255,0.12)" strokeWidth="1" />
      <circle cx="200" cy="200" r="155" fill="none" stroke="url(#ring1)" strokeWidth="1.5"
        strokeDasharray="50 920" strokeLinecap="round" className="svg-orbit-1" />

      {/* Middle orbit ring */}
      <circle cx="200" cy="200" r="120" fill="none" stroke="rgba(124,58,237,0.15)" strokeWidth="1" />
      <circle cx="200" cy="200" r="120" fill="none" stroke="url(#ring2)" strokeWidth="1.5"
        strokeDasharray="35 720" strokeLinecap="round" className="svg-orbit-2" />

      {/* Inner orbit ring */}
      <circle cx="200" cy="200" r="85" fill="none" stroke="rgba(232,121,249,0.12)" strokeWidth="1" />
      <circle cx="200" cy="200" r="85" fill="none" stroke="#e879f9" strokeWidth="1"
        strokeDasharray="20 515" strokeLinecap="round" className="svg-orbit-3" />

      {/* Core hexagon */}
      <polygon
        points="200,155 235,175 235,222 200,242 165,222 165,175"
        fill="rgba(0,212,255,0.06)"
        stroke="url(#ring1)"
        strokeWidth="1.5"
        className="svg-hex"
      />
      <polygon
        points="200,168 222,180 222,210 200,222 178,210 178,180"
        fill="rgba(124,58,237,0.1)"
        stroke="rgba(124,58,237,0.5)"
        strokeWidth="1"
        className="svg-hex-inner"
      />

      {/* Center AI text */}
      <text x="200" y="193" textAnchor="middle" fill="#00d4ff" fontSize="13" fontWeight="700" fontFamily="monospace" letterSpacing="2">AI</text>
      <text x="200" y="212" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="monospace" letterSpacing="1">SECURE</text>

      {/* Orbit dot — outer */}
      <circle r="5" fill="#00d4ff" className="svg-dot-outer">
        <animateMotion dur="8s" repeatCount="indefinite">
          <mpath href="#outer-path" />
        </animateMotion>
      </circle>
      <path id="outer-path" d="M 355,200 A 155,155 0 1,1 354.9,200" fill="none" />

      {/* Orbit dot — middle */}
      <circle r="4" fill="#e879f9" className="svg-dot-mid">
        <animateMotion dur="5s" repeatCount="indefinite" begin="-2s">
          <mpath href="#mid-path" />
        </animateMotion>
      </circle>
      <path id="mid-path" d="M 320,200 A 120,120 0 1,0 319.9,200" fill="none" />

      {/* Orbit dot — inner */}
      <circle r="3" fill="#7c3aed">
        <animateMotion dur="3.5s" repeatCount="indefinite" begin="-1s">
          <mpath href="#inner-path" />
        </animateMotion>
      </circle>
      <path id="inner-path" d="M 285,200 A 85,85 0 1,1 284.9,200" fill="none" />

      {/* Corner data nodes */}
      {[
        { x: 80,  y: 100, label: "Auth" },
        { x: 320, y: 100, label: "API" },
        { x: 60,  y: 300, label: "LLM" },
        { x: 340, y: 300, label: "ML" },
      ].map(({ x, y, label }) => (
        <g key={label} className="svg-node">
          <circle cx={x} cy={y} r="18" fill="rgba(0,212,255,0.07)" stroke="rgba(0,212,255,0.25)" strokeWidth="1" />
          <text x={x} y={y + 4} textAnchor="middle" fill="rgba(0,212,255,0.8)" fontSize="9" fontFamily="monospace">{label}</text>
          <line x1={x + (x < 200 ? 18 : -18)} y1={y} x2={200 + (x < 200 ? -60 : 60)} y2={200 + (y < 200 ? -30 : 30)}
            stroke="rgba(0,212,255,0.12)" strokeWidth="0.8" strokeDasharray="4 4" />
        </g>
      ))}
    </svg>
  );
}

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="login-root">
      {/* ── Animated background orbs ── */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* ── Floating particles ── */}
      <div className="particles">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="particle" />
        ))}
      </div>

      {/* ══════════════════════════════════════
          LEFT PANEL  — Lottie + Branding
      ══════════════════════════════════════ */}
      <aside className="login-left">
        {/* Brand */}
        <div className="login-brand">
          <div className="brand-icon">✦</div>
          <span className="brand-name">GenAI Studio</span>
        </div>

        {/* Animated SVG illustration */}
        <div className="lottie-wrap">
          <AiIllustration />
        </div>

        <h2 className="left-heading">
          Unlock the power of<br />
          <span>Artificial Intelligence</span>
        </h2>
        <p className="left-sub">Your AI-powered workspace, reimagined.</p>

        <ul className="feature-list">
          <li><span className="feat-dot" /> Real-time AI conversations</li>
          <li><span className="feat-dot" /> Secure end-to-end encryption</li>
          <li><span className="feat-dot" /> Smart workflow automation</li>
        </ul>
      </aside>

      {/* ══════════════════════════════════════
          RIGHT PANEL  — Login Card
      ══════════════════════════════════════ */}
      <main className="login-right">
        <div className="glass-card">

          {/* Mobile-only brand */}
          <div className="mobile-brand">
            <div className="brand-icon">✦</div>
            <span className="brand-name">GenAI Studio</span>
          </div>

          {/* Badge */}
          <div className="card-badge">
            <span className="badge-dot" />
            Secure Login
          </div>

          {/* Title */}
          <h1 className="card-title">
            Welcome <span>back.</span>
          </h1>
          <p className="card-subtitle">Sign in to continue your AI journey</p>

          <div className="divider" />

          {/* Form */}
          <form className="login-form" onSubmit={handleSubmit} noValidate>

            {/* Email */}
            <div className="field-group">
              <label className="field-label" htmlFor="email">Email address</label>
              <div className="input-wrap">
                <span className="input-icon">✉</span>
                <input
                  id="email"
                  className="field-input"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="field-group">
              <label className="field-label" htmlFor="password">Password</label>
              <div className="input-wrap">
                <span className="input-icon">🔒</span>
                <input
                  id="password"
                  className="field-input"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••••"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="eye-btn"
                  aria-label={showPass ? "Hide password" : "Show password"}
                  onClick={() => setShowPass((v) => !v)}
                >
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="form-extras">
              <label className="remember-label">
                <input type="checkbox" id="remember" />
                Remember me
              </label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              id="login-submit-btn"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign In →"}
            </button>

          </form>

          <div className="or-divider">or continue with</div>

          {/* Sign up link */}
          <p className="card-footer">
            Don&apos;t have an account?{" "}
            <Link to="/register">Create one — it&apos;s free</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
