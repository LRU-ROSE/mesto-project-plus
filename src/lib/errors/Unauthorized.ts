import HTTPCode from "../codes";
import StatusError from "./StatusError";

export default class Unauthorized extends StatusError {
  constructor() {
    super("Необходима авторизация", HTTPCode.UNAUTHORIZED);
  }
}
