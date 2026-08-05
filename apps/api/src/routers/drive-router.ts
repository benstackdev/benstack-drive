import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { driveFileGet, driveFileTooLarge, driveNewFilePost } from "../controllers/drive-controller.js";

export const driveRouter = new Hono();

driveRouter.post('/',
  bodyLimit({
    maxSize: Number(process.env.FILE_SIZE_LIMIT),
    onError: driveFileTooLarge
  }),
  driveNewFilePost
);

// TODO: Eventually refactor to accept file ID or name as query in request URL?
driveRouter.get('/', driveFileGet);