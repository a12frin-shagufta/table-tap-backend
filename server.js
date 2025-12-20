import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// routes
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

/* =====================
   CORS
===================== */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "https://admin-ivory-sigma.vercel.app",
      "https://frontend-rho-three-35.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

/* =====================
   Middleware
===================== */
app.use(express.json());

/* =====================
   Routes
===================== */
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

/* =====================
   Health
===================== */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

/* =====================
   MongoDB
===================== */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) =>
    console.error("❌ MongoDB connection error:", err.message)
  );

export default app; // ✅ REQUIRED FOR VERCEL
