import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { config } from "dotenv";
import connectDatabase from "./config/db.js";
import { notFound, errorHandler } from "./middleware.js";
import bodyParser from "body-parser";
import messageRouter from "./routes/message-route.js";
import userRouter from "./routes/users-route.js";

config();
connectDatabase();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(cors("*"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.json({
      message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
    });
});
app.use("/users", userRouter);
app.use("/message", messageRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
