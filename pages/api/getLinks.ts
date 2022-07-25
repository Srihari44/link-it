import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../utils/connection";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const handleResponse = async (
    req: NextApiRequest,
    res: NextApiResponse,
    promiseHandler: { resolve: Function; reject: Function }
  ) => {
    const { ShortLink } = await connect();
    try {
      const fullData = await ShortLink.find(
        {},
        { full: 1, short: 1, expire_at: 1, clicks: 1, _id: 0 }
      );
      res.json(fullData);
      promiseHandler.resolve(true);
    } catch (error) {
      res.status(400).json({ error });
      promiseHandler.reject(error);
    }
  };
  return new Promise((resolve, reject) => {
    if (req.method === "GET") {
      handleResponse(req, res, { resolve, reject });
    } else {
      res.status(400).json({ error: "Invalid Request" });
      resolve(true);
    }
  });
}
