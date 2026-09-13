import type { DirType, FileType } from "@/components/drive/views/drive-content";
import { createContext } from "react";

// Current Directory Context
export type DriveContentContextType = {
  currentDir: DirType,
  moveDriveEntry: FileType | DirType | null,
  moveDriveEntryUpdate: (entry: FileType | DirType, toMove?: boolean) => void,
  fetchData: (dirId: DirType["id"]) => Promise<void>;
};

export const DriveContentContext = createContext<DriveContentContextType | null>(null);