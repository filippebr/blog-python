import User from "../models/user.model.js"

export const getUserSavedPosts = async (req, res) => {
  const clerkUserId = req.auth.userId

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!")
  }

  const user = await User.findOne({ clerkUserId })

  if (!user) {
    return res.status(404).json("User not found in database!")
  }

  res.status(200).json(user.savedPosts || [])
}

// export const getUserSavedPosts = async (req, res) => {
//   const clerkUserId = req.auth.userId // Clerk-provided
//   console.log("User found:", clerkUserId)

//   if (!clerkUserId) return res.status(401).json({ message: "Unauthorized" })

//   const user = await User.findOne({ clerkUserId }).populate("saved")
//   if (!user) return res.status(404).json({ message: "User not found" })

//   res.status(200).json(user.save.map(post => post._id))
// }

export const savePost = async(req, res) => {

  const clerkUserId = req.auth.userId
  const postId = req.body.postId

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!")
  }

  const user = await User.findOne({ clerkUserId })
  if (!user) {
    return res.status(404).json("User not found in database!")
  }

  const isSaved = user.savedPosts.some((p) => p === postId)

  if (!isSaved) {
    await User.findByIdAndUpdate(user._id, {
      $push: { savedPosts: postId },
    })
  } else {
    await User.findByIdAndUpdate(user._id, {
      $pull: { savedPosts: postId },
    })
  }

  // setTimeout(() => {
  res.status(200).json(isSaved ? "Post unsaved" : "Post saved")
  // }, 3000)
} 