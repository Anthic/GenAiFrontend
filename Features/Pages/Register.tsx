import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

/* ── Inline "Join Network" animation (custom SVG) ── */
function JoinNetworkIllustration() {
  return (
    <svg
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      <defs>
        <radialGradient id="teal-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="indigo-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <filter id="blur-glow">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      {/* Background blobs */}
      <ellipse cx="200" cy="200" rx="130" ry="130" fill="url(#teal-glow)" filter="url(#blur-glow)" />
      <ellipse cx="200" cy="200" rx="90" ry="90" fill="url(#indigo-glow)" filter="url(#blur-glow)" />

      {/* Base network ring */}
      <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(45,212,191,0.15)" strokeWidth="1" />
      <circle
        cx="200" cy="200" r="140" fill="none"
        stroke="url(#line-grad)" strokeWidth="1.5"
        strokeDasharray="880" strokeLinecap="round"
        className="svg-draw-circle"
      />

      {/* Connecting lines from center to nodes */}
      <line x1="200" y1="200" x2="200" y2="60"  stroke="url(#line-grad)" strokeWidth="1.5" strokeDasharray="200" className="svg-line-1" />
      <line x1="200" y1="200" x2="333" y2="157" stroke="url(#line-grad)" strokeWidth="1.5" strokeDasharray="200" className="svg-line-2" />
      <line x1="200" y1="200" x2="282" y2="313" stroke="url(#line-grad)" strokeWidth="1.5" strokeDasharray="200" className="svg-line-3" />
      <line x1="200" y1="200" x2="118" y2="313" stroke="url(#line-grad)" strokeWidth="1.5" strokeDasharray="200" className="svg-line-4" />
      <line x1="200" y1="200" x2="67"  y2="157" stroke="url(#line-grad)" strokeWidth="1.5" strokeDasharray="200" className="svg-line-5" />

      {/* Surrounding Nodes */}
      {/* Top */}
      <circle cx="200" cy="60" r="22" fill="#12123a" stroke="#2dd4bf" strokeWidth="2" className="svg-node-1" />
      <circle cx="200" cy="60" r="6" fill="#2dd4bf" />
      {/* Top Right */}
      <circle cx="333" cy="157" r="22" fill="#12123a" stroke="#6366f1" strokeWidth="2" className="svg-node-2" />
      <circle cx="333" cy="157" r="6" fill="#6366f1" />
      {/* Bottom Right */}
      <circle cx="282" cy="313" r="22" fill="#12123a" stroke="#2dd4bf" strokeWidth="2" className="svg-node-3" />
      <circle cx="282" cy="313" r="6" fill="#2dd4bf" />
      {/* Bottom Left */}
      <circle cx="118" cy="313" r="22" fill="#12123a" stroke="#6366f1" strokeWidth="2" className="svg-node-4" />
      <circle cx="118" cy="313" r="6" fill="#6366f1" />
      {/* Top Left */}
      <circle cx="67" cy="157" r="22" fill="#12123a" stroke="#2dd4bf" strokeWidth="2" className="svg-node-5" />
      <circle cx="67" cy="157" r="6" fill="#2dd4bf" />

      {/* Sparkles around nodes */}
      <path d="M 200,20 l 5,10 l 10,5 l -10,5 l -5,10 l -5,-10 l -10,-5 l 10,-5 Z" fill="#2dd4bf" className="svg-spark-1" />
      <path d="M 370,140 l 4,8 l 8,4 l -8,4 l -4,8 l -4,-8 l -8,-4 l 8,-4 Z" fill="#6366f1" className="svg-spark-2" />
      <path d="M 30,140 l 4,8 l 8,4 l -8,4 l -4,8 l -4,-8 l -8,-4 l 8,-4 Z" fill="#2dd4bf" className="svg-spark-3" />

      {/* Center Group (New User) */}
      <g className="svg-center" style={{ transformOrigin: "200px 200px" }}>
        <circle cx="200" cy="200" r="28" fill="none" stroke="#2dd4bf" className="svg-ripple" />
        <circle cx="200" cy="200" r="28" fill="none" stroke="#6366f1" className="svg-ripple-2" />
        
        <circle cx="200" cy="200" r="30" fill="#080820" stroke="url(#line-grad)" strokeWidth="3" />
        <circle cx="200" cy="200" r="12" fill="#2dd4bf" />
        
        {/* Floating Verified Badge */}
        <g className="svg-badge">
          <circle cx="225" cy="175" r="10" fill="#2dd4bf" />
          <path d="M 221,175 l 3,3 l 5,-5" fill="none" stroke="#080820" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        
        <text x="200" y="248" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="600" letterSpacing="1">YOU</text>
      </g>
    </svg>
  );
}

export default function Register() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Calculate password strength based on length for demonstration
  const getStrengthWidth = () => {
    const len = form.password.length;
    if (len === 0) return "0%";
    if (len <= 4) return "33%";
    if (len <= 8) return "66%";
    return "100%";
  };
  const getStrengthColor = () => {
    const len = form.password.length;
    if (len <= 4) return "#ef4444"; // red
    if (len <= 8) return "#eab308"; // yellow
    return "#2dd4bf"; // teal
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="reg-root">
      {/* ── Background Elements ── */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="particles">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="particle" />
        ))}
      </div>


      <main className="reg-left">
        <div className="glass-card">
          {/* Mobile-only brand */}
          <div className="mobile-brand">
            <div className="brand-icon">✦</div>
            <span className="brand-name">GenAI Studio</span>
          </div>

          <div className="card-badge">
            <span className="badge-dot" />
            Create Account
          </div>

          <h1 className="card-title">
            Join the <span>network.</span>
          </h1>
          <p className="card-subtitle">Unlock unlimited AI potential today.</p>

          <div className="divider" />

          <form className="reg-form" onSubmit={handleSubmit} noValidate>
            
            {/* Full Name */}
            <div className="field-group">
              <label className="field-label" htmlFor="name">Full name</label>
              <div className="input-wrap">
                <span className="input-icon">👤</span>
                <input
                  id="name"
                  className="field-input"
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
            </div>

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
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPass((v) => !v)}
                >
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
              {/* Strength Indicator */}
              {form.password.length > 0 && (
                <div className="strength-bar">
                  <div
                    className="strength-fill"
                    style={{ width: getStrengthWidth(), background: getStrengthColor() }}
                  />
                </div>
              )}
            </div>

            {/* Terms checkbox */}
            <label className="terms-label">
              <input type="checkbox" required />
              <span>
                I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>.
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? "Creating account…" : "Create Account →"}
            </button>
          </form>

          <p className="card-footer">
            Already have an account?{" "}
            <Link to="/login">Sign in instead</Link>
          </p>
        </div>
      </main>

      {/* ══════════════════════════════════════
          RIGHT PANEL — Illustration & Branding
      ══════════════════════════════════════ */}
      <aside className="reg-right-panel">
        <div className="reg-brand">
          <div className="brand-icon">✦</div>
          <span className="brand-name">GenAI Studio</span>
        </div>

        {/* Animated Network Illustration */}
        <div className="reg-illustration">
          <JoinNetworkIllustration />
        </div>

        <h2 className="right-heading">
          Be part of the<br />
          <span>next generation</span>
        </h2>
        <p className="right-sub">Join thousands of developers building the future.</p>

        <div className="step-pills">
          <div className="pill"><div className="pill-num">1</div> Register</div>
          <div className="pill"><div className="pill-num">2</div> Connect</div>
          <div className="pill"><div className="pill-num">3</div> Build</div>
        </div>
      </aside>

    </div>
  );
}
