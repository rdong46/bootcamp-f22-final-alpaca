import Post from "../models/Post";
import dbConnect from "../dbConnect";
import { deleteComments, findCommentsByPost } from "./Comment";

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
  const test = await Post.findOne({ _id: id });
  const comments = await findCommentsByPost(test);
  const output = { _id: "", title: "", body: "", comments: [], date: "" };
  output._id = test._id;
  output.title = test.title;
  output.body = test.body;
  output.comments = comments;
  output.date = test.date;
  console.log(output);
  return output;
}

async function deletePostById(id) {
  await dbConnect();
  let deleted = await Post.findByIdAndDelete(id);
  await deleteComments(deleted);
  return deleted;
}

async function updatePostById(body) {
  await dbConnect();
  return await Post.findByIdAndUpdate(body.id, body.change);
}

async function updatePostWithComments(id, body) {
  await dbConnect();
  return await Post.findByIdAndUpdate(id, body);
}

async function createPost(body) {
  await dbConnect();
  const test = await Post.create(body);
  return test;
}

export {
  findAllPosts,
  findPostById,
  createPost,
  deletePostById,
  updatePostById,
  updatePostWithComments,
};
