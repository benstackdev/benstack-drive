import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { FilePlusCorner } from "lucide-react";
import { Field, FieldDescription, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import driveClient from "@/api-client/drive-client";
import { useState } from "react";

export function NewFileDialog() {
  const [newFile, setNewFile] = useState<File | null>(null);

  const uploadFile = async () => await driveClient.postNewFile(newFile);

  return (
    <Dialog>
      <DialogTrigger
        render={<Button variant="outline">
          <FilePlusCorner />
          New File
        </Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload New File</DialogTitle>
        </DialogHeader>
        <form onSubmit={uploadFile}>
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
              <FieldDescription>Select a file to upload</FieldDescription>
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