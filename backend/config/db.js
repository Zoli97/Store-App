import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

//this funnction running to be able to connect to my db by suing the string
export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
