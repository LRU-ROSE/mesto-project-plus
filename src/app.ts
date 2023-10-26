import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { errorLogger } from "./lib/logger";
import notFound from "./controllers/notFound";
import { createNewUser, login } from "./controllers/users";
import authMiddleware from "./middleware/auth";
import {
  errorLoggerMiddleware,
  requestLoggerMiddleware,
} from "./middleware/logger";
import ErrorHandler from "./lib/errorHandler";
import usersRouter from "./routers/users";
import cardsRouter from "./routers/cards";

// Зависимость tsconfig-paths используется в команде dev:
// "dev": "ts-node-dev -r tsconfig-paths/register src/app.ts",
// Потому видимо и не помечается как "используемая", так-как в самом коде её нет.

const PORT = 3200;

const app = express();
app.use(cors());
app.use(express.json());

app.use(requestLoggerMiddleware);
app.use("/users", authMiddleware, usersRouter);
app.use("/cards", authMiddleware, cardsRouter);
app.post("/signin", login);
app.post("/signup", createNewUser);
app.use(notFound);
app.use(errorLoggerMiddleware);
app.use(ErrorHandler);

const main = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

  app.listen(PORT);
};

main().catch((e) => errorLogger.error("Ошибка при запуске программы", e));
