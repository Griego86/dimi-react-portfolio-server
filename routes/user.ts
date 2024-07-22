import express from "express"
import { validateUser } from "../controller"

const user = express.Router()

user.route("/login").post(validateUser)
user.route("/validation").post()

export default user