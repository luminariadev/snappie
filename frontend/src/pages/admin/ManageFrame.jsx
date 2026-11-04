import { useState, useEffect } from "react";
import FrameAddForm from "../../components/admin/FrameAddForm";
import FrameList from "../../components/admin/FrameList";
import { FaPlus, FaTimes, FaFilter, FaSearch } from "react-icons/fa";

const BASE_URL = "http://localhost:5000";

// Fallback demo frames if backend database is offline
const DEMO_ADMIN_FRAMES = [
  {
    id: 1,
    namaFrame: "Sakura Blossom Cute",
    jenis: "gratis",
    harga: 0,
    jumlahSlot: 4,
    thumb: "/frames/frame4/frameFree1.png",
    frameByStrip: { 4: "/frames/frame4/frameFree1.png" },
  },
  {
    id: 2,
    namaFrame: "Pastel Cloud Dream",
    jenis: "gratis",
    harga: 0,
    jumlahSlot: 4,
    thumb: "/frames/frame4/frameFree2.png",
    frameByStrip: { 4: "/frames/frame4/frameFree2.png" },
  },
  {
    id: 3,
    namaFrame: "Cute Ribbon Pink",
    jenis: "gratis",
    harga: 0,
    jumlahSlot: 4,
    thumb: "/frames/frame4/frameFree3.png",
    frameByStrip: { 4: "/frames/frame4/frameFree3.png" },
  },
  {
    id: 4,
    namaFrame: "Kawaii Deluxe Edition",
    jenis: "premium",
    harga: 5000,
    jumlahSlot: 4,
    thumb: "/frames/frame4/framePaid1.png",
    frameByStrip: { 4: "/frames/frame4/framePaid1.png" },
  },
];

export default function ManageFrame() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [namaFrame, setNamaFrame] = useState("");
  const [jenis, setJenis] = useState("gratis");
  const [harga, setHarga] = useState("");
  const [jumlahSlot, setJumlahSlot] = useState("4");
  const [thumb, setThumb] = useState(null);
  const [frame1, setFrame1] = useState(null);
  const [frame3, setFrame3] = useState(null);
  const [frame4, setFrame4] = useState(null);

  const [frames, setFrames] = useState(DEMO_ADMIN_FRAMES);
  const [editingId, setEditingId] = useState(null);

  // Load from backend if available
  useEffect(() => {
    fetch(`${BASE_URL}/api/frames`)
      .then((res) => {
        if (!res.ok) throw new Error("Offline");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((f) => ({
            id: f.id_frame,
            namaFrame: f.nama_frame,
            jenis: f.tipe,
            harga: f.harga || 0,
            jumlahSlot: Number(f.jumlah_slot_default || 4),
            thumb: f.thumb_path ? `${BASE_URL}${f.thumb_path.replace(/\\/g, "/")}` : null,
            frameByStrip: {
              1: f.frame1_path ? `${BASE_URL}${f.frame1_path.replace(/\\/g, "/")}` : null,
              3: f.frame3_path ? `${BASE_URL}${f.frame3_path.replace(/\\/g, "/")}` : null,
              4: f.frame4_path ? `${BASE_URL}${f.frame4_path.replace(/\\/g, "/")}` : null,
            },
          }));
          setFrames(mapped);
        }
      })
      .catch(() => {
        // Backend offline, keep demo frames
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!namaFrame.trim()) return alert("Nama frame wajib diisi!");

    const form = new FormData();
    form.append("nama_frame", namaFrame);
    form.append("tipe", jenis);
    form.append("jumlah_slot_default", jumlahSlot);
    form.append("deskripsi", "");
    form.append("id_admin", 1);
    form.append("harga", jenis === "premium" ? harga : 0);

    if (thumb) form.append("thumb", thumb);
    if (frame1) form.append("frame1", frame1);
    if (frame3) form.append("frame3", frame3);
    if (frame4) form.append("frame4", frame4);

    try {
      let url = `${BASE_URL}/api/frames`;
      let method = "POST";

      if (editingId) {
        url = `${BASE_URL}/api/frames/${editingId}`;
        method = "PUT";
      }

      const res = await fetch(url, { method, body: form });
      const data = await res.json();

      const newFrame = {
        id: data.id_frame || Date.now(),
        namaFrame: data.nama_frame || namaFrame,
        jenis: data.tipe || jenis,
        harga: data.harga || harga || 0,
        jumlahSlot: Number(jumlahSlot),
        thumb: data.thumb_path
          ? `${BASE_URL}${data.thumb_path.replace(/\\/g, "/")}`
          : thumb
          ? URL.createObjectURL(thumb)
          : null,
        frameByStrip: {
          1: frame1 ? URL.createObjectURL(frame1) : null,
          3: frame3 ? URL.createObjectURL(frame3) : null,
          4: frame4 ? URL.createObjectURL(frame4) : null,
        },
      };

      if (editingId) {
        setFrames((prev) => prev.map((f) => (f.id === editingId ? newFrame : f)));
      } else {
        setFrames((prev) => [newFrame, ...prev]);
      }

      // Reset
      setShowAddForm(false);
      setEditingId(null);
      setNamaFrame("");
      setJenis("gratis");
      setHarga("");
      setThumb(null);
    } catch (err) {
      // Local fallback creation
      const localFrame = {
        id: editingId || Date.now(),
        namaFrame: namaFrame,
        jenis: jenis,
        harga: jenis === "premium" ? harga : 0,
        jumlahSlot: Number(jumlahSlot),
        thumb: thumb ? URL.createObjectURL(thumb) : "/frames/frame4/frameFree1.png",
        frameByStrip: {
          1: frame1 ? URL.createObjectURL(frame1) : null,
          3: frame3 ? URL.createObjectURL(frame3) : null,
          4: frame4 ? URL.createObjectURL(frame4) : "/frames/frame4/frameFree1.png",
        },
      };

      if (editingId) {
        setFrames((prev) => prev.map((f) => (f.id === editingId ? localFrame : f)));
      } else {
        setFrames((prev) => [localFrame, ...prev]);
      }
      setShowAddForm(false);
      setEditingId(null);
    }
  };

  const handleEdit = (frame) => {
    setNamaFrame(frame.namaFrame);
    setJenis(frame.jenis || "gratis");
    setHarga(frame.harga || "");
    setJumlahSlot(frame.jumlahSlot ? String(frame.jumlahSlot) : "4");
    setEditingId(frame.id);
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Yakin ingin menghapus frame ini?")) return;
    setFrames((prev) => prev.filter((f) => f.id !== id));
  };

  // Filter & Search
  const filteredFrames = frames
    .filter((f) => {
      if (activeTab === "premium") return f.jenis === "premium";
      if (activeTab === "gratis") return f.jenis === "gratis";
      return true;
    })
    .filter((f) =>
      f.namaFrame.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-cute text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Kelola Frame Photobooth ✨
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-sans mt-0.5">
            Tambah, perbarui, dan atur ketersediaan frame foto untuk pengguna
          </p>
        </div>

        <button
          onClick={() => {
            setEditingId(null);
            setNamaFrame("");
            setJenis("gratis");
            setHarga("");
            setShowAddForm(true);
          }}
          className="py-3 px-6 rounded-full font-cute text-sm font-bold glass-btn-primary shadow-glassButton flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <FaPlus className="text-xs" />
          <span>Tambah Frame Baru</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel rounded-3xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-glass">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Cari nama frame..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-full glass-input text-xs font-cute text-gray-700 placeholder-gray-400"
          />
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {[
            { id: "all", label: "Semua Frame" },
            { id: "gratis", label: "Gratis" },
            { id: "premium", label: "Premium" },
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-full font-cute text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-sm"
                    : "glass-pill text-gray-600 hover:text-pink-500"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Table Frame List */}
      <FrameList
        frames={filteredFrames}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      {/* Modal Add / Edit Frame */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="glass-card w-full max-w-lg rounded-4xl p-6 sm:p-8 shadow-glassCard border border-white/80 relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-pink-100 mb-4">
              <h3 className="font-cute text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                {editingId ? "Edit Frame" : "Tambah Frame Baru ✨"}
              </h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="w-8 h-8 rounded-full bg-white/70 hover:bg-pink-100 text-gray-500 flex items-center justify-center transition"
              >
                <FaTimes />
              </button>
            </div>

            <FrameAddForm
              namaFrame={namaFrame}
              setNamaFrame={setNamaFrame}
              jenis={jenis}
              setJenis={setJenis}
              harga={harga}
              setHarga={setHarga}
              jumlahSlot={jumlahSlot}
              setJumlahSlot={setJumlahSlot}
              setThumbnail={setThumb}
              setFrame1={setFrame1}
              setFrame3={setFrame3}
              setFrame4={setFrame4}
              handleSubmit={handleSubmit}
              isEditing={!!editingId}
            />
          </div>
        </div>
      )}
    </div>
  );
}
