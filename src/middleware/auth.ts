import config from "@/lib/config";
import UserRequired from "@/lib/errors/UserRequired";
import { UserData, UserRequest } from "@/lib/userRequest";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (
  req: UserRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new UserRequired();
    }

    const token = authorization.replace("Bearer ", "");

    try {
      req.user = jwt.verify(token, config.JWT_SECRET) as UserData;
    } catch (err) {
      throw new UserRequired();
    }

    next();
  } catch (e) {
    next(e);
  }
};

export default authMiddleware;
