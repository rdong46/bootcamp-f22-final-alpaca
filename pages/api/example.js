/* 
  This API endpoint is an example for how to access the database 
  and call relevant db actions.
 */

import { findAllPosts } from "../../db/actions/Post";

function handler(req, res) {
  getAllPosts(req, res);
}

async function getAllPosts(req, res) {
  const posts = await findAllPosts();
  res.status(200).json(posts);
}

export default handler;
