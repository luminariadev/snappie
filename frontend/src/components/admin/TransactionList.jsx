import { MdEdit, MdDelete } from "react-icons/md";
import { FaLock, FaCheck } from "react-icons/fa";

export default function TransactionList({ data = [] }) {
  const formatDate = (date) => {
    try {
      return new Date(date).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return String(date);
    }
  };

  const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(Number(value || 0));

  if (!data.length) {
    return (
      <div className="w-full glass-card rounded-4xl p-8 text-center text-gray-500 font-cute mt-6">
        <span className="text-3xl block mb-2">💳</span>
        Belum ada riwayat transaksi yang cocok dengan filter.
      </div>
    );
  }

  return (
    <div className="mt-6 w-full glass-card rounded-4xl p-2 sm:p-4 shadow-glassCard border border-white/80 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm font-sans border-collapse">
          <thead>
            <tr className="border-b border-pink-100 text-xs font-cute text-gray-500">
              <th className="px-4 py-3">ID Transaksi</th>
              <th className="px-4 py-3">Frame</th>
              <th className="px-4 py-3">Filter</th>
              <th className="px-4 py-3">Tanggal</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-right">Harga</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-pink-100/60">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-white/40 transition">
                <td className="px-4 py-3 font-mono text-xs text-gray-600 font-semibold">
                  {item.id}
                </td>
                <td className="px-4 py-3 font-cute font-bold text-gray-800">
                  {item.frame}
                </td>
                <td className="px-4 py-3 text-xs text-gray-500">
                  {item.filter || "Normal"}
                </td>
                <td className="px-4 py-3 text-xs text-gray-500">
                  {formatDate(item.date)}
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-cute text-xs font-bold ${
                      item.status === "Premium"
                        ? "bg-purple-100 text-purple-700 border border-purple-200"
                        : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                    }`}
                  >
                    {item.status === "Premium" ? (
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
                <td className="px-4 py-3 text-right font-cute font-bold text-gray-800">
                  {formatRupiah(item.harga)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
