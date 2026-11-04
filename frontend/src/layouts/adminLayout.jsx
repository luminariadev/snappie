import { useState, useEffect } from "react";
import SidebarAdmin from "../components/admin/SidebarAdmin";
import TopbarAdmin from "../components/admin/TopbarAdmin";
import { Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex w-full h-screen overflow-hidden bg-gradient-to-br from-pink-50/60 via-purple-50/40 to-sky-50/50 selection:bg-pink-300 selection:text-pink-900 font-sans">
      {/* Background Animated Dreamy Ambient Orbs */}
      <div className="cute-ambient-bg pointer-events-none">
        <div className="cute-ambient-orb-1" />
        <div className="cute-ambient-orb-2" />
        <div className="cute-ambient-orb-3" />
      </div>

      {/* SIDEBAR (Desktop Fixed Full Height & Mobile Drawer) */}
      <SidebarAdmin isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* MAIN CONTENT AREA WITH INDEPENDENT SCROLL */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto relative z-10">
        <TopbarAdmin onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* PAGE CONTENT */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
          <Outlet />
        </main>

        {/* Admin Footer */}
        <footer className="py-4 px-6 text-center text-xs font-cute text-gray-400 mt-auto">
          Snappie Photobooth • Admin Portal Glassmorphism v2.0
        </footer>
      </div>
    </div>
  );
}
