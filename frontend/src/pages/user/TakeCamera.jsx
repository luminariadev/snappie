import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import {
  FaCamera,
  FaRedo,
  FaTrash,
  FaCloudUploadAlt,
  FaArrowRight,
  FaMagic,
  FaSyncAlt,
  FaVolumeUp,
  FaVolumeMute,
  FaExclamationTriangle,
} from "react-icons/fa";
import { BsFillCameraFill } from "react-icons/bs";
import UploadPhotoPopup from "../../components/user/UploadPhotoPopup";
import FilterOptions from "../../components/user/FilterOptions";

export default function TakeCamera() {
  const location = useLocation();
  const navigate = useNavigate();

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const delay = Number(location.state?.delay) || 3;
  const photosCount = Number(location.state?.photoMode) || 4;

  const [countdown, setCountdown] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [capturedImages, setCapturedImages] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("normal");
  const [selectFilterOpen, setSelectFilterOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isFlashActive, setIsFlashActive] = useState(false);
  const [facingMode, setFacingMode] = useState("user");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [autoSeries, setAutoSeries] = useState(true);

  // Filter Styles Map
  const filterStyles = {
    normal: "none",
    soft: "brightness(1.08) contrast(0.95) saturate(1.25) hue-rotate(-5deg)",
    pop: "saturate(1.7) contrast(1.1) brightness(1.05)",
    retro: "sepia(0.35) contrast(1.15) saturate(0.9) brightness(1.02)",
    sepia: "sepia(0.7) contrast(1.05) brightness(1.08)",
    mono: "grayscale(100%) contrast(1.1) brightness(1.02)",
  };

  // Play synthetic chime/shutter sound via Web Audio API
  const playCuteSound = (type = "shutter") => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      if (type === "tick") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === "shutter") {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.type = "triangle";
        osc2.type = "sine";
        osc1.frequency.setValueAtTime(880, ctx.currentTime);
        osc2.frequency.setValueAtTime(1320, ctx.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        osc1.start();
        osc2.start();
        osc1.stop(ctx.currentTime + 0.25);
        osc2.stop(ctx.currentTime + 0.25);
      }
    } catch (e) {
      // AudioContext fallback
    }
  };

  // Start countdown
  const startCountdown = () => {
    if (capturedImages.length >= photosCount || isCounting) return;
    setCountdown(delay);
    setIsCounting(true);
    playCuteSound("tick");
  };

  // Capture current webcam frame with fail-safe methods
  const captureFrame = () => {
    if (!webcamRef.current) return;

    let imageSrc = null;

    // 1. Try react-webcam screenshot API
    try {
      imageSrc = webcamRef.current.getScreenshot();
    } catch (e) {
      console.warn("getScreenshot warning:", e);
    }

    // 2. Draw on canvas with CSS filter
    const video = webcamRef.current.video;
    if (video && video.videoWidth > 0) {
      try {
        const canvas = canvasRef.current || document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        if (facingMode === "user") {
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
        }
        ctx.filter = filterStyles[selectedFilter] || "none";
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        imageSrc = canvas.toDataURL("image/jpeg", 0.95);
      } catch (e) {
        console.warn("Canvas draw warning:", e);
      }
    }

    if (!imageSrc) return;

    // Flash animation & Sound
    setIsFlashActive(true);
    playCuteSound("shutter");
    setTimeout(() => setIsFlashActive(false), 250);

    setCapturedImages((prev) => {
      if (prev.length >= photosCount) return prev;
      const nextImages = [...prev, imageSrc];
      // Auto series next pose if enabled
      if (autoSeries && nextImages.length < photosCount) {
        setTimeout(() => {
          setCountdown(delay);
          setIsCounting(true);
          playCuteSound("tick");
        }, 1500);
      }
      return nextImages;
    });
  };

  // Countdown Loop
  useEffect(() => {
    if (!isCounting) return;

    if (countdown <= 0) {
      captureFrame();
      setIsCounting(false);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => {
        if (prev - 1 > 0) playCuteSound("tick");
        return prev - 1;
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, isCounting]);

  // Remove individual photo
  const handleRemovePhoto = (index) => {
    setCapturedImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Toggle Camera
  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  const isFull = capturedImages.length >= photosCount;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 flex flex-col items-center">
      {/* Top Banner Status */}
      <div className="w-full flex items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-sm shadow-sm">
            📸
          </div>
          <div>
            <h2 className="font-cute text-lg sm:text-xl font-bold text-gray-800 leading-tight">
              Photobooth Studio Lab
            </h2>
            <p className="text-xs text-gray-500 font-sans">
              Pose cantik dan ambil {photosCount} foto terbaikmu!
            </p>
          </div>
        </div>

        {/* Quick Utilities */}
        <div className="flex items-center gap-2">
          {/* Auto Series Toggle */}
          <button
            onClick={() => setAutoSeries(!autoSeries)}
            className={`px-3 py-1.5 rounded-full text-xs font-cute font-bold transition ${
              autoSeries
                ? "bg-purple-100 text-purple-700 border border-purple-300"
                : "bg-white/70 text-gray-500 border border-white/80"
            }`}
            title="Auto Pose Continuous Series"
          >
            <span>{autoSeries ? "⚡ Seri Otomatis On" : "🖐️ Manual Shutter"}</span>
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="w-9 h-9 rounded-full bg-white/70 hover:bg-white text-gray-600 flex items-center justify-center border border-white/80 shadow-sm transition"
            title="Toggle Sound"
          >
            {soundEnabled ? <FaVolumeUp className="text-pink-500" /> : <FaVolumeMute />}
          </button>
          <button
            onClick={toggleFacingMode}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 hover:bg-white text-xs font-cute font-semibold text-gray-600 border border-white/80 shadow-sm transition"
          >
            <FaSyncAlt className="text-pink-400" />
            <span>Balik Kamera</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Camera Viewfinder & Captured Reel */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Camera Screen & Controls (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="glass-card rounded-4xl p-4 sm:p-6 shadow-glassCard border border-white/80 relative overflow-hidden">
            {/* Viewfinder Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-pink-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
                <span className="ml-2 font-cute text-xs text-gray-500 font-semibold">
                  Live Viewfinder
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-cute font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-600">
                  Delay: {delay}s
                </span>
                <span className="text-xs font-cute font-bold px-3 py-1 rounded-full bg-pink-100 text-pink-600">
                  {capturedImages.length} / {photosCount} Foto
                </span>
              </div>
            </div>

            {/* Viewfinder Window */}
            <div className="relative w-full aspect-video sm:aspect-[4/3] max-h-[480px] rounded-3xl overflow-hidden bg-black/90 border-2 border-white/80 shadow-inner flex items-center justify-center">
              {!cameraError ? (
                <Webcam
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{
                    facingMode: facingMode,
                    width: { ideal: 1280 },
                    height: { ideal: 960 },
                  }}
                  onUserMedia={() => {
                    setIsCameraReady(true);
                    setCameraError(null);
                  }}
                  onUserMediaError={(err) => {
                    console.error("Camera access error:", err);
                    setCameraError("Kamera tidak terdeteksi atau izin ditolak browser.");
                  }}
                  className="w-full h-full object-cover"
                  style={{ filter: filterStyles[selectedFilter] }}
                  mirrored={facingMode === "user"}
                />
              ) : (
                <div className="p-6 text-center text-white flex flex-col items-center max-w-sm">
                  <FaExclamationTriangle className="text-4xl text-amber-400 mb-3 animate-bounce" />
                  <h4 className="font-cute text-lg font-bold">Kamera Tidak Aktif</h4>
                  <p className="text-xs text-gray-300 font-sans mt-1 mb-4">{cameraError}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={() => {
                        setCameraError(null);
                        setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
                      }}
                      className="py-2 px-4 rounded-full bg-pink-500 hover:bg-pink-600 font-cute text-xs font-bold text-white shadow-md"
                    >
                      Coba Lagi 🔄
                    </button>
                    <button
                      onClick={() => setIsUploadOpen(true)}
                      className="py-2 px-4 rounded-full bg-white/20 hover:bg-white/30 font-cute text-xs font-bold text-white border border-white/40"
                    >
                      Upload Foto Galeri 📁
                    </button>
                  </div>
                </div>
              )}

              {/* White Flash Effect on Shutter */}
              {isFlashActive && (
                <div className="absolute inset-0 bg-white z-40 transition-opacity duration-300 pointer-events-none opacity-90 animate-pulse"></div>
              )}

              {/* Countdown Overlay */}
              {isCounting && countdown > 0 && (
                <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] z-30 flex flex-col items-center justify-center animate-in fade-in">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-pink-400 to-purple-400 border-4 border-white flex items-center justify-center text-white shadow-cuteGlow animate-bounce">
                    <span className="font-cute text-6xl font-extrabold">{countdown}</span>
                  </div>
                  <p className="mt-4 font-cute text-lg sm:text-xl font-bold text-white drop-shadow-md flex items-center gap-2">
                    <span>✨</span> Say Cheeeese! <span>📸</span>
                  </p>
                </div>
              )}

              {/* Active Filter Badge */}
              <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-cute font-semibold border border-white/20">
                Filter: {selectedFilter}
              </div>

              {/* Mobile flip camera shortcut */}
              <button
                onClick={toggleFacingMode}
                className="sm:hidden absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center border border-white/20"
              >
                <FaSyncAlt className="text-xs" />
              </button>
            </div>

            {/* Bottom Shutter & Controls Dock */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 px-1 sm:px-3">
              {/* Upload fallback button */}
              <button
                type="button"
                onClick={() => setIsUploadOpen(true)}
                className="px-4 py-2.5 rounded-full font-cute text-xs sm:text-sm font-semibold glass-pill text-gray-700 hover:text-pink-600 flex items-center gap-2"
              >
                <FaCloudUploadAlt className="text-base text-pink-500" />
                <span>Upload Foto</span>
              </button>

              {/* Big Juicy Shutter Button */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={isCounting || isFull}
                  onClick={startCountdown}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center border-4 border-white shadow-xl transition-all duration-300 ${
                    isFull
                      ? "bg-gray-300 cursor-not-allowed opacity-60 text-gray-500"
                      : isCounting
                      ? "bg-pink-300 scale-95 animate-pulse text-white"
                      : "bg-gradient-to-tr from-pink-500 via-rose-400 to-purple-400 text-white shadow-cuteGlow hover:scale-105 active:scale-95"
                  }`}
                  aria-label="Take Photo"
                >
                  <BsFillCameraFill className="text-2xl sm:text-3xl" />
                </button>
              </div>

              {/* Filters Toggle Button */}
              <button
                type="button"
                onClick={() => setSelectFilterOpen(!selectFilterOpen)}
                className={`px-4 py-2.5 rounded-full font-cute text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                  selectFilterOpen
                    ? "bg-purple-500 text-white shadow-sm"
                    : "glass-pill text-gray-700 hover:text-purple-600"
                }`}
              >
                <FaMagic className="text-sm text-purple-400" />
                <span>Filter Efek</span>
              </button>
            </div>

            {/* Filter Drawer */}
            {selectFilterOpen && (
              <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
                <FilterOptions
                  selected={selectedFilter}
                  onSelect={(filterId) => {
                    setSelectedFilter(filterId);
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Captured Photos Reel Strip (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4 w-full">
          <div className="glass-card rounded-4xl p-5 shadow-glassCard border border-white/80">
            <div className="flex items-center justify-between pb-3 border-b border-pink-100 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-base">🎞️</span>
                <h3 className="font-cute text-base font-bold text-gray-800">
                  Hasil Jepretan ({capturedImages.length}/{photosCount})
                </h3>
              </div>
              {capturedImages.length > 0 && (
                <button
                  onClick={() => setCapturedImages([])}
                  className="text-xs font-cute text-rose-500 hover:underline flex items-center gap-1"
                >
                  <FaRedo className="text-[10px]" /> Reset
                </button>
              )}
            </div>

            {/* Slots Grid/List */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              {Array.from({ length: photosCount }).map((_, idx) => {
                const img = capturedImages[idx];
                return (
                  <div
                    key={idx}
                    className="relative rounded-2xl overflow-hidden bg-white/60 border-2 border-white shadow-sm aspect-[4/3] flex items-center justify-center group"
                  >
                    {img ? (
                      <>
                        <img
                          src={img}
                          alt={`Captured ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => handleRemovePhoto(idx)}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition shadow-md hover:bg-rose-600"
                          title="Hapus foto ini"
                        >
                          <FaTrash />
                        </button>
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/50 text-white font-cute text-[10px]">
                          ✓ #{idx + 1}
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-400 p-3 text-center">
                        <div className="w-8 h-8 rounded-full bg-pink-100/80 text-pink-400 flex items-center justify-center text-xs font-bold font-cute mb-1">
                          #{idx + 1}
                        </div>
                        <span className="text-[11px] font-cute">Menunggu jepretan</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Next Action Button */}
            <div className="mt-5 pt-3 border-t border-pink-100 flex flex-col gap-2">
              <button
                disabled={capturedImages.length === 0}
                onClick={() =>
                  navigate("../edit-frame", {
                    state: {
                      photos: capturedImages,
                      photoMode: photosCount,
                    },
                  })
                }
                className={`w-full py-3.5 px-6 rounded-full font-cute text-sm sm:text-base font-bold flex items-center justify-center gap-2 transition-all ${
                  isFull
                    ? "glass-btn-primary shadow-glassButton animate-bounce"
                    : capturedImages.length > 0
                    ? "glass-btn-primary shadow-glassButton"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                <span>Lanjut ke Dekorasi Frame</span>
                <FaArrowRight />
              </button>

              {!isFull && capturedImages.length > 0 && (
                <p className="text-center text-[11px] font-cute text-pink-500">
                  💡 Kamu bisa lanjut sekarang atau ambil sampai {photosCount} foto!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Canvas for Filter Rendering */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Upload Modal */}
      <UploadPhotoPopup
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={(img) => {
          setCapturedImages((prev) => {
            if (prev.length >= photosCount) return prev;
            return [...prev, img];
          });
        }}
      />
    </div>
  );
}
