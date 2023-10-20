import mongoose, { ObjectId, Schema, Types } from "mongoose";

export type CardType = {
  name: string;
  link: string;
  owner: Types.ObjectId;
  likes: Types.Array<Types.ObjectId>;
  createdAt: Date;
};

const cardSchema = new Schema<CardType>({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  link: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'user', },
  likes: { type: [Schema.Types.ObjectId], ref: 'user', default: [] },
  createdAt: { type: Schema.Types.Date, default: () => Date.now() },
});

export default mongoose.model<CardType>('card', cardSchema);