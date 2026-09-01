import type { HTMLAttributes } from "react";
import type { driveSchema } from "shared";
import { File } from "lucide-react";
import * as z from "zod";
import { format } from "date-fns";

interface DriveFileProps extends HTMLAttributes<HTMLDivElement> {
  file: z.infer<typeof driveSchema.driveFile>;
}

export function DriveFile({ file, ...props }: DriveFileProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4">
      <div className="flex gap-4">
        <File className="shrink-0" />
        <span className="truncate">{file.name}</span>
      </div>
      <span className="text-gray-400">{format(new Date(file.modifiedAt), "yyyy/MM/dd")}</span>
      <span className="text-gray-400 hidden md:block">{format(new Date(file.createdAt), "yyyy/MM/dd")}</span>
      {/* TODO: Fix this to be less gross */}
      <span className="text-gray-400 hidden xl:block">{file.data.data.length}</span>
    </div>
  );
}