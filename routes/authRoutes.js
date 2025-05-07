import express from "express";
import { Login, Signup } from "../controllers/authController.js";
import {getAllUsers,getme} from "../controllers/getAllUsers.js"
import {FollowUser,UnfollowUser} from "../controllers/followUnfollowController.js"
import { authenticateUser } from "../middlewares/authMiddleware.js";
import {Chatbot} from "../controllers/chatbotController.js";

const router = express.Router();
router.post("/login", Login);
router.post("/singUp", Signup);
router.get("/getall",authenticateUser,getAllUsers);
router.get("/getme",authenticateUser,getme);
router.post("/follow",authenticateUser,FollowUser);
router.post("/unfollow",authenticateUser,UnfollowUser);
router.post("/chatbot",Chatbot)

export default router;
