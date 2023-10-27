import { ErrorRequestHandler } from "express";
import HTTPCode from "./codes";

const ErrorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if ("statusCode" in err) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(HTTPCode.DEFAULT).json({
    message: `На сервере произошла ошибка ${err}`,
  });
};

export default ErrorHandler;
