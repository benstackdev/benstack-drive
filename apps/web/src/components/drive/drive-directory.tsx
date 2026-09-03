import { Folder, Minus } from "lucide-react";
import type { HTMLAttributes } from "react";
import type { driveSchema } from "shared";
import * as z from "zod";
import { format } from "date-fns";
import type { DirType } from "./drive-content";
import { Button } from "../ui/button";

interface DriveDirectoryProps extends HTMLAttributes<HTMLDivElement> {
  directory: z.infer<typeof driveSchema.driveDir>;
  updateDir: (newDir: DirType) => void;
}

export function DriveDirectory({ directory, updateDir }: DriveDirectoryProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4">
      <div className="flex items-center gap-4">
        <Folder className="text-blue-400 shrink-0" />
        <Button
          variant="ghost"
          className="truncate p-0 m-0 text-md border-none h-6"
          onClick={() => updateDir(directory)}>
          {directory.name}
        </Button>
      </div>
      <span className="text-gray-400">{format(new Date(directory.modifiedAt), "yyyy/MM/dd")}</span>
      <span className="hidden md:block text-gray-400">{format(new Date(directory.createdAt), "yyyy/MM/dd")}</span>
      <span className="hidden xl:block text-gray-400"><Minus /></span>
    </div>
  );
}