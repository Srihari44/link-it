import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../utils/connection";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const handleResponse = async (
    req: NextApiRequest,
    res: NextApiResponse,
    promiseHandler: { resolve: Function; reject: Function }
  ) => {
    const { linkId } = req.query;
    const { ShortLink } = await connect();
    try {
      const fullData = await ShortLink.findOneAndUpdate(
        { short: { $regex: linkId } },
        { $inc: { clicks: 1 } },
        { projection: { full: 1, _id: 0 } }
      );
      if (fullData && fullData.full) {
        res.json(fullData);
        promiseHandler.resolve(true);
      } else {
        res.status(404).json({ error: "Not found" });
        promiseHandler.resolve(true);
      }
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
