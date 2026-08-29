import * as z from "zod";
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
//# sourceMappingURL=drive-schemas.js.map