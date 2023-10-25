import { Router } from "express";
import {
  getAllUsers,
  getUser,
  updateAvatar,
  updateUserInfo,
} from "@/controllers/users";

const usersRouter = Router();
usersRouter.get("/", getAllUsers);
usersRouter.get("/:userId", getUser);
usersRouter.patch("/me", updateUserInfo);
usersRouter.patch("/me/avatar", updateAvatar);

export default usersRouter;
