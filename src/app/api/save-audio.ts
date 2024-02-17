// import { NextApiResponse, NextApiRequest } from "next";
// import fs from "fs";
// import path from "path";

// export async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }
//   try {
//     const { audio } = req.body;

//     // Generate a unique filename
//     const fileName = `recording_${Date.now()}.wav`;

//     // Save the audio file to the server
//     const filePath = path.join(process.cwd(), "public", "audio", fileName);
//     fs.writeFileSync(filePath, audio);

//     return res.status(200).json({ success: true, fileName });
//   } catch (error) {
//     console.error("Error while saving audio file on the server-side", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }
