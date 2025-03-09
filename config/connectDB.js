import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI in your environment variables",
  );
}

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB is not connected ", error);
    process.exit(1);
  }
}
export default connectDB;
