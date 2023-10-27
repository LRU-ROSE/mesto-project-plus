import config from "@/lib/config";
import Unauthorized from "@/lib/errors/Unauthorized";
import { UserData, UserRequest } from "@/lib/userRequest";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = async (
  req: UserRequest,
  _res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new Unauthorized();
  }

  const token = authorization.replace("Bearer ", "");

  try {
    req.user = jwt.verify(token, config.JWT_SECRET) as UserData;
  } catch (err) {
    next(new Unauthorized());
    return;
  }
  next();
};

export default authMiddleware;
