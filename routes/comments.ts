import express from "express"
import { createComment, deleteComment, getComments } from "../controller"
const comments = express.Router()

comments.route("/").post(createComment).get(getComments)
comments.route("/:comment_id").post(deleteComment)

export default comments