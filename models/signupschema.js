import mongoose from 'mongoose';
const {Schema}=mongoose;

const SignUpSchema = new Schema({
  name: {
    type: String,
    required:true,
    trim:true,
  },
   email: {
    type: String,
    required:true,
    unique:true,
    match:[/^\S+@\S+\.\S+$/, "Please use a valid email address."]
  },
   password: {
    type:String,
    required:true,
    minlength:6,
  },
  // followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  // following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SignUpSchema' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SignUpSchema' }]
});

export default mongoose.models.signup || mongoose.model('signup', SignUpSchema);
