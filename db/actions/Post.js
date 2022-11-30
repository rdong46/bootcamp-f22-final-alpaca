import Post from "../models/Post";
import dbConnect from "../dbConnect";

/* 
  The following Post model action is given to you.
  You will have to await dbConnect() at the start of every action
   to access the database.
*/

async function findAllPosts() {
  await dbConnect();
  return await Post.find({}).sort({ date: -1 });
}

async function findPostById(id) {
  await dbConnect();
  return await Post.findById(id);
}

async function deletePostById(id) {
  await dbConnect();
  return await Post.findByIdAndDelete(id);
}

async function updatePostById(id, change) {
  await dbConnect();
  return await Post.findByIdAndUpdate(id, change);
}

async function createPost(body) {
  await dbConnect();
  try {
    return await Post.create(body);
  } catch (err) {
    console.log(err);
  }
}

export { findAllPosts, findPostById, createPost, deletePostById, updatePostById};
