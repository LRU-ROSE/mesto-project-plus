import { Request, Response, NextFunction } from "express";
import { UserRequest } from "@/lib/userRequest";
import HTTPCode from "@/lib/codes";
import { NotFound, DocumentType } from "@/lib/errors/NotFound";
import Conflict from "@/lib/errors/Conflict";
import replaceValidationError from "@/lib/errors/replaceValidationError";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import Unauthorized from "@/lib/errors/Unauthorized";
import config from "@/lib/config";
import User, { UserType } from "../models/user";

export const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(replaceValidationError(error));
  }
};

const getUserHelper = async (
  userId: string | undefined,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findById(userId).orFail(
      () => new NotFound(DocumentType.User),
    );
    res.json(user);
  } catch (error) {
    next(replaceValidationError(error));
  }
};

export const getUser = async (
  req: UserRequest,
  res: Response,
  next: NextFunction,
) => {
  getUserHelper(req.params.userId, res, next);
};

export const getMe = async (
  req: UserRequest,
  res: Response,
  next: NextFunction,
) => {
  getUserHelper(req.user?._id, res, next);
};

export const createNewUser = async (
  req: Request<unknown, UserType, UserType>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, about, avatar, email, password } = req.body;
    const hash = await argon2.hash(password, {
      secret: config.ARGON2_PEPPER,
    });
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    res.status(HTTPCode.DOC_CREATED).json({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    });
  } catch (error: any) {
    if (error.name === "MongoServerError" && error.code === 11000) {
      next(new Conflict("email уже существует"));
    } else {
      next(replaceValidationError(error));
    }
  }
};

async function updateInfo(
  req: UserRequest<any>,
  data: Partial<UserType>,
  res: Response,
  next: NextFunction,
) {
  const userId = req.user?._id;
  try {
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
    }).orFail(() => new NotFound(DocumentType.User));
    res.json(user);
  } catch (error) {
    next(replaceValidationError(error));
  }
}

export const updateUserInfo = async (
  req: UserRequest<Pick<UserType, "name" | "about">>,
  res: Response,
  next: NextFunction,
) => {
  const { name, about } = req.body;
  await updateInfo(req, { name, about }, res, next);
};

export const updateAvatar = async (
  req: UserRequest<Pick<UserType, "avatar">>,
  res: Response,
  next: NextFunction,
) => {
  const { avatar } = req.body;
  await updateInfo(req, { avatar }, res, next);
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email })
      .select("+password")
      .orFail(new Unauthorized());
    const passwordCorrect = await argon2.verify(user.password, password, {
      secret: config.ARGON2_PEPPER,
    });
    if (!passwordCorrect) {
      next(new Unauthorized());
    } else {
      const token = jwt.sign(
        {
          _id: user._id.toString(),
        },
        config.JWT_SECRET,
        {
          expiresIn: config.JWT_EXPIRATION_TIME,
        },
      );

      res
        .status(HTTPCode.DOC_CREATED)
        .cookie("jwt", token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send();
    }
  } catch (error) {
    next(replaceValidationError(error));
  }
};
