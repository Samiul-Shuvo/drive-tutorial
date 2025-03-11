import { int, text, bigint, mysqlTable } from "drizzle-orm/mysql-core"; // ✅ Use mysql-core instead of singlestore-core

export const users = mysqlTable("users_table", { // ✅ Use mysqlTable instead of singlestoreTable
  id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
  name: text("name"),
  age: int("age"),
});