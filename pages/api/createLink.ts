// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../utils/connection";
type SuccessResponse = {
  full: string;
  clicks: number;
  short: string;
  date: Date;
};

type ErrorResponse = {
  error: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  const handleResponse = async (req: NextApiRequest, res: NextApiResponse) => {
    const { ShortLink } = await connect(); // connect to database
    try {
      const fullData = await ShortLink.create(req.body);
      res.json({ short: fullData.short });
    } catch (error) {
      res.status(400).json({ error });
    }
  };
  if (req.method === "POST") {
    handleResponse(req, res);
  } else {
    res.status(400).json({ error: "Invalid Request" });
  }
}
