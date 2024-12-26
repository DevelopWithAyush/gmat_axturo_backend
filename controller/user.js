import { validationResult } from "express-validator";
import { TryCatch } from "../utilty/utility.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { cookieOption, sendToken } from "../utilty/features.js";

export const handleLogin = TryCatch(async (req, res, next) => {
  // Validate request data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorHandler("Invalid request data", 400));
  }

  const { email, name, avatar } = req.body;

  // Check if the user already exists
  let user = await User.findOne({ email });

  if (!user) {
    // Register new user
    user = await User.create({
      name,
      email,
      avatar,
    });
  } else {
    // Update the name and avatar for existing user
    user = await User.findOneAndUpdate(
      { email },
      { name, avatar },
      { new: true }
    );
  }

  sendToken(res, user, 201, `Login successfully`);
});

export const handleLogout = TryCatch(async (req, res, next) => {
  return res
    .status(200)
    .cookie("authToken", "", { ...cookieOption, maxAge: 0 })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

export const handleMyProfile = TryCatch(async (req, res, next) => {
  const myProfile = await User.findById(req.user);
  res.status(200).json({ success: true, myProfile });
});