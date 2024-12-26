import { Schema, Types, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  numberOfQuestion: [
    {
      type: Types.ObjectId,
      ref: "Question",
    },
  ],
  role: {
    type: Number,
    default: 0,
  },
});

const User = model("User", userSchema);

export default User;
