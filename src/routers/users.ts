import { Router } from "express";
import { Joi, Segments, celebrate } from "celebrate";
import {
  getAllUsers,
  getMe,
  getUser,
  updateAvatar,
  updateUserInfo,
} from "@/controllers/users";
import { fixValidationError } from "@/lib/errors/replaceValidationError";
import idValidator from "@/lib/idValidator";

const validateUserId = celebrate({
  [Segments.PARAMS]: {
    userId: idValidator,
  },
});

const usersRouter = Router();
usersRouter.get("/", getAllUsers);
usersRouter.get("/me", getMe);
usersRouter.get("/:userId", fixValidationError(validateUserId), getUser);

const validateUpdateUserInfo = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
  }),
});
usersRouter.patch(
  "/me",
  fixValidationError(validateUpdateUserInfo),
  updateUserInfo,
);

const validateUpdateAvatar = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
});
usersRouter.patch(
  "/me/avatar",
  fixValidationError(validateUpdateAvatar),
  updateAvatar,
);

export default usersRouter;
