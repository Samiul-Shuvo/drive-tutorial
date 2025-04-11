import "server-only";

import { db } from "~/server/db";
import {DB_FileType,DB_FolderType, files_table as filesSchema, folders_table as foldersSchema } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { create } from "domain";

type Folder = typeof foldersSchema.$inferSelect;
export const QUERIES ={
 getAllParentsForFolder :  async function (folderId: number) {
    const parents: Folder[] = [];

    let currentId: number | null = folderId;
    
    // Try to get the initial folder first to verify it exists
    const initialFolder = await db.selectDistinct().from(foldersSchema).where(eq(foldersSchema.id, currentId));
    
    if (!initialFolder[0]) {
      // Return empty array if the initial folder doesn't exist
      return parents;
    }
  
    while (currentId !== null) {
      const folder = await db.selectDistinct().from(foldersSchema).where(eq(foldersSchema.id, currentId));
      
      if (!folder[0]) {
        break;
      }
      
      parents.unshift(folder[0]);
      currentId = folder[0]?.parent;
    }
    
    return parents;
  },
  getFolders: function (folderId:number) {
    return  db.select().from(foldersSchema).where(eq(foldersSchema.parent, folderId));
  }
,
  getFiles: function (folderId:number){

    return db.select().from(filesSchema).where(eq(filesSchema.parent, folderId));


  }
}


export const MUTATIONS = {
    createFile: async function  (input:{
    file:{
    name: string;
    size: number;
    url: string;
    parent:number;
   
    };
    userId:string;

}) {

       return await db.insert(filesSchema).values({
        ...input.file,
        parent :input.file.parent,});
    },
};