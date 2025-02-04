import dotenv from "dotenv";
import express from "express";
const app = express();
import db from "./db/conn.js";
import cors from "cors";
import reciperoutes from "./routes/recipe.js"
import signuproutes from "./routes/signup.js"
import loginroutes from "./routes/login.js"
const PORT = 3000;

dotenv.config();

// DB Connection
db();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3001"], // Replace with your front-end URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow cookies/auth headers
}));

//routes
app.use("/api/recipes",reciperoutes)
app.use("/api/signup",signuproutes)
app.use("/api/login",loginroutes)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
