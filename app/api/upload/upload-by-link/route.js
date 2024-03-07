import { NextResponse } from "next/server";

const cloudinary = require("cloudinary").v2;

export async function uploadbylink(request) {
  const { link } = await request.json();
  try {
    let result = await cloudinary.uploader.upload(link, {
      folder: "nestly/places",
    });
    return NextResponse.json(result.secure_url);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Internal server error",
    });
  }
}

export { uploadbylink as POST };