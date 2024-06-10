import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const { MONGO_URL } = process.env;

mongoose.connect(MONGO_URL);

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});
