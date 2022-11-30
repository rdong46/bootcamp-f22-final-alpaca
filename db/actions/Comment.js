import Comment from "../models/Comment";
import dbConnect from "../dbConnect";
import { findPostById } from "./Post";

async function findCommentsByPost(id) {
  await dbConnect();
  const test = await findPostById(id);
  const comments = await Comment.find({}).sort({ date: -1 });
  const commentIds = comments.map((c) => c["_id"].toString());
  const postComment = [];
  const output = { _id: "", title: "", body: "", comments: [], date: "" };
  for (let i = 0; i < test.comments.length; i++) {
    postComment.push(comments[commentIds.indexOf(test.comments[i].toString())]);
  }
  output._id = test._id;
  output.title = test.title;
  output.body = test.body;
  output.comments = postComment;
  output.date = test.date;
  return output;
}

export { findCommentsByPost };
