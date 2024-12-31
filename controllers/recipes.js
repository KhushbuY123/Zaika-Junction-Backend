import RecipeSchema from "../models/recipeschema.js";

const Recipes=async(req,res)=>{
  try{
    const users=await RecipeSchema.find({}).limit(4);
    return res.status(200).json(users);
  }catch(error){
   res.status(400).json({error:"Failed to get users",err})
  }
}
export default Recipes
  