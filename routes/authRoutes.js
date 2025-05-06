import express from "express";
import { getAllUsers, Login, Signup } from "../controllers/authController.js";

const router = express.Router();
router.post("/login", Login);
router.post("/singUp", Signup);
router.get("/allUsers", getAllUsers);

export default router;
