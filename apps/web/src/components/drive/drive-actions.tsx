import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DriveActionRename } from "./drive-action-rename";
import { DriveActionMove } from "./drive-action-move";
import { useState, type JSX } from "react";
import { Dialog, DialogTrigger } from "../ui/dialog";
export function DriveActions() {
  const [actionDialog, setActionDialog] = useState<string>("");

  const handleAction = (): JSX.Element | null => {
    return (actionDialog === "move") ? <DriveActionMove /> :
      (actionDialog === "rename") ? <DriveActionRename /> : null;
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
            <DialogTrigger nativeButton={false} render={
              <DropdownMenuItem className="px-2 py-0">
                <Button
                  variant="ghost"
                  onClick={(e) => { e.preventDefault(); setActionDialog("move"); }}>
                  Move
                </Button>
              </DropdownMenuItem>} />
            <DialogTrigger nativeButton={false} render={
              <DropdownMenuItem className="px-2 py-0">
                <Button
                  variant="ghost"
                  onClick={(e) => { e.preventDefault(); setActionDialog("rename"); }}>
                  Rename
                </Button>
              </DropdownMenuItem>}
            />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {handleAction()}
    </Dialog>
  );
};