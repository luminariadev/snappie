import { useNavigate, useLocation } from "react-router-dom";
import { MdPhotoLibrary, MdPayment, MdExitToApp } from "react-icons/md";
import { FaCameraRetro, FaTimes } from "react-icons/fa";

export default function SidebarAdmin({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_data");
    navigate("/admin/login");
  };

  const navItems = [
    { name: "Kelola Frame", path: "/admin/frame", icon: MdPhotoLibrary },
    { name: "Transaksi & Omzet", path: "/admin/transaction", icon: MdPayment },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden animate-in fade-in"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed lg:relative inset-y-0 left-0 h-screen w-72 sm:w-80 p-3 sm:p-4 shrink-0 z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-full w-full glass-card rounded-3xl sm:rounded-4xl p-5 sm:p-6 shadow-glassCard border border-white/80 flex flex-col justify-between overflow-y-auto">
          {/* Header Brand */}
          <div>
            <div className="flex items-center justify-between pb-5 border-b border-pink-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-400 to-purple-400 p-[2px] shadow-sm flex items-center justify-center">
                  <div className="w-full h-full bg-white/80 rounded-2xl flex items-center justify-center text-pink-500">
                    <FaCameraRetro className="text-xl" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-cute text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    Snappie Admin
                  </span>
                  <span className="text-[10px] text-pink-400 font-semibold tracking-wider uppercase">
                    Backoffice Lab ✨
                  </span>
                </div>
              </div>

              {/* Close Button on Mobile */}
              <button
                onClick={onClose}
                className="lg:hidden w-8 h-8 rounded-full bg-white/70 hover:bg-pink-100 text-gray-500 flex items-center justify-center transition"
              >
                <FaTimes />
              </button>
            </div>

            {/* Navigation Section */}
            <div className="mt-6 flex flex-col gap-2">
              <span className="font-cute text-xs text-gray-400 px-3 uppercase tracking-wider font-bold">
                Menu Utama
              </span>

              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      if (onClose) onClose();
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-cute text-sm font-bold transition-all text-left ${
                      isActive
                        ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md shadow-pink-300/40"
                        : "text-gray-700 hover:text-pink-600 hover:bg-white/60"
                    }`}
                  >
                    <Icon className="text-xl" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Logout */}
          <div className="pt-4 mt-6 border-t border-pink-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-cute text-sm font-bold text-rose-500 hover:bg-rose-50 border border-rose-200/60 transition"
            >
              <MdExitToApp className="text-lg" />
              <span>Keluar (Logout)</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
