import express from "express";
import Signup from "../controllers/signup.js"

const router=express.Router();

router.post("/user",Signup)

export default router;