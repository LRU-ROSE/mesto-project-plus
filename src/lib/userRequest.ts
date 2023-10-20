import { Request } from "express";

export interface UserRequest<T = never> extends Request {
  user?: {
    _id: string;
  };
  body: T;
}
