import { NextResponse } from "next/server";
const cloudinary = require('cloudinary').v2;
import { join } from "path";
import { writeFile } from "fs/promises";
export async function upload(request) {
    const data = await request.formData();
    const files = data.getAll("photos");
    if (!files || files.length === 0)
        return NextResponse.json({ message: "No files found" }, { status: 400 });

    let urls = [];
    for (let file of files) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const path = join('/','/tmp', file.name);
        await writeFile(path, buffer);
        let result = await cloudinary.uploader.upload(path, {
            folder: 'Airbnb/Places',
        });
        urls.push(result.secure_url);
    }

    return NextResponse.json(urls);
}

export { upload as POST };
