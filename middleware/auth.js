import User from "../models/user.js";
import { ErrorHandler, TryCatch } from "../utilty/utility.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = TryCatch(async (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    return next(new ErrorHandler("Please login to access this route", 401));
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decode._id;
  next();
});

export const adminAuthenticated = TryCatch(async (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return next(new ErrorHandler("Please login to access this route", 401)); // 401 Unauthorized
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decode._id;

  const user = await User.findById(req.user);

  if (!user) {
    return next(new ErrorHandler("User not found", 404)); // Handle case where user is not found
  }

  if (user.role !== 1) {
    // Check if the user's role is admin (assuming 1 is admin)
    return next(new ErrorHandler("Access denied, admin only", 403)); // 403 Forbidden for non-admin users
  }

  next(); // Call next middleware if everything is fine
});
