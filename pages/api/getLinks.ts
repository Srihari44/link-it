import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../utils/connection";
type SuccessResponse = Array<{
  full: string;
  clicks: number;
  short: string;
  date: Date;
}>;

type ErrorResponse = {
  error: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  const handleResponse = async (req: NextApiRequest, res: NextApiResponse) => {
    const { ShortLink } = await connect(); // connect to database
    res.json(
      await ShortLink.find(
        {},
        { full: 1, short: 1, date: 1, clicks: 1, _id: 0 }
      ).catch((error: string) => res.status(400).json({ error }))
    );
  };
  if (req.method === "GET") {
    handleResponse(req, res);
  } else {
    res.status(400).json({ error: "Invalid Request" });
  }
}
