import type { Context } from "hono";
import { driveQuery } from "db";
import { HTTPException } from "hono/http-exception";
import { resolveFileDuplicateName } from "../utils/resolve-file-duplicate-name.js";
import { success } from "zod";

export const driveFileTooLarge = (c: Context) => {
  return c.json({ status: 413, error: "File too large, must be <1 MB" });
};

export const driveNewFilePost = async (c: Context) => {
  const body = await c.req.parseBody();
  const file = body['file'];
  const dirId = body['dir'];

  const user = c.get("user");

  if (!(file instanceof File)) {
    return c.json({ status: 400, error: "Data must be a file" });
  }

  if (!dirId || typeof dirId !== "string") {
    return c.json({ status: 400, error: "No directory provided" });
  }

  const fileExists = await driveQuery.selectFileByName(user.id, dirId, file.name);

  let newFileName = file.name;

  if (fileExists) newFileName = await resolveFileDuplicateName(file.name, user.id, dirId);

  const newFile = await driveQuery.insertNewFile(user.id, {
    data: Buffer.from(await file.arrayBuffer()),
    name: newFileName,
    dirId
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

  if (!dirId) {
    return c.json({ success: false, message: "No directory id defined in request parameter." });
  }

  const user = c.get("user");

  const files = await driveQuery.selectAllFilesInDir(user.id, dirId);
  const subDirs = await driveQuery.selectAllDirsInDir(user.id, dirId);

  if (files) {
    if (fileName) {
      const queriedFile = files.filter((file) => file.name === fileName);
      return c.json({
        success: true,
        data: queriedFile
      });
    }
    return c.json({
      success: true,
      data: { subDirs, files }
    });
  } else {
    throw new HTTPException(404, { message: "Requested file not found" });
  }
};

export const driveFileUpdatePut = async (c: Context) => {
  const user = c.get("user");
  if (!user) {
    throw new HTTPException(401, { message: "Unauthorized request" });
  }

  const fileId = c.req.param('fileId');
  const dirToId = c.req.query("dirToId");
  const newName = c.req.query("newName");

  const file = await driveQuery.selectFileById(user.id, fileId);

  if (!file || !file.id) {
    return c.json({ success: false, message: `File provided could not be found.` });
  }

  // The request needs to have at least one of these defined (either for renaming file XOR moving file)

  if (!dirToId && !newName) return c.json({ success: false, message: "Nothing to update." });

  let updatedFile: typeof file | undefined;

  if (dirToId) {
    const dirToExists = await driveQuery.selectDirById(user.id, dirToId);

    if (!dirToExists) {
      return c.json({ success: false, message: "Directory to move file to could not be found." });
    }

    // Check for name collision
    const fileCollision = await driveQuery.selectFileByName(user.id, dirToId, file.name);

    if (fileCollision) {
      return c.json({ success: false, message: `File with name ${file.name} already exists in directory '${dirToExists.name}'` });
    }

    updatedFile = await driveQuery.updateFileMove(user.id, file.id, dirToId);

    if (!updatedFile) return c.json({ success: false, message: "File could not be moved." });
  }

  if (newName) {
    // check against updatedFile (will be defined if moved) to check no name conflict in directory file was moved to
    const newFileExists = await driveQuery.selectFileByName(user.id, updatedFile ? updatedFile.dirId : file.dirId, newName);

    let newFileName = file.name;

    if (newFileExists) newFileName = await resolveFileDuplicateName(file.name, user.id, dirToId ?? file.dirId);

    updatedFile = await driveQuery.updateFileRename(user.id, file.id, newFileName);

    if (!updatedFile) return c.json({ success: false, message: "File could not be renamed." });
  }

  if (typeof updatedFile === typeof file) return c.json({ success: true, data: updatedFile });

  throw new HTTPException(500, { message: "File was not updated." });
};

export const driveFileDelete = async (c: Context) => {
  const user = c.get("user");
  if (!user) {
    throw new HTTPException(401, { message: "Unauthorized request" });
  }

  const fileId = c.req.param("fileId");

  const fileToDelete = await driveQuery.selectFileById(user.id, fileId);

  if (!fileToDelete) return c.json({ success: false, message: "File with given id does not exist." });

  const fileDeleted = await driveQuery.deleteFileById(user.id, fileId);

  if (fileDeleted) return c.json({ success: true, data: fileDeleted });

  throw new HTTPException(500, { message: "File deletion failed." });
};

/*
d Documents:
  f test.txt
  d ThisDir:
    f test.txt
*/