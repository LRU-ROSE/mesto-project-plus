import mongoose, { Schema } from "mongoose";
import isEmail from "validator/lib/isEmail";
import isURL from "validator/lib/isURL";

export type UserType = {
  email: string;
  password: string;
  name: string;
  about: string;
  avatar: string;
};

const userSchema = new Schema<UserType>({
  email: { type: String, required: true, unique: true, validate: isEmail },
  password: { type: String, required: true, select: false },
  name: { type: String, minlength: 2, maxlength: 30, default: "Жак-Ив Кусто" },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: "Исследователь",
  },
  avatar: {
    type: String,
    validate: isURL,
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  },
});

export default mongoose.model<UserType>("user", userSchema);
