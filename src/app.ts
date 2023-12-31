import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { Joi, Segments, celebrate } from "celebrate";
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
import { fixValidationError } from "./lib/errors/replaceValidationError";

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.use(requestLoggerMiddleware);
app.use("/users", authMiddleware, usersRouter);
app.use("/cards", authMiddleware, cardsRouter);

const validateLogin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
app.post("/signin", fixValidationError(validateLogin), login);

const validatecCeateNewUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
    avatar: Joi.string().required().uri(),
    password: Joi.string().required(),
  }),
});
app.post("/signup", fixValidationError(validatecCeateNewUser), createNewUser);

app.use(notFound);
app.use(errorLoggerMiddleware);
app.use(ErrorHandler);

const main = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

  app.listen(PORT);
};

main().catch((e) => errorLogger.error("Ошибка при запуске программы", e));
