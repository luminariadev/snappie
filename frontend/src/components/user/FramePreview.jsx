import { useRef } from "react";

export default function FramePreview({
  photos = [],
  selectedFrame,
  stripCount = 1,
  watermark,
  backgroundColor = "#FFFFFF",
  stickers = [],
  onRemoveSticker,
}) {
  if (!photos || !photos.length) return null;

  const CM = 37.79527559;
  const CONFIG = {
    4: { width: 8.83 * CM, height: 4.79 * CM, x: 0.84 * CM, yStart: 2 * CM, gap: 0.7 * CM, frameWidth: 10.5 * CM, frameHeight: 29.7 * CM },
    3: { width: 8.83 * CM, height: 5 * CM, x: 0.85 * CM, yStart: 1.2 * CM, gap: 1.4 * CM, frameWidth: 10.5 * CM, frameHeight: 22.5 * CM },
    2: { width: 8.83 * CM, height: 9.5 * CM, x: 0.84 * CM, yStart: 4 * CM, gap: 1.5 * CM, frameWidth: 10.5 * CM, frameHeight: 29.7 * CM },
    1: { width: 12.5 * CM, height: 8.5 * CM, x: 0.8 * CM, yStart: 1 * CM, gap: 0, frameWidth: 14 * CM, frameHeight: 10.5 * CM },
  };

  const safeCount = Math.min(Math.max(stripCount, 1), 4);
  const SLOT = CONFIG[safeCount] || CONFIG[4];
  const frameSrc = selectedFrame?.frameByStrip?.[safeCount];
  const frameBgColor = selectedFrame?.color || backgroundColor || "#FFFFFF";

  // Scale target for preview display
  const targetWidth = safeCount === 1 ? 380 : 270;
  const scale = targetWidth / SLOT.frameWidth;

  return (
    <div className="relative flex flex-col items-center">
      {/* Cute Washi Tape at Top */}
      <div className="w-20 h-5 bg-pink-300/80 -mb-2.5 z-20 rounded-sm transform -rotate-1 shadow-sm backdrop-blur-sm border border-pink-400/30"></div>

      {/* Frame Container Card */}
      <div
        className="relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 border-2 border-white/90"
        style={{
          width: SLOT.frameWidth * scale,
          height: SLOT.frameHeight * scale,
        }}
      >
        <div
          style={{
            width: SLOT.frameWidth,
            height: SLOT.frameHeight,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "relative",
            backgroundColor: frameBgColor,
          }}
        >
          {/* User Photos */}
          {photos.slice(0, safeCount).map((photo, i) => (
            <img
              key={i}
              src={photo}
              alt={`User photo ${i + 1}`}
              crossOrigin="anonymous"
              style={{
                position: "absolute",
                left: SLOT.x,
                top: SLOT.yStart + i * (SLOT.height + SLOT.gap),
                width: SLOT.width,
                height: SLOT.height,
                objectFit: "cover",
                zIndex: 1,
                borderRadius: safeCount === 1 ? "12px" : "6px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
              }}
            />
          ))}

          {/* Graphic Frame Overlay */}
          {frameSrc && (
            <img
              src={frameSrc}
              alt="Frame Overlay"
              crossOrigin="anonymous"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                pointerEvents: "none",
                zIndex: 5,
              }}
            />
          )}

          {/* Watermark brand if solid color */}
          {!frameSrc && (
            <div
              className="absolute font-cute text-xs font-bold tracking-wider z-10"
              style={{
                bottom: "16px",
                right: "20px",
                color: "#E86A92",
                textShadow: "0 1px 2px rgba(255,255,255,0.8)",
              }}
            >
              SNAPPIE ✨
            </div>
          )}

          {/* Placed Stickers */}
          {stickers.map((stk) => (
            <div
              key={stk.id}
              onClick={() => onRemoveSticker && onRemoveSticker(stk.id)}
              style={{
                position: "absolute",
                left: `${stk.x}%`,
                top: `${stk.y}%`,
                transform: `translate(-50%, -50%) rotate(${stk.rotation || 0}deg) scale(${stk.scale || 1})`,
                fontSize: "28px",
                cursor: "pointer",
                zIndex: 15,
                userSelect: "none",
              }}
              title="Klik untuk menghapus stiker"
            >
              {stk.emoji}
            </div>
          ))}

          {/* Watermark for Premium Frames */}
          {selectedFrame?.isPremium && watermark && (
            <img
              src={watermark}
              alt="Watermark"
              crossOrigin="anonymous"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.45,
                pointerEvents: "none",
                userSelect: "none",
                zIndex: 20,
              }}
            />
          )}
        </div>
      </div>

      <span className="mt-3 text-[11px] font-cute text-gray-500 font-semibold bg-white/60 px-3 py-1 rounded-full border border-white/80 shadow-sm">
        Format: {safeCount} Foto • Ukuran: {(SLOT.frameWidth / CM).toFixed(1)} x {(SLOT.frameHeight / CM).toFixed(1)} cm
      </span>
    </div>
  );
}
