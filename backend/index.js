import { clerkMiddleware } from '@clerk/express'
import express from "express"
import connectDB from "./lib/connectDB.js"
import commentRouter from "./routes/comment.route.js"
import postRouter from "./routes/post.route.js"
import userRouter from "./routes/user.route.js"
import webhookRouter from "./routes/webhook.route.js"

const app = express()

app.use(clerkMiddleware())
app.use(express.json())
app.use("/webhooks", webhookRouter)

// app.get("/auth-state", (req, res) => {
//   const authState = req.auth
//   res.json(authState)
// })

// app.get("/protect", (req, res) => {
//   const {userId} = req.auth
//   if(!userId) {
//     return res.status(401).json("not authenticated")
//   }
//   res.status(200).json("content")
// })

// app.get("/protect2", requireAuth(), (req, res) => {
  
//   res.status(200).json("content")
// })

app.use("/users", userRouter)
app.use("/posts", postRouter)
app.use("/comments", commentRouter)

app.use((error, req, res, next) => {

  res.status(error.status || 500)

  res.json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: error.stack,
  })
})

app.listen(3000, () => {
  connectDB()
  console.log("Server is running!")
})