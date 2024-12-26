import { Schema, model } from "mongoose";

// Paper schema that holds a set of questions
const paperSchema = new Schema({
  questions: [
    {
      questionId: {
        type: Schema.Types.ObjectId,
        ref: "Question", // Links to the specific question
      },
      selectedAnswer: {
        type: String, // Stores the user's selected answer
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Ensure it links to the correct user schema
    required: true, // Make it mandatory to associate a paper with a user
  },
});

export const Paper = model("Paper", paperSchema);
