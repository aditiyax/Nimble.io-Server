import express from "express";
import { connectDB } from "./config/db";
import { authRoutes, userRoutes, chatRoutes } from "./routes/route";
import cors from "cors";

const app = express();
app.use(express.json());

connectDB().catch((err: any) => {
  console.error("❌ Failed to connect to DB", err);
  process.exit(1);
});
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);

app.get("/", (req, res) => {
  res.send("✅ Welcome to the Nimble.IO's API ");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
