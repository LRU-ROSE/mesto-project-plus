import { Response, NextFunction } from "express";
import { UserRequest } from "@/lib/userRequest";
import HTTPCode from "@/lib/codes";
import { DocumentNotFound, DocumentType } from "@/lib/errors/DocumentNotFound";
import Card, { CardType } from "../models/card";

export const getAllCards = async (
  _req: UserRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cards = await Card.find({}).populate(["owner", "likes"]);
    res.json(cards);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const createCard = async (
  req: UserRequest<Pick<CardType, "name" | "link">>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?._id;
    const { name, link } = req.body;
    const card = await Card.create({ owner: userId, name, link });
    res.status(HTTPCode.DOC_CREATED).json(card);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteCard = async (
  req: UserRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndRemove(cardId)
      .orFail(() => new DocumentNotFound(DocumentType.Card))
      .populate(["owner", "likes"]);
    res.json(card);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const likeCard = async (
  req: UserRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?._id;
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      {
        returnDocument: "after",
      },
    )
      .orFail(() => new DocumentNotFound(DocumentType.Card))
      .populate(["owner", "likes"]);
    res.json(card);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const dislikeCard = async (
  req: UserRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?._id;
    const { cardId } = req.params;
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      {
        returnDocument: "after",
      },
    )
      .orFail(() => new DocumentNotFound(DocumentType.Card))
      .populate(["owner", "likes"]);
    res.json(card);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
