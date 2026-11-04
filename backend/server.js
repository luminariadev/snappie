import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Load env first
dotenv.config();

// Database
import { sequelize } from "./src/config/db.js";

// Load all models + associations
import "./src/models/index.js";

// Express App
const app = express();
app.use(cors());
app.use(express.json());

// Routes
import frameRoutes from "./src/routes/frameRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import fotoRoutes from "./src/routes/fotoRoutes.js";
import subFotoRoutes from "./src/routes/subFotoRoutes.js";
import transaksiRoutes from "./src/routes/transaksiRoutes.js";

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Register Routes
app.use("/api/frames", frameRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/foto", fotoRoutes);
app.use("/api/subfoto", subFotoRoutes);
app.use("/api/admin/transactions", transaksiRoutes);

app.use(
  '/uploads',
  express.static('uploads', {
    setHeaders: (res, path, stat) => {
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Cross-Origin-Resource-Policy', 'cross-origin');
      res.set('Cross-Origin-Opener-Policy', 'same-origin');
      res.set('Cross-Origin-Embedder-Policy', 'credentialless');
    }
  })
);

// Database connection & sync
try {
  await sequelize.authenticate();
  console.log("✅ PostgreSQL Connected successfully!");
  await sequelize.sync();
  console.log("📦 Database schema synchronized");
} catch (err) {
  console.warn("⚠️  Database connection failed. Ensure PostgreSQL is active:", err.message);
}

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Snappie API Server running on port ${PORT}`);
});
