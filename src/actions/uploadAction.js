"use server";
import path from "path";
import os from "os";
import fs from "fs";
// import { v4 as uuidv4 } from "uuid";
import cloudinary from "cloudinary";
import Recording from "../models/fileModel";
import connectDB from "../db/config";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

async function saveFileToLocal(formData) {
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

function uploadFileToCloudinary(email, title) {
  const filePath = path.join(__dirname, "test.wav");
  const promise = cloudinary.v2.uploader.upload(filePath, {
    folder: "voice-recordings",
    resource_type: "raw",
    public_id: `${email}-${title}`,
  });

  console.log(promise);

  return promise;
}

export async function uploadFile(formData, email, title, topic) {
  try {
    await connectDB();
    const newFile = await saveFileToLocal(formData);

    const file = await uploadFileToCloudinary(email, title);
    console.log(file.url);
    console.log(file);
    fs.unlink(newFile.filepath, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("File deleted successfully");
      }
    });

    console.log("hello");

    const newRecording = new Recording({
      public_id: file.public_id,
      secure_url: file.secure_url,
      email,
      title,
      topic,
    });

    console.log("the url1: " + file.url)
    await Recording.create(newRecording);
    console.log("the url2: " + file.url)

    let questions = fetch("http://localhost:5328/papi/stt/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ln: file.url }),
      })
        .then((res) => res.json())
        .then((body) => {
          return body;
        });
      console.log(questions);
  } catch (error) {
    return { errMsg: error.message };
  }
}
