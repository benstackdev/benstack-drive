import * as z from "zod";
export const WebUserSession = z.object({
    username: z.string(),
    email: z.email()
});
//# sourceMappingURL=user-schemas.js.map