import Post from "../models/Post";
import dbConnect from "../dbConnect";
import { findCommentsByID } from "./Comment";

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
  await dbConenct();
  return await Post.findByIdAndDelete(id);
}

async function updatePostById(id, change) {
  await dbConnect();
  return await Post.findByIdAndUpdate();
}

async function createPost(body) {
  await dbConnect();
  const test = await Post.create(body);
  return test;
}

export { findAllPosts, findPostById, createPost };
