import { type HTMLAttributes } from "react";
import type { driveSchema } from "shared";
import { File } from "lucide-react";
import * as z from "zod";
import { format } from "date-fns";
import { parseFileSize } from "@/lib/parse-file-size";
import { DriveActions } from "./drive-actions";
import { DriveEntryContext } from "@/contexts/drive-entry-context";

interface DriveFileProps extends HTMLAttributes<HTMLDivElement> {
  file: z.infer<typeof driveSchema.driveFile>;
}

export function DriveFile({ file, ...props }: DriveFileProps) {
  return (
    <DriveEntryContext value={{ type: "File", entry: file }}>
      <div className="flex flex-row items-center">
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4">
          <div className="flex gap-4">
            <File className="shrink-0" />
            <span className="truncate">{file.name}</span>
          </div>
          <span className="text-gray-400">{format(new Date(file.modifiedAt), "yyyy/MM/dd")}</span>
          <span className="text-gray-400 hidden md:block">{format(new Date(file.createdAt), "yyyy/MM/dd")}</span>
          <span className="text-gray-400 hidden xl:block">{parseFileSize(file.data.data.length)}</span>
        </div>
        <span className="justify-self-end">
          <DriveActions />
        </span>
      </div>
    </DriveEntryContext>
  );
}