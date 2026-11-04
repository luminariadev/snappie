import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaCameraRetro, FaLock, FaUser, FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { BsStars } from "react-icons/bs";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Login gagal, silakan periksa username & password");
        setIsLoading(false);
        return;
      }

      // Save token & data
      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_data", JSON.stringify(data.admin || { nama_admin: username }));

      navigate("/admin/frame");
    } catch (err) {
      // If server is not running, provide helpful message with demo login option
      setErrorMsg("Koneksi backend gagal. Kamu bisa gunakan tombol 'Demo Login' di bawah.");
      setIsLoading(false);
    }
  };

  // Quick Demo Login for instant testing without database
  const handleDemoLogin = () => {
    localStorage.setItem("admin_token", "demo-token-12345");
    localStorage.setItem(
      "admin_data",
      JSON.stringify({ id_admin: 1, nama_admin: "Super Admin (Demo)", username: "admin" })
    );
    navigate("/admin/frame");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-pink-100/80 via-purple-100/60 to-sky-100/70 selection:bg-pink-300 selection:text-pink-900 font-sans">
      {/* Background Ambient Orbs */}
      <div className="cute-ambient-bg pointer-events-none">
        <div className="cute-ambient-orb-1" />
        <div className="cute-ambient-orb-2" />
        <div className="cute-ambient-orb-3" />
      </div>

      {/* Floating Sparkles Decor */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
        <span className="absolute top-[15%] left-[12%] text-3xl animate-float-slow">✨</span>
        <span className="absolute top-[28%] right-[15%] text-2xl animate-float-reverse">💖</span>
        <span className="absolute top-[70%] left-[10%] text-3xl animate-pulse-gentle">🌸</span>
        <span className="absolute top-[80%] right-[12%] text-2xl animate-float-slow">🎀</span>
      </div>

      {/* Back to Photobooth Button */}
      <Link
        to="/user"
        className="absolute top-6 left-6 z-20 px-4 py-2 rounded-full font-cute text-xs sm:text-sm font-semibold glass-pill text-gray-700 hover:text-pink-600 flex items-center gap-2"
      >
        <FaArrowLeft className="text-xs" />
        <span>Ke Photobooth</span>
      </Link>

      {/* Main Glass Login Card */}
      <div className="relative z-10 w-full max-w-md glass-card rounded-4xl p-6 sm:p-10 shadow-glassCard border border-white/80">
        {/* Header Logo */}
        <div className="flex flex-col items-center text-center pb-6 border-b border-pink-100">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-pink-400 via-rose-300 to-purple-400 p-[2px] shadow-cuteGlow mb-3 flex items-center justify-center">
            <div className="w-full h-full bg-white/80 backdrop-blur-md rounded-3xl flex items-center justify-center text-pink-500">
              <FaCameraRetro className="text-3xl" />
            </div>
          </div>
          <h2 className="font-cute text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-sky-400 bg-clip-text text-transparent">
            Admin Snappie
          </h2>
          <p className="text-xs text-gray-500 font-sans mt-1">
            Masuk untuk mengelola frame foto & data transaksi
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mt-4 p-3 rounded-2xl bg-rose-100/90 border border-rose-300 text-rose-800 text-xs font-cute text-center animate-in fade-in">
            {errorMsg}
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="font-cute text-xs font-bold text-gray-700 mb-1.5 block">
              Username Admin
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Masukkan username (cth: admin)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full h-12 pl-11 pr-4 rounded-2xl glass-input text-sm font-sans text-gray-800 placeholder-gray-400"
              />
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 text-sm" />
            </div>
          </div>

          <div>
            <label className="font-cute text-xs font-bold text-gray-700 mb-1.5 block">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-12 pl-11 pr-11 rounded-2xl glass-input text-sm font-sans text-gray-800 placeholder-gray-400"
              />
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 text-sm" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 transition"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full py-3.5 px-6 rounded-full font-cute text-base font-bold glass-btn-primary shadow-glassButton transition-all"
          >
            {isLoading ? "Memeriksa Akun..." : "Masuk ke Dashboard ✨"}
          </button>
        </form>

        {/* Quick Demo Option */}
        <div className="mt-6 pt-5 border-t border-pink-100 text-center">
          <p className="text-[11px] text-gray-400 font-cute mb-2">
            Ingin melihat preview admin tanpa database?
          </p>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 px-4 rounded-full font-cute text-xs font-bold glass-pill text-purple-600 hover:text-purple-700"
          >
            🚀 Masuk Instan (Demo Mode)
          </button>
        </div>
      </div>
    </div>
  );
}
