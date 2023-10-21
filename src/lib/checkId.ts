import mongoose from "mongoose";
import { DocumentType, DocumentNotFound } from "./errors/DocumentNotFound";

const checkId = (id: string | undefined, type: DocumentType): string => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw new DocumentNotFound(type);
  }
  return id;
};

export default checkId;