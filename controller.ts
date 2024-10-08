import { Request, Response } from "express";
import { comments, db, users } from "./connect";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export async function createComment(req: Request, res: Response) {
  const { username, content } = req.body;
  const now = new Date();
  const timestamp = now.toISOString();
  try {
    await db
      .insert(comments)
      .values({ username, content, created_at: timestamp });
    res
      .status(201)
      .json({ success: true, message: "comment created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error creating comment" });
  }
}

export async function getComments(req: Request, res: Response) {
  try {
    const commmentsQuery = await db.select().from(comments);
    res.status(201).json(commmentsQuery);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error getting comments" });
  }
}

export async function deleteComment(req: Request, res: Response) {
  const { comment_id } = req.body;
  const deleteMessage = "This message was deleted";
  try {
    await db
      .update(comments)
      .set({ content: deleteMessage })
      .where(eq(comments.comment_id, comment_id));
    res
      .status(201)
      .json({ success: true, message: "comment deleted successfully" });
  } catch (err) {}
}

export async function editComment(req: Request, res: Response) {
  const { comment_id } = req.body;
  const newMessage = req.body.content;
  try {
    await db
      .update(comments)
      .set({ content: newMessage })
      .where(eq(comments.comment_id, comment_id));
    res
      .status(201)
      .json({ success: true, message: "comment edited successfully" });
  } catch (err) {}
}

export async function createUser(req: Request, res: Response) {
  const { username, email, password } = req.body;
  const now = new Date();
  const timestamp = now.toISOString();

  try {
    await db
      .insert(users)
      .values({ username, email, password, created_at: timestamp });
    res
      .status(201)
      .send({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error creating user" });
  }
}

export async function validateUser(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const queryResult = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    const user = queryResult[0];
    if (!user) return res.json({ result: { user: null, token: null } });
    if (user.password == password) {
      const token = jwt.sign(
        { id: user.user_id },
        process.env.JWT_SECRET || "default_secret",
        { expiresIn: "2 days" }
      );
      return res.json({ result: { user, token } });
    } else {
      return res.json({ result: { user: null, token: null } });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}

export async function decryptToken(req: Request, res: Response) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(403).send("Header does not exist");
      return "";
    }
    const token = authHeader.split(" ")[1];
    const decodedUser = jwt.verify(token, "default_secret");
    //@ts-ignore
    // const response = await db
    //   .select()
    //   .from(users)
    //   .where(eq(users.user_id, decodedUser.id));
    // const user = response[0];
    // res.json({ result: { user, token } });
  } catch (err) {
    res.status(401).json({ err });
  }
}
