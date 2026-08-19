import { driveQuery } from "db";

export const resolveFileDuplicateName = async (name: string, userId: string, dirId: string) => {
  let count = 1;
  while (await driveQuery.selectFileByName(userId, dirId, `(${count})${name}`)) count++;

  return `(${count})${name}`;
};
