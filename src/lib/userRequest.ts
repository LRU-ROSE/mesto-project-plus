import { Request } from "express";

export type UserData = {
  _id: string;
};

export interface UserRequest<T = never> extends Request {
  user?: UserData;
  body: T;
}
