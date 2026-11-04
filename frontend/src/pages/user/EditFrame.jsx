import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FramePicker from "../../components/user/FramePicker";
import FramePreview from "../../components/user/FramePreview";
import {
  FaDownload,
  FaArrowLeft,
  FaRedo,
  FaCheckCircle,
  FaLock,
  FaQrcode,
  FaTimes,
  FaShieldAlt,
} from "react-icons/fa";

const BASE_URL = "http://localhost:5000";

const BUILT_IN_FRAMES = [
  {
    id: "b-1",
    nama: "Classic Strip",
    isPremium: false,
    harga: 0,
    thumb: "/frames/Frame Strip 4/3_preview_rev_1.png",
    frameByStrip: {
      1: "/frames/Frame Strip 1/1_preview_rev_1.png",
      3: "/frames/Snappie strip 3/2_preview_rev_1.png",
      4: "/frames/Frame Strip 4/3_preview_rev_1.png",
    },
  },
  {
    id: "b-2",
    nama: "Sakura Blossom",
    isPremium: false,
    harga: 0,
    thumb: "/frames/Frame Strip 4/4_preview_rev_1_preview_rev_1.png",
    frameByStrip: {
      1: "/frames/Frame Strip 1/3_preview_rev_1.png",
      3: "/frames/Snappie strip 3/3_preview_rev_1.png",
      4: "/frames/Frame Strip 4/4_preview_rev_1_preview_rev_1.png",
    },
  },
  {
    id: "b-3",
    nama: "Pastel Cloud",
    isPremium: false,
    harga: 0,
    thumb: "/frames/Frame Strip 4/9_preview_rev_1.png",
    frameByStrip: {
      1: "/frames/Frame Strip 1/4_preview_rev_1.png",
      3: "/frames/Snappie strip 3/4_preview_rev_1.png",
      4: "/frames/Frame Strip 4/9_preview_rev_1.png",
    },
  },
  {
    id: "b-4",
    nama: "Cute Ribbon",
    isPremium: false,
    harga: 0,
    thumb: "/frames/Frame Strip 4/11_preview_rev_1.png",
    frameByStrip: {
      1: "/frames/Frame Strip 1/5_preview_rev_1.png",
      3: "/frames/Snappie strip 3/5_preview_rev_1.png",
      4: "/frames/Frame Strip 4/11_preview_rev_1.png",
    },
  },
  {
    id: "b-5",
    nama: "Sweet Heart",
    isPremium: false,
    harga: 0,
    thumb: "/frames/Frame Strip 4/13_preview_rev_1.png",
    frameByStrip: {
      1: "/frames/Frame Strip 1/6_preview_rev_1.png",
      3: "/frames/Snappie strip 3/6_preview_rev_1_preview_rev_1.png",
      4: "/frames/Frame Strip 4/13_preview_rev_1.png",
    },
  },
  {
    id: "b-6",
    nama: "Kawaii Deluxe 1",
    isPremium: true,
    harga: 5000,
    thumb: "/frames/Frame Strip 4/15_preview_rev_1.png",
    frameByStrip: {
      1: "/frames/Frame Strip 1/7_preview_rev_1.png",
      3: "/frames/Snappie strip 3/7_preview_rev_1.png",
      4: "/frames/Frame Strip 4/15_preview_rev_1.png",
    },
  },
  {
    id: "b-7",
    nama: "Kawaii Deluxe 2",
    isPremium: true,
    harga: 5000,
    thumb: "/frames/Frame Strip 4/16_preview_rev_1.png",
    frameByStrip: {
      1: "/frames/Frame Strip 1/8_preview_rev_1.png",
      3: "/frames/Snappie strip 3/8_preview_rev_1.png",
      4: "/frames/Frame Strip 4/16_preview_rev_1.png",
    },
  },
  {
    id: "b-8",
    nama: "Starry Violet",
    isPremium: false,
    harga: 0,
    thumb: "/frames/Frame Strip 4/17_preview_rev_1.png",
    frameByStrip: {
      1: "/frames/Frame Strip 1/9_preview_rev_1.png",
      3: "/frames/Snappie strip 3/9_preview_rev_1.png",
      4: "/frames/Frame Strip 4/17_preview_rev_1.png",
    },
  },
  {
    id: "b-9",
    nama: "Vintage Memories",
    isPremium: true,
    harga: 5000,
    thumb: "/frames/Frame Strip 4/18_preview_rev_1.png",
    frameByStrip: {
      1: "/frames/Frame Strip 1/10_preview_rev_1.png",
      3: "/frames/Snappie strip 3/10_preview_rev_1.png",
      4: "/frames/Frame Strip 4/18_preview_rev_1.png",
    },
  },
];

export default function EditFrame() {
  const location = useLocation();
  const navigate = useNavigate();

  const rawPhotos = location.state?.photos || [];

  // Fallback demo images if navigated directly
  const fallbackImages = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80",
  ];

  const stripCount = Math.min(Math.max(rawPhotos.length > 0 ? rawPhotos.length : 4, 1), 4);
  const photos = rawPhotos.length > 0 ? rawPhotos.slice(0, stripCount) : fallbackImages.slice(0, stripCount);

  const [frames, setFrames] = useState([]);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [activeTab, setActiveTab] = useState("graphic");
  const [selectedColor, setSelectedColor] = useState("#FFFFFF");
  const [stickers, setStickers] = useState([
    { id: 1, emoji: "✨", x: 88, y: 10, rotation: 10, scale: 1 },
    { id: 2, emoji: "💖", x: 12, y: 90, rotation: -12, scale: 1.1 },
  ]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [pollingId, setPollingId] = useState(null);

  const CM = 37.79527559;
  const CONFIG = {
    4: { width: 8.83 * CM, height: 4.79 * CM, x: 0.84 * CM, yStart: 2 * CM, gap: 0.7 * CM, frameWidth: 10.5 * CM, frameHeight: 29.7 * CM },
    3: { width: 8.83 * CM, height: 5 * CM, x: 0.85 * CM, yStart: 1.2 * CM, gap: 1.4 * CM, frameWidth: 10.5 * CM, frameHeight: 22.5 * CM },
    2: { width: 8.83 * CM, height: 9.5 * CM, x: 0.84 * CM, yStart: 4 * CM, gap: 1.5 * CM, frameWidth: 10.5 * CM, frameHeight: 29.7 * CM },
    1: { width: 12.5 * CM, height: 8.5 * CM, x: 0.8 * CM, yStart: 1 * CM, gap: 0, frameWidth: 14 * CM, frameHeight: 10.5 * CM },
  };

  const SLOT = CONFIG[stripCount] || CONFIG[4];

  /* ================= LOAD FRAMES ================= */
  useEffect(() => {
    const validBuiltIn = BUILT_IN_FRAMES.map((f) => ({
      ...f,
      thumb: f.frameByStrip[stripCount] || f.thumb,
    })).filter((f) => f.frameByStrip[stripCount]);

    fetch(`${BASE_URL}/api/frames`)
      .then((res) => res.json())
      .then((data) => {
        const normalize = (p) => (p ? `${BASE_URL}${p.replace(/\\/g, "/")}` : null);
        const mapped = data.map((f) => {
          const frame1 = normalize(f.frame1_path);
          const frame3 = normalize(f.frame3_path);
          const frame4 = normalize(f.frame4_path);
          const byStrip = {
            1: frame1,
            3: frame3,
            4: frame4,
          };
          return {
            id: f.id_frame,
            nama: f.nama_frame,
            isPremium: f.tipe === "premium",
            harga: Number(f.harga || 0),
            thumb: byStrip[stripCount] || normalize(f.thumb_path),
            frameByStrip: byStrip,
          };
        });

        const merged = [...mapped, ...validBuiltIn];
        const validFrames = merged.filter((f) => f.frameByStrip[stripCount]);
        setFrames(validFrames);
        if (validFrames.length > 0) setSelectedFrame(validFrames[0]);
      })
      .catch(() => {
        setFrames(validBuiltIn);
        if (validBuiltIn.length > 0) setSelectedFrame(validBuiltIn[0]);
      });
  }, [stripCount]);

  /* ================= STICKER HANDLERS ================= */
  const handleAddSticker = (emoji) => {
    const newSticker = {
      id: Date.now(),
      emoji,
      x: Math.floor(Math.random() * 60) + 20,
      y: Math.floor(Math.random() * 60) + 20,
      rotation: Math.floor(Math.random() * 30) - 15,
      scale: 1,
    };
    setStickers((prev) => [...prev, newSticker]);
  };

  const handleRemoveSticker = (id) => {
    setStickers((prev) => prev.filter((s) => s.id !== id));
  };

  const handlePickColor = (color) => {
    setSelectedColor(color);
    setSelectedFrame({
      id: `color-${color}`,
      nama: `Solid Pastel`,
      color: color,
      isPremium: false,
      frameByStrip: {},
    });
  };

  /* ================= POLLING PAYMENT ================= */
  const startPolling = (fotoId) => {
    const id = setInterval(async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/payment/validate?id_foto=${fotoId}`);
        const data = await res.json();
        if (data.allowed) {
          clearInterval(id);
          setPollingId(null);
          setIsUnlocked(true);
          setTimeout(() => downloadCanvas(fotoId), 300);
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 3000);
    setPollingId(id);
  };

  /* ================= RENDER HD CANVAS & DOWNLOAD ================= */
  const downloadCanvas = async (fotoId) => {
    setIsProcessing(true);
    try {
      const canvas = document.createElement("canvas");
      const scaleFactor = 2;
      canvas.width = SLOT.frameWidth * scaleFactor;
      canvas.height = SLOT.frameHeight * scaleFactor;
      const ctx = canvas.getContext("2d");
      ctx.scale(scaleFactor, scaleFactor);

      // 1. Draw Background Color
      ctx.fillStyle = selectedFrame?.color || selectedColor || "#FFFFFF";
      ctx.fillRect(0, 0, SLOT.frameWidth, SLOT.frameHeight);

      // 2. Draw User Photos
      for (let i = 0; i < stripCount; i++) {
        const photoSrc = photos[i];
        if (!photoSrc) continue;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = photoSrc;

        await new Promise((resolve) => {
          img.onload = () => {
            const scale = Math.max(SLOT.width / img.width, SLOT.height / img.height);
            const w = img.width * scale;
            const h = img.height * scale;

            const x = SLOT.x + (SLOT.width - w) / 2;
            const y = SLOT.yStart + i * (SLOT.height + SLOT.gap) + (SLOT.height - h) / 2;

            ctx.save();
            ctx.beginPath();
            ctx.rect(SLOT.x, SLOT.yStart + i * (SLOT.height + SLOT.gap), SLOT.width, SLOT.height);
            ctx.clip();
            ctx.drawImage(img, x, y, w, h);
            ctx.restore();
            resolve();
          };
          img.onerror = resolve;
        });
      }

      // 3. Draw Graphic Frame Overlay
      const frameSrc = selectedFrame?.frameByStrip?.[stripCount];
      if (frameSrc) {
        const frameImg = new Image();
        frameImg.crossOrigin = "anonymous";
        frameImg.src = frameSrc;

        await new Promise((resolve) => {
          frameImg.onload = () => {
            ctx.drawImage(frameImg, 0, 0, SLOT.frameWidth, SLOT.frameHeight);
            resolve();
          };
          frameImg.onerror = resolve;
        });
      } else {
        // Watermark if solid color
        ctx.save();
        ctx.font = "bold 14px 'Fredoka', sans-serif";
        ctx.fillStyle = "#E86A92";
        ctx.textAlign = "right";
        ctx.fillText("SNAPPIE ✨", SLOT.frameWidth - 18, SLOT.frameHeight - 16);
        ctx.restore();
      }

      // 4. Draw Stickers
      for (const stk of stickers) {
        ctx.save();
        const posX = (stk.x / 100) * SLOT.frameWidth;
        const posY = (stk.y / 100) * SLOT.frameHeight;
        ctx.translate(posX, posY);
        ctx.rotate(((stk.rotation || 0) * Math.PI) / 180);
        ctx.font = "26px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(stk.emoji, 0, 0);
        ctx.restore();
      }

      // 5. Trigger File Download
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png", 1.0);
      link.download = `snappie-photobooth-${fotoId || Date.now()}.png`;
      link.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error("Export error:", err);
      alert("Gagal mengunduh foto: " + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  /* ================= CREATE FOTO ================= */
  const createFoto = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/foto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_frame: typeof selectedFrame?.id === "number" ? selectedFrame.id : 14,
          delay_jepret: 0,
          filter_dipakai: "normal",
        }),
      });
      const data = await res.json();
      return data.id_foto || Date.now();
    } catch (e) {
      return Date.now();
    }
  };

  /* ================= TRIGGER DOWNLOAD / PAYMENT ================= */
  const handleDownloadClick = async () => {
    if (!selectedFrame || isProcessing || pollingId) return;
    if (selectedFrame?.isPremium && !isUnlocked) {
      setShowPaymentModal(true);
    } else {
      const id = await createFoto();
      downloadCanvas(id);
    }
  };

  /* ================= SIMULATE PAYMENT ================= */
  const handleSimulatePayment = async () => {
    setIsPaying(true);
    try {
      const id = await createFoto();
      try {
        const res = await fetch(`${BASE_URL}/api/payment/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_foto: id, jumlah_bayar: selectedFrame?.harga || 5000 }),
        });
        const data = await res.json();
        if (data.data?.payment_url) {
          window.open(data.data.payment_url, "_blank");
          startPolling(id);
          setShowPaymentModal(false);
          setIsPaying(false);
          return;
        }
      } catch (e) {
        // Fallback simulation
      }

      setTimeout(() => {
        setIsPaying(false);
        setIsUnlocked(true);
        setShowPaymentModal(false);
        downloadCanvas(id);
      }, 1000);
    } catch (err) {
      setIsPaying(false);
      setIsUnlocked(true);
      setShowPaymentModal(false);
      downloadCanvas(1);
    }
  };

  const watermarkPath = `/frames/watermark/wm strip ${stripCount}.png`;

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden text-gray-800">
      {/* Ambient Glassmorphism Background Orbs */}
      <div className="cute-ambient-bg">
        <div className="cute-ambient-orb-1"></div>
        <div className="cute-ambient-orb-2"></div>
        <div className="cute-ambient-orb-3"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 flex flex-col items-center">
        {/* Top Banner Navigation */}
        <div className="w-full flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/user/take-photo")}
            className="px-4 py-2 rounded-full font-cute text-sm font-semibold glass-pill text-gray-700 hover:text-pink-600 flex items-center gap-2"
          >
            <FaArrowLeft className="text-xs" />
            <span>Kembali</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-sm shadow-sm">
              ✨
            </span>
            <h2 className="font-cute text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Dekorasi Frame ({stripCount} Foto)
            </h2>
          </div>

          <button
            onClick={() => navigate("/user")}
            className="px-4 py-2 rounded-full font-cute text-sm font-semibold glass-pill text-gray-700 hover:text-purple-600 flex items-center gap-2 hidden sm:flex"
          >
            <FaRedo className="text-xs" />
            <span>Foto Baru</span>
          </button>
        </div>

        {/* Main Workstation Layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live Preview Area (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full glass-card rounded-4xl p-6 sm:p-8 shadow-glassCard border border-white/80 flex flex-col items-center relative">
              <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-pink-100 text-xs font-cute text-gray-500">
                <span className="flex items-center gap-1.5 font-bold text-gray-700">
                  <span>📸</span> Preview Real-time ({stripCount} Foto)
                </span>
                <span className="text-pink-500 font-semibold truncate max-w-[180px]">
                  {selectedFrame?.nama || "Frame Aktif"}
                </span>
              </div>

              {/* Strip Preview Container */}
              <div className="overflow-x-auto max-w-full py-4 flex justify-center">
                <FramePreview
                  photos={photos}
                  selectedFrame={selectedFrame}
                  stripCount={stripCount}
                  watermark={selectedFrame?.isPremium && !isUnlocked ? watermarkPath : null}
                  backgroundColor={selectedColor}
                  stickers={stickers}
                  onRemoveSticker={handleRemoveSticker}
                />
              </div>

              {/* Tips Note */}
              <div className="mt-4 text-center text-xs font-cute text-gray-500 bg-white/50 px-4 py-2 rounded-full border border-white/70">
                💡 Tip: Frame disesuaikan presisi untuk {stripCount} foto!
              </div>
            </div>
          </div>

          {/* Right Column: Customization Controls (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            {/* Frame Picker Component */}
            <FramePicker
              frames={frames}
              selectedFrame={selectedFrame}
              onPickFrame={(f) => setSelectedFrame(f)}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              selectedColor={selectedColor}
              onPickColor={handlePickColor}
              stickers={stickers}
              onAddSticker={handleAddSticker}
              stripCount={stripCount}
            />

            {/* Download & Export Card */}
            <div className="glass-card rounded-4xl p-6 shadow-glassCard border border-white/80 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-cute text-base font-bold text-gray-800">
                    Siap Simpan Foto?
                  </h4>
                  <p className="text-xs text-gray-500 font-sans">
                    Unduh gambar PNG HD ({stripCount} Foto Print Ready)
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-cute text-lg font-bold text-emerald-600">
                    {selectedFrame?.isPremium
                      ? isUnlocked
                        ? "TERBUKA ✅"
                        : `Rp ${selectedFrame.harga?.toLocaleString("id-ID") || "5.000"}`
                      : "GRATIS ✨"}
                  </span>
                </div>
              </div>

              {/* Main Download Button */}
              <button
                type="button"
                disabled={isProcessing || !selectedFrame || !!pollingId}
                onClick={handleDownloadClick}
                className={`w-full py-4 px-8 rounded-full font-cute text-base font-bold flex items-center justify-center gap-3 transition-all ${
                  pollingId
                    ? "bg-amber-300 text-amber-900 cursor-wait animate-pulse"
                    : isProcessing
                    ? "bg-pink-300 text-white cursor-wait"
                    : selectedFrame?.isPremium && !isUnlocked
                    ? "bg-gradient-to-r from-amber-400 to-rose-400 text-white shadow-md hover:scale-102"
                    : "glass-btn-primary shadow-glassButton hover:scale-102 active:scale-98"
                }`}
              >
                {pollingId ? (
                  <span>Menunggu Pembayaran...</span>
                ) : selectedFrame?.isPremium && !isUnlocked ? (
                  <>
                    <FaLock className="text-base" />
                    <span>Bayar & Unlock Frame Premium (Rp {selectedFrame.harga?.toLocaleString("id-ID") || "5.000"})</span>
                  </>
                ) : (
                  <>
                    <FaDownload className="text-base" />
                    <span>
                      {isProcessing
                        ? "Memproses Foto HD..."
                        : `Download Foto HD (${stripCount} Foto) 💾`}
                    </span>
                  </>
                )}
              </button>

              {downloadSuccess && (
                <div className="p-3 rounded-2xl bg-emerald-100/90 border border-emerald-300 text-emerald-800 font-cute text-xs text-center flex items-center justify-center gap-2 animate-in fade-in">
                  <FaCheckCircle className="text-base text-emerald-600" />
                  <span>Foto photobooth ({stripCount} foto) berhasil diunduh! 🥳</span>
                </div>
              )}

              <div className="flex items-center justify-between text-xs font-cute text-gray-400 pt-2 border-t border-pink-100">
                <span>Resolusi: 300 DPI Siap Cetak</span>
                <span>Format: PNG 24-bit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in">
            <div className="glass-card w-full max-w-md rounded-4xl p-6 sm:p-8 shadow-glassCard border border-white/80 relative text-center">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-pink-100 text-gray-500 flex items-center justify-center transition"
              >
                <FaTimes />
              </button>

              <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-pink-400 to-purple-400 p-[2px] shadow-sm mx-auto mb-3 flex items-center justify-center">
                <div className="w-full h-full bg-white rounded-3xl flex items-center justify-center text-pink-500">
                  <FaQrcode className="text-2xl" />
                </div>
              </div>

              <h3 className="font-cute text-xl font-bold text-gray-800">
                Pembayaran QRIS / Midtrans
              </h3>
              <p className="text-xs text-gray-500 font-sans mt-1">
                Unlock frame premium <span className="font-bold text-pink-600">{selectedFrame?.nama}</span> ({stripCount} Foto)
              </p>

              <div className="my-5 p-4 rounded-3xl bg-pink-50/80 border border-pink-200/80 flex flex-col items-center gap-2">
                <span className="text-xs font-cute text-gray-500 font-semibold">Total Tagihan:</span>
                <span className="font-cute text-3xl font-extrabold text-pink-600">
                  Rp {selectedFrame?.harga ? selectedFrame.harga.toLocaleString("id-ID") : "5.000"}
                </span>

                {/* QR Code Mockup */}
                <div className="w-36 h-36 bg-white p-2 rounded-2xl border-2 border-pink-200 shadow-sm flex items-center justify-center my-1">
                  <div className="w-full h-full border-2 border-dashed border-pink-300 rounded-xl flex flex-col items-center justify-center text-pink-400">
                    <FaQrcode className="text-4xl" />
                    <span className="text-[9px] font-cute font-bold mt-1">QRIS SNAPPIE</span>
                  </div>
                </div>
                <span className="text-[10px] font-cute text-gray-400">
                  Mendukung GoPay, OVO, ShopeePay, Dana, & QRIS BCA/Mandiri
                </span>
              </div>

              <button
                disabled={isPaying}
                onClick={handleSimulatePayment}
                className="w-full py-3.5 px-6 rounded-full font-cute text-base font-bold glass-btn-primary shadow-glassButton flex items-center justify-center gap-2"
              >
                {isPaying ? (
                  <span>Memproses Pembayaran...</span>
                ) : (
                  <>
                    <FaShieldAlt className="text-sm" />
                    <span>Bayar Sekarang (Simulasi Instant) ✨</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
