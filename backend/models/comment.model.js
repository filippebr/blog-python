import mongoose, { Schema } from "mongoose"

const commentSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  img: {
    type: String,
  },
  savedPosts: {
    type: [String],
    default: [],
  }
},{timestamps: true})

export default mongoose.model("Comment", commentSchema)