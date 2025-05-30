import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import db from "./db/conn.js";
import reciperoutes from "./routes/recipe.js";
import authroutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import Chat from "./models/chatschema.js";

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();

// Connect to DB
db();

// Middleware
app.use(
  cors({
    origin: "https://zaika-junction.vercel.app/", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json()); // To parse JSON request bodies

// API Routes
app.use("/api/recipes", reciperoutes);
app.use("/api/user", authroutes);
app.use("/api/chat", chatRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Create HTTP server and bind Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend origin
    methods: ["GET", "POST"],
  },
});

// In-memory user map for Socket.IO
const users = {}; // userId -> socketId

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("register", (userId) => {
    users[userId] = socket.id;
    console.log(`User ${userId} registered with socket ${socket.id}`);
  });

  socket.on("private_message", async ({ from, to, message }) => {
    try {
      // Save message to DB
      await new Chat({ from, to, message }).save();

      // Send to recipient if connected
      const targetSocket = users[to];
      if (targetSocket) {
        io.to(targetSocket).emit("private_message", { from, message });
      }
    } catch (err) {
      console.error("Error handling private message:", err);
    }
  });

  socket.on("disconnect", () => {
    for (const [userId, socketId] of Object.entries(users)) {
      if (socketId === socket.id) {
        delete users[userId];
        break;
      }
    }
    console.log("User disconnected:", socket.id);
  });
});

// Start the server (Express + Socket.IO)
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
