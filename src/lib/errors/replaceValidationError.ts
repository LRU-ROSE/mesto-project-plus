import { isCelebrateError } from "celebrate";
import mongoose from "mongoose";
import type { RequestHandler } from "express";
import BadRequest from "./BadRequest";

const replaceValidationError = <T>(data: T): T | BadRequest => {
  if (
    data instanceof mongoose.Error.CastError ||
    data instanceof mongoose.Error.ValidationError ||
    isCelebrateError(data)
  ) {
    return new BadRequest(data.message);
  }
  return data;
};

export const fixValidationError =
  <T1, T2, T3, T4, T5 extends Record<string, any>>(
    handler: RequestHandler<T1, T2, T3, T4, T5>,
  ): RequestHandler<T1, T2, T3, T4, T5> =>
  (req, res, next) => {
    handler(req, res, (e) => {
      next(replaceValidationError(e));
    });
  };

export default replaceValidationError;
