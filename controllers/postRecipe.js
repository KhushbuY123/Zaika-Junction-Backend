import RecipeSchema from '../models/postrecipeschema.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const {
        TranslatedRecipeName,
        TranslatedIngredients,
        TotalTimeInMins,
        Cuisine,
        TranslatedInstructions,
        Description,
        CleanedIngredients,
        imageurl,
        IngredientCount,
        createdBy
      } = req.body;
      const recipe = new RecipeSchema({
        TranslatedRecipeName,
        TranslatedIngredients,
        TotalTimeInMins,
        Cuisine,
        TranslatedInstructions,
        Description,
        CleanedIngredients,
        imageurl,
        IngredientCount,
        createdBy: req.userId,
      });

      await recipe.save();
    //   res.status(201).json({ success: true});
      res.status(201).json({ message: 'Recipe created successfully' });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Invalid data' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}



