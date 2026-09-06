import { useContext } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { DriveEntryContext } from "@/contexts/drive-entry-context";

export function DriveActionMove() {
  const driveEntry = useContext(DriveEntryContext);

  return (
    <Dialog>
      <DialogTrigger render={
        <Button variant="ghost" className="p-0">
          Move
        </Button>
      } />
    </Dialog>
  );
}