import * as z from "zod";
export declare const ApiNewFile: z.ZodObject<{
    data: z.ZodFile;
    name: z.ZodString;
    path: z.ZodString;
    isDirectory: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export declare const ApiGetFile: z.ZodObject<{
    path: z.ZodString;
    name: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=file-schemas.d.ts.map