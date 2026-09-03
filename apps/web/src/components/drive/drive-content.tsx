import driveClient from "@/api-client/drive-client";
import { h1Styles } from "@/lib/styles/heading-styles";
import { createContext, useEffect, useState } from "react";
import * as z from "zod";
import { driveSchema } from "shared";
import { DriveDirectory } from "./drive-directory";
import { DriveFile } from "./drive-file";
import { Separator } from "../ui/separator";
import { Stack } from "@/lib/stack";
import { Button } from "../ui/button";
import { CircleArrowLeft } from "lucide-react";
import { DriveDirectoryEmpty } from "./drive-dir-empty";

export type DirType = z.infer<typeof driveSchema.driveDir>;
export type FileType = z.infer<typeof driveSchema.driveFile>;

const compareDirs = (dir1: DirType, dir2: DirType): number => (dir1.name < dir2.name) ? -1 : 1;
const compareFiles = (file1: FileType, file2: FileType): number => (file1.name < file2.name) ? -1 : 1;

// Current Directory Context
const CurrentDirContext = createContext<DirType | null>(null);

export function DriveContent() {
  const [currentDir, setCurrentDir] = useState<DirType | null>(null);
  const [rootDirId, setRootDirId] = useState<DirType["id"] | null>(null);

  const [dirStack, setDirStack] = useState<Stack<DirType>>(new Stack());

  const [dirs, setDirs] = useState<DirType[] | null>(null);
  const [files, setFiles] = useState<FileType[] | null>(null);

  const fetchData = async (dirId: DirType["id"]) => {
    const rawData = await driveClient.getDirContent(dirId);
    setDirs(rawData.subDirs.sort(compareDirs));
    setFiles(rawData.files.sort(compareFiles));
  };

  const updateCurrentDirIdForward = (newDir: DirType) => {
    dirStack.stackPush(currentDir);
    setCurrentDir(newDir);
    fetchData(newDir.id);
  };

  const updateCurrentDirIdBackward = () => {
    const parentDir = dirStack.stackPop();
    if (!parentDir) return;

    setCurrentDir(parentDir);
    fetchData(parentDir.id);
  };

  // set rootDirId
  useEffect(() => {
    const fetchRootId = async () => {
      const id = await driveClient.getRootId() as DirType["id"];
      setRootDirId(id);
      updateCurrentDirIdForward({
        id,
        name: "Drive Root",
        parentId: "",
        createdAt: "",
        modifiedAt: ""
      } as DirType);
    };

    if (!rootDirId) fetchRootId();
  });

  return (
    <>
      <CurrentDirContext value={currentDir}>
        <div className="flex py-2 gap-x-2 items-center">
          <Button
            variant="ghost"
            onClick={updateCurrentDirIdBackward}
            className="p-0 m-0 border-none h-fit hover:text-blue-400">
            <CircleArrowLeft className="size-6" />
          </Button>
          <h1 className={h1Styles}>{currentDir ? currentDir.name : null}</h1>
        </div>
        {/* Fetch files/directories */}
        <div className="flex flex-col gap-4">
          {(dirs && dirs.length > 0) || (files && files.length) > 0 ?
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 pb-2 border-b-2 gap-x-4">
                <span className="text-gray-400 font-semibold">Name</span>
                <span className="text-gray-400 font-semibold">Last Modified</span>
                <span className="hidden md:block text-gray-400 font-semibold">Created</span>
                <span className="hidden xl:block text-gray-400 font-semibold">Size</span>
              </div>
              {
                dirs ? dirs.map((dir) => (
                  <div key={dir.id}>
                    <DriveDirectory directory={dir} updateDir={updateCurrentDirIdForward} />
                    <Separator className="mt-2" />
                  </div>
                )) : null
              }
              {
                files ? files.map((file) => (
                  <div key={file.id}>
                    <DriveFile file={file} />
                    <Separator className="mt-2" />
                  </div>
                )) : null
              }
            </> :
            <DriveDirectoryEmpty />
          }
        </div>
      </CurrentDirContext>
    </>
  );
}