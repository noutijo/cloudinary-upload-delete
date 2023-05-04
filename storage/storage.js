import dotenv from "dotenv"
dotenv.config()

import cloud from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"
const cloudinary = cloud.v2

cloudinary.config({
  cloud_name: `${process.env.CLOUD_NAME}`,
  api_key: `${process.env.CLOUDINARY_KEY}`,
  api_secret: `${process.env.CLOUDINARY_SECRET}`
})

export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profile",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
})
