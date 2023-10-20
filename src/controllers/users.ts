import { Request, Response } from "express";
import { UserRequest } from "@/lib/userRequest";
import HTTPCode from "@/lib/codes";
import { DocumentNotFound, DocumentType } from "@/lib/errors/DocumentNotFound";
import getUserId from "@/lib/getUser";
import User, { UserType } from "../models/user";

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await User.find({});
  res.json(users);
};

export const getUser = async (req: UserRequest, res: Response) => {
  const userId = getUserId(req);
  const user = await User.findById(userId).orFail(
    () => new DocumentNotFound(DocumentType.User),
  );
  res.json(user);
};

export const createNewUser = async (
  req: Request<unknown, UserType, UserType>,
  res: Response,
) => {
  console.log(req.body);
  const { name, about, avatar } = req.body;
  const user = await User.create({ name, about, avatar });
  res.status(HTTPCode.DOC_CREATED).json(user);
};

async function updateInfo(
  req: UserRequest<any>,
  data: Partial<UserType>,
  res: Response,
) {
  const userId = getUserId(req);
  const user = await User.findByIdAndUpdate(userId, data, {
    returnDocument: "after",
  }).orFail(() => new DocumentNotFound(DocumentType.User));
  res.json(user);
}

export const updateUserInfo = async (
  req: UserRequest<Pick<UserType, "name" | "about">>,
  res: Response,
) => {
  const { name, about } = req.body;
  await updateInfo(req, { name, about }, res);
};

export const updateAvatar = async (
  req: UserRequest<Pick<UserType, "avatar">>,
  res: Response,
) => {
  const { avatar } = req.body;
  await updateInfo(req, { avatar }, res);
};
