import type { DirType, FileType } from "@/components/drive/views/drive-content";
import { createContext } from "react";

export type DriveEntryContextType = {
  type: "Dir" | "File";
  entry: DirType | FileType | undefined;
};
export const DriveEntryContext = createContext<DriveEntryContextType>(undefined);