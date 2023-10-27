import HTTPCode from "../codes";

export default class BadRequest extends Error {
  statusCode: HTTPCode = HTTPCode.BAD_REQUEST;

  constructor(message?: string) {
    super(`Переданы некорректные данные: ${message}`);
  }
}
