import { deletePostById } from "../../db/actions/Post";

function handler(req, res) {
  deletePost(req, res);
}

async function deletePost(req, res) {
  const post = deletePostById(req.body);
  res.status(200).json(post);
}

export default handler;
