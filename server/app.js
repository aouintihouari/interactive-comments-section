import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import commentsRouter from "./routes/comments.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/comments", commentsRouter);

export default app;
