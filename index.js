import dotenv from "dotenv";
import express from "express";
const app = express();
import db from "./db/conn.js";
import cors from "cors";
import reciperoutes from "./routes/recipe.js";
import authroutes from "./routes/authRoutes.js";
// import postrecipe from "./routes/postrecipe.js";

const PORT = 4000;

dotenv.config();

// DB Connection
db();

// Middleware
app.use(express.json());
// app.use(express.json({ limit: '10mb' })); // or more if needed
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(
  cors({
    origin: "*", // Replace with your front-end URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies/auth headers
  })
);

//routes
app.use("/api/recipes", reciperoutes);
app.use("/api/user", authroutes);
// app.use("/api/recipes",reciperoutes)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

