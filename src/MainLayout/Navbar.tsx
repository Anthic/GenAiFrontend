import { Link, useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="w-full h-16 md:h-20 bg-[#050314]/80 backdrop-blur-md border-b border-white/10 fixed top-0 left-0 z-50">
      <div className="w-11/12 mx-auto h-full px-0 flex items-center justify-between">
        {/* 1. Left: Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-400 rounded-lg rotate-12 flex items-center justify-center group-hover:rotate-0 transition-all">
            <div className="w-3 h-3 bg-[#050314] rounded-sm rotate-45" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">GenAI Flow</span>
        </Link>

        {/* 2. Middle: Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">Home</Link>
          <Link to="/interview-details-input" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">Practice Interview</Link>
          <Link to="/resume-builder" className="text-gray-300 hover:text-purple-400 transition-colors font-medium">ATS Resume</Link>
        </div>

        {/* 3. Right: Dynamic Auth Button */}
        <div className="flex items-center gap-4">
          {token ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500/20 hover:text-red-300 transition-all font-medium"
            >
              <LogOut size={18} />
              <span className="hidden sm:block">Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#5329c5] via-[#3a44d1] to-[#1e5be2] text-white rounded-xl shadow-[0_5px_15px_rgba(40,24,111,0.4)] hover:scale-105 active:scale-95 transition-all font-bold"
            >
              <User size={18} />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
