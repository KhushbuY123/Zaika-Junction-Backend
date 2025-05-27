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

// export const getFollowingPosts = async (req, res) => {
//   try {
//     const userId = req.userId;

//     if (!userId) {
//       return res.status(400).json({ success: false, message: 'User ID required' });
//     }

//     const user = await SignUpSchema.findById(userId);
//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     let posts;

//     if (user.following.length === 0) {
//       posts = await RecipeSchema.find();
//     } else {
//       posts = await RecipeSchema.find({
//         createdBy: { $in: user.following.map(id => new mongoose.Types.ObjectId(id)) }
//       });
//     }

//     // Fetch all relevant user data (name + followers)
//     const followedUsers = await SignUpSchema.find(
//       { _id: { $in: user.following } },
//       { name: 1, followers: 1 }
//     );

//     // Create a mapping: userId -> { name, followerCount }
//     const userIdToDetailsMap = {};
//     followedUsers.forEach(u => {
//       userIdToDetailsMap[u._id.toString()] = {
//         name: u.name,
//         followerCount: u.followers?.length || 0,
//       };
//     });

//     // Group posts by user name and add follower count
//     const groupedPosts = {};

//     posts.forEach(post => {
//       const creatorId = post.createdBy.toString();
//       const userDetails = userIdToDetailsMap[creatorId] || {
//         name: "Unknown User",
//         followerCount: 0,
//       };

//       if (!groupedPosts[userDetails.name]) {
//         groupedPosts[userDetails.name] = {
//           followerCount: userDetails.followerCount,
//           posts: [],
//         };
//       }

//       groupedPosts[userDetails.name].posts.push(post);
//     });

//     return res.status(200).json({ success: true, data: groupedPosts });

//   } catch (error) {
//     console.error("Error fetching following posts:", error);
//     return res.status(500).json({ success: false, message: 'Server error' });
//   }
// };




// export const likePost = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const postId = req.params.postId;

//     if (!userId || !postId) {
//       return res.status(400).json({ success: false, message: "User ID and Post ID required" });
//     }

//     const post = await RecipeSchema.findById(postId);
//     if (!post) {
//       return res.status(404).json({ success: false, message: "Post not found" });
//     }

//     const userIndex = post.likes.findIndex(id => id.toString() === userId);

//     if (userIndex === -1) {
//       // Not liked yet, add user ID
//       post.likes.push(userId);
//     } else {
//       // Already liked, remove user ID (toggle)
//       post.likes.splice(userIndex, 1);
//     }

//     await post.save();

//     // Populate updated likes
//     await post.populate("likes", "name");

//     return res.status(200).json({
//       success: true,
//       message: userIndex === -1 ? "Post liked" : "Post unliked",
//       likeCount: post.likes.length,
//       likes: post.likes
//     });

//   } catch (error) {
//     console.error("Error liking post:", error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };



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
      posts = await RecipeSchema.find().populate('likes', 'name');
    } else {
      posts = await RecipeSchema.find({
        createdBy: { $in: user.following.map(id => new mongoose.Types.ObjectId(id)) }
      }).populate('likes', 'name');
    }

    const followedUsers = await SignUpSchema.find(
      { _id: { $in: user.following } },
      { name: 1, followers: 1 }
    );

    const userIdToDetailsMap = {};
    followedUsers.forEach(u => {
      userIdToDetailsMap[u._id.toString()] = {
        name: u.name,
        followerCount: u.followers?.length || 0,
      };
    });

    const groupedPosts = {};

    posts.forEach(post => {
      const creatorId = post.createdBy.toString();
      const userDetails = userIdToDetailsMap[creatorId] || {
        name: "Unknown User",
        followerCount: 0,
      };

      const isLikedByCurrentUser = post.likes.some(likeUser => likeUser._id.toString() === userId);
      const likedByUserNames = post.likes.map(user => user.name);

      const postWithLikes = {
        ...post.toObject(),
        isLikedByCurrentUser,
        likedByUserNames,
      };

      if (!groupedPosts[userDetails.name]) {
        groupedPosts[userDetails.name] = {
          followerCount: userDetails.followerCount,
          posts: [],
        };
      }

      groupedPosts[userDetails.name].posts.push(postWithLikes);
    });

    return res.status(200).json({ success: true, data: groupedPosts });

  } catch (error) {
    console.error("Error fetching following posts:", error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};


export const likePost = async (req, res) => {
  const userId = req.userId;

  if (!userId) return res.status(400).json({ error: 'userId is required' });

  try {
    console.log(req.params.postId)
    const post = await RecipeSchema.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const hasLiked = post.likes.includes(userId);

    if (hasLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.status(200).json({ message: hasLiked ? 'Unliked' : 'Liked', likes: post.likes });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update like status' });
  }
};