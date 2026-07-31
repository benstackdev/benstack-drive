import * as z from "zod";
export declare const WebUserSession: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodEmail;
}, z.core.$strip>;
export declare const WebSignupForm: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
    passwordConfirm: z.ZodString;
}, z.core.$strip>;
export declare const WebSigninForm: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=user-schemas.d.ts.map