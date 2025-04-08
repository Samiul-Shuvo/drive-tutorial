import DriveContents from "~/app/drive-contents";
import { QUERIES } from "~/server/queries";

export default async function GoogleDriveClone(props: {
    params: Promise<{folderId:string}>;

}) {

    const params = await props .params;

    const parseFolderId = parseInt(params.folderId);

    if(isNaN(parseFolderId)){
        return <h1 className="text-red-500 text-4xl font-bold  text-center my-40">Invalid Folder ID</h1>
    }




  const [folders,files,parents] = await Promise.all([QUERIES.getFolders(parseFolderId),
    QUERIES.getFiles(parseFolderId), 
    QUERIES.getAllParentsForFolder(parseFolderId)]);

  return <DriveContents files={files} folders={folders} parents={parents} />;

} 