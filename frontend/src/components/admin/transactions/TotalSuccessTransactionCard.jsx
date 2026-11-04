import { FaCheckCircle } from "react-icons/fa";

export default function TotalSuccessTransactionCard({ value = 0 }) {
  return (
    <div className="flex-1 glass-card rounded-4xl p-5 sm:p-6 shadow-glassCard border border-white/80 relative overflow-hidden group hover:scale-[1.02] transition-all">
      <div className="flex items-center justify-between">
        <span className="font-cute text-xs sm:text-sm font-bold text-gray-500">
          Transaksi Sukses
        </span>
        <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg shadow-sm">
          <FaCheckCircle />
        </div>
      </div>
      <div className="mt-3">
        <span className="font-cute text-2xl sm:text-3xl font-extrabold text-emerald-600 block">
          {Number(value || 0).toLocaleString("id-ID")}
        </span>
        <span className="text-[11px] font-sans text-emerald-500 font-semibold mt-1 block">
          Pembayaran terverifikasi
        </span>
      </div>
    </div>
  );
}
