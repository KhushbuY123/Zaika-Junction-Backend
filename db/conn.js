import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connection successful");
  } catch (err) {
    console.error("No connection", err);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
