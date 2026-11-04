import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCamera, FaClock, FaImages, FaArrowRight, FaCloudUploadAlt, FaHeart } from "react-icons/fa";
import { BsStars, BsLightningChargeFill, BsCheckCircleFill } from "react-icons/bs";
import { MdOutlinePhotoCamera, MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import UploadPhotoPopup from "../../components/user/UploadPhotoPopup";

export default function Start() {
  const navigate = useNavigate();

  const [delay, setDelay] = useState(3); // default 3s
  const [photoMode, setPhotoMode] = useState(4); // default 4 photos
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const handleStart = () => {
    navigate("take-photo", {
      state: {
        delay: delay,
        photoMode: photoMode,
      },
    });
  };

  const modes = [
    {
      id: 1,
      name: "1 Foto",
      badge: "Polaroid",
      desc: "Single Cute Portrait",
      slots: 1,
      icon: "🎴",
    },
    {
      id: 3,
      name: "3 Foto",
      badge: "Trio Strip",
      desc: "Classic Trio Cut",
      slots: 3,
      icon: "🎞️",
    },
    {
      id: 4,
      name: "4 Foto",
      badge: "K-Studio",
      desc: "4-Cut Aesthetic Strip",
      slots: 4,
      icon: "📸",
      popular: true,
    },
  ];

  const delays = [
    { value: 3, label: "3 Detik", desc: "Cepat ⚡" },
    { value: 5, label: "5 Detik", desc: "Santai ✨" },
    { value: 10, label: "10 Detik", desc: "Banyak Gaya 💃" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col items-center">
      {/* Hero Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-pink-200/80 shadow-sm text-pink-600 font-cute text-xs sm:text-sm font-semibold mb-4 animate-float-slow">
          <span>💖</span>
          <span>Online Photobooth Lucu & Aesthetic</span>
          <span>✨</span>
        </div>

        <h1 className="font-cute text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-800 leading-tight">
          Capture Your Cutest{" "}
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-sky-400 bg-clip-text text-transparent">
            Memories
          </span>{" "}
          ✨
        </h1>
        <p className="mt-3 text-sm sm:text-base text-gray-600 font-sans max-w-lg mx-auto">
          Ambil foto strip seru bersama teman dengan filter kawaii, frame pastel glassmorphism, dan download instan tanpa ribet!
        </p>
      </div>

      {/* Main Glassmorphism Photobooth Hub */}
      <div className="w-full glass-card rounded-4xl p-5 sm:p-8 md:p-10 shadow-glassCard border border-white/80 relative overflow-hidden">
        {/* Cute Glass Accents */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-white/40 border-b border-white/60 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-rose-400 shadow-sm shadow-rose-300"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-sm shadow-amber-300"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-300"></div>
            <span className="ml-3 text-xs font-cute text-gray-500 font-semibold hidden sm:inline">
              Snappie Studio Hub • v2.0
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-cute font-bold text-pink-500 bg-pink-100/70 px-3 py-1 rounded-full">
            <span className="animate-pulse">●</span>
            <span>Camera Ready</span>
          </div>
        </div>

        {/* Content Grid: Left Options, Right Live Strip Preview */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Step 1: Mode Strip */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-cute text-base sm:text-lg font-bold text-gray-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-pink-200 text-pink-700 text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  Pilih Format Foto Strip
                </label>
                <span className="text-xs font-cute text-pink-500 font-semibold">
                  {photoMode} Pose
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {modes.map((m) => {
                  const isSelected = photoMode === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPhotoMode(m.id)}
                      className={`relative p-3 sm:p-4 rounded-3xl text-left transition-all duration-300 flex flex-col justify-between ${
                        isSelected
                          ? "bg-gradient-to-br from-pink-400 to-purple-400 text-white shadow-md shadow-pink-300/50 scale-[1.02] border-2 border-white"
                          : "bg-white/60 hover:bg-white/90 text-gray-700 border border-white/80 shadow-sm hover:scale-[1.01]"
                      }`}
                    >
                      {m.popular && (
                        <span className="absolute -top-2.5 -right-1 bg-gradient-to-r from-amber-400 to-rose-400 text-white text-[9px] font-cute font-bold px-2 py-0.5 rounded-full shadow-sm">
                          POPULAR ⭐
                        </span>
                      )}
                      <div className="text-2xl sm:text-3xl mb-2">{m.icon}</div>
                      <div>
                        <div className="font-cute font-bold text-sm sm:text-base leading-tight">
                          {m.name}
                        </div>
                        <div
                          className={`text-[11px] font-sans ${
                            isSelected ? "text-pink-100" : "text-gray-500"
                          }`}
                        >
                          {m.badge}
                        </div>
                      </div>
                      {isSelected && (
                        <BsCheckCircleFill className="absolute top-3 right-3 text-white text-sm" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Delay Countdown */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-cute text-base sm:text-lg font-bold text-gray-800 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-200 text-purple-700 text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  Pilih Waktu Antar Jepretan
                </label>
                <span className="text-xs font-cute text-purple-500 font-semibold">
                  {delay} Detik
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {delays.map((d) => {
                  const isSelected = delay === d.value;
                  return (
                    <button
                      key={d.value}
                      type="button"
                      onClick={() => setDelay(d.value)}
                      className={`p-3 rounded-2xl text-center transition-all ${
                        isSelected
                          ? "bg-purple-500 text-white shadow-md shadow-purple-300/40 border-2 border-white font-bold"
                          : "bg-white/60 hover:bg-white/90 text-gray-700 border border-white/80 shadow-sm"
                      }`}
                    >
                      <div className="font-cute text-sm sm:text-base">{d.label}</div>
                      <div
                        className={`text-[11px] ${
                          isSelected ? "text-purple-100" : "text-gray-500"
                        }`}
                      >
                        {d.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions: Start Button & Upload Option */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleStart}
                className="flex-1 py-4 px-8 rounded-full font-cute text-lg font-bold glass-btn-primary shadow-glassButton flex items-center justify-center gap-3 group"
              >
                <span>Buka Kamera & Mulai</span>
                <FaArrowRight className="text-base group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => setIsUploadOpen(true)}
                className="py-3.5 px-6 rounded-full font-cute text-sm font-semibold glass-pill text-gray-700 hover:text-pink-600 flex items-center justify-center gap-2"
              >
                <FaCloudUploadAlt className="text-lg text-pink-500" />
                <span>Upload Foto Galeri</span>
              </button>
            </div>
          </div>

          {/* Preview Strip Column (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-5 rounded-3xl bg-gradient-to-tr from-pink-200/50 via-purple-100/50 to-sky-200/50 border border-white/80 shadow-inner w-full max-w-[320px] flex flex-col items-center">
              {/* Cute Washi Tape Decor */}
              <div className="w-24 h-5 bg-pink-300/70 -mt-7 mb-3 rounded-sm transform -rotate-2 backdrop-blur-sm border border-pink-400/30"></div>

              {/* Strip Simulation */}
              <div
                className="bg-white/90 rounded-2xl shadow-xl p-3 border-2 border-pink-200/80 transition-all duration-300 w-full"
                style={{
                  maxHeight: photoMode === 1 ? "260px" : photoMode === 3 ? "360px" : "420px",
                }}
              >
                {/* Header Logo On Strip */}
                <div className="text-center pb-2 border-b border-pink-100 flex items-center justify-center gap-1.5">
                  <span className="font-cute text-xs font-bold text-pink-500">SNAPPIE</span>
                  <span className="text-[10px]">✨</span>
                  <span className="text-[9px] font-sans text-gray-400">STUDIO</span>
                </div>

                {/* Slots */}
                <div
                  className={`py-2 grid gap-2 ${
                    photoMode === 1
                      ? "grid-cols-1"
                      : photoMode === 3
                      ? "grid-rows-3"
                      : "grid-rows-4"
                  }`}
                >
                  {Array.from({ length: photoMode }).map((_, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-sky-50 border border-pink-100/70 flex items-center justify-center text-gray-400 text-xs font-cute relative group"
                      style={{
                        height: photoMode === 1 ? "160px" : photoMode === 3 ? "80px" : "68px",
                      }}
                    >
                      <div className="flex flex-col items-center gap-1 text-pink-400/80">
                        <FaCamera className="text-sm animate-pulse-gentle" />
                        <span className="text-[10px] font-semibold">Pose #{idx + 1}</span>
                      </div>
                      <span className="absolute bottom-1 right-1 text-[10px] opacity-70">
                        {idx === 0 ? "💖" : idx === 1 ? "🌸" : idx === 2 ? "✌️" : "🎀"}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer of Strip */}
                <div className="pt-2 border-t border-pink-100 flex items-center justify-between text-[9px] font-cute text-gray-400 px-1">
                  <span>Photo Booth Cut</span>
                  <span>{new Date().toLocaleDateString("id-ID")}</span>
                </div>
              </div>

              {/* Cute Floating Sticker Accents */}
              <div className="absolute -bottom-3 -right-3 text-3xl animate-bounce">🎀</div>
              <div className="absolute top-10 -left-3 text-2xl animate-float-slow">✨</div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Badges Section */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        <div className="glass-panel rounded-3xl p-4 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center text-xl shadow-sm">
            🎨
          </div>
          <div>
            <h4 className="font-cute font-bold text-sm text-gray-800">Frame Pastel & Lucu</h4>
            <p className="text-xs text-gray-500 font-sans">Banyak pilihan frame gratis & aesthetic</p>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-4 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl shadow-sm">
            ⚡
          </div>
          <div>
            <h4 className="font-cute font-bold text-sm text-gray-800">Auto Shutter & Delay</h4>
            <p className="text-xs text-gray-500 font-sans">Waktu pose fleksibel 3, 5, atau 10 detik</p>
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-4 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center text-xl shadow-sm">
            💾
          </div>
          <div>
            <h4 className="font-cute font-bold text-sm text-gray-800">Download Kualitas HD</h4>
            <p className="text-xs text-gray-500 font-sans">Simpan langsung ke HP atau laptopmu</p>
          </div>
        </div>
      </div>

      {/* Upload Modal (fallback / direct upload) */}
      <UploadPhotoPopup
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={(img) => {
          // direct to edit frame with uploaded image
          navigate("edit-frame", { state: { photos: [img], photoMode: 1 } });
        }}
      />
    </div>
  );
}
