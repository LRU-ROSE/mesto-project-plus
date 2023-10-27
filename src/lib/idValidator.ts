import { Joi } from "celebrate";
import mongoose from "mongoose";

const idValidator = Joi.string()
  .required()
  .custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error("any.invalid");
    }
    return value;
  });

export default idValidator;
