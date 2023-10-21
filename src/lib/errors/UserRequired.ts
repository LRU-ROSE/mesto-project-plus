export default class UserRequired extends Error {
  constructor(message = "Bad Request: User is required") {
    super(message);
    this.name = "BadRequest";
    this.statusCode = 400;
  }
}