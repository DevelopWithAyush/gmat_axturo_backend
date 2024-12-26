import express from "express";
import {
  handleLogin,
  handleLogout,
  handleMyProfile,
} from "../controller/user.js";
import { userValidationRules } from "../middleware/validations.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/", userValidationRules(), handleLogin);
router.use(isAuthenticated);
router.get("/logout", handleLogout);
router.get("/me", handleMyProfile);
export default router;
