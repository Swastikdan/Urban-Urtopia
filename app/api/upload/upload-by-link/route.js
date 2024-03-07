import { NextResponse } from "next/server";
const cloudinary = require("cloudinary").v2;
import { getServerSession } from "next-auth";
export async function uploadbylink(request) {
  try {
    const session = await getServerSession();
    if (!session)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { link } = await request.json();
    const links = link.split(',').map(item => item.trim()).slice(0, 100);
    let urls = [];

    for (let i = 0; i < links.length; i++) {
      let result = await cloudinary.uploader.upload(links[i], {
        folder: "nestly/places",
      });
      urls.push(result.secure_url);
    }

    return NextResponse.json(urls);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export { uploadbylink as POST };