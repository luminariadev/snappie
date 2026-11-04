export default function FilterOptions({ selected, onSelect }) {
  const filters = [
    { id: "normal", label: "Natural", icon: "✨", desc: "No filter" },
    { id: "soft", label: "Kawaii Soft", icon: "🌸", desc: "Lembut & cerah" },
    { id: "pop", label: "Pastel Pop", icon: "💖", desc: "Warna ceria" },
    { id: "retro", label: "Retro Film", icon: "🎞️", desc: "Vintage hangat" },
    { id: "sepia", label: "Sepia Dream", icon: "🍂", desc: "Classic golden" },
    { id: "mono", label: "Mono Chic", icon: "☁️", desc: "Black & White" },
  ];

  return (
    <div className="glass-card rounded-3xl p-4 shadow-glassCard border border-white/80 max-w-xl mx-auto">
      <div className="flex items-center justify-between pb-3 border-b border-pink-100 px-2 mb-3">
        <h4 className="font-cute text-sm font-bold text-gray-700 flex items-center gap-2">
          <span>🎨</span> Filter & Efek Kamera
        </h4>
        <span className="text-[11px] font-cute text-pink-500 font-semibold">Pilih gaya fotomu</span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {filters.map((f) => {
          const isSelected = selected === f.id;
          return (
            <button
              key={f.id}
              onClick={() => onSelect(f.id)}
              className={`p-2.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all ${
                isSelected
                  ? "bg-gradient-to-tr from-pink-400 to-purple-400 text-white shadow-md shadow-pink-300/40 border-2 border-white scale-105"
                  : "bg-white/60 hover:bg-white/90 text-gray-700 border border-white/80 shadow-sm"
              }`}
            >
              <span className="text-xl mb-1">{f.icon}</span>
              <span className="font-cute text-xs font-bold leading-tight">{f.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
