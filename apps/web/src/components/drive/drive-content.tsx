import driveClient from "@/api-client/drive-client";
import { h1Styles } from "@/lib/styles/heading-styles";
import { useEffect, useState } from "react";
import * as z from "zod";
import { driveSchema } from "shared";
import { DriveDirectory } from "./drive-directory";
import { DriveFile } from "./drive-file";
import { Separator } from "../ui/separator";

type DirType = z.infer<typeof driveSchema.driveDir>;
type FileType = z.infer<typeof driveSchema.driveFile>;

const compareDirs = (dir1: DirType, dir2: DirType): number => (dir1.name < dir2.name) ? -1 : 1;

const compareFiles = (file1: FileType, file2: FileType): number => (file1.name < file2.name) ? -1 : 1;

export function DriveContent() {
  const [dirs, setDirs] = useState<DirType[] | null>(null);
  const [files, setFiles] = useState<FileType[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const rootDirId = await driveClient.getRootId();
      if (rootDirId) {
        const rawData = await driveClient.getDirContent(rootDirId);
        setDirs(rawData.subDirs.sort(compareDirs));
        setFiles(rawData.files.sort(compareFiles));
      }
    };

    if (!dirs && !files) fetchData();
  }, [setDirs, setFiles, dirs, files]);

  return (
    <>
      <div className="py-2">
        <h1 className={h1Styles}>All Files</h1>
      </div>
      {/* Fetch files/directories */}
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 pb-2 border-b-2">
          <span className="text-gray-400 font-semibold">File Name</span>
          <span className="text-gray-400 font-semibold">File Created</span>
        </div>
        {
          dirs ? dirs.map((dir) => (
            <div key={dir.id}>
              <DriveDirectory directory={dir} />
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
      </div>
    </>
  );
}