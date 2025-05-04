import mongoose from 'mongoose';
const {Schema}=mongoose;

const RecipeSchema = new Schema({
    TranslatedRecipeName: {
    type: String,
  },
  TranslatedIngredients: {
    type: [String],
  },
  TotalTimeInMins: {
    type:Number,
  },
  Cuisine:{
    type:String,
  },
  TranslatedInstructions:{
    type:String,
  },
  URL:{
    type:String,
  },
  CleanedIngredients:{
    type:String,
    alias:'Cleaned-Ingredients'
  },
  imageurl:{
   type:String,
   alias:'image-url' 
  },
  IngredientCount:{
    type:Number,
    alias:'Ingredient-count'
  },
});

export default mongoose.models.recipePost || mongoose.model('recipePost', RecipeSchema);
