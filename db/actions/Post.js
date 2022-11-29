import Post from "../models/Post";
import dbConnect from "../dbConnect";

/* 
  The following Post model action is given to you.
  You will have to await dbConnect() at the start of every action
   to access the database.
*/

async function findAllPosts() {
  await dbConnect();
  return await Post.find({});
}

async function findPostById(id) {
  await dbConnect();
  return await Post.findById(id);
}

export { findAllPosts, findPostById };
