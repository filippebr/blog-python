import express from 'express'
import { getPost, getPosts } from '../controllers/post.controller.js'

const router = express.Router()

router.get("/", getPosts)
router.get("/:slug", getPost)

export default router