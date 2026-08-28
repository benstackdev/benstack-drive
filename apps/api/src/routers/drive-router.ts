import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { driveFileUpdatePut, driveFileGet, driveFileTooLarge, driveNewFilePost, driveFileDelete } from "../controllers/drive-file-controller.js";
import { driveInitRootPost, driveNewDirPost, driveDirUpdatePut, driveDirDelete, driveDirRootGet } from "../controllers/drive-dir-controller.js";
import type { Context } from "hono";

export const driveRouter = new Hono();

// Get all files in a directory OR get a specific file by naming it
driveRouter.get('/:dirId', driveFileGet);
driveRouter.get('/dir/root');
driveRouter.get('/dir/:dirId', driveDirRootGet);

driveRouter.post('/',
  bodyLimit({
    maxSize: Number(process.env.FILE_SIZE_LIMIT),
    onError: driveFileTooLarge
  }),
  driveNewFilePost
);

driveRouter.post('/dir', driveNewDirPost);

driveRouter.post('/dir/init', driveInitRootPost);
driveRouter.post('/dir/:userEmail');

// ?dirTo=fileToMoveTo&newName=nameToRenameTo
driveRouter.put('/:fileId', driveFileUpdatePut);

driveRouter.put('/dir/:dirId', driveDirUpdatePut);

driveRouter.delete('/:fileId', driveFileDelete);
driveRouter.delete('/dir/:dirId', driveDirDelete);