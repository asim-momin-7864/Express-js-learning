import mongoose from "mongoose";

export const connectionDB = async() => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to DB!");
};
