import { boolean, bytea, foreignKey, integer, pgTable, text, timestamp, uuid, type AnyPgColumn } from "drizzle-orm/pg-core";
import { user } from "./auth-schema.js";

export const DirectoryEntity = pgTable("directory_entity", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  isRoot: boolean().notNull().default(false),
  name: text("name").notNull(),
  parentId: uuid("parent_id").references((): AnyPgColumn => DirectoryEntity.id, { onDelete: "cascade" }),
  isTrash: boolean("is_trash").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  modifiedAt: timestamp("modified_at").notNull().defaultNow()
});