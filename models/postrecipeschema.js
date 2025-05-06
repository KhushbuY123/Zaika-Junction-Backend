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
    type:[String],
  },
  TranslatedInstructions:{
    type:String,
  },
  Description:{
    type:String,
  },
  CleanedIngredients:{
    type:String,
  },
  imageurl:{
   type:String,
  },
  IngredientCount:{
    type:Number,
    // alias:'Ingredient-count'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SignUpSchema',
    required: true
  }
});

export default mongoose.models.recipePost || mongoose.model('recipePost', RecipeSchema);
