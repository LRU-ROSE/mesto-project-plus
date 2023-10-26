import { Router } from "express";
import { Joi, Segments, celebrate } from "celebrate";
import {
  getAllUsers,
  getUser,
  updateAvatar,
  updateUserInfo,
} from "@/controllers/users";
import idValidator from "@/lib/validators";

export const validateUserId = celebrate({
  [Segments.QUERY]: {
    cardId: idValidator,
  },
});

const usersRouter = Router();
usersRouter.get("/", getAllUsers);
usersRouter.get("/:userId", validateUserId, getUser);

const validateUpdateUserInfo = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
  }),
});
usersRouter.patch("/me", validateUpdateUserInfo, updateUserInfo);

const validateUpdateAvatar = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
});
usersRouter.patch("/me/avatar", validateUpdateAvatar, updateAvatar);

export default usersRouter;
