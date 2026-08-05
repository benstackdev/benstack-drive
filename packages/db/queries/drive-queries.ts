import type { user } from "../schemas/auth-schema.js";
import { db } from "../client.js";
import { FileEntity } from "../schemas/file-schema.js";
import { eq, and } from "drizzle-orm/pg-core/expressions";

type UserType = typeof user.$inferInsert;
type UserIdType = UserType["id"];
type FileEntityType = typeof FileEntity.$inferInsert;
type NewFileType = {
  data: FileEntityType["data"],
  name: FileEntityType["name"],
  path: FileEntityType["path"],
  isDirectory: FileEntityType["isDirectory"],
};

export const insertNewFile = async (
  userId: UserIdType,
  newFile: NewFileType
) => {
  try {
    const file = await db.insert(FileEntity).values({
      userId,
      data: newFile.data,
      name: newFile.name,
      path: newFile.path,
      isDirectory: newFile.isDirectory
    }).returning();

    return file;
  } catch (error) {
    throw error;
  }
};

export const selectFile = async (
  userId: UserIdType,
  path: FileEntityType["path"],
  name: FileEntityType["name"]
) => {
  try {
    if (!path) return;

    const readFile = await db.select()
      .from(FileEntity)
      .where(and(
        eq(FileEntity.userId, userId),
        eq(FileEntity.path, path),
        eq(FileEntity.name, name)
      ));
    console.log(readFile);

    return readFile[0];
  } catch (error) {
    throw error;
  }
};