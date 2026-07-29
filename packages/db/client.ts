import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

const queryClient = postgres(process.env.POSTGRES_URL!);
const db = drizzle({ client: queryClient });

export { db };
