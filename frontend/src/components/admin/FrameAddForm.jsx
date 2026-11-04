import { FaImage, FaCloudUploadAlt, FaSave } from "react-icons/fa";

export default function FrameAddForm({
  namaFrame,
  setNamaFrame,
  jenis,
  setJenis,
  harga,
  setHarga,
  jumlahSlot,
  setJumlahSlot,
  setThumbnail,
  setFrame1,
  setFrame3,
  setFrame4,
  handleSubmit,
  isEditing = false,
}) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans">
      {/* Nama Frame */}
      <div>
        <label className="font-cute text-xs font-bold text-gray-700 mb-1 block">
          Nama Frame
        </label>
        <input
          type="text"
          placeholder="Contoh: Sakura Spring Cute"
          value={namaFrame}
          onChange={(e) => setNamaFrame(e.target.value)}
          required
          className="w-full h-11 px-4 rounded-2xl glass-input text-sm text-gray-800 placeholder-gray-400"
        />
      </div>

      {/* Grid: Jenis Frame & Jumlah Slot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="font-cute text-xs font-bold text-gray-700 mb-1 block">
            Jenis Akses
          </label>
          <select
            value={jenis}
            onChange={(e) => setJenis(e.target.value)}
            className="w-full h-11 px-3 rounded-2xl glass-input text-sm text-gray-800"
          >
            <option value="gratis">Gratis (Free)</option>
            <option value="premium">Premium (Berbayar)</option>
          </select>
        </div>

        <div>
          <label className="font-cute text-xs font-bold text-gray-700 mb-1 block">
            Jumlah Slot Foto (Strip)
          </label>
          <select
            value={jumlahSlot}
            onChange={(e) => setJumlahSlot(e.target.value)}
            className="w-full h-11 px-3 rounded-2xl glass-input text-sm text-gray-800"
          >
            <option value="4">4 Foto (K-Cut Studio)</option>
            <option value="3">3 Foto (Trio Strip)</option>
            <option value="1">1 Foto (Polaroid Single)</option>
          </select>
        </div>
      </div>

      {/* Harga jika Premium */}
      {jenis === "premium" && (
        <div>
          <label className="font-cute text-xs font-bold text-gray-700 mb-1 block">
            Harga Frame (IDR)
          </label>
          <input
            type="number"
            placeholder="Contoh: 5000"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            min={1000}
            required={jenis === "premium"}
            className="w-full h-11 px-4 rounded-2xl glass-input text-sm text-gray-800"
          />
        </div>
      )}

      {/* File Uploads */}
      <div className="p-4 rounded-3xl bg-white/40 border border-white/70 flex flex-col gap-3">
        <div>
          <label className="font-cute text-xs font-bold text-gray-700 mb-1 block flex items-center gap-1.5">
            <FaImage className="text-pink-500" />
            <span>Thumbnail Icon Frame</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="text-xs text-gray-600 file:mr-3 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-cute file:font-bold file:bg-pink-100 file:text-pink-600 hover:file:bg-pink-200 cursor-pointer"
          />
        </div>

        {/* Dynamic slot file upload */}
        {jumlahSlot === "1" && (
          <div>
            <label className="font-cute text-xs font-bold text-gray-700 mb-1 block">
              File PNG Overlay Frame 1 Slot
            </label>
            <input
              type="file"
              accept="image/png"
              onChange={(e) => setFrame1(e.target.files[0])}
              className="text-xs text-gray-600 file:mr-3 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-cute file:font-bold file:bg-purple-100 file:text-purple-600 hover:file:bg-purple-200 cursor-pointer"
            />
          </div>
        )}

        {jumlahSlot === "3" && (
          <div>
            <label className="font-cute text-xs font-bold text-gray-700 mb-1 block">
              File PNG Overlay Frame 3 Slot
            </label>
            <input
              type="file"
              accept="image/png"
              onChange={(e) => setFrame3(e.target.files[0])}
              className="text-xs text-gray-600 file:mr-3 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-cute file:font-bold file:bg-purple-100 file:text-purple-600 hover:file:bg-purple-200 cursor-pointer"
            />
          </div>
        )}

        {jumlahSlot === "4" && (
          <div>
            <label className="font-cute text-xs font-bold text-gray-700 mb-1 block">
              File PNG Overlay Frame 4 Slot
            </label>
            <input
              type="file"
              accept="image/png"
              onChange={(e) => setFrame4(e.target.files[0])}
              className="text-xs text-gray-600 file:mr-3 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-cute file:font-bold file:bg-purple-100 file:text-purple-600 hover:file:bg-purple-200 cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-2 w-full py-3.5 px-6 rounded-full font-cute text-sm font-bold glass-btn-primary shadow-glassButton flex items-center justify-center gap-2"
      >
        <FaSave />
        <span>{isEditing ? "Perbarui Frame" : "Simpan Frame Baru ✨"}</span>
      </button>
    </form>
  );
}
