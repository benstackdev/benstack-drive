import type { DirType } from "@/components/drive/drive-content";
import { createContext } from "react";

// Current Directory Context
export type DriveContentContextType = {
  currentDir: DirType,
  fetchData: (dirId: DirType["id"]) => Promise<void>;
};

export const DriveContentContext = createContext<DriveContentContextType | null>(null);