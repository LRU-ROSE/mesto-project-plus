import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from "@/controllers/cards";
import { fixValidationError } from "@/lib/errors/replaceValidationError";
import idValidator from "@/lib/idValidator";

const validateCardId = celebrate({
  [Segments.PARAMS]: {
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
cardsRouter.post("/", fixValidationError(validateCreateCard), createCard);

cardsRouter.delete("/:cardId", fixValidationError(validateCardId), deleteCard);
cardsRouter.put("/:cardId/likes", fixValidationError(validateCardId), likeCard);
cardsRouter.delete(
  "/:cardId/likes",
  fixValidationError(validateCardId),
  dislikeCard,
);

export default cardsRouter;
