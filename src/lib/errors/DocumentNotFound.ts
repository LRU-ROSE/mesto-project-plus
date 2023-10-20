export const enum DocumentType {
  User,
  Card,
}

export class DocumentNotFound extends Error {
  constructor(type: DocumentType) {
    switch (type) {
      case DocumentType.User:
        super("Запрошенный пользователь не найден");
        break;
      case DocumentType.Card:
        super("Запрошенная карточка не найдена");
        break;
      default:
        throw new Error("unreachable");
    }
  }
}
