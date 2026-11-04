import { useState } from "react";
import { FaCloudUploadAlt, FaTimes, FaImage } from "react-icons/fa";

export default function UploadPhotoPopup({ isOpen, onClose, onUpload }) {
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const imageURL = URL.createObjectURL(file);
    onUpload(imageURL);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="glass-card w-full max-w-md rounded-4xl p-6 sm:p-8 shadow-glassCard border border-white/80 relative overflow-hidden">
        {/* Top Bar with Cute Close Button */}
        <div className="flex items-center justify-between pb-4 border-b border-pink-100">
          <div className="flex items-center gap-2">
            <span className="text-xl">📸</span>
            <h3 className="font-cute text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Upload Foto Kamu
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/70 hover:bg-pink-100 text-gray-500 hover:text-pink-600 flex items-center justify-center transition"
          >
            <FaTimes />
          </button>
        </div>

        {/* Drag and Drop Box */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            if (e.dataTransfer.files?.[0]) {
              handleFile(e.dataTransfer.files[0]);
            }
          }}
          className={`mt-6 border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all ${
            dragActive
              ? "border-pink-500 bg-pink-100/50 scale-[1.02]"
              : "border-pink-300/70 bg-white/40 hover:bg-white/60"
          }`}
        >
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-pink-200 to-purple-200 text-pink-600 flex items-center justify-center text-3xl shadow-sm mb-4">
            <FaCloudUploadAlt />
          </div>

          <p className="font-cute text-base font-bold text-gray-700">
            Tarik & Jatuhkan Foto di Sini
          </p>
          <p className="text-xs text-gray-500 font-sans mt-1 mb-5">
            Mendukung file JPG, PNG, atau WEBP
          </p>

          <label className="cursor-pointer">
            <span className="py-2.5 px-6 rounded-full font-cute text-sm font-bold glass-btn-primary shadow-glassButton inline-flex items-center gap-2">
              <FaImage /> Pilih dari Galeri
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
          </label>
        </div>

        <p className="text-center text-xs text-gray-400 font-cute mt-4">
          ✨ Foto akan langsung dimasukkan ke frame photobooth!
        </p>
      </div>
    </div>
  );
}
