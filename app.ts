import express from "express"
import cors from "cors"
import comments from "./routes/comments"

const app = express()
const port = process.env.PORT || 3333

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("welcome")
})

app.use("/api/comments", comments)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})