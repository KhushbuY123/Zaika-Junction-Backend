import express from "express";
import Recipes from "../controllers/recipes.js";
import PostRecipe from "../controllers/postRecipe.js";
import {getUserRecipes} from "../controllers/getRecipePosts.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import {getRecipesByUserId} from "../controllers/getRecipePosts.js"

const router = express.Router();

router.get("/getall", Recipes);
router.post("/postrecipe",authenticateUser,PostRecipe)
router.get("/getrecipepost",authenticateUser,getUserRecipes)
router.get("/getuserposts/:userId",getRecipesByUserId)

export default router;
