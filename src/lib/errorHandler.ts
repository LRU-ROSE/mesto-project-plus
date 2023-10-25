import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import HTTPCode from "./codes";
import { DocumentNotFound } from "./errors/DocumentNotFound";
import InvalidUser from "./errors/InvalidUser";

const ErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof DocumentNotFound) {
    return res.status(HTTPCode.NOT_FOUND).json({
      message: err.message,
    });
  }
  if (err instanceof InvalidUser) {
    return res.status(HTTPCode.UNAUTHORIZED).json({
      message: "Необходима авторизация",
    });
  }

  if (
    err instanceof mongoose.Error.CastError ||
    err instanceof mongoose.Error.ValidationError
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
