"use server";
import path from "path";
import os from "os";
import fs from "fs";
<<<<<<< HEAD
=======
// import { v4 as uuidv4 } from "uuid";
>>>>>>> 5e2553bbea996c91379efd3e8f773899565383d4
import cloudinary from "cloudinary";
import Recording from "../db/models/fileModel";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

async function saveFileToLocal(formData) {
<<<<<<< HEAD
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
=======
  const file = formData.get("audio");

  console.log(file);

  const bufferPromise = file.arrayBuffer().then((data) => {
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

async function uploadFileToCloudinary() {
  const filePath = path.join(__dirname, "test.wav");
  const promise = cloudinary.v2.uploader.upload(filePath, {
>>>>>>> 5e2553bbea996c91379efd3e8f773899565383d4
    folder: "voice-recordings",
    resource_type: "raw",
  });

<<<<<<< HEAD
  return result;
=======
  console.log(promise);

  return promise;
>>>>>>> 5e2553bbea996c91379efd3e8f773899565383d4
}

export async function uploadFile(formData) {
  try {
    const newFile = await saveFileToLocal(formData);
    const cloudinaryResponse = await uploadFileToCloudinary(newFile);
    fs.unlinkSync(newFile.filepath);

<<<<<<< HEAD
    return cloudinaryResponse; // Return the cloudinary response
=======
    const file = await uploadFileToCloudinary();

    console.log("hello");

    fs.unlink(newFile.filepath);

    const newRecording = new Recording({
      puglic_id: recording.public_id,
      secure_url: recording.secure_url,
    });

    await Recording.insert(newRecording);
>>>>>>> 5e2553bbea996c91379efd3e8f773899565383d4
  } catch (error) {
    return { errMsg: error.message };
  }
}

