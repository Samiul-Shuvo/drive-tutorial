import "server-only";

import { int, text, bigint, index,singlestoreTableCreator, singlestoreTable } from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator(
  (name) => `drive_tutorial_${name}`,
);

export const files = createTable("files_table", {
  id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
  name: text("name").notNull(),
  size: int("size").notNull(),
  url: text("url").notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
}, (t) => {
  return [index("parent_index").on(t.parent)];
});

  

export const folders = createTable("folders_table", { // Fix table name (was "files_table")
  id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
      name: text("name").notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true }),
}, (t) => {
  return [index("parent_index").on(t.parent)];
});


// export const users = singlestoreTable("users_table", {

//   id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),

//   name: text("name"),

//   age: int("age"),

// });
