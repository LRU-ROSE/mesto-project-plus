import mongoose, { Schema } from "mongoose";

export type UserType = {
  name: string;
  about: string;
  avatar: string;
};

const userSchema = new Schema<UserType>({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  about: { type: String, required: true, minlength: 2, maxlength: 200 },
  avatar: { type: String, required: true },
});

export default mongoose.model<UserType>("user", userSchema);
