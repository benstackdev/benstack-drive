import { driveQuery } from "db";

export const resolveDirDuplicateName = async (name: string, userId: string, parentId: string) => {
  let count = 1;
  while (await driveQuery.selectDirByName(userId, parentId, `${name}(${count})`)) count++;

  return `${name}(${count})`;
};
