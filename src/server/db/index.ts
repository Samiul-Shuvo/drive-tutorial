import { drizzle } from "drizzle-orm/singlestore"; // ✅ Ensure this is correct
import { createPool, type Pool } from "mysql2/promise";
import { env } from "~/env";
import * as schema from "./schema";

// Global variable to store database connection in development mode
const globalForDb = globalThis as unknown as {
  conn: Pool | undefined;
};

// Create a MySQL connection pool
const conn =
  globalForDb.conn ??
  createPool({
    host: env.SINGLESTORE_HOST,
    port: parseInt(env.SINGLESTORE_PORT),
    user: env.SINGLESTORE_USER,
    password: env.SINGLESTORE_PASS,
    database: env.SINGLESTORE_DB_NAME,
    ssl: {},
    maxIdle: 0, // Optional: Adjust based on your performance needs
  });

// Store the connection globally in non-production environments
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

// ✅ Safe error handling for database connection
conn.addListener("error", (err: unknown) => {
  if (err instanceof Error) {
    console.error("Database connection error:", err.message);
  } else {
    console.error("Unknown database connection error:", err);
  }
});

// Export the database connection using Drizzle
export const db = drizzle(conn, { schema }); 