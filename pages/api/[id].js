import { findPostById } from "../../db/actions/Post";

function handler(req, res) {
  getById(req, res);
}

async function getById(req, res) {
  const { id } = req.query;
  const post = await findPostById(id);
  res.status(200).json(post);
}

export default handler;
