import { updatePostById } from "../../db/actions/Post";

function handler(req, res) {
  updatePost(req, res);
}

async function updatePost(req, res) {
  updatePostById(req.body.id, req.body.change);
}

export default handler;