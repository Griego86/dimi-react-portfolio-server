import pg from "pg"
import {drizzle} from "drizzle-orm/node-postgres"

import {pgTable, serial, varchar } from "drizzle-orm/pg-core"

const Pool = pg.Pool

const connectionString = "postgresql://postgres:VJqlenFwVZAhkeRzvdhnjuMzKULyANNO@viaduct.proxy.rlwy.net:36627/railway"

export const pool = new Pool(
  {
    connectionString
  }
)

export const db = drizzle(pool)

export const comments = pgTable("comments", {
  comment_id: serial("comment_id").primaryKey(),
  username: varchar("username"),
  content: varchar("content"),
  created_at: varchar("created_at")
})

export const users = pgTable("users", {
  user_id: serial("user_id").primaryKey(),
  username: varchar("username"),
  email: varchar("email"),
  password: varchar("password"),
  created_at: varchar("created_at")
})