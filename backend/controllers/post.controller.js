import ImageKit from "imagekit"
import Post from "../models/post.model.js"
import User from "../models/user.model.js"

export const getPosts = async (req, res) => {

  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 2

  const posts = await Post.find()
    .populate("user", "username")
    .limit(limit)
    .skip((page - 1) * limit)

  const totalPosts = await Post.countDocuments()
  const hasMore = page * limit < totalPosts

  res.status(200).json({ posts, hasMore })
}

export const getPost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug })
  res.status(200).json(post)
}

export const createPost = async (req, res) => {
  try {
    const clerkUserId = req.auth.userId

    if (!clerkUserId) {
      return res.status(401).json({ message: "Not authenticated!" })
    }

    const user = await User.findOne({ clerkUserId })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Store the base slug separately
    const baseSlug = req.body.title.replace(/ /g, "-").toLowerCase()
    let slug = baseSlug
    let counter = 2

    // Check if the slug already exists
    let existingPost = await Post.findOne({ slug })

    // If it exists, append a counter to the base slug until a unique one is found
    while (existingPost) {
      slug = `${baseSlug}-${counter}`
      existingPost = await Post.findOne({ slug })
      counter++
    }

    const newPost = new Post({ user: user._id, slug, ...req.body })

    const post = await newPost.save()
    res.status(200).json(post)
  } catch (error) {
    console.error("Error:", error)
    if (error.code === 11000) {
      return res.status(400).json({ message: "Slug must be unique!" })
    }
    res.status(400).json({ message: error.message })
  }
}

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

const imagekit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY
})

export const uploadAuth = async(req, res) => {
  const result = imagekit.getAuthenticationParameters()
  res.send(result)
}