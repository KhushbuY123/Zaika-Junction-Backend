import dotenv from "dotenv";
import express from "express";
const app = express();
import db from "./db/conn.js";
import cors from "cors";
import reciperoutes from "./routes/recipe.js";
import authroutes from "./routes/authRoutes.js";
// import postrecipe from "./routes/postrecipe.js";

dotenv.config();
const PORT = process.env.PORT || 4000;

// DB Connection
db();

// Middleware
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "https://zaika-junction.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.options("*", cors());

//routes
app.use("/api/recipes", reciperoutes);
app.use("/api/user", authroutes);
// app.use("/api/recipes",reciperoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
