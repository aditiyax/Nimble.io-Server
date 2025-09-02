import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/myapp";

let isConnected: boolean = false;

export const connectDB = async (): Promise<typeof mongoose> => {
  if (isConnected) {
    console.log("✅ MongoDB already connected");
    return mongoose;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      dbName: "nimble",
    });

    isConnected = true;
    console.log("🚀 MongoDB connected:", db.connection.host);
    return db;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};
