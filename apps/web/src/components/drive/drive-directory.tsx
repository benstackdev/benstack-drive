import { Folder, Minus } from "lucide-react";
import type { HTMLAttributes } from "react";
import type { driveSchema } from "shared";
import * as z from "zod";
import { format } from "date-fns";

interface DriveDirectoryProps extends HTMLAttributes<HTMLDivElement> {
  directory: z.infer<typeof driveSchema.driveDir>;
}

export function DriveDirectory({ directory, ...props }: DriveDirectoryProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4">
      <div className="flex gap-4">
        <Folder className="text-blue-400 shrink-0" />
        <span className="truncate">{directory.name}</span>
      </div>
      <span className="text-gray-400">{format(new Date(directory.modifiedAt), "yyyy/MM/dd")}</span>
      <span className="hidden md:block text-gray-400">{format(new Date(directory.createdAt), "yyyy/MM/dd")}</span>
      <span className="hidden xl:block text-gray-400"><Minus /></span>
    </div>
  );
}