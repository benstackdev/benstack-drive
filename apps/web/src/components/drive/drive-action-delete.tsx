import { useContext } from "react";
import { Button } from "../ui/button";
import { DialogClose, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { DriveEntryContext } from "@/contexts/drive-entry-context";
import { toast } from "../ui/toast";

export function DriveActionDelete({ hide }: { hide: () => void; }) {
  const driveEntry = useContext(DriveEntryContext);

  const updateName = async (e) => {
    e.preventDefault();
    if (driveEntry.type === "File") {
      // trash file
    } else if (driveEntry.type === "Dir") {
      // trash directory
    }

    // add toast
    toast.add({
      type: "success",
      description: `${driveEntry.entry.name} moved to Trash`
      // potential undo button?
    });

    hide();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Are you sure you want to trash "{driveEntry.entry.name}"?
        </DialogTitle>
      </DialogHeader>
      <form
        className="flex flex-row gap-4"
        onSubmit={updateName}>
        <DialogClose className="flex-1" render={
          <Button variant="outline">
            Cancel
          </Button>
        } />
        <DialogClose className="flex-1" render={
          <Button variant="destructive" className="flex-1" type="submit">
            Move to Trash
          </Button>
        }
        />
      </form>
    </DialogContent>
  );
}