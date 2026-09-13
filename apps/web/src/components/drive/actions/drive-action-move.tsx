import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DriveContentContext } from "@/contexts/drive-content-context";

export function DriveActionMove({ visible }: { visible: boolean; }) {

  const { moveDriveEntry, moveDriveEntryUpdate } = useContext(DriveContentContext);

  return (
    <>
      {
        visible ?
          (<Card className="fixed w-[90%] mx-auto duration-200 inset-x-0 bottom-12">
            <CardHeader>
              <CardTitle>Move "{moveDriveEntry.name}"</CardTitle>
              <CardDescription>
                Navigate to the directory that you would like to move the entry to
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row gap-x-2">
              <Button variant="outline" onClick={() => moveDriveEntryUpdate(moveDriveEntry, true)} className="flex-1">
                {/* Set moveDriveEntry to null without moving */}
                Close
              </Button>
              <Button onClick={() => moveDriveEntryUpdate(moveDriveEntry, true)} className="flex-1">
                {/* Set moveDriveEntry to null AND move */}
                Move
              </Button>
            </CardContent>
          </Card>) : null
      }
    </>
  );
};