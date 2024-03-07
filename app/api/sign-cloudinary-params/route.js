import { v2 as cloudinary } from "cloudinary";
// const cloudinary = require('cloudinary').v2;

const signature = cloudinary.utils.api_sign_request(
  body.paramsToSign,
  process.env.CLOUDINARY_API_SECRET
);


export default async function POST (req, res) {
  res.status(200).json({ signature });
}