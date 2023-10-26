import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import { isCelebrateError } from "celebrate";
import HTTPCode from "./codes";
import StatusError from "./errors/StatusError";

const ErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof StatusError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  if (
    err instanceof mongoose.Error.CastError ||
    err instanceof mongoose.Error.ValidationError ||
    isCelebrateError(err)
  ) {
    return res.status(HTTPCode.BAD_REQUEST).json({
      message: `Переданы некорректные данные: ${err.message}`,
    });
  }

  return res.status(HTTPCode.DEFAULT).json({
    message: `На сервере произошла ошибка ${err}`,
  });
};

export default ErrorHandler;
