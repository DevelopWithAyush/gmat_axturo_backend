import { Question } from "../models/question.js";
import { validationResult } from "express-validator";
import { ErrorHandler } from "../utilty/utility.js";

// Function to handle POST request (create a new question)
export const createQuestion = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorHandler("Invalid request data", 400));
  }

  const { question, options, correctAnswer, solution } = req.body;
  const newQuestion = await Question.create({
    question,
    options,
    correctAnswer,
    solution,
  });

  return res.status(201).json({
    success: true,
    message: "Question created successfully",
    data: newQuestion,
  });
};

// Function to handle GET request (get all questions)
export const getAllQuestions = async (req, res, next) => {
  const questions = await Question.find();
  return res.status(200).json({
    success: true,
    data: questions,
  });
};

// Function to handle GET request to get a question by its ID
export const getQuestionById = async (req, res, next) => {
  const { id } = req.params;

  const question = await Question.findById(id);

  if (!question) {
    return next(new ErrorHandler("Question not found", 404));
  }

  return res.status(200).json({
    success: true,
    data: question,
  });
};

// Function to handle PUT request (update an existing question)
export const updateQuestion = async (req, res, next) => {
  const { id } = req.params;
  const { question, options, correctAnswer, solution } = req.body;

  const updatedQuestion = await Question.findByIdAndUpdate(
    id,
    { question, options, correctAnswer, solution },
    { new: true, runValidators: true }
  );

  if (!updatedQuestion) {
    return next(new ErrorHandler("Question not found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Question updated successfully",
    data: updatedQuestion,
  });
};

// Function to handle DELETE request (delete a question)
export const deleteQuestion = async (req, res, next) => {
  const { id } = req.params;
  const deletedQuestion = await Question.findByIdAndDelete(id);

  if (!deletedQuestion) {
    return next(new ErrorHandler("Question not found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "Question deleted successfully",
  });
};
