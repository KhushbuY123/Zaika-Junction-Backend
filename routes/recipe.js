import express from "express";
import Recipes from "../controllers/recipes.js";

const router = express.Router();

router.get("/getall", Recipes);

export default router;
