import { NextResponse } from "next/server";
const cloudinary = require('cloudinary').v2;
import { join } from "path";
import { writeFile } from "fs/promises";
export async function upload(request) {
  const data = await request.formData();
  const file = data.get("file");
  if (!file)
    return NextResponse.json({ message: "No file found" }, { status: 400 });
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
    const path = join('/','/tmp', file.name);
    await writeFile(path, buffer);
    let result = await cloudinary.uploader.upload(path, {
      folder: 'Airbnb/Places',
    });
    return NextResponse.json(result.secure_url);

}

export { upload as POST };
