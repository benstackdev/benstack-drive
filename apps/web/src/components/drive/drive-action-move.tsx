import { useContext } from "react";
import { Button } from "../ui/button";
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { DriveEntryContext } from "@/contexts/drive-entry-context";

export function DriveActionMove() {
  const driveEntry = useContext(DriveEntryContext);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {driveEntry.type === "File" ? "Move File" : "Move Directory"}
        </DialogTitle>
      </DialogHeader>
      <DialogFooter>
        <DialogClose render={
          <Button>Close</Button>
        }
        />
      </DialogFooter>
    </DialogContent>
  );
}