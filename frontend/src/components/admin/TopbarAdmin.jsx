import { MdSearch, MdMenu, MdNotifications } from "react-icons/md";

export default function TopBarAdmin({ onToggleSidebar }) {
  const adminData = JSON.parse(localStorage.getItem("admin_data") || "{}");
  const adminName = adminData.nama_admin || "Admin";

  return (
    <header className="sticky top-0 z-30 w-full px-4 sm:px-8 py-3 transition-all">
      <div className="glass-panel rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-glass gap-4">
        {/* Left: Mobile Menu Toggle & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden w-10 h-10 rounded-full bg-white/70 hover:bg-white text-gray-700 flex items-center justify-center border border-white/80 shadow-sm transition"
            aria-label="Toggle Navigation"
          >
            <MdMenu className="text-2xl" />
          </button>

          <div className="hidden sm:flex flex-col">
            <span className="font-cute text-sm font-bold text-gray-800">
              Selamat Datang, {adminName} 👋
            </span>
            <span className="text-[11px] text-gray-500 font-sans">
              Pantau frame dan pendapatan Snappie secara langsung
            </span>
          </div>
        </div>

        {/* Right: Search Input & Admin Profile */}
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block w-64 lg:w-80">
            <input
              type="text"
              placeholder="Cari data..."
              className="w-full h-10 pl-10 pr-4 rounded-full glass-input text-xs font-cute text-gray-700 placeholder-gray-400"
            />
            <MdSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          </div>

          <div className="w-10 h-10 rounded-full bg-white/80 border border-white flex items-center justify-center text-pink-500 shadow-sm relative">
            <MdNotifications className="text-xl" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-pink-500"></span>
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-pink-200/60">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-400 to-purple-400 text-white font-cute font-bold text-sm flex items-center justify-center shadow-sm">
              {adminName.charAt(0).toUpperCase()}
            </div>
            <div className="hidden lg:flex flex-col">
              <span className="font-cute text-xs font-bold text-gray-800 leading-tight">
                {adminName}
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
