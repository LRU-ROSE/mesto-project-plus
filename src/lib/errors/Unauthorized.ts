import HTTPCode from "../codes";

export default class Unauthorized extends Error {
  statusCode: HTTPCode = HTTPCode.UNAUTHORIZED;

  constructor() {
    super("Необходима авторизация");
  }
}
