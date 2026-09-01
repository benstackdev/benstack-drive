import * as z from "zod";
import { driveSchema } from "shared";
import { apiURL } from "shared";

type APIMethodType = "GET" | "POST" | "PUT" | "DELETE";
const apiFetch = async (url: URL, method: APIMethodType, body?: FormData) => {
  const response = await fetch(url, {
    method,
    credentials: "include",
    body
  });

  if (!response.ok) {
    throw new Error(`Error: response status ${response.status}`);
  }

  const result = await response.json();
  return result;
};

class DriveClient {
  async getRootId(): Promise<z.infer<typeof z.uuid>> {
    const result = await apiFetch(new URL(`${apiURL}/drive/dir/root`), "GET");
    const id = z.uuid().parse(result.data);

    return id;
  }

  async getDirContent(dirId: z.infer<typeof z.uuid>): Promise<z.infer<typeof driveSchema.driveDirContents>> {
    const result = await apiFetch(new URL(`${apiURL}/drive/${dirId}`), "GET");
    const data = driveSchema.driveDirContents.parse(result.data);

    return data;
  }

  async postNewFile(newFile: File) {
    const formData = new FormData();

    formData.append("file", newFile);
    formData.append("dir", "13312492-f592-44a0-a2e6-f809b48a0d64");

    const result = await apiFetch(new URL(`${apiURL}/drive`), "POST", formData);

    return result.success;
  }

  async postNewDir(newDirName: string, parentDirId: string) {
    const formData = new FormData();

    formData.append("name", newDirName);
    formData.append("parent", parentDirId);

    const result = await apiFetch(new URL(`${apiURL}/drive/dir`), "POST", formData);

    return result.success;
  }
}

const driveClient = new DriveClient();
export default driveClient;