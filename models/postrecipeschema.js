import mongoose from 'mongoose';
import SignUpSchema from "../models/signupschema.js";
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
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'signup',
    required: true
  },
  likes: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'signup'
    }],
});

export default mongoose.models.recipePost || mongoose.model('recipePost', RecipeSchema);
