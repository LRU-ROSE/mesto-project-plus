import mongoose from "mongoose";
import { DocumentNotFound, DocumentType } from "./errors/DocumentNotFound";

// Функция необходима чтобы при запросах вроде /cards/12345 возвращалась
// ошибка "не найдено", а не ошибка валидации (потому что 12345 не является валидным id.)
const checkId = (id: string | undefined, type: DocumentType): string => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw new DocumentNotFound(type);
  }
  return id;
};

export default checkId;
