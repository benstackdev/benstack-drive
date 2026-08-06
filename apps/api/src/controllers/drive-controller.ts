import type { Context } from "hono";
import * as z from "zod";
import { fileSchema } from "shared";
import { driveQuery } from "db";
import { HTTPException } from "hono/http-exception";
import type { ApiGetFile } from "shared/src/schemas/file-schemas.js";

export const driveFileTooLarge = (c: Context) => {
  return c.json({ status: 413, error: "File too large, must be <1 MB" });
};

export const driveNewFilePost = async (c: Context) => {
  const body = await c.req.parseBody();
  const file = body['file'];

  const user = c.get("user");

  if (!(file instanceof File)) {
    return c.json({ status: 400, error: "Data must be a file" });
  }

  const newFile = await driveQuery.insertNewFile(user.id, {
    data: Buffer.from(await file.arrayBuffer()),
    name: file.name,
    path: "/",
    dirId: "" //! Change, read from req form data
  });

  if (newFile) {
    return c.json({ success: true });
  } else {
    throw new HTTPException(500, { message: "File not created" });
  }
};

export const driveFileGet = async (c: Context) => {
  const dirId = c.req.param('dirId');
  const fileName = c.req.query('fileName');

  const user = c.get("user");

  const files = await driveQuery.selectFile(user.id, dirId);

  if (files) {
    if (fileName) {
      const queriedFile = files.filter((file) => file.name === fileName);
      return c.json({ success: true, data: queriedFile });
    }
    return c.json({ success: true, data: files });
  } else {
    throw new HTTPException(404, { message: "Requested file not found" });
  }
};

export const driveNewDirPost = async (c: Context) => {
  const body = await c.req.parseBody();
  const parentId = body['parent'];
  const name = body['name'];

  const user = c.get("user");

  if (typeof parentId !== "string" || typeof name !== "string") {
    throw new HTTPException(400, { message: "Bad form data; parentId and name need to be strings." });
  }

  const newDir = await driveQuery.insertNewDir(user.id, false, parentId, name);

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