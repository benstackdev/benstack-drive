import { FolderPlus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import driveClient from "@/api-client/drive-client";
import { useState, type ChangeEvent } from "react";

export function NewDirDialog() {
  const createDir = async (event: React.SubmitEvent) => {
    if (newDirName === "") {
      event.preventDefault();
      return;
    }

    // ! Hard-coded parent directory name; need to change eventually
    await driveClient.postNewDir(newDirName, "13312492-f592-44a0-a2e6-f809b48a0d64");
  };

  const [newDirName, setNewDirName] = useState<string>("");

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            className="w-full"
            variant="outline">
            <FolderPlus />
            New Directory
          </Button>
        } />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Directory</DialogTitle>
          <DialogDescription>
            New directory will be created in the currently selected directory (temporary)
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={createDir} className="flex flex-col gap-2">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">
                Directory Name
              </FieldLabel>
              <Input
                type="text"
                id="name"
                name="name"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewDirName(e.target.value)}
                required
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="flex flex-row">
            <DialogClose
              className="flex-1"
              render={(<Button type="button" variant="outline">Close</Button>)}
            />
            <Button
              className="flex-1"
              type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}