import { Response } from "express";
import Card, { CardType } from "../models/card";
import { UserRequest } from "@/lib/userRequest";
import HTTPCode from "@/lib/codes";
import { DocumentNotFound, DocumentType } from "@/lib/errors/DocumentNotFound";
import getUserId from "@/lib/getUser";
import checkId from "@/lib/checkId";

export const getAllCards = async (_req: UserRequest, res: Response) => {
  const cards = await Card.find({}).populate(["owner", "likes"]);
  res.json(cards);
};

export const createCard = async (
  req: UserRequest<Pick<CardType, "name" | "link">>,
  res: Response
) => {
  const userId = getUserId(req);
  const { name, link } = req.body;
  const card = await Card.create({ owner: userId, name, link });
  res.status(HTTPCode.DOC_CREATED).json(card);
};

export const deleteCard = async (req: UserRequest, res: Response) => {
  const _ = getUserId(req);
  const cardId = checkId(req.params.cardId, DocumentType.Card);
  const card = await Card.findByIdAndRemove(cardId)
    .orFail(() => new DocumentNotFound(DocumentType.Card))
    .populate(["owner", "likes"]);
  res.json(card);
};

export const likeCard = async (req: UserRequest, res: Response) => {
  const userId = getUserId(req);
  const cardId = checkId(req.params.cardId, DocumentType.Card);
  const card = await Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    {
      returnDocument: "after",
    }
  )
    .orFail(() => new DocumentNotFound(DocumentType.Card))
    .populate(["owner", "likes"]);
  res.json(card);
};

export const dislikeCard = async (req: UserRequest, res: Response) => {
  const userId = getUserId(req);
  const cardId = checkId(req.params.cardId, DocumentType.Card);
  const card = await Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    {
      returnDocument: "after",
      runValidators: true,
    }
  )
    .orFail(() => new DocumentNotFound(DocumentType.Card))
    .populate(["owner", "likes"]);
  res.json(card);
};
