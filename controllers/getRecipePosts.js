import RecipeSchema from '../models/postrecipeschema.js';
import SignUpSchema from '../models/signupschema.js';
import mongoose from "mongoose";

export const getUserRecipes = async (req, res) => {
  try {
    const userId = req.userId;

    const recipes = await RecipeSchema.find({ createdBy: userId });

    res.status(200).json({ success: true, recipes });
  } catch (error) {
    console.error("Error fetching user's recipes:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// export default getUserRecipes;
export const getRecipesByUserId = async (req, res) => {
  try {
    const { userId } = req.params; // user ID sent in the URL

    const recipes = await RecipeSchema.find({ createdBy: userId });

    res.status(200).json({ success: true, recipes });
  } catch (error) {
    console.error("Error fetching user's recipes:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAllPosts = async(req, res) => {
  try {
    const posts = await RecipeSchema.find()
    console.log(posts)
    return res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

export const getFollowingPosts = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID required' });
    }

    const user = await SignUpSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let posts;

    if (user.following.length === 0) {
      // Show all posts if user is not following anyone
      posts = await RecipeSchema.find();
    } else {
      // Fetch only posts by followed users
      posts = await RecipeSchema.find({
        createdBy: { $in: user.following.map(id => new mongoose.Types.ObjectId(id)) }
      });
    }

    // Fetch names of all followed users
    const followedUsers = await SignUpSchema.find(
      { _id: { $in: user.following } },
      { name: 1 } // Only fetch names
    );

    // Create a mapping of userId -> name
    const userIdToNameMap = {};
    followedUsers.forEach(user => {
      userIdToNameMap[user._id.toString()] = user.name;
    });

    // Group posts by user name
    const groupedPosts = {};

    posts.forEach(post => {
      const creatorId = post.createdBy.toString();
      const name = userIdToNameMap[creatorId] || "Unknown User";

      if (!groupedPosts[name]) {
        groupedPosts[name] = [];
      }

      groupedPosts[name].push(post);
    });

    return res.status(200).json({ success: true, data: groupedPosts });

  } catch (error) {
    console.error("Error fetching following posts:", error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

