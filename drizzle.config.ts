import { type Config } from "drizzle-kit";
import "dotenv/config";

// Ensure all required environment variables are set
if (
  !process.env.SINGLESTORE_HOST ||
  !process.env.SINGLESTORE_PORT ||
  !process.env.SINGLESTORE_USER ||
  !process.env.SINGLESTORE_PASS ||
  !process.env.SINGLESTORE_DB_NAME
) {
  throw new Error("Missing required environment variables for SingleStore!");
}

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "singlestore",
  dbCredentials: {
    host: process.env.SINGLESTORE_HOST, // ✅ No need for "!"
    port: parseInt(process.env.SINGLESTORE_PORT), // ✅ No need for "!"
    user: process.env.SINGLESTORE_USER,
    password: process.env.SINGLESTORE_PASS,
    database: process.env.SINGLESTORE_DB_NAME,
    ssl: {}, // Adjust SSL settings if needed
  },
} satisfies Config;