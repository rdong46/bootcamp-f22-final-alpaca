import { findPostById } from "../../db/actions/Post";

function handler(req, res) {
  getById(req, res);
}

async function getById(req, res) {
  const post = await findPostById(req.body);
  res.status(200).json(post);
}

export default handler;
