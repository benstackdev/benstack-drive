import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { FilePlusCorner, Upload } from "lucide-react";
import { Field, FieldDescription, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import driveClient from "@/api-client/drive-client";
import { useRef, useState } from "react";
import type { DirType } from "../drive/views/drive-content";
import { localStorageKeys } from "shared";

export function NewFileDialog() {
  const [newFile, setNewFile] = useState<File | null>(null);
  const [currentDir, setCurrentDir] = useState<DirType>(JSON.parse(localStorage.getItem(localStorageKeys.CURRENT_DIR)));

  const fileInputRef = useRef(null);

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
        <form onSubmit={uploadFile} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-gray-200">
              Selected file:
              <span className="font-bold"> {newFile ? newFile.name : "None selected"}</span>
            </p>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current.click()}
            >
              <Upload />
              Browse Files
            </Button>
          </div>
          <Input
            className="hidden"
            onChange={
              (event) => setNewFile(event.target.files[0])
            }
            id={"file"}
            name={"file"}
            type="file"
            ref={fileInputRef}
            required
          />
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