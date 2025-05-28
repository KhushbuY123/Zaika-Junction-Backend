// import express from "express";
// import Recipes from "../controllers/recipes.js";
// import PostRecipe from "../controllers/postRecipe.js";
// import {getUserRecipes} from "../controllers/getRecipePosts.js";
// import { authenticateUser } from "../middlewares/authMiddleware.js";
// import {getRecipesByUserId} from "../controllers/getRecipePosts.js";
// import {getAllPosts} from "../controllers/getRecipePosts.js";
// import {getFollowingPosts} from "../controllers/getRecipePosts.js";
// import {likePost} from "../controllers/getRecipePosts.js";

// const router = express.Router();

// router.get("/getall", Recipes);
// router.post("/postrecipe",authenticateUser,PostRecipe)
// router.get("/getrecipepost",authenticateUser,getUserRecipes)
// router.get("/getuserposts/:userId",getRecipesByUserId)
// router.get("/getallposts",authenticateUser,getAllPosts)
// router.get("/getfollowingposts",authenticateUser,getFollowingPosts)
// router.get("/like",authenticateUser,likePost)

// export default router;



import express from "express";
import Recipes from "../controllers/recipes.js";
import PostRecipe from "../controllers/postRecipe.js";
import {
  getUserRecipes,
  getRecipesByUserId,
  getAllPosts,
  getFollowingPosts,
  likePost,
} from "../controllers/getRecipePosts.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/getall", Recipes);

// Protected routes
router.post("/postrecipe", authenticateUser, PostRecipe);
router.get("/getrecipepost", authenticateUser, getUserRecipes);
router.get("/getuserposts/:userId", authenticateUser, getRecipesByUserId);
router.get("/getallposts", authenticateUser, getAllPosts);
router.get("/getfollowingposts", authenticateUser, getFollowingPosts);
router.put("/like/:postId", authenticateUser, likePost); 

export default router;

