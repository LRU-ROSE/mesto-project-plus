export default class Forbidden extends Error {
  constructor() {
    super("Доступ запрещён");
  }
}
