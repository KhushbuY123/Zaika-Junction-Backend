import express from "express";
import { Login, Signup } from "../controllers/authController.js";
import getAllUsers from "../controllers/getAllUsers.js"
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/login", Login);
router.post("/singUp", Signup);
router.get("/getall",getAllUsers,authenticateUser);

export default router;
