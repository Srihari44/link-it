import mongoose from "mongoose";
import { nanoid } from "nanoid";

const { DATABASE_URL } = process.env;

export const connect = async () => {
  const conn = await mongoose
    .connect(DATABASE_URL as string)
    .catch((err) => console.log(err));

  const ShortLinkSchema = new mongoose.Schema({
    full: {
      type: String,
      required: true,
    },
    short: {
      type: String,
      default: () => nanoid(7),
    },
    clicks: {
      type: Number,
      default: 0,
    },
    date: { type: Date, default: Date.now },
  });

  const ShortLink =
    mongoose.models.ShortLinks || mongoose.model("ShortLinks", ShortLinkSchema);

  return { conn, ShortLink };
};
