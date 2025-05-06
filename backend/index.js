import { clerkMiddleware } from '@clerk/express'
import express from "express"
import connectDB from "./lib/connectDB.js"
import commentRouter from "./routes/comment.route.js"
import postRouter from "./routes/post.route.js"
import userRouter from "./routes/user.route.js"
import webhookRouter from "./routes/webhook.route.js"

import cors from "cors"

const app = express()

// app.use(cors(process.env.CLIENT_URL))
app.use(cors({origin: process.env.CLIENT_URL, credentials: true}))

// app.use(clerkMiddleware())
app.use(clerkMiddleware((err, req, res, next) => {
  if (err) {
    console.error("Clerk middleware error:", err)
    return res.status(401).json({ message: "Authentication failed" })
  }
  next()
}))

app.use(express.json())
app.use("/webhooks", webhookRouter)

app.use("/users", userRouter)
app.use("/posts", postRouter)
app.use("/comments", commentRouter)

app.use((error, req, res, next) => {
  console.error("Global error:", error)
  res.status(error.status || 500).json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
  })
})

app.listen(3000, () => {
  connectDB()
  console.log("Server is running!")
})