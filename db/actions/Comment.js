import Comment from "../models/Comment";
import dbConnect from "../dbConnect";
import { findPostById, updatePostById } from "./Post";

async function findCommentsByPost(post) {
  await dbConnect();
  const output = await Comment.find({ _id: { $in: post.comments } }).sort({
    date: -1,
  });
  return output;
}

async function addCommentByPost(body) {
  await dbConnect();
  const post = await findPostById(body.id);
  const comment = await Comment.create(body.content);
  post.comments.push(comment);
  await updatePostById(body.id, post);
  return comment;
}

async function deleteComments(deleted) {
  await dbConnect();
  await Comment.deleteMany({ _id: { $in: deleted.comments } });
}

export { findCommentsByPost, addCommentByPost, deleteComments };
