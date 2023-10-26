import HTTPCode from "../codes";

export default class Conflict extends Error {
  statusCode: HTTPCode = HTTPCode.CONFLICT;

  constructor(message?: string) {
    super(message ?? "Ресурс уже существует");
  }
}
