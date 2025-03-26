import express from 'express'

const router = express.Router()

router.get("/:postId", getPostComments)
router.post("/:postId", addComment)
router.delete("/:id", deleteComment)

export default router