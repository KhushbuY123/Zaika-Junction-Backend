import signupschema from "../models/signupschema.js";

export const FollowUser = async (req, res) => {
    try {
      const currentUserId = req.userId;
      const { targetUserId } = req.body;
  
      if (currentUserId === targetUserId) {
        return res.status(400).json({ success: false, message: "You can't follow yourself." });
      }
  
      // Add to following (if not already following)
      await signupschema.findByIdAndUpdate(currentUserId, {
        $addToSet: { following: targetUserId },
      });
  
      // Add to followers (if not already in there)
      await signupschema.findByIdAndUpdate(targetUserId, {
        $addToSet: { followers: currentUserId },
      });
  
      res.status(200).json({ success: true, message: 'Followed successfully.' });
    } catch (error) {
      console.error('Error following user:', error);
      res.status(500).json({ success: false, message: 'Server error.' });
    }
  };
  


export const UnfollowUser = async (req, res) => {
    try {
      const currentUserId = req.userId;
      const { targetUserId } = req.body;
  
      if (currentUserId === targetUserId) {
        return res.status(400).json({ success: false, message: "You can't unfollow yourself." });
      }
  
      // Remove from following
      await signupschema.findByIdAndUpdate(currentUserId, {
        $pull: { following: targetUserId },
      });
  
      // Remove from followers
      await signupschema.findByIdAndUpdate(targetUserId, {
        $pull: { followers: currentUserId },
      });
  
      res.status(200).json({ success: true, message: 'Unfollowed successfully.' });
    } catch (error) {
      console.error('Error unfollowing user:', error);
      res.status(500).json({ success: false, message: 'Server error.' });
    }
  };
  