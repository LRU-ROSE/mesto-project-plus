import HTTPCode from "../codes";
import StatusError from "./StatusError";

export default class Forbidden extends StatusError {
  constructor() {
    super("Доступ запрещён", HTTPCode.FORBIDDEN);
  }
}
