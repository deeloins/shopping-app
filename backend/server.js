import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRouter from "./routes/product.route.js";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

// Middlewares
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));

if (process.env.NODE_ENV === "production") {
  app.use(helmet());
  app.use(compression());
}

// Routes
app.use("/api/products", productRouter);

// Production static files
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/public")));

  // SPA Fallback
  app.get(/^(?!\/api).*[^.]*$/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/public", "index.html"));
  });
}

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => {
  connectDB();
  console.log(
    `Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );
});
