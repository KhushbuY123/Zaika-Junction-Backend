import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectDB = async () => {
  const uri =
    "mongodb+srv://pandey03muskan:cRAbhiIt6burlOnR@cluster0.4bkbt.mongodb.net/FindRecipes?retryWrites=true&w=majority&appName=Cluster0";
  if (!uri) {
    console.error("MONGODB_URI is not defined in .env file");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
