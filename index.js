import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.js";
import questionRouter from "./routes/questions.js";
import paperRouter from "./routes/paper.js";

import { errorMiddleware } from "./utilty/utility.js";
import { connectDB } from "./utilty/features.js";

config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: [process.env.REACT_URL],
    credentials: true,
  })
);
connectDB(process.env.MONGO_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/question", questionRouter);
app.use("/api/v1/paper", paperRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.use();

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`server listen on port ${PORT}`);
});
