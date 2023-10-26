import HTTPCode from "../codes";
import StatusError from "./StatusError";

export const enum DocumentType {
  User,
  Card,
  Path,
}

export class NotFound extends StatusError {
  constructor(type: DocumentType) {
    switch (type) {
      case DocumentType.User:
        super("Запрошенный пользователь не найден", HTTPCode.NOT_FOUND);
        break;
      case DocumentType.Card:
        super("Запрошенная карточка не найдена", HTTPCode.NOT_FOUND);
        break;
      case DocumentType.Path:
        super("Путь не существует", HTTPCode.NOT_FOUND);
        break;
      default:
        throw new Error("unreachable");
    }
  }
}
