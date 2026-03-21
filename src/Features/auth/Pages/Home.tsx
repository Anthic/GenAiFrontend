import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  BrainCircuit, 
  FileText, 
  Mic, 
  Map, 
  Send,
  ArrowRight,
  TrendingUp,
  Target,
  UserCheck,
  Bot,
  Database,
  Cpu,
  Layers,
  Code,
  Gauge
} from "lucide-react";
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

const techLogos = [
  { name: "LLaMA 3 Core", icon: Bot },
  { name: "Groq AI Engine", icon: Cpu },
  { name: "React.js", icon: Code },
  { name: "Node Engine", icon: Layers },
  { name: "MongoDB", icon: Database },
  { name: "GSAP Animation", icon: Gauge }, 
  { name: "Tailwind CSS", icon: Target },
];

/* ── Custom Animated SVG for Hero ── */
function HeroBrainSVG() {
  return (
    <svg viewBox="0 0 500 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="brain-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <filter id="glow-blur">
           <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {/* Pulsing Back Glow */}
      <circle cx="250" cy="250" r="180" fill="url(#brain-glow)" filter="url(#glow-blur)" className="animate-pulse" />

      {/* Orbit Rings */}
      <g className="origin-center animate-[spin_20s_linear_infinite]">
        <circle cx="250" cy="250" r="150" fill="none" stroke="rgba(124,58,237,0.2)" strokeWidth="2" strokeDasharray="30 20" />
        <circle cx="250" cy="100" r="8" fill="#00d4ff" />
        <circle cx="100" cy="250" r="12" fill="#e879f9" />
        <circle cx="400" cy="250" r="6" fill="#7c3aed" />
      </g>
      
      <g className="origin-center animate-[spin_15s_linear_infinite_reverse]">
        <circle cx="250" cy="250" r="200" fill="none" stroke="url(#line-gradient)" strokeWidth="1" strokeDasharray="100 150" />
        <circle cx="450" cy="250" r="5" fill="#2dd4bf" />
      </g>

      {/* Core AI Hexagon */}
      <g className="origin-center animate-[bounce_4s_ease-in-out_infinite]">
        <polygon points="250,130 350,190 350,310 250,370 150,310 150,190" fill="rgba(124,58,237,0.1)" stroke="url(#line-gradient)" strokeWidth="3" />
        <polygon points="250,160 320,200 320,290 250,340 180,290 180,200" fill="rgba(0,212,255,0.1)" stroke="#e879f9" strokeWidth="2" />
        <circle cx="250" cy="250" r="25" fill="#7c3aed" className="animate-pulse" />
        <text x="250" y="258" textAnchor="middle" fill="#fff" fontSize="24" fontWeight="bold" fontFamily="sans-serif">AI</text>
      </g>
    </svg>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State for Contact Form
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Animation
      gsap.from(".hero-text > *", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.from(".hero-image", {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: "back.out(1.2)",
      });

      // 2. Continuous Ambient Glows
      gsap.to(".bg-orb", {
        scale: 1.1,
        opacity: 0.6,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 2,
      });

      // 3. Scroll Trigger Animations for Stats
      gsap.from(".stat-box", {
        scrollTrigger: {
          trigger: ".stats-container",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.5)",
      });

      // Counter animation
      const counters = gsap.utils.toArray<HTMLElement>(".counter-val");
      counters.forEach((counter) => {
        const target = parseFloat(counter.getAttribute("data-target") || "0");
        const isPercent = counter.getAttribute("data-type") === "percent";
        const suffix = counter.getAttribute("data-suffix") || "";
        
        gsap.to(counter, {
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
          },
          innerHTML: target,
          duration: 2.5,
          ease: "power2.out",
          snap: { innerHTML: 1 },
          onUpdate: function() {
            counter.innerHTML = Math.ceil(Number(this.targets()[0].innerHTML)) + (isPercent ? "%" : suffix);
          }
        });
      });

      // Features, Timeline, and Form reveal animations were removed to ensure 100% visibility on all devices and zero reload glitches.

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // **EmailJS Integration using .env variables**
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.send(
      serviceId, 
      templateId,
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
        to_name: "Admin"
      }, 
      publicKey
    )
    .then(() => {
      alert("Message sent successfully! We will get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      alert("Something went wrong! Failed to send message.");
    })
    .finally(() => {
      setIsSending(false);
    });
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050314] text-white font-sans overflow-x-hidden selection:bg-purple-500/30">
      
      {/* ─── Global Background Orbs ─── */}
      <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full bg-orb pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full bg-orb pointer-events-none z-0" />
      <div className="fixed top-[40%] left-[50%] w-[500px] h-[500px] bg-rose-500/5 blur-[150px] rounded-full bg-orb pointer-events-none z-0" />

      {/* ────────────────────────────────────────────────────────
                              HERO SECTION 
      ────────────────────────────────────────────────────────── */}
      <section className="relative z-10 w-11/12 mx-auto pt-10 pb-24 md:pb-24 flex flex-col lg:flex-row items-center justify-between gap-16 min-h-[90vh]">
        
        {/* Left: Text */}
        <div className="hero-text w-full lg:w-1/2 flex flex-col items-start text-left z-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-purple-300 font-medium mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            GenAI Flow 2.0 is Live
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Land Your Dream Job with <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] via-[#7c3aed] to-[#e879f9]">
              GenAI Intelligence
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 font-light max-w-xl leading-relaxed mb-10">
            Automate your career preparation. Generate ATS-optimized resumes, practice with real-time AI mock interviews, and master exactly what you need to know.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
            <Link 
              to="/interview-details-input" 
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl font-bold text-white shadow-[0_0_30px_rgba(124,58,237,0.3)] hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              Start Mock Interview <ArrowRight size={20} />
            </Link>
            
            <Link 
              to="/resume-builder" 
              className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2"
            >
              <FileText size={20} /> Build ATS Resume
            </Link>
          </div>
        </div>

        {/* Right: SVG Vis */}
        <div className="hero-image w-full lg:w-1/2 relative aspect-square max-w-[600px] z-10 flex items-center justify-center pt-10">
          <HeroBrainSVG />
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
                           FLOATING STATS 
      ────────────────────────────────────────────────────────── */}
      <section className="relative z-20 w-11/12 mx-auto -mt-16 mb-24 stats-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[
            { label: "ATS Pass Rate", val: "95", type: "percent", icon: TrendingUp, color: "text-green-400" },
            { label: "Candidates Prepared", val: "1000", suffix: "+", type: "number", icon: UserCheck, color: "text-blue-400" },
            { label: "AI Accuracy", val: "99", type: "percent", icon: Target, color: "text-purple-400" }
          ].map((stat, idx) => (
            <div key={idx} className="stat-box bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/[0.04] transition-colors shadow-2xl">
              <stat.icon size={32} className={`mb-4 ${stat.color} opacity-80`} />
              <h3 
                className="text-5xl font-black mb-2 text-white counter-val tracking-tighter" 
                data-target={stat.val} 
                data-type={stat.type}
                data-suffix={stat.suffix || ""}
              >
                0
              </h3>
              <p className="text-gray-400 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
                           TECH STACK MARQUEE
      ────────────────────────────────────────────────────────── */}
      <section className="relative z-10 w-full overflow-hidden py-16 mb-24 bg-white/[0.01] border-y border-white/5">

        {/* Inline style for infinite marquee */}
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
            display: flex;
            width: max-content;
          }
        `}</style>
        
        <div className="flex overflow-hidden relative w-full group">
           {/* Left/Right Fades for smooth entry/exit */}
           <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#050314] to-transparent z-10" />
           <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#050314] to-transparent z-10" />

           <div className="animate-marquee hover:[animation-play-state:paused] gap-12 md:gap-24 items-center px-12 md:px-24">
             {/* Duplicate array for seamless infinite looping */}
             {[...techLogos, ...techLogos].map((tech, idx) => (
                <div key={idx} className="flex items-center justify-center gap-3 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  <tech.icon size={40} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                  <span className="text-xl md:text-2xl font-bold tracking-tight text-white/90 whitespace-nowrap">{tech.name}</span>
                </div>
             ))}
           </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
                           CORE FEATURES (BENTO GRID)
      ────────────────────────────────────────────────────────── */}
      <section className="relative z-10 w-11/12 mx-auto py-10 features-section">
        <div className="text-center mb-16 feature-elem">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful Features</h2>
          <p className="text-gray-400 text-lg">Everything you need to secure the offer.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1 */}
          <div className="feature-card feature-elem group bg-white/[0.02] border border-white/5 hover:border-blue-500/30 rounded-[32px] p-10 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] group-hover:bg-blue-500/20 transition-all" />
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20 text-blue-400">
              <FileText size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Smart ATS Resumes</h3>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Our AI restructures your raw experience into a beautifully formatted, single-page PDF that bypasses complex Applicant Tracking Systems instantly.
            </p>
          </div>

          {/* Card 2 */}
          <div className="feature-card feature-elem group bg-white/[0.02] border border-white/5 hover:border-purple-500/30 rounded-[32px] p-10 transition-all duration-500 relative overflow-hidden lg:-translate-y-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] group-hover:bg-purple-500/20 transition-all" />
            <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20 text-purple-400">
              <Mic size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">AI Mock Interviews</h3>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Experience stressful real-world technical and behavioral questions tailored precisely to your specific job description. Practice, fail, and improve before the real day.
            </p>
          </div>

          {/* Card 3 */}
          <div className="feature-card feature-elem group bg-white/[0.02] border border-white/5 hover:border-rose-500/30 rounded-[32px] p-10 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 blur-[100px] group-hover:bg-rose-500/20 transition-all" />
            <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center mb-6 border border-rose-500/20 text-rose-400">
              <Map size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Skill Gap Analysis</h3>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              We compare your background against the job role to highlight critical missing skills and generate a day-by-day preparation roadmap.
            </p>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
                           HOW IT WORKS (TIMELINE)
      ────────────────────────────────────────────────────────── */}
      <section className="relative z-10 w-11/12 mx-auto py-24 timeline-section">
        <div className="text-center mb-20 timeline-elem">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-400 text-lg">Your path from preparation to offer letter.</p>
        </div>

        <div className="relative mx-auto max-w-4xl w-full flex flex-col space-y-4 items-center mt-10">
          {[
            { 
              step: "01", 
              title: "Upload Your Career Blueprint", 
              desc: "Start by securely uploading your existing resume PDF and pasting the exact Job Description you are targeting. Our platform parses these documents to understand your background and formulate a customized baseline for analysis.", 
              icon: UploadIcon 
            },
            { 
               step: "02", 
               title: "AI Deep Analysis & Matching", 
               desc: "Our high-speed GenAI Engine steps in to deeply evaluate the intersection between your skills and the required role. It identifies missing keywords, evaluates your experience depth, and prepares dynamic interview questions uniquely crafted just for you.", 
               icon: BrainCircuit 
            },
            { 
              step: "03", 
              title: "Live Practice & Resume Delivery", 
              desc: "Jump directly into a simulated live interview environment where you face challenging questions. After practicing, simply click 'Download ATS Resume' to receive a mathematically restructured, single-page PDF guaranteed to bypass Applicant Tracking Systems.", 
              icon: Target 
            }
          ].map((item, idx) => (
            <div key={idx} className="timeline-node timeline-elem relative z-10 flex flex-col items-center text-center w-full">
              {/* Glowing Top Dot */}
              <div className="w-16 h-16 rounded-full bg-[#050314] flex items-center justify-center mb-6 border border-white/10 shadow-[0_0_20px_rgba(124,58,237,0.3)] z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center shadow-inner">
                  <item.icon size={20} className="text-white" />
                </div>
              </div>
              
              {/* Card Body */}
              <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-10 hover:bg-white/[0.04] transition-colors relative overflow-hidden group w-full max-w-3xl">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 blur-[50px] group-hover:bg-purple-500/10 transition-all pointer-events-none" />
                <span className="text-purple-400 font-mono font-bold text-sm mb-3 block tracking-widest uppercase">Step {item.step}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed text-lg max-w-2xl mx-auto">{item.desc}</p>
              </div>

              {/* Connector line leading to next step (hide on last item) */}
              {idx < 2 && (
                <div className="h-16 w-px bg-gradient-to-b from-purple-500/50 to-transparent my-4" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
                           CONTACT US SECTION
      ────────────────────────────────────────────────────────── */}
      <section className="relative z-10 w-11/12 mx-auto max-w-5xl py-24 contact-section">
        <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-white/10 rounded-[40px] p-8 md:p-14 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay" />
          
          <div className="contact-elem text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Get In Touch</h2>
            <p className="text-gray-400 text-lg">Have questions about integrations or enterprise plans? Send us a message.</p>
          </div>

          <form onSubmit={handleContactSubmit} className="relative z-10 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="contact-elem flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Your Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-white placeholder:text-gray-600"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                />
              </div>
              <div className="contact-elem flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="john@example.com"
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-white placeholder:text-gray-600"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                />
              </div>
            </div>
            
            <div className="contact-elem flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Message</label>
              <textarea 
                required
                rows={5}
                placeholder="How can we help you?"
                className="w-full bg-black/30 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-white placeholder:text-gray-600 resize-none"
                value={form.message}
                onChange={(e) => setForm({...form, message: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              disabled={isSending}
              className="contact-elem mt-4 w-full sm:w-auto self-end px-10 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-[0_5px_20px_rgba(255,255,255,0.2)]"
            >
              {isSending ? "Sending..." : <><Send size={18} /> Send Message</>}
            </button>
          </form>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
                           FINAL CTA TEXT (NO BUTTON)
      ────────────────────────────────────────────────────────── */}
      <section className="relative z-10 w-11/12 mx-auto bg-gradient-to-t from-purple-900/10 to-transparent pt-10 pb-20 text-center px-6 rounded-b-[40px] mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Stop applying blindly.</h2>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Start preparing smartly with the power of generative AI. <br className="hidden md:block"/> Join thousands of candidates landing their dream roles.
        </p>
      </section>

    </div>
  );
}

// Helper icon component for timeline
function UploadIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" x2="12" y1="3" y2="15"/>
    </svg>
  );
}
