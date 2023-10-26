import HTTPCode from "../codes";

export default class StatusError extends Error {
  statusCode: HTTPCode;

  constructor(message: string, statusCode: HTTPCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
