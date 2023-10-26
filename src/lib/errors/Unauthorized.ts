export default class Unauthorized extends Error {
  constructor() {
    super("Необходима авторизация");
  }
}
