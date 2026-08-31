import driveClient from "@/api-client/drive-client";
import { h1Styles } from "@/lib/styles/heading-styles";
import { useEffect, useState } from "react";
import * as z from "zod";
import { driveSchema } from "shared";
import { DriveDirectory } from "./drive-directory";
import { DriveFile } from "./drive-file";
import { Separator } from "../ui/separator";

export function DriveContent() {
  const [dirs, setDirs] = useState<z.infer<typeof driveSchema.driveDir>[] | null>(null);
  const [files, setFiles] = useState<z.infer<typeof driveSchema.driveFile>[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const rootDirId = await driveClient.getRootId();
      if (rootDirId) {
        const rawData = await driveClient.getDirContent(rootDirId);
        setDirs(rawData.subDirs);
        setFiles(rawData.files);
      }
    };

    if (!dirs && !files) fetchData();
  }, []);

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
              <Separator />
            </div>
          )) : null
        }
        {
          files ? files.map((file) => (
            <div key={file.id}>
              <DriveFile file={file} />
              <Separator />
            </div>
          )) : null
        }
      </div>
    </>
  );
}