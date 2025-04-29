// import express from 'express'
// import { getUserSavedPosts, savePost } from '../controllers/user.controller.js'

// const router = express.Router()

// router.get("/saved", getUserSavedPosts)
// router.patch("/save", savePost)

// export default router

import express from 'express'
import { getUserSavedPosts, savePost } from '../controllers/user.controller.js'

const router = express.Router()

// router.get("/saved", requireAuth(), getUserSavedPosts)
// router.patch("/save", requireAuth(), savePost)
router.get("/saved", getUserSavedPosts)
router.patch("/save", savePost)

export default router