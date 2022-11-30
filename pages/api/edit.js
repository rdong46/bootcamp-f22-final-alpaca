import { updatePostById } from "../../db/actions/Post";

function handler(req, res) {
  updatePost(req, res);
}

async function updatePost(req, res) {
  const post = updatePostById(JSON.parse(req.body));
  res.status(200).json(post);
}

export default handler;
