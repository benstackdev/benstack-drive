import * as z from "zod";
import { driveSchema } from "shared";
import { apiURL } from "shared";

class DriveClient {
  async getRootId(): Promise<z.infer<typeof z.uuid>> {
    const response = await fetch(`${apiURL}/drive/dir/root`, {
      method: "GET",
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    const id = z.uuid().parse(result.data);

    return id;
  }

  async getDirContent(dirId: z.infer<typeof z.uuid>): Promise<z.infer<typeof driveSchema.driveDirContents>> {
    const response = await fetch(`${apiURL}/drive/${dirId}`, {
      method: "GET",
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    const data = driveSchema.driveDirContents.parse(result.data);

    return data;
  }

  async postNewFile(newFile: File) {
    const formData = new FormData();

    formData.append("file", newFile);
    formData.append("dir", "13312492-f592-44a0-a2e6-f809b48a0d64");

    const response = await fetch(`${apiURL}/drive`, {
      method: "POST",
      credentials: "include",
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    return result.success;
  }

  async postNewDir(newDirName: string, parentDirId: string) {
    const formData = new FormData();

    formData.append("name", newDirName);
    formData.append("parent", parentDirId);

    const response = await fetch(`${apiURL}/drive/dir`, {
      method: "POST",
      credentials: "include",
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    return result.success;
  }
}

const driveClient = new DriveClient();
export default driveClient;