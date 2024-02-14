import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, "secret" || process.env.SECRET_TOKEN_KEY, { expiresIn: "1d" });
};

//Register User
export const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Please fill in all required fields" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    }

    // Check if user email already exists
    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ error: "Email has already been registered" });
    }

    // Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword, // save hashed password
    });

    const user = await newUser.save();
    res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (err) {
    console.error("Error in user registration:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login User

export const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate Request
    if (!email || !password) {
      res.status(400);
      throw new Error("Please add email and password");
    }

    // Check if user exists
    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(400);
      throw new Error("User not found, please signup");
    }

    // User exists, check if password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    //   Generate Token
    const token = generateToken(user._id);

    if (user && passwordIsCorrect) {
      const { _id, name, email } = user;

      res
        .cookie("token", token, {
          path: "/",
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 86400),
          sameSite: "none",
          secure: true,
        })
        .status(200)
        .json({
          message: "Logged In Successfully",
          _id,
          name,
          email,
          token,
        });
    } else {
      return res.status(400).json({ error: "Invalid Email or Password" });
    }
  } catch (err) {
    console.error("Error in user Login:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Logout User
export const LogOut = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Successfully Logged Out" });
});
