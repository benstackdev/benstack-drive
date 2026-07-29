// Public API for exports to other packages and apps in monorepo
import { db } from "./client.js";
import { user } from "./schemas/auth-schema.js";
import { auth } from "./auth/auth.js";

export { db, auth };