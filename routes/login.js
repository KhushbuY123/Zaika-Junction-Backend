import express from "express"
import Login from "../controllers/login.js"

const router=express.Router()
router.post("/user",Login)

export default router;
