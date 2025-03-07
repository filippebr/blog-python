import express from "express"
import commentRouter from "./routes/comment.route.js"
import postRouter from "./routes/post.route.js"
import userRouter from "./routes/user.route.js"

const app = express()

// app.get("/test", (req, res) => {
//   res.status(200).send("it works!")
// })

app.use("/users", userRouter)
app.use("/posts", postRouter)
app.use("/comments", commentRouter)

app.listen(3000, () => {
  console.log("Server is running!")
})