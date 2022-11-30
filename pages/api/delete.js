import { deletePostById } from "../../db/actions/Post";

function handler(req, res) {
  deletePost(req, res);
}

async function deletePost(req, res) {
  deletePostById(req.body);
}

export default handler;