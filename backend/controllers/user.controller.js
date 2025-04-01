import User from "../models/user.model.js"

export const getUserSavedPosts = async(req, res) => {
  const clerkId = req.auth.userId

  if (!clerkId) {
    return res.status(401).json("Not authenticated!")
  }

  const user = await User.findOne({ clerkUserId })

  res.status(200).json(user.savedPosts)
} 
export const savePost = async(req, res) => {} 