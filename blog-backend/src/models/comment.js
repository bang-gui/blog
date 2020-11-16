import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema({
  post: { type: mongoose.Types.ObjectId, ref: 'Post', required: true },
  author: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: [true, 'text is required!'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

// model & export
const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;