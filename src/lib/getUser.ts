import mongoose from "mongoose";
import { UserRequest } from "./userRequest";
import UserRequired from "./errors/UserRequired";

// Функция необходима чтобы при запросах c неправильным id пользователя возвращалась
// (в будущем) ошибка 401, а не ошибка валидации
const getUserId = (req: UserRequest<any>): string => {
  if (!req.user?._id || !mongoose.Types.ObjectId.isValid(req.user._id)) {
    throw new UserRequired();
  }
  return req.user._id;
};

export default getUserId;
