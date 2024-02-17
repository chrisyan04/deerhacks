"use server";
import path from "path";
import os from "os";
import fs from "fs";
import cloudinary from "cloudinary";
import Recording from "../db/models/fileModel";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

async function saveFileToLocal(formData) {
  const audioBlob = formData.get("audio");
  const buffer = Buffer.from(await audioBlob.arrayBuffer());
  const name = "deerhacks";
  const ext = "wav";

  const tempdir = os.tmpdir();
  const uploadDir = path.join(tempdir, `/${name}.${ext}`);

  fs.writeFileSync(uploadDir, buffer);

  return { filepath: uploadDir, filename: name + "." + ext };
}

async function uploadFileToCloudinary(newFile) {
  const result = await cloudinary.v2.uploader.upload(newFile.filepath, {
    folder: "voice-recordings",
    resource_type: "raw",
  });

  return result;
}

export async function uploadFile(formData) {
  try {
    const newFile = await saveFileToLocal(formData);
    const cloudinaryResponse = await uploadFileToCloudinary(newFile);
    fs.unlinkSync(newFile.filepath);

    return cloudinaryResponse; // Return the cloudinary response
  } catch (error) {
    return { errMsg: error.message };
  }
}

