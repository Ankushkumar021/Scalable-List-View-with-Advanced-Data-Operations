import express from "express";
import cors from "cors";
import jobsRouter from "./routes/jobs.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobsRouter);

export default app;
