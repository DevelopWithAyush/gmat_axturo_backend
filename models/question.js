import { Schema, model } from "mongoose";

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  correctAnswer: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
});
export const Question = model("Question", questionSchema);
