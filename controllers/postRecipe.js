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
        URL,
        CleanedIngredients,
        imageurl,
        IngredientCount,
      } = req.body;

      const recipe = new RecipeSchema({
        TranslatedRecipeName,
        TranslatedIngredients,
        TotalTimeInMins,
        Cuisine,
        TranslatedInstructions,
        URL,
        CleanedIngredients,
        imageurl,
        IngredientCount,
      });

      await recipe.save();
    //   res.status(201).json({ success: true});
      res.status(201).json({ message: 'Recipe created successfully' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: false, message: 'Invalid data' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
