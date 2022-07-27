import { SchemaTypes } from "mongoose";
import { nanoid } from "nanoid";
const { LINK_TIMEOUT_DURATION } = process.env;

export const ShortLinkModel = {
  full: {
    type: SchemaTypes.String,
    required: true,
  },
  short: {
    type: SchemaTypes.String,
    default: () => nanoid(7),
    unique: true,
  },
  clicks: {
    type: SchemaTypes.Number,
    default: 0,
  },
  expire_at: {
    type: SchemaTypes.Date,
    default: () => {
      const date = new Date();
      const timeOutInSeconds = parseInt(LINK_TIMEOUT_DURATION as string);
      date.setSeconds(date.getSeconds() + timeOutInSeconds);
      return date;
    },
    expires: 0,
  },
};
