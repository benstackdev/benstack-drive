import { DriveContent } from "@/components/drive/drive-content";
import { DriveFooter } from "@/components/drive/drive-footer";
import { DriveHeader } from "@/components/drive/drive-header";
import { DriveSearchbar } from "@/components/drive/drive-searchbar";

function Home() {
  return (
    <div className="px-4 flex flex-1 min-h-screen flex-col justify-between">
      <div className="flex flex-col gap-4">
        <DriveHeader />
        <DriveSearchbar />
        <DriveContent />
      </div>
      <DriveFooter />
    </div>
  );
}

export default Home;