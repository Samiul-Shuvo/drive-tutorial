import DriveContents from "~/app/drive-contents";
import { getAllParentsForFolder, getFiles, getFolders } from "~/server/queries";

export default async function GoogleDriveClone(props: {
    params: Promise<{folderId:string}>;

}) {

    const params = await props .params;

    const parseFolderId = parseInt(params.folderId);

    if(isNaN(parseFolderId)){
        return <h1 className="text-red-500 text-4xl font-bold  text-center my-40">Invalid Folder ID</h1>
    }




  const [folders,files,parents] = await Promise.all([getFolders(parseFolderId),
    getFiles(parseFolderId), 
    getAllParentsForFolder(parseFolderId)]);

  return <DriveContents files={files} folders={folders} parents={parents} />;

} 