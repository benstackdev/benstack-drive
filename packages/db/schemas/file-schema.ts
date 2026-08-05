import { boolean, bytea, integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth-schema.js";

export const FileEntity = pgTable("file_entity", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  data: bytea("data").notNull(),
  name: text("name").notNull(),
  path: text("path").notNull().default("/"),
  level: integer("level").notNull().default(1),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  modifiedAt: timestamp("modified_at").notNull().defaultNow(),
  isDirectory: boolean("is_directory").notNull().default(false),
  isStarred: boolean("is_starred").default(false),
  isTrash: boolean("is_trash").default(false)
});