import Post from "../models/post.model.js"

export const getPosts = async (req, res) => {
  const posts = await Post.find()
  res.status(200).json(posts)
}