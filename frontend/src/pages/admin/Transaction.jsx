import { useEffect, useState } from "react";
import TransactionList from "../../components/admin/TransactionList";
import TotalRevenueCard from "../../components/admin/transactions/TotalRevenueCard";
import TotalSuccessTransactionCard from "../../components/admin/transactions/TotalSuccessTransactionCard";
import TotalVisitorsCard from "../../components/admin/transactions/TotalVisitorsCard";
import { MdSearch, MdFilterAlt, MdDateRange } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const API_URL = "http://localhost:5000/api/admin/transactions";

// Demo transaction data if backend is offline
const DEMO_TRANSACTIONS = [
  {
    id: "SNPP-001095",
    frame: "Sakura Blossom Cute",
    filter: "Kawaii Soft",
    date: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: "Premium",
    harga: 5000,
  },
  {
    id: "SNPP-001096",
    frame: "Pastel Cloud Dream",
    filter: "Natural",
    date: new Date(Date.now() - 3600000 * 5).toISOString(),
    status: "Gratis",
    harga: 0,
  },
  {
    id: "SNPP-001097",
    frame: "Cute Ribbon Pink",
    filter: "Retro Film",
    date: new Date(Date.now() - 3600000 * 12).toISOString(),
    status: "Gratis",
    harga: 0,
  },
  {
    id: "SNPP-001098",
    frame: "Kawaii Deluxe Edition",
    filter: "Pastel Pop",
    date: new Date(Date.now() - 86400000).toISOString(),
    status: "Premium",
    harga: 5000,
  },
  {
    id: "SNPP-001099",
    frame: "Starry Night Purple",
    filter: "Mono Chic",
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: "Gratis",
    harga: 0,
  },
];

export default function TransactionPage() {
  const [transactions, setTransactions] = useState(DEMO_TRANSACTIONS);
  const [loading, setLoading] = useState(false);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  /* Fetch Transactions with Fallback */
  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Offline");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTransactions(data);
        }
      })
      .catch(() => {
        // Backend offline, keep demo transactions
      });
  }, []);

  /* Statistics Calculation */
  const stats = {
    revenue: transactions.reduce((sum, t) => sum + Number(t.harga || 0), 0),
    success: transactions.filter((t) => t.status === "Premium").length,
    visitors: transactions.length,
  };

  /* Filtering */
  const filteredData = transactions.filter((item) => {
    const matchSearch =
      (item.frame && item.frame.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.id && item.id.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchDate = selectedDate
      ? new Date(item.date).toDateString() === selectedDate.toDateString()
      : true;

    const matchStatus =
      filterStatus === "all" || !filterStatus
        ? true
        : item.status.toLowerCase() === filterStatus.toLowerCase();

    return matchSearch && matchDate && matchStatus;
  });

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h1 className="font-cute text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Riwayat Transaksi & Analitik 💳
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-sans mt-0.5">
          Pantau statistik transaksi, frame premium, dan aktivitas sesi photobooth
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <TotalRevenueCard value={stats.revenue} />
        <TotalSuccessTransactionCard value={stats.success} />
        <TotalVisitorsCard value={stats.visitors} />
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="glass-panel rounded-3xl p-3 sm:p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-glass">
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Cari frame / ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-full glass-input text-xs font-cute text-gray-700 placeholder-gray-400"
          />
          <MdSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
        </div>

        {/* Status & Date Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Status Pills */}
          {[
            { id: "all", label: "Semua" },
            { id: "premium", label: "Premium" },
            { id: "gratis", label: "Gratis" },
          ].map((tab) => {
            const isSelected = filterStatus === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-4 py-2 rounded-full font-cute text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-sm"
                    : "glass-pill text-gray-600 hover:text-pink-500"
                }`}
              >
                {tab.label}
              </button>
            );
          })}

          {/* Date Picker Button */}
          <div className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="px-4 py-2 rounded-full font-cute text-xs font-semibold glass-pill text-gray-700 hover:text-purple-600 flex items-center gap-1.5"
            >
              <MdDateRange className="text-sm text-purple-400" />
              <span>
                {selectedDate
                  ? selectedDate.toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                    })
                  : "Pilih Tanggal"}
              </span>
            </button>

            {showDatePicker && (
              <div className="absolute top-12 right-0 z-50 glass-card rounded-3xl p-3 shadow-glassCard border border-white/80">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    setShowDatePicker(false);
                  }}
                  inline
                />
                {selectedDate && (
                  <button
                    onClick={() => {
                      setSelectedDate(null);
                      setShowDatePicker(false);
                    }}
                    className="w-full mt-2 py-1.5 px-3 rounded-xl bg-pink-100 text-pink-700 font-cute text-xs font-bold"
                  >
                    Reset Filter Tanggal
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TRANSACTION TABLE */}
      <TransactionList data={filteredData} />
    </div>
  );
}
