'use server'

import { Schema, model, models, Document } from "mongoose";
import path from "path";
import os from "os";
import fs from "fs";
// import { v4 as uuidv4 } from "uuid";
// import cloudinary from "cloudinary";
import Recording, { type IRecordings } from "@/db/models/fileModel";
import { v2 as cloudinary } from "cloudinary";
import { v2 as cloudinaryV2 } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || "",
  api_key: process.env.CLOUD_API_KEY || "",
  api_secret: process.env.CLOUD_API_SECRET || "",
});

async function saveFileToLocal(
  formData: any
): Promise<{ filepath: string, filename: string }> {
  const file = formData.get("audio");

  console.log(file);

  const bufferPromise = file.arrayBuffer().then((data: any) => {
    const buffer = Buffer.from(data);
    // const name = uuidv4();
    const ext = file.type.split("/")[1];

    const tempdir = os.tmpdir();
    // const uploadDir = path.join(tempdir, `/${name}.${ext}`);
    //const uploadDir = path.join(process.cwd(), "public", `/${file.name}$`);
    const filePath = path.join(__dirname, file.name);

    fs.writeFile(filePath, buffer, (err) => err && console.error(err));

    return { filepath: filePath, filename: file.name };
  });

  return bufferPromise;
}

async function uploadFileToCloudinary(filePath: string): Promise<any> {
  const promise = cloudinaryV2.uploader.upload(filePath, {
    folder: "voice-recordings",
    resource_type: "raw",
  });

  console.log(promise);

  return promise;
}

export async function uploadFile(formData: any): Promise<{ errMsg?: string | undefined }> {
  try {
    const newFile = await saveFileToLocal(formData);
    const cloudinaryResponse = await uploadFileToCloudinary(newFile.filepath);
    fs.unlinkSync(newFile.filepath);

    console.log("hello");

    const newRecording = new Recording({
      public_id: cloudinaryResponse.public_id,
      secure_url: cloudinaryResponse.secure_url,
    });

    await newRecording.save();
  } catch (error: any) {
    return { errMsg: error.message };
  }

  return {};
}
