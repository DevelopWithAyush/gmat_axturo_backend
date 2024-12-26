import { Question } from "../models/question.js";
import { Paper } from "../models/paper.js";
import { TestResult } from "../models/TestResult.js";
import { ErrorHandler, TryCatch } from "../utilty/utility.js";
import { cookie } from "express-validator";

// Start Test: Generate a paper with 30 random questions (without selected answers)
export const startTest = TryCatch(async (req, res, next) => {
  // Log user details for debugging
  console.log(req.user);

  const userId = req.user; // Extract user ID from the decoded token

  // Get 30 random questions from the database
  const questions = await Question.aggregate([{ $sample: { size: 8 } }]);

  // Create a new paper and store questionId without the selectedAnswer
  const newPaper = await Paper.create({
    questions: questions.map((q) => ({ questionId: q._id })), // Only store questionId
    user: userId, // Associate the paper with the user
  });

  return res.status(200).json({
    success: true,
    message: "Test started successfully",
    paperId: newPaper._id, // Send back the paper ID for the frontend
    questions: questions, // Send back the questions (optional, for the frontend to display)
  });
});

// Submit Test: Compare user's answers with the correct ones and calculate the score
export const submitTest = TryCatch(async (req, res, next) => {
  console.log(req.user);
  const { id } = req.params; // Get paperId from URL parameter
  console.log(id);

  // Find the paper by its ID and populate the questions with their details
  const paper = await Paper.findById(id).populate("questions.questionId");

  if (!paper) {
    return next(new ErrorHandler("Paper not found", 404));
  }

  // Calculate score
  let score = 0;

  // Loop through the questions in the paper and compare selected answers with correct answers
  paper.questions.forEach((question) => {
    // Access the selected answer from the paper directly
    const selectedAnswer = question.selectedAnswer;

    // Compare the selected answer with the correct answer
    if (
      selectedAnswer &&
      question.questionId.correctAnswer === selectedAnswer
    ) {
      score += 1; // Increment score if the answer is correct
    }
  });

  // Save the test result with the user's answers and score
  const testResult = await TestResult.create({
    paperId: paper._id,
    score,
  });

  // Return the test result response
  return res.status(200).json({
    success: true,
    message: "Test submitted successfully",
    score,
    testResult,
  });
});


// Controller to update the selected answer for a question in the paper
export const updateAnswer = async (req, res, next) => {
  const { paperId, questionId, selectedAnswer } = req.params;

  try {
    // Find the paper by paperId
    const paper = await Paper.findById(paperId);

    if (!paper) {
      return next(new ErrorHandler("Paper not found", 404));
    }

    // Find the question in the paper and update the selectedAnswer
    const question = paper.questions.find(
      (q) => q.questionId.toString() === questionId
    );

    if (!question) {
      return next(new ErrorHandler("Question not found in the paper", 404));
    }

    // Update the selected answer
    question.selectedAnswer = selectedAnswer;

    // Save the paper with the updated answer
    await paper.save();

    return res.status(200).json({
      success: true,
      message: "Answer updated successfully",
    });
  } catch (error) {
    return next(new ErrorHandler("Error updating answer", 500));
  }
};