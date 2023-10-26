import { Response } from "express";
import { UserRequest } from "@/lib/userRequest";
import HTTPCode from "@/lib/codes";
import Forbidden from "@/lib/errors/Forbidden";
import { NotFound, DocumentType } from "@/lib/errors/NotFound";
import Card, { CardType } from "../models/card";

export const getAllCards = async (_req: UserRequest, res: Response) => {
  const cards = await Card.find({})
    .populate("owner", "_id")
    .populate("likes", "_id");
  res.json(cards);
};

export const createCard = async (
  req: UserRequest<Pick<CardType, "name" | "link">>,
  res: Response,
) => {
  const userId = req.user?._id;
  const { name, link } = req.body;
  const card = await Card.create({ owner: userId, name, link });
  res.status(HTTPCode.DOC_CREATED).json(card);
};

export const deleteCard = async (req: UserRequest, res: Response) => {
  const userId = req.user?._id;
  const { cardId } = req.params;
  const card = await Card.findById(cardId)
    .orFail(() => new NotFound(DocumentType.Card))
    .populate("owner", "_id")
    .populate("likes", "_id");
  if (card.owner._id.toHexString() !== userId) {
    throw new Forbidden();
  }
  await Card.findByIdAndDelete(cardId).orFail(
    () => new NotFound(DocumentType.Card),
  );
  res.json(card);
};

export const likeCard = async (req: UserRequest, res: Response) => {
  const userId = req.user?._id;
  const { cardId } = req.params;
  const card = await Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    {
      returnDocument: "after",
    },
  )
    .orFail(() => new NotFound(DocumentType.Card))
    .populate("owner", "_id")
    .populate("likes", "_id");
  res.json(card);
};

export const dislikeCard = async (req: UserRequest, res: Response) => {
  const userId = req.user?._id;
  const { cardId } = req.params;
  const card = await Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    {
      returnDocument: "after",
    },
  )
    .orFail(() => new NotFound(DocumentType.Card))
    .populate("owner", "_id")
    .populate("likes", "_id");
  res.json(card);
};
