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
    <div className="grid grid-cols-2">
      <div className="flex gap-4">
        <File />
        <span>{file.name}</span>
      </div>
      <span className="text-gray-400">{format(new Date(file.createdAt), "yyyy/MM/dd")}</span>
    </div>
  );
}