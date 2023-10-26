import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import HTTPCode from "./codes";
import { NotFound } from "./errors/NotFound";
import Unauthorized from "./errors/Unauthorized";
import Forbidden from "./errors/Forbidden";

const ErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof NotFound) {
    return res.status(HTTPCode.NOT_FOUND).json({
      message: err.message,
    });
  }
  if (err instanceof Unauthorized) {
    return res.status(HTTPCode.UNAUTHORIZED).json({
      message: err.message,
    });
  }
  if (err instanceof Forbidden) {
    return res.status(HTTPCode.FORBIDDEN).json({
      message: err.message,
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
