import { Schema, model } from "mongoose";

// Model to store user's answers and score
const testResultSchema = new Schema({
  paperId: {
    type: Schema.Types.ObjectId,
    ref: "Paper", // Links the result to a specific paper
    required: true,
  },
  userAnswers: [
    {
      questionId: {
        type: Schema.Types.ObjectId,
        ref: "Question", // Links to the specific question
      },
      selectedAnswer: {
        type: String, // Stores the user's selected answer
        required: true,
      },
    },
  ],
  score: {
    type: Number, // Stores the final score after submission
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const TestResult = model("TestResult", testResultSchema);
