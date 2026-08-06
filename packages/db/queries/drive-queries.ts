import type { user } from "../schemas/auth-schema.js";
import { db } from "../client.js";
import { FileEntity } from "../schemas/file-schema.js";
import { eq, and } from "drizzle-orm/pg-core/expressions";
import { DirectoryEntity } from "../schemas/directory-schema.js";

type UserType = typeof user.$inferInsert;
type UserIdType = UserType["id"];

type FileEntityType = typeof FileEntity.$inferInsert;
type NewFileType = {
  data: FileEntityType["data"],
  name: FileEntityType["name"],
  path: FileEntityType["path"],
  dirId: FileEntityType["dirId"],
};

type DirectoryEntityType = typeof DirectoryEntity.$inferInsert;

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
      dirId: newFile.dirId
    }).returning();

    return file;
  } catch (error) {
    throw error;
  }
};

export const insertNewDir = async (
  userId: UserIdType,
  isRoot: boolean = false,
  parentId: DirectoryEntityType["parentId"],
  name: DirectoryEntityType["name"]
) => {
  try {
    const dir = await db.insert(DirectoryEntity).values({
      userId,
      isRoot,
      parentId,
      name
    }).returning();

    return dir;
  } catch (error) {
    throw error;
  }
};

export const selectFile = async (
  userId: UserIdType,
  dirId: FileEntityType["id"]
) => {
  try {
    if (!dirId) return;

    const files = await db.select()
      .from(FileEntity)
      .where(and(
        eq(FileEntity.userId, userId),
        eq(FileEntity.id, dirId)
      ));
    console.log(files);

    return files;
  } catch (error) {
    throw error;
  }
};

export const selectRootDir = async (userId: UserIdType) => {
  try {
    const rootDir = await db.select()
      .from(DirectoryEntity)
      .where(and(
        eq(DirectoryEntity.userId, userId),
        eq(DirectoryEntity.isRoot, true)
      ));

    return (rootDir.length > 0) ? rootDir : null;
  } catch (error) {
    throw error;
  }
};