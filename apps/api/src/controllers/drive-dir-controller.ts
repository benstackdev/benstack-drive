import type { Context } from "hono";
import { driveQuery } from "db";
import { HTTPException } from "hono/http-exception";
import { success } from "zod";
import { resolveDirDuplicateName } from "../utils/resolve-dir-duplicate-name.js";

export const driveDirRootGet = async (c: Context) => {
  const user = c.get("user");

  if (!user) {
    throw new HTTPException(401, { message: "Unauthorized request" });
  }

  const rootDir = await driveQuery.selectRootDir(user.id);

  if (rootDir && rootDir[0]) {
    return c.json({ success: true, data: rootDir[0].id });
  } else {
    return c.json({ success: false, message: `Could not fetch root directory for ${user.name}` });
  }
};

export const driveNewDirPost = async (c: Context) => {
  const body = await c.req.parseBody();
  const parentId = body['parent'];
  const name = body['name'];

  const user = c.get("user");

  if (!user) {
    throw new HTTPException(401, { message: "Unauthorized request" });
  }

  if (typeof parentId !== "string" || typeof name !== "string") {
    throw new HTTPException(400, { message: "Bad form data; parentId and name need to be strings." });
  }

  // Validate parent directory exists
  const parentDirExists = await driveQuery.selectDirById(user.id, parentId);

  if (!parentDirExists) {
    return c.json({ success: false, message: "Parent directory with given ID cannot be found." });
  }

  let newDirName = name;

  // Check for name collision
  const dirCollision = await driveQuery.selectDirByName(user.id, parentId, name);

  if (dirCollision) {
    newDirName = await resolveDirDuplicateName(name, user.id, parentId);
  }

  const newDir = await driveQuery.insertNewDir(user.id, false, parentId, newDirName);

  if (newDir) {
    return c.json({ success: true, data: newDir });
  } else {
    throw new HTTPException(500, { message: "Directory could not be created" });
  }
};

export const driveInitRootPost = async (c: Context) => {
  const user = c.get("user");
  if (!user) {
    throw new HTTPException(401, { message: "Unauthorized request" });
  }

  const rootDirExists = await driveQuery.selectRootDir(user.id);

  if (!rootDirExists) {
    const rootDir = await driveQuery.insertNewDir(user.id, true, null, "root");

    if (rootDir) {
      return c.json({ success: true, data: rootDir });
    } else {
      throw new HTTPException(500, { message: "Root directory could not be created." });
    }
  }

  return c.json({ success: false, message: "Root directory already exists" });
};

export const driveDirUpdatePut = async (c: Context) => {
  const user = c.get("user");
  if (!user) {
    throw new HTTPException(401, { message: "Unauthorized request" });
  }

  const dirId = c.req.param("dirId");
  const dirToId = c.req.query("dirToId");
  const newName = c.req.query("newName");

  if (!dirId) return c.json({ success: false, message: "No directory to move given." });

  // TODO: validate that dirId and dirToId are uuids and not just any string
  const dir = await driveQuery.selectDirById(user.id, dirId);

  if (!dir) return c.json({ success: false, message: "Directory to move cannot be found." });
  if (dir.isRoot) return c.json({ success: false, message: "Cannot modifiy the root directory." });

  if (!dirToId && !newName) return c.json({ success: false, message: "Nothing to update." });

  let updatedDir: typeof dir | undefined;

  if (dirToId) {
    const dirToExists = await driveQuery.selectDirById(user.id, dirToId);
    if (!dirToExists) return c.json({ success: false, message: "Directory to move to cannot be found." });

    // Check for sister file name collision
    const dirCollision = await driveQuery.selectDirByName(user.id, dirToId, dir.name);

    if (dirCollision) {
      return c.json({ success: false, message: `There is already a directory with the name '${dir.name}' in '${dirToExists.name}'` });
    }

    updatedDir = await driveQuery.updateDirMove(user.id, dirId, dirToId);
  }

  if (newName) {
    const dirNewNameExists = await driveQuery.selectDirByName(user.id, dir.parentId, newName);

    if (dirNewNameExists && dirNewNameExists.parentId === dir.parentId) return c.json({ success: false, message: `Directory with name ${newName} in this directory already exists` });

    updatedDir = await driveQuery.updateDirRename(user.id, dir.id, newName);
  }

  if (updatedDir) return c.json({ success: true, data: updatedDir });

  throw new HTTPException(500, { message: "Directory was not updated." });
};

export const driveDirDelete = async (c: Context) => {
  const user = c.get("user");
  if (!user) {
    throw new HTTPException(401, { message: "Unauthorized request" });
  }

  const dirId = c.req.param("dirId");

  const dirToDelete = await driveQuery.selectDirById(user.id, dirId);

  if (!dirToDelete) return c.json({ success: false, message: "Directory with given id does not exist." });

  const dirDeleted = await driveQuery.deleteDirById(user.id, dirId);

  if (dirDeleted) return c.json({ success: true, data: dirDeleted });

  throw new HTTPException(500, { message: "Directory could not be deleted." });
};

/*
  d Documents:
    d ThisDir:
    + d ThisDir(1):
*/