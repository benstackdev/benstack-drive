import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { driveFileGet, driveFileTooLarge, driveInitRootPost, driveNewDirPost, driveNewFilePost } from "../controllers/drive-controller.js";
import type { Context } from "hono";

export const driveRouter = new Hono();

// TODO: Eventually refactor to accept file ID or name as query in request URL?
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