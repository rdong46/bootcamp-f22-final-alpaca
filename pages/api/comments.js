import { findCommentsByPost } from "../../db/actions/Comment";

function handler(req, res) {
  findComments(req, res);
}

async function findComments(req, res) {
  const newPost = await findCommentsByPost(req.body);
  res.status(200).json(newPost);
}

export default handler;
