import { useState } from "react";
import { FaLock, FaPalette, FaImage, FaSmile, FaCheck } from "react-icons/fa";

export default function FramePicker({
  frames = [],
  selectedFrame,
  onPickFrame,
  activeTab = "graphic",
  onTabChange,
  selectedColor,
  onPickColor,
  stickers = [],
  onAddSticker,
  stripCount = 4,
}) {
  const tabs = [
    { id: "graphic", label: "Frame Desain", icon: FaImage },
    { id: "color", label: "Warna Pastel", icon: FaPalette },
    { id: "sticker", label: "Stiker Lucu", icon: FaSmile },
  ];

  const cuteColorPresets = [
    { name: "Sakura Pink", color: "#FFDEE9" },
    { name: "Lavender Mist", color: "#E0C3FC" },
    { name: "Matcha Cream", color: "#D4EDDA" },
    { name: "Baby Sky", color: "#D0E8FF" },
    { name: "Butter Puff", color: "#FFF3B0" },
    { name: "Peach Blossom", color: "#FFE5D9" },
    { name: "Cotton Candy", color: "#FDE2E4" },
    { name: "Vanilla Milk", color: "#FAF0E6" },
    { name: "Midnight Noir", color: "#2B2D42" },
    { name: "Pure White", color: "#FFFFFF" },
  ];

  const cuteStickerPresets = [
    "✨", "💖", "🌸", "🎀", "🧸", "🐱", "🍓", "⭐", "💌", "🌈",
    "🍒", "🐰", "🍭", "🍀", "🥞", "🫧", "☁️", "🧁", "🌼", "💐"
  ];

  const cardAspectClass = stripCount === 1 ? "aspect-[4/3]" : "aspect-[3/4]";

  return (
    <div className="w-full glass-card rounded-4xl p-5 sm:p-6 shadow-glassCard border border-white/80">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/50 border border-white/70 mb-5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange && onTabChange(tab.id)}
              className={`flex-1 py-2 px-3 rounded-xl font-cute text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
                isSelected
                  ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md shadow-pink-300/40 scale-102"
                  : "text-gray-600 hover:text-pink-500 hover:bg-white/60"
              }`}
            >
              <Icon className="text-xs sm:text-sm" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Graphic Frames */}
      {activeTab === "graphic" && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-cute text-gray-500">
            <span>Pilih frame kesukaanmu ({stripCount} Foto):</span>
            <span className="text-pink-500 font-bold">{frames.length} Frame Tersedia</span>
          </div>

          {frames.length === 0 ? (
            <div className="p-8 text-center text-xs font-cute text-gray-400 bg-white/40 rounded-2xl border border-white/60">
              Tidak ada frame untuk mode {stripCount} foto ini
            </div>
          ) : (
            <div className={`grid ${stripCount === 1 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-4"} gap-3 max-h-[360px] overflow-y-auto pr-1`}>
              {frames.map((f) => {
                const isSelected = selectedFrame?.id === f.id;
                const displayThumb = f.frameByStrip?.[stripCount] || f.thumb;

                return (
                  <button
                    key={f.id}
                    onClick={() => onPickFrame(f)}
                    className={`group relative rounded-2xl overflow-hidden ${cardAspectClass} border-2 transition-all p-1 flex flex-col items-center justify-center ${
                      isSelected
                        ? "border-pink-500 ring-4 ring-pink-300/50 bg-pink-50 scale-105 shadow-md"
                        : "border-white/90 bg-white/60 hover:bg-white hover:scale-102 hover:border-pink-300 shadow-sm"
                    }`}
                  >
                    {displayThumb ? (
                      <img
                        src={displayThumb}
                        alt={f.nama || `Frame ${f.id}`}
                        className="w-full h-full object-contain rounded-xl"
                      />
                    ) : (
                      <div className="w-full h-full rounded-xl bg-gradient-to-tr from-pink-100 to-purple-100 flex items-center justify-center text-xs font-cute text-pink-500 font-bold">
                        {f.nama || `Frame ${f.id}`}
                      </div>
                    )}

                    {/* Premium Badge */}
                    {f.isPremium && (
                      <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full bg-amber-400 text-amber-950 font-cute text-[9px] font-extrabold flex items-center gap-0.5 shadow-sm">
                        <FaLock className="text-[8px]" />
                        <span>PRO</span>
                      </div>
                    )}

                    {/* Selected Tick */}
                    {isSelected && (
                      <div className="absolute bottom-1.5 right-1.5 w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px] shadow-sm">
                        <FaCheck />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Pastel Colors */}
      {activeTab === "color" && (
        <div className="flex flex-col gap-4">
          <div className="text-xs font-cute text-gray-500">
            Pilih warna border photobooth minimalism & pastel:
          </div>

          <div className="grid grid-cols-5 gap-3">
            {cuteColorPresets.map((c) => {
              const isSelected = selectedColor === c.color;
              return (
                <button
                  key={c.name}
                  onClick={() => onPickColor && onPickColor(c.color)}
                  className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all ${
                    isSelected
                      ? "bg-pink-100/60 ring-2 ring-pink-400 scale-105"
                      : "hover:bg-white/60"
                  }`}
                >
                  <div
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md flex items-center justify-center transition-transform"
                    style={{ backgroundColor: c.color }}
                  >
                    {isSelected && (
                      <span className={c.color === "#FFFFFF" || c.color === "#FFF3B0" ? "text-gray-800" : "text-white"}>
                        <FaCheck className="text-xs" />
                      </span>
                    )}
                  </div>
                  <span className="font-cute text-[10px] text-gray-700 text-center truncate max-w-[60px]">
                    {c.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Cute Stickers */}
      {activeTab === "sticker" && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs font-cute text-gray-500">
            <span>Klik stiker untuk ditempel ke foto:</span>
            <span className="text-purple-500 font-bold">Stiker Lucu ✨</span>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-5 gap-2.5 max-h-[300px] overflow-y-auto p-1">
            {cuteStickerPresets.map((stk, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onAddSticker && onAddSticker(stk)}
                className="w-12 h-12 rounded-2xl bg-white/70 hover:bg-white hover:scale-110 active:scale-95 border border-white/90 shadow-sm flex items-center justify-center text-2xl transition-all"
              >
                {stk}
              </button>
            ))}
          </div>

          <p className="text-[11px] font-cute text-gray-400 text-center mt-2">
            💡 Tip: Stiker akan menempel di foto dan dapat ditarik/dihapus kapan saja!
          </p>
        </div>
      )}
    </div>
  );
}
