import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: String,
  body: {
    type: String,
    required: true,
  },
  comments: {
    type: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    required: true,
  },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Post || mongoose.model("Post", postSchema);
