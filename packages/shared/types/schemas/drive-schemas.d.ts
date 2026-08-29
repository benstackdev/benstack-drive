import * as z from "zod";
export declare const driveNewFileForm: z.ZodObject<{
    file: z.ZodFile;
    dir: z.ZodUUID;
}, z.core.$strip>;
export declare const driveDir: z.ZodObject<{
    id: z.ZodUUID;
    name: z.ZodString;
    parentId: z.ZodUUID;
    createdAt: z.ZodISODateTime;
    modifiedAt: z.ZodISODateTime;
}, z.core.$strip>;
export declare const driveFileData: z.ZodObject<{
    type: z.ZodString;
    data: z.ZodArray<z.ZodNumber>;
}, z.core.$strip>;
export declare const driveFile: z.ZodObject<{
    id: z.ZodUUID;
    dirId: z.ZodUUID;
    data: z.ZodObject<{
        type: z.ZodString;
        data: z.ZodArray<z.ZodNumber>;
    }, z.core.$strip>;
    name: z.ZodString;
    createdAt: z.ZodISODateTime;
    modifiedAt: z.ZodISODateTime;
    isStarred: z.ZodBoolean;
    isTrash: z.ZodBoolean;
}, z.core.$strip>;
export declare const driveDirContents: z.ZodObject<{
    subDirs: z.ZodArray<z.ZodObject<{
        id: z.ZodUUID;
        name: z.ZodString;
        parentId: z.ZodUUID;
        createdAt: z.ZodISODateTime;
        modifiedAt: z.ZodISODateTime;
    }, z.core.$strip>>;
    files: z.ZodArray<z.ZodObject<{
        id: z.ZodUUID;
        dirId: z.ZodUUID;
        data: z.ZodObject<{
            type: z.ZodString;
            data: z.ZodArray<z.ZodNumber>;
        }, z.core.$strip>;
        name: z.ZodString;
        createdAt: z.ZodISODateTime;
        modifiedAt: z.ZodISODateTime;
        isStarred: z.ZodBoolean;
        isTrash: z.ZodBoolean;
    }, z.core.$strip>>;
}, z.core.$strip>;
//# sourceMappingURL=drive-schemas.d.ts.map