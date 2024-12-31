import dotenv from "dotenv";
import express from "express";
const app = express();
import db from "./db/conn.js";
import cors from "cors";
// import authRoutes from "./routes/auth.js";
const PORT = 4000;

dotenv.config();

// DB Connection
db();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"], // Replace with your front-end URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow cookies/auth headers
}));

//routes
// app.use("/api/auth", authRoutes)


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});