import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { DriveEntryContext } from "@/contexts/drive-entry-context";
import { Input } from "../ui/input";
import driveClient from "@/api-client/drive-client";
import { DriveContentContext } from "@/contexts/drive-content-context";

export function DriveActionRename({ hide }: { hide: () => void; }) {
  const driveEntry = useContext(DriveEntryContext);
  const { currentDir, fetchData } = useContext(DriveContentContext);
  const [newName, setNewName] = useState<string>(driveEntry.entry.name);

  const updateName = async (e) => {
    e.preventDefault();
    if (driveEntry.type === "File") {
      await driveClient.putFileRename(driveEntry.entry.id, newName);
    } else if (driveEntry.type === "Dir") {
      await driveClient.putDirRename(driveEntry.entry.id, newName);
    }
    fetchData(currentDir.id);

    hide();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {driveEntry.type === "File" ? "Rename File" : "Rename Directory"}
        </DialogTitle>
      </DialogHeader>
      <form
        className="flex flex-col gap-4"
        onSubmit={updateName}>
        <Input
          type="text"
          id="newName"
          name="newName"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <DialogFooter className="flex flex-row">
          <DialogClose className="flex-1" render={
            <Button variant="outline">
              Close
            </Button>
          } />
          <DialogClose className="flex-1" render={
            <Button className="flex-1" type="submit">
              Rename
            </Button>
          }
          />
        </DialogFooter>
      </form>
    </DialogContent>
  );
}