import SignUpSchema from "../models/signupschema.js";
import bcrypt from "bcrypt";

const Signup=async(req,res)=>{
    const {name,email,password}=req.body;
    if (!name|| !email || !password){
        return res.status(400).json({error:'All fields are required.'})
    }
    try {
        const existUser=await SignUpSchema.findOne({email:email});
        if (existUser){
            return res.status(400).json({error:'User already exists.'});
        }
       const hashedPassword = await bcrypt.hash(password, 10);
       const newUser=new SignUpSchema({name,email,password:hashedPassword});
       const savedUser=await newUser.save();
       console.log(savedUser)
       return res.status(201).json({message:'User signed up successfully !',user:savedUser})
    }catch(error){
      return res.status(500).json({error:'Server error. Please try again later'})
    }
}

export default Signup;