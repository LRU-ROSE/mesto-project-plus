import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from "@/controllers/cards";
import idValidator from "@/lib/validators";

const validateCardId = celebrate({
  [Segments.QUERY]: {
    cardId: idValidator,
  },
});

const cardsRouter = Router();
cardsRouter.get("/", getAllCards);

const validateCreateCard = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    link: Joi.string().required().uri(),
  }),
});
cardsRouter.post("/", validateCreateCard, createCard);

cardsRouter.delete("/:cardId", validateCardId, deleteCard);
cardsRouter.put("/:cardId/likes", validateCardId, likeCard);
cardsRouter.delete("/:cardId/likes", validateCardId, dislikeCard);

export default cardsRouter;
