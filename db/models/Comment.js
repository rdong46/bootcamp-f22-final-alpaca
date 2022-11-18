import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Comment ||
  mongoose.model("Comment", commentSchema);
