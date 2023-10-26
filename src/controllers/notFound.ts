import { DocumentType, NotFound } from "@/lib/errors/NotFound";

const notFound = async () => {
  throw new NotFound(DocumentType.Path);
};

export default notFound;
