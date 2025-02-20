import express from "express";
import { Login, Signup } from "../controllers/authController.js";

const router = express.Router();
router.post("/login", Login);
router.post("/singUp", Signup);

export default router;
