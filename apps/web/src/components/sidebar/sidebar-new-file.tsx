import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { FilePlusCorner } from "lucide-react";
import { Field, FieldDescription, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import driveClient from "@/api-client/drive-client";
import { useState } from "react";
import type { DirType } from "../drive/drive-content";
import { localStorageKeys } from "shared";

export function NewFileDialog() {
  const [newFile, setNewFile] = useState<File | null>(null);
  const [currentDir, setCurrentDir] = useState<DirType>(JSON.parse(localStorage.getItem(localStorageKeys.CURRENT_DIR)));

  const uploadFile = async () => {
    const res = await driveClient.postNewFile(newFile);
    console.log(res);
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            className="w-full"
            variant="outline">
            <FilePlusCorner />
            New File
          </Button>
        } />
      <DialogContent className="flex flex-col gap-y-4">
        <DialogHeader>
          <DialogTitle>Upload New File</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          New file will be uploaded to:
          <span className="font-bold"> {currentDir.name ?? null}</span>
        </DialogDescription>
        <form onSubmit={uploadFile} className="flex flex-col gap-2">
          <FieldGroup>
            <Field>
              <Input
                onChange={
                  (event) => setNewFile(event.target.files[0])
                }
                id={"file"}
                name={"file"}
                type="file"
                required
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="flex flex-row">
            <DialogClose
              className="flex-1"
              render={<Button type="button" variant="secondary">Cancel</Button>} />
            <Button
              className="flex-1"
              type="submit">
              Upload
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog >
  );
}