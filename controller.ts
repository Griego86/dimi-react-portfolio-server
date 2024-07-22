import {Request, Response} from "express"
import { comments, db } from "./connect"

export async function createComment (req: Request, res: Response) {
  const {username, content} = req.body
  try {
    await db.insert(comments).values({username, content})
    res.status(201).json({success: true, message: "comment created successfully"})
  } catch (err) {
    console.log(err)
    res.status(500).json({success: false, message: "Error creating comment"})
  }
}

export async function getComments (req: Request, res: Response) {
  try {
    const commmentsQuery = await db.select({username: comments.username, content: comments.content}).from(comments)
    res.status(201).json(commmentsQuery)
  } catch (err) {
    console.log(err)
    res.status(500).json({success: false, message: "Error getting comments"})
  }
}