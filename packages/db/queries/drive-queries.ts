import { user } from "../schemas/auth-schema.js";
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
    const filesInDir = await selectAllFilesInDir(userId, newFile.dirId);
    const fileExists = filesInDir?.find((file) => file.name === newFile.name);

    // TODO: Return that there was a collision
    if (fileExists) return;

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
    const dirExists = await selectDirByName(userId, parentId, name);
    // TODO: Return that there was a collision
    if (dirExists) return;

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

export const selectFileByName = async (
  userId: UserIdType,
  dirId: FileEntityType["dirId"],
  name: FileEntityType["name"]
) => {
  try {
    if (!dirId || !name) return;

    const file = await db.select()
      .from(FileEntity)
      .where(and(
        eq(FileEntity.userId, userId),
        eq(FileEntity.dirId, dirId),
        eq(FileEntity.name, name)
      ))
      .limit(1);

    if (file[0]) return file[0];
    return;
  } catch (error) {
    throw error;
  }
};

export const selectAllFilesInDir = async (
  userId: UserIdType,
  dirId: FileEntityType["dirId"]
) => {
  try {
    if (!dirId) return;

    const files = await db.select()
      .from(FileEntity)
      .where(and(
        eq(FileEntity.userId, userId),
        eq(FileEntity.dirId, dirId)
      ));
    console.log(files);

    return files;
  } catch (error) {
    throw error;
  }
};

export const selectDirById = async (
  userId: UserIdType,
  id: DirectoryEntityType["id"]
) => {
  try {
    if (!id) return;
    const dir = await db.select()
      .from(DirectoryEntity)
      .where(and(
        eq(DirectoryEntity.userId, userId),
        eq(DirectoryEntity.id, id)
      ));

    return dir[0];
  } catch (error) {
    throw error;
  }
};

export const selectDirByName = async (
  userId: UserIdType,
  parentId: DirectoryEntityType["parentId"],
  dirName: DirectoryEntityType["name"]
) => {
  try {
    const dir = await db.select()
      .from(DirectoryEntity)
      .where(and(
        eq(DirectoryEntity.userId, userId),
        eq(DirectoryEntity.parentId, parentId ?? ""),
        eq(DirectoryEntity.name, dirName)
      ));

    return (dir.length > 0) ? dir[0] : null;
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

export const selectAllDirsInDir = async (
  userId: UserIdType,
  id: DirectoryEntityType["id"]
) => {
  try {
    if (!id) return;

    const subDirs = await db.select()
      .from(DirectoryEntity)
      .where(and(
        eq(DirectoryEntity.userId, userId),
        eq(DirectoryEntity.parentId, id)
      ));

    return subDirs;
  } catch (error) {
    throw error;
  }
};

export const updateFileMove = async (
  userId: UserIdType,
  id: FileEntityType["id"],
  dirTo: DirectoryEntityType["id"]
) => {
  try {
    if (!id) return;

    const updatedDir = await db.update(FileEntity)
      .set({ dirId: dirTo })
      .where(and(
        eq(FileEntity.userId, userId),
        eq(FileEntity.id, id)
      ))
      .returning({ id: FileEntity.dirId });

    if (updatedDir[0] && updatedDir[0].id === dirTo) return updatedDir[0];

    return;
  } catch (error) {
    throw error;
  }
};