import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaCameraRetro } from "react-icons/fa";
import { BsStars, BsPalette, BsShieldLock } from "react-icons/bs";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Photobooth", path: "/user", icon: FaCameraRetro, badge: "Fun" },
    { name: "Frame Studio", path: "/user/edit-frame", icon: BsPalette, badge: "Cute" },
  ];

  const isActive = (path) => {
    if (path === "/user") {
      return location.pathname === "/user" || location.pathname === "/user/take-photo";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-3 z-40 w-full px-4 sm:px-6 max-w-7xl mx-auto transition-all">
      <nav className="glass-panel rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-glass">
        {/* Brand Logo */}
        <Link to="/user" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-400 via-rose-300 to-purple-400 p-[2px] shadow-cuteGlow transition-transform group-hover:scale-105 group-hover:rotate-3 flex items-center justify-center">
            <div className="w-full h-full bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center text-pink-500">
              <FaCameraRetro className="text-xl" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-cute text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-sky-400 bg-clip-text text-transparent">
                Snappie
              </span>
              <span className="text-xs animate-bounce">✨</span>
            </div>
            <span className="text-[10px] text-pink-400/90 font-semibold tracking-wider uppercase -mt-1 hidden sm:inline-block">
              Cute Photobooth Lab
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-full font-cute text-sm font-semibold transition-all flex items-center gap-2 ${
                  active
                    ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md shadow-pink-300/40"
                    : "text-gray-700 hover:text-pink-500 hover:bg-white/60"
                }`}
              >
                <Icon className={active ? "text-white" : "text-pink-400"} />
                <span>{link.name}</span>
                {link.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      active
                        ? "bg-white/25 text-white"
                        : "bg-pink-100 text-pink-500"
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Cute Right CTA & Mobile Toggle */}
        <div className="flex items-center gap-2">
          <Link
            to="/user/take-photo"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full font-cute text-sm font-bold glass-btn-primary shadow-glassButton"
          >
            <span>Snap Now!</span>
            <span>💖</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center text-gray-700 hover:text-pink-500 border border-white/80 shadow-sm"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <HiX className="text-2xl" /> : <HiMenuAlt3 className="text-2xl" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 glass-card rounded-3xl p-4 shadow-glassCard animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-2xl font-cute text-base font-semibold flex items-center justify-between ${
                    active
                      ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-sm"
                      : "text-gray-700 hover:bg-white/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={active ? "text-white" : "text-pink-400"} />
                    <span>{link.name}</span>
                  </div>
                  {link.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-white/30 text-pink-600">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <Link
              to="/user/take-photo"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center py-3 rounded-2xl font-cute text-base font-bold glass-btn-primary shadow-glassButton"
            >
              Start Photobooth 📸
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
