import Post from "../models/post.model.js"
import User from "../models/user.model.js"

export const getPosts = async (req, res, next) => {
    const posts = await Post.find()
    res.status(200).json(posts)
}

export const getPost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug })
  res.status(200).json(post)
}

export const createPost = async (req, res) => {
  try {
    const clerkUserId = req.auth.userId
    console.log("Clerk User ID:", clerkUserId)
    console.log("Request Body:", req.body)

    if (!clerkUserId) {
      return res.status(401).json({ message: "Not authenticated!" })
    }

    const user = await User.findOne({ clerkUserId })
    console.log("Found User:", user)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const newPost = new Post({ user: user._id, ...req.body })
    console.log("New Post Data:", newPost)
    const post = await newPost.save()
    res.status(200).json(post)
  } catch (error) {
    console.error("Error:", error)
    if (error.code === 11000) {
      return res.status(400).json({ message: "Slug must be unique!" });
    }
    res.status(400).json({ message: error.message })
  }
};

export const deletePost = async (req, res) => {

  const clerkUserId = req.auth.userId

  if(!clerkUserId) {
    return res.status(401).json("Not authenticated!")
  }

  const user = User.findOne({clerkUserId})

  const post = await Post.findByIdAndDelete({
    _id: req.params.id, 
    user:user._id
  })

  res.status(200).json("Post has been deleted")
}