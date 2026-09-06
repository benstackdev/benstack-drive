import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { DriveActionRename } from "./drive-action-rename";
import { DriveActionMove } from "./drive-action-move";

export function DriveActions() {

  return (
    <DropdownMenu>
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
          <DropdownMenuItem className="px-2 py-0">
            <DriveActionMove />
          </DropdownMenuItem>
          <DropdownMenuItem className="px-2 py-0">
            <DriveActionRename />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}