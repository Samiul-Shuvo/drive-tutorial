
import { db } from "~/server/db";
import { files as filesSchema, folders as foldersSchema } from "~/server/db/schema";

import DriveContents from "~/app/drive-contents";
import { eq } from "drizzle-orm";

export default async function GoogleDriveClone(props: {
    params: Promise<{folderId:string}>;

}) {

    const params = await props .params;

    const parseFolderId = parseInt(params.folderId);

    if(isNaN(parseFolderId)){
        return <h1 className="text-red-500 text-4xl font-bold  text-center my-40">Invalid Folder ID</h1>
    }

  const files = await db.select().from(filesSchema).where(eq(filesSchema.parent, parseFolderId));
  const folders = await db.select().from(foldersSchema).where(eq(foldersSchema.parent, parseFolderId));
  return <DriveContents files={files} folders={folders} />;

}
