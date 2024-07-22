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
  user_id: serial("user_id").primaryKey(),
  username: varchar("username"),
  content: varchar("content")
})