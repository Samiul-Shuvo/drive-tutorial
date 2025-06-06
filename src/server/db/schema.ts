import { DB_FileType } from './schema';
import "server-only";

import { int, text, bigint, index,singlestoreTableCreator, singlestoreTable } from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator(
  (name) => `drive_tutorial_${name}`,
);

export const files_table = createTable("files_table", {
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

export type DB_FileType = typeof files_table.$inferSelect;
  

export const folders_table = createTable("folders_table", { // Fix table name (was "files_table")
  id: bigint("id", { mode: "number", unsigned: true })
      .primaryKey()
      .autoincrement(),
      name: text("name").notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true }),
}, (t) => {
  return [index("parent_index").on(t.parent)];
});

export type DB_FolderType = typeof folders_table.$inferSelect;