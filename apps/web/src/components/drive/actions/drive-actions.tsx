import { EllipsisVertical } from "lucide-react";
import { Button } from "../../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { DriveActionRename } from "./drive-action-rename";
import { useContext, useState, type JSX } from "react";
import { Dialog, DialogTrigger } from "../../ui/dialog";
import { DriveContentContext } from "@/contexts/drive-content-context";
import { DriveEntryContext } from "@/contexts/drive-entry-context";
import { DriveActionDelete } from "./drive-action-delete";

export function DriveActions() {
  const { moveDriveEntryUpdate } = useContext(DriveContentContext);
  const { entry } = useContext(DriveEntryContext);

  const [renameDialog, setRenameDialog] = useState<JSX.Element | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<JSX.Element | null>(null);

  const hideRenameDialog = () => setRenameDialog(null);
  const hideDeleteDialog = () => setDeleteDialog(null);

  const handleAction = (action: string) => {
    switch (action) {
      case "rename":
        setRenameDialog(<DriveActionRename hide={hideRenameDialog} />); break;
      case "move":
        moveDriveEntryUpdate(entry);
        break;
      case "delete":
        setDeleteDialog(<DriveActionDelete hide={hideDeleteDialog} />);
        break;
    }

    if (action === "rename") {
      setRenameDialog(<DriveActionRename hide={hideRenameDialog} />);
    }
    else if (action === "move") {
      moveDriveEntryUpdate(entry);
    }
  };

  return (
    <Dialog>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger render={
          <Button variant="ghost" size="icon-sm">
            <EllipsisVertical />
          </Button>
        } />
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              Edit
            </DropdownMenuLabel>
            <DropdownMenuItem className="p-0">
              <Button
                variant="ghost"
                onClick={(e) => { e.preventDefault(); handleAction("move"); }}
                className="w-full flex justify-start">
                Move
              </Button>
            </DropdownMenuItem>
            <DialogTrigger nativeButton={false} render={
              <DropdownMenuItem className="p-0">
                <Button
                  variant="ghost"
                  onClick={(e) => { e.preventDefault(); handleAction("rename"); }}
                  className="w-full flex justify-start">
                  Rename
                </Button>
              </DropdownMenuItem>}
            />
            <DialogTrigger nativeButton={false} render={
              <DropdownMenuItem className="p-0">
                <Button
                  variant="destructive"
                  onClick={(e) => { e.preventDefault(); handleAction("delete"); }}
                  className="w-full flex justify-start">
                  Trash
                </Button>
              </DropdownMenuItem>}
            />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {renameDialog}
      {deleteDialog}
    </Dialog>
  );
};