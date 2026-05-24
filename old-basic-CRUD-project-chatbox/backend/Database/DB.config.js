// getting-started.js
import mongoose from "mongoose";
import dotenv from "dotenv";

// dont.env configuration
dotenv.config();

const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/chatbox");
    console.log("Successfully Connected to MongoDB");
  } catch (err) {
    console.log("Error in MongoDB Connect", err);
  }
};

export default connectToMongoDB;
