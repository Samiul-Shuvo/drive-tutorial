
import { db } from "~/server/db";
import { files as filesSchema, folders as foldersSchema } from "~/server/db/schema";

import DriveContents from "~/app/drive-contents";
import { eq } from "drizzle-orm";


// async function getAllParents(folderId: number){
//     const parents =[];
//     let currentId: number | null = folderId;
//     while (currentId!==null){
//         const folder = await db.selectDistinct().from(foldersSchema).where(eq(foldersSchema.id,currentId));
//         if(!folder[0]){
//             throw new Error("Parent Folder Not Found");
//         }
       
//         parents.push(folder[0]);
//         currentId = folder[0]?.parent;
//     }
//     return parents;
// }
type Folder = typeof foldersSchema.$inferSelect;
async function getAllParents(folderId: number) {
    const parents: Folder[] = [];

    let currentId: number | null = folderId;
    
    // Try to get the initial folder first to verify it exists
    const initialFolder = await db.selectDistinct().from(foldersSchema).where(eq(foldersSchema.id, currentId));
    
    if (!initialFolder[0]) {
      // Return empty array if the initial folder doesn't exist
      return parents;
    }
    
    // If initial folder exists, proceed with finding parent chain
    while (currentId !== null) {
      const folder = await db.selectDistinct().from(foldersSchema).where(eq(foldersSchema.id, currentId));
      
      if (!folder[0]) {
        break;
      }
      
      parents.unshift(folder[0]);
      currentId = folder[0]?.parent;
    }
    
    return parents;
  }

export default async function GoogleDriveClone(props: {
    params: Promise<{folderId:string}>;

}) {

    const params = await props .params;

    const parseFolderId = parseInt(params.folderId);

    if(isNaN(parseFolderId)){
        return <h1 className="text-red-500 text-4xl font-bold  text-center my-40">Invalid Folder ID</h1>
    }


  const foldersPromise =  db.select().from(foldersSchema).where(eq(foldersSchema.parent, parseFolderId));


  const filesPromise =  db.select().from(filesSchema).where(eq(filesSchema.parent, parseFolderId));

  const parentPromise = getAllParents(parseFolderId);


  const [folders,files,parents] = await Promise.all([foldersPromise,filesPromise, parentPromise]);

  return <DriveContents files={files} folders={folders} parents={parents} />;

} 
