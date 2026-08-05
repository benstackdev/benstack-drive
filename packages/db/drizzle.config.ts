import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

console.log(process.env.POSTGRES_URL);
export default defineConfig({
  dialect: "postgresql",
  schema: "./schemas/*",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.POSTGRES_URL!
  }
});
