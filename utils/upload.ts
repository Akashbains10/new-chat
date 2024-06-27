import path from "path";
import { mkdir, readdir, unlink, writeFile } from "fs/promises";

export const uploadFile = async (file: File) => {
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = Date.now() + '-' + file.name.replaceAll(" ", "_").replaceAll("-", "_")
    const pathName = path.join(process.cwd(), 'public/uploads/' + fileName)
    const dir = path.dirname(pathName)
    try {
        const files = await readdir(dir);
        for (const file of files) {
            const fileLastName = fileName.split('-')[1];
            const existFile = file.split('-')[1];
            if (!(existFile.toLowerCase() === fileLastName.toLowerCase())) {
                await mkdir(dir, { recursive: true })
                await writeFile(pathName, buffer)
                return `/uploads/${fileName}`
            }
        }

    } catch (error) {
        console.log('Error in upload file', error)
    }
}   