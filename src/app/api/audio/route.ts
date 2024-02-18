// import { NextRequest, NextResponse } from "next/server";

// import connectDB from "@/db/config";
// import Project, { type IProjects } from "@/db/models/projects";

// let submission: Omit<IProjects, "code"> = {
//   project_name: "",
//   project_description: "",
//   project_link: "",
//   project_likes: 0,
//   project_skills: [],
// };

// export async function POST(request: NextRequest) {
//   try {
//     connectDB();

//     submission = await request.json();

//     await new Project({ ...submission }).save();

//     return NextResponse.json(
//       {
//         message: `${submission.project_name} created successfully!`,
//       },
//       { status: 201 }
//     );
//   } catch (error: any) {
//     if (error instanceof SyntaxError) {
//       return NextResponse.json(
//         { type: "UnauthorizedError", error: "Invalid request" },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }
