import signupschema from "../models/signupschema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET="yourSuperSecretKey"
// const JWT_EXPIRES_IN=7
export const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required." });
  }

  try {
    const user = await signupschema.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials. Please try again.",
      });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials. Please try again.",
      });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    return res.status(200).json({
      success: true,
      message: "Login successfully!",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Server error. Please try again later." });
  }
};


export const Signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const existUser = await signupschema.findOne({ email });
    if (existUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new signupschema({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET);

    return res
      .status(201)
      .json({ message: "User signed up successfully!", token, user: savedUser });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error. Please try again later" });
  }
};
