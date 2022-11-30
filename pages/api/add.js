import { createPost } from "../../db/actions/Post";

function handler(req, res) {
  addPost(req, res);
}

async function addPost(req, res) {
  const newPost = await createPost(JSON.parse(req.body));
  res.status(200).json(newPost);
}

export default handler;
