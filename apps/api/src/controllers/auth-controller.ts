import { auth } from "db";
import type { Context, Next } from "hono";

export const sessionValidation = async (c: Context, next: Next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    await next();
    return;
  }

  c.set("user", session.user);
  c.set("session", session.session);
  await next();
};

export const sessionReturn = async (c: Context) => {
  const user = c.get("user");
  const userAuthenticated = (user !== null);
  return c.json({ success: userAuthenticated, user });
};