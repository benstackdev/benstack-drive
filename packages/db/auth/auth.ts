import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "../client.js";
import { account, session, user, verification } from "../schemas/auth-schema.js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user, session, account, verification
    }
  }),
  trustedOrigins: ['http://localhost:5173'],
  emailAndPassword: {
    enabled: true
  }
});