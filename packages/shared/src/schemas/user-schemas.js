import * as z from "zod";
export const WebUserSession = z.object({
    username: z.string(),
    email: z.email()
});
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
export const WebSignupForm = z.object({
    username: z.string()
        .min(3, {
        error: "Username must have at least 3 characters"
    })
        .max(20, {
        error: "Username must have fewer than 20 characters"
    }),
    email: z.email(),
    password: z.string().regex(passwordRegex, {
        error: "Password must contain at least 8 characters, and have at least one letter and one number"
    }),
    passwordConfirm: z.string().regex(passwordRegex, {
        error: "Password must contain at least 8 characters, and have at least one letter and one number"
    })
}).refine((data) => data.password === data.passwordConfirm, {
    error: "Passwords do not match",
    path: ["passwordConfirm"]
});
export const WebSigninForm = z.object({
    email: z.email(),
    password: z.string().regex(passwordRegex, {
        error: "Password must contain at least 8 characters, and have at least one letter and one number"
    })
});
//# sourceMappingURL=user-schemas.js.map