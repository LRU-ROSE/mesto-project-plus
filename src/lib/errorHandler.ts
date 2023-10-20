import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import HTTPCode from "./codes";
import { DocumentNotFound } from "./errors/DocumentNotFound";

const ErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    // Код взят из хэлпа к express. https://expressjs.com/en/guide/error-handling.html#the-default-error-handler
    // Возражения посылайте в https://github.com/expressjs/express/issues (правда проект полумёртвый...)
    return next(err);
  }
  if (err instanceof DocumentNotFound) {
    return res.status(HTTPCode.NOT_FOUND).json({
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
