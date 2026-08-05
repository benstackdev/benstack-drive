import * as z from "zod";

export const ApiNewFile = z.object({
  data: z.file().max(1_000_000),
  name: z.string(),
  path: z.string(),
  isDirectory: z.boolean().default(false)
});

export const ApiGetFile = z.object({
  path: z.string(),
  name: z.string()
});