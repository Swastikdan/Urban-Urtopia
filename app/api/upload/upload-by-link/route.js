import { NextResponse } from "next/server";

const cloudinary = require("cloudinary").v2;

export async function uploadbylink(request) {
  const { link } = await request.json();
  const links = link.split(',').map(item => item.trim()).slice(0, 100);
  let urls = [];
  try {
    for (let i = 0; i < links.length; i++) {
      let result = await cloudinary.uploader.upload(links[i], {
        folder: "nestly/places",
      });
      urls.push(result.secure_url);
    }
    return NextResponse.json(urls);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Internal server error",
    });
  }
}

export { uploadbylink as POST };