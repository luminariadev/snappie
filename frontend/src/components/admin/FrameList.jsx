import { MdEdit, MdDelete } from "react-icons/md";
import { FaLock, FaCheck } from "react-icons/fa";

export default function FrameList({ frames = [], onDelete, onEdit }) {
  if (!frames.length) {
    return (
      <div className="w-full glass-card rounded-4xl p-8 text-center text-gray-500 font-cute mt-6">
        <span className="text-3xl block mb-2">🖼️</span>
        Belum ada frame yang terdaftar. Tambahkan frame baru sekarang!
      </div>
    );
  }

  return (
    <div className="mt-6 w-full glass-card rounded-4xl p-2 sm:p-4 shadow-glassCard border border-white/80 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm font-sans border-collapse">
          <thead>
            <tr className="border-b border-pink-100 text-xs font-cute text-gray-500">
              <th className="px-4 py-3">Thumbnail</th>
              <th className="px-4 py-3">Nama Frame</th>
              <th className="px-4 py-3">Tipe</th>
              <th className="px-4 py-3">Harga</th>
              <th className="px-4 py-3">Preview Strip</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-pink-100/60">
            {frames.map((frame) => (
              <tr key={frame.id} className="hover:bg-white/40 transition">
                {/* Thumbnail */}
                <td className="px-4 py-3">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white/80 border border-white shadow-sm flex items-center justify-center p-1">
                    {frame.thumb ? (
                      <img
                        src={frame.thumb}
                        alt={frame.namaFrame}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-xs font-cute text-pink-400">✨</span>
                    )}
                  </div>
                </td>

                {/* Nama Frame */}
                <td className="px-4 py-3">
                  <span className="font-cute font-bold text-gray-800 text-sm">
                    {frame.namaFrame}
                  </span>
                </td>

                {/* Tipe Badge */}
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-cute text-xs font-bold ${
                      frame.jenis === "premium"
                        ? "bg-purple-100 text-purple-700 border border-purple-200"
                        : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                    }`}
                  >
                    {frame.jenis === "premium" ? (
                      <>
                        <FaLock className="text-[10px]" />
                        <span>Premium</span>
                      </>
                    ) : (
                      <>
                        <FaCheck className="text-[10px]" />
                        <span>Gratis</span>
                      </>
                    )}
                  </span>
                </td>

                {/* Harga */}
                <td className="px-4 py-3 font-cute text-sm">
                  {frame.jenis === "premium" ? (
                    <span className="font-bold text-gray-800">
                      Rp {Number(frame.harga || 0).toLocaleString("id-ID")}
                    </span>
                  ) : (
                    <span className="text-gray-400">Rp 0</span>
                  )}
                </td>

                {/* Preview Mini Strip */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    {frame.frameByStrip &&
                      Object.entries(frame.frameByStrip).map(([slot, path]) =>
                        path ? (
                          <div
                            key={slot}
                            className="w-8 h-8 rounded-lg overflow-hidden bg-white border border-pink-200 shadow-xs p-0.5"
                            title={`Strip ${slot} Foto`}
                          >
                            <img
                              src={path}
                              alt={`Slot ${slot}`}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ) : null
                      )}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit && onEdit(frame)}
                      className="w-8 h-8 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-600 flex items-center justify-center transition"
                      title="Edit Frame"
                    >
                      <MdEdit className="text-sm" />
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(frame.id)}
                      className="w-8 h-8 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-600 flex items-center justify-center transition"
                      title="Hapus Frame"
                    >
                      <MdDelete className="text-sm" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
