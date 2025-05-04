import express from "express";
import PostRecipe from "../controllers/postRecipe.js";

const router = express.Router();

router.post("/postrecipe",PostRecipe)

export default router;
