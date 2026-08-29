import { Folder } from "lucide-react";
import type { HTMLAttributes } from "react";
import type { driveSchema } from "shared";
import * as z from "zod";
import { format } from "date-fns";

interface DriveDirectoryProps extends HTMLAttributes<HTMLDivElement> {
  directory: z.infer<typeof driveSchema.driveDir>;
}

export function DriveDirectory({ directory, ...props }: DriveDirectoryProps) {
  return (
    <div className="grid grid-cols-2">
      <div className="flex gap-4">
        <Folder className="text-blue-400" />
        <span>{directory.name}</span>
      </div>
      <span className="text-gray-400">{format(new Date(directory.createdAt), "yyyy/MM/dd")}</span>
    </div>
  );
}