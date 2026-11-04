import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";

export default function UserLayout() {
  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-x-hidden bg-gradient-to-br from-pink-50 via-purple-50/50 to-sky-50 text-gray-800 selection:bg-pink-300 selection:text-pink-900">
      {/* Background Animated Dreamy Ambient Orbs */}
      <div className="cute-ambient-bg pointer-events-none">
        <div className="cute-ambient-orb-1" />
        <div className="cute-ambient-orb-2" />
        <div className="cute-ambient-orb-3" />
      </div>

      {/* Floating Sparkles & Stars Decor (Subtle & Cute) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
        <span className="absolute top-[12%] left-[8%] text-2xl animate-float-slow">✨</span>
        <span className="absolute top-[24%] right-[10%] text-xl animate-float-reverse">💖</span>
        <span className="absolute top-[55%] left-[5%] text-2xl animate-pulse-gentle">🌸</span>
        <span className="absolute top-[75%] right-[12%] text-2xl animate-float-slow">🎀</span>
        <span className="absolute top-[85%] left-[18%] text-xl animate-float-reverse">⭐</span>
      </div>

      {/* Glassmorphic Navbar */}
      <div className="relative z-30 pt-3">
        <Navbar />
      </div>

      {/* Main Page Content */}
      <main className="flex-1 w-full relative z-10 flex flex-col">
        <Outlet />
      </main>

      {/* Cute Glassmorphic Footer */}
      <footer className="relative z-20 w-full py-6 px-4 mt-auto">
        <div className="max-w-4xl mx-auto glass-panel rounded-full px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-center text-xs text-gray-500 font-cute">
          <p className="flex items-center gap-1">
            Made with <span className="text-pink-500 animate-pulse">💖</span> for fun memories by{" "}
            <span className="font-bold text-pink-600">Snappie</span>
          </p>
          <div className="flex items-center gap-4 text-gray-400">
            <span>📸 K-Photobooth Style</span>
            <span>✨ Glassmorphism UI</span>
            <Link to="/admin/login" className="hover:text-pink-500 transition-colors flex items-center gap-1 font-semibold opacity-70 hover:opacity-100">
              🔒 Admin Login
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
