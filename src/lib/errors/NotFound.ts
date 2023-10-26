import HTTPCode from "../codes";

export const enum DocumentType {
  User,
  Card,
  Path,
}

export class NotFound extends Error {
  statusCode: HTTPCode = HTTPCode.NOT_FOUND;

  constructor(type: DocumentType) {
    switch (type) {
      case DocumentType.User:
        super("Запрошенный пользователь не найден");
        break;
      case DocumentType.Card:
        super("Запрошенная карточка не найдена");
        break;
      case DocumentType.Path:
        super("Путь не существует");
        break;
      default:
        throw new Error("unreachable");
    }
  }
}
