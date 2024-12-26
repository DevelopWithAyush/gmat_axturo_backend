import express from "express";
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} from "../controller/questions.js";
import { adminAuthenticated, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication middleware
router.use(isAuthenticated);

// Get all questions
router.get("/", getAllQuestions);

// Get question by ID
router.get("/:id", getQuestionById);

// Create a new question (admin only)
router.post("/", adminAuthenticated, createQuestion);

// Update a question (admin only)
router.put("/:id", adminAuthenticated, updateQuestion);

// Delete a question (admin only)
router.delete("/:id", adminAuthenticated, deleteQuestion);

export default router;
