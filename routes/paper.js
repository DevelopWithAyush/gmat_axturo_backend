import express from "express";
import { startTest, submitTest, updateAnswer } from "../controller/paper.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// Route to start the test
router.use(isAuthenticated);
router.post("/start", startTest);

// Route to submit the test and calculate score
router.use(isAuthenticated);
router.post("/submit/:id", submitTest);

// Route to update the answer for a specific question in a paper
router.use(isAuthenticated);
router.post("/updateAnswer/:paperId/:questionId/:selectedAnswer", updateAnswer);

export default router;
