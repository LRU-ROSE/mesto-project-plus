import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import { isCelebrateError } from "celebrate";
import HTTPCode from "./codes";
import Forbidden from "./errors/Forbidden";
import { NotFound } from "./errors/NotFound";
import Unauthorized from "./errors/Unauthorized";
import Conflict from "./errors/Conflict";

const ErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  // Если с ошибками опять что-то не так, можете прям подробно написать чего хотите вместо того
  // чтобы ехидничать что заканчиваются попытки?
  // А то проблема в том, что я не могу понять что от меня хотят.
  if (
    err instanceof Forbidden ||
    err instanceof NotFound ||
    err instanceof Unauthorized ||
    err instanceof Conflict
  ) {
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
