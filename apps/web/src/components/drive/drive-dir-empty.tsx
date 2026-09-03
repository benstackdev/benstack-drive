import { FolderOpen } from "lucide-react";
import { Empty, EmptyContent, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";
import { NewFileDialog } from "../sidebar/sidebar-new-file";
import { NewDirDialog } from "../sidebar/sidebar-new-dir";

export function DriveDirectoryEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpen />
        </EmptyMedia>
        <EmptyTitle>This folder is empty</EmptyTitle>
      </EmptyHeader>
      <EmptyContent className="flex gap-x-2">
        <NewFileDialog />
        <NewDirDialog />
      </EmptyContent>
    </Empty>
  );
}