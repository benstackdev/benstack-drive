import { DriveContent } from "@/components/drive/views/drive-content";
import { DriveFooter } from "@/components/drive/drive-footer";
import { DriveHeader } from "@/components/drive/drive-header";
import { DriveSearchbar } from "@/components/drive/drive-searchbar";
import { useEffect, useState, type JSX } from "react";
import { localStorageKeys } from "shared";
import { DriveTrash } from "@/components/drive/views/drive-trash";

export type DriveViewType = "Content" | "Trash";

function Home() {
  useEffect(() => {
    localStorage.setItem(localStorageKeys.DRIVE_VIEW, "Content");
  }, []);

  const [driveView, setDriveView] = useState<JSX.Element>(<DriveContent />);

  return (
    <div className="px-4 flex flex-1 min-h-screen flex-col justify-between">
      <div className="flex flex-col gap-4">
        <DriveHeader />
        <DriveSearchbar />
        <DriveTrash />
      </div>
      <DriveFooter />
    </div>
  );
}

export default Home;