import { driveQuery } from "db";

export const checkDirSelfReference = async (userId: string, currentDirId: string, dirToId: string): Promise<boolean> => {
  const rootDir = await driveQuery.selectRootDir(userId);
  let nextDir = await driveQuery.selectDirById(userId, dirToId);

  while ((nextDir && rootDir) && (nextDir.id !== rootDir[0].id)) {
    if (nextDir.id === currentDirId) return true;

    nextDir = await driveQuery.selectDirById(userId, nextDir?.parentId);
  }

  return false;
};