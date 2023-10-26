import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from "@/controllers/cards";

const cardsRouter = Router();
cardsRouter.get("/", getAllCards);

const validateCreateCard = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    link: Joi.string().required().uri(),
  }),
});
cardsRouter.post("/", validateCreateCard, createCard);

cardsRouter.delete("/:cardId", deleteCard);
cardsRouter.put("/:cardId/likes", likeCard);
cardsRouter.delete("/:cardId/likes", dislikeCard);

export default cardsRouter;
