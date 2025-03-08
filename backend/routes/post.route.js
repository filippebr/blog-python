import express from 'express'
import { createPost, getPost, getPosts } from '../controllers/post.controller.js'

const router = express.Router()

router.get("/", getPosts)
router.get("/:slug", getPost)
router.post("/", createPost)

export default router