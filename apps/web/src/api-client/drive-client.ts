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
}

const driveClient = new DriveClient();
export default driveClient;