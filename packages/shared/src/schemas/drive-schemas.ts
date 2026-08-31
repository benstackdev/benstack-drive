import * as z from "zod";

export const driveNewFileForm = z.object({
  file: z.any().refine((files) => files[0]?.size <= 1_000_000, "File must be < 1 MB")
});

export const driveDir = z.object({
  id: z.uuid(),
  name: z.string(),
  parentId: z.uuid(),
  createdAt: z.iso.datetime(),
  modifiedAt: z.iso.datetime()
});

export const driveFileData = z.object({
  type: z.string(),
  data: z.array(z.number())
});

export const driveFile = z.object({
  id: z.uuid(),
  dirId: z.uuid(),
  data: driveFileData,
  name: z.string(),
  createdAt: z.iso.datetime(),
  modifiedAt: z.iso.datetime(),
  isStarred: z.boolean(),
  isTrash: z.boolean()
});

export const driveDirContents = z.object({
  subDirs: z.array(driveDir),
  files: z.array(driveFile)
});