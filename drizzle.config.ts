import { type Config } from "drizzle-kit";


import 'dotenv/config';
export default {
  schema: "./src/server/db/schema.ts",
  dialect: "singlestore",
  tablesFilter: ["drive_tutorial_*"],
  dbCredentials: {
    host: process.env.SINGLESTORE_HOST,
    port: parseInt(process.env.SINGLESTORE_PORT!),
    user: process.env.SINGLESTORE_USER,
    password: process.env.SINGLESTORE_PASS,
    database: process.env.SINGLESTORE_DB_NAME,
    ssl: {},
  },
} satisfies Config;


// import { type Config } from "drizzle-kit";
// import { env } from "~/env";

// export default {
//  schema: "/Users/samiulshuvo/drive-tutorial/src/server/db/schema.ts", 
  
//   dialect: "mysql",  // SingleStore is MySQL-compatible
//   tablesFilter: ["drive_tutorial_*"],
//   dbCredentials: {
//     host: env.SINGLESTORE_HOST,
//     port: parseInt(env.SINGLESTORE_PORT),
//     user: env.SINGLESTORE_USER,
//     password: env.SINGLESTORE_PASS,
//     database: env.SINGLESTORE_DB_NAME,
//     ssl: {},  // Adjust if SSL is not required
//   },
// } satisfies Config;



// import { defineConfig } from "drizzle-kit";

// export default defineConfig({
//     dialect: "singlestore",
//     schema: "/Users/samiulshuvo/drive-tutorial/src/server/db/schema.ts",  // Replace with the actual path to your schema
//     dbCredentials: {
//         host: "svc-53fbbad6-a4bd-41f7-badd-9c3fe7585067-dml.aws-virginia-8.svc.singlestore.com",
//         user: "admin",
//         password: "Il1BAVJWy1VO8JqogxxEplOh8a4OSHT4",
//         port: 3306,
//         database: "DRIVE_TUTORIAL_DB",  // Add the database name here
//     },
// });

// // Load environment variables from .env file
// import dotenv from "dotenv";

// // Initialize dotenv
// dotenv.config();

// import { type Config } from "drizzle-kit";

// // Define the config object
// const config: Config = {
//   schema: "/Users/samiulshuvo/drive-tutorial/src/server/db/schema.ts",  // Path to your schema file

//   dialect: "singlestore",  // Correct dialect for Singlestore
//   tablesFilter: ["drive_tutorial_*"],  // Ensure only the relevant tables are pulled. Customize this filter as per your tables
  
//   dbCredentials: {
//     host: process.env.SINGLESTORE_HOST ?? "default_host",  // Default fallback if undefined
//     port: parseInt(process.env.SINGLESTORE_PORT ?? "3306"),  // Default to 3306 if not set
//     user: process.env.SINGLESTORE_USER ?? "default_user",  // Default fallback if undefined
//     password: process.env.SINGLESTORE_PASS ?? "default_password",  // Default fallback if undefined
//     database: process.env.SINGLESTORE_DB_NAME ?? "default_db",  // Default fallback if undefined
//     ssl: {},  // Adjust if SSL is not required
//   },
// };

// // Export the config object
// export default config;