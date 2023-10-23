import { Request, Response, NextFunction } from "express";
import { UserRequest } from "@/lib/userRequest";
import HTTPCode from "@/lib/codes";
import { DocumentNotFound, DocumentType } from "@/lib/errors/DocumentNotFound";
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
    console.error(error);
    next(error);
  }
};

export const getUser = async (
  req: UserRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?._id;
    const user = await User.findById(userId).orFail(
      () => new DocumentNotFound(DocumentType.User),
    );
    res.json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const createNewUser = async (
  req: Request<unknown, UserType, UserType>,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.body);
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    res.status(HTTPCode.DOC_CREATED).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

async function updateInfo(
  req: UserRequest<any>,
  data: Partial<UserType>,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user?._id;
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
    }).orFail(() => new DocumentNotFound(DocumentType.User));
    res.json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export const updateUserInfo = async (
  req: UserRequest<Pick<UserType, "name" | "about">>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, about } = req.body;
    await updateInfo(req, { name, about }, res, next); // добавлен аргумент next
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const updateAvatar = async (
  req: UserRequest<Pick<UserType, "avatar">>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { avatar } = req.body;
    await updateInfo(req, { avatar }, res, next); // добавлен аргумент next
  } catch (error) {
    console.error(error);
    next(error);
  }
};
