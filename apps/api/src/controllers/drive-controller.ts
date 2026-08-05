import type { Context } from "hono";
import * as z from "zod";
import { fileSchema } from "shared";
import { driveQuery } from "db";
import { HTTPException } from "hono/http-exception";

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
    isDirectory: false
  });

  if (newFile) {
    return c.json({ success: true });
  } else {
    throw new HTTPException(500, { message: "File not created" });
  }
};

export const driveFileGet = async (c: Context) => {
  const fileInfo = await c.req.json<z.infer<typeof fileSchema.ApiGetFile>>();

  const user = c.get("user");

  const file = await driveQuery.selectFile(user.id, fileInfo.path, fileInfo.name);

  if (file) {
    return c.json({ success: true, data: file });
  } else {
    throw new HTTPException(404, { message: "Requested file not found" });
  }
};