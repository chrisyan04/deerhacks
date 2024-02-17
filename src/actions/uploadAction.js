"use server";
import path from "path";
import os from "os";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "cloudinary";
import Recording from "../models/fileModel";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

async function saveFileToLocal(formData) {
  const file = formData.get("file");

  const bufferPromise = file.arrayBuffer().then((data) => {
    const buffer = Buffer.from(data);
    const name = uuidv4();
    const ext = file.type.split("/")[1];

    const tempdir = os.tmpdir();
    const uploadDir = path.join(tempdir, `/${name}.${ext}`);

    fs.writeFile(uploadDir, buffer);

    return { filepath: uploadDir, filename: file.name };
  });

  return await Promise(bufferPromise);
}

async function uploadFileToCloudinary(newFile) {
  const promise = cloudinary.v2.uploader.upload(newFile.filepath, {
    folder: "voice-recordings",
    resource_type: "raw",
  });

  console.log(promise);

  return await Promise(promise);
}

async function uploadFile(formData) {
  try {
    const newFile = await saveFileToLocal(formData);

    const file = await uploadFileToCloudinary(newFile);

    fs.unlink(newFile.filepath);

    const newRecording = new Recording({
      puglic_id: recording.public_id,
      secure_url: recording.secure_url,
    });

    await Recording.insert(newRecording);
  } catch (error) {
    return { errMsg: error.message };
  }
}
