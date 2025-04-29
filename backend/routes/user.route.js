import express from 'express'
import { getUserSavedPosts, savePost } from '../controllers/user.controller.js'

const router = express.Router()

router.get("/saved", getUserSavedPosts)
router.patch("/save", savePost)

export default router

// import { requireAuth } from '@clerk/express'; // ← this is what you need
// import express from 'express'
// import { getUserSavedPosts, savePost } from '../controllers/user.controller.js'

// const router = express.Router()

// router.get("/saved", requireAuth(), getUserSavedPosts)
// router.patch("/save", requireAuth(), savePost)

// export default router