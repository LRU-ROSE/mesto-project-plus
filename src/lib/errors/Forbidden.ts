import HTTPCode from "../codes";

export default class Forbidden extends Error {
  statusCode: HTTPCode = HTTPCode.FORBIDDEN;

  constructor() {
    super("Доступ запрещён");
  }
}
