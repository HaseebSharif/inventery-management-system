import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import userModel from '../models/userModel.js';

//verify user
export const verifyUser = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, please login");
    }

    // Verify Token
    const verified = jwt.verify(token, 'secret' || process.env.SECRET_TOKEN_KEY);
    // Get user id from token
    const user = await userModel.findById(verified.id).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, please login");
  }
});