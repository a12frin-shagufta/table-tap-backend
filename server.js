import express from "express";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import cors from "cors"; // 👈 ADD THIS

// routes
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ ENABLE CORS (ADD THIS BLOCK)

const allowedOrigins = [
  "http://localhost:5174", // customer
  "http://localhost:5175", // admin
];

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));



// middleware
app.use(express.json());

// serve local images
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// routes
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

// mongo connect
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) =>
    console.error("❌ MongoDB connection error:", err.message)
  );

// start server
const PORT = process.env.PORT || 4000;
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
