import mongoose from "mongoose";
import { ShortLinkModel } from "./model";
const { DATABASE_URL } = process.env;

export const connect = async () => {
  const conn = await mongoose
    .connect(DATABASE_URL as string)
    .catch((err) => console.log(err));

  const ShortLinkSchema = new mongoose.Schema(ShortLinkModel);
  ShortLinkSchema.index({ expire_at: 1 }, { expireAfterSeconds: 0 });
  const ShortLink =
    mongoose.models.ShortLinks || mongoose.model("ShortLinks", ShortLinkSchema);

  return { conn, ShortLink };
};
