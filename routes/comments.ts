import express from "express"
import { createComment, getComments } from "../controller"
const comments = express.Router()

comments.route("/").post(createComment).get(getComments)
comments.route("/:comment_id").post()

export default comments