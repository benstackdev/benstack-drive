import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { driveFileUpdatePut, driveFileGet, driveFileTooLarge, driveInitRootPost, driveNewDirPost, driveNewFilePost } from "../controllers/drive-controller.js";
import type { Context } from "hono";

export const driveRouter = new Hono();

driveRouter.get('/:dirId', driveFileGet);
driveRouter.get('/dir/:dirId');

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

driveRouter.put('/:dirId', driveFileUpdatePut);