import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const connectDB = async () => {
  const MONGO_URL:string = "mongodb://127.0.0.1:27017/Todo-ts";
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("something went wrong", error);
    process.exit(1);
  }
};

export default connectDB;
