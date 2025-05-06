import RecipeSchema from '../models/postrecipeschema.js';

const getUserRecipes = async (req, res) => {
  try {
    const userId = req.userId;

    const recipes = await RecipeSchema.find({ createdBy: userId });

    res.status(200).json({ success: true, recipes });
  } catch (error) {
    console.error("Error fetching user's recipes:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export default getUserRecipes;
