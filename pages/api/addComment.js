import { addCommentByPost } from "../../db/actions/Comment";

function handler(req, res) {
  addComment(req, res);
}

async function addComment(req, res) {
  const newPost = await addCommentByPost(JSON.parse(req.body));
  res.status(200).json(newPost);
}

export default handler;
