import driveClient from "@/api-client/drive-client";
import { h1Styles } from "@/lib/styles/heading-styles";
import { useEffect, useState } from "react";

export function DriveContent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const rootDirId = await driveClient.getRootId();
      if (rootDirId) {
        setData(await driveClient.getDirContent(rootDirId));
      }
    };

    if (!data) fetchData();
  }, []);

  return (
    <>
      <div className="py-2">
        <h1 className={h1Styles}>Drive Content</h1>
      </div>
      {/* Fetch files/directories */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}