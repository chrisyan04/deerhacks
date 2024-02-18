import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../db/config";
import Topics, { ITopics } from "../../../models/topics";
import { getSession } from "@auth0/nextjs-auth0";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    connectDB();

    const submission: ITopics = await request.json();

    // Validate input data
    if (!submission.email || !submission.topic) {
      throw new Error("Email and topic are required fields");
    }

    // Save the topic to the database
    const topic = await new Topics(submission).save();

    return NextResponse.json(
      {
        message: `${topic.topic} created successfully!`,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error processing POST request:", error);

    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request" },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    connectDB();

    // @ts-ignore
    const session = await getSession(request);
    if (!session?.user?.email) {
      throw new Error("User email not found in session");
    }

    let topics = await Topics.find({ email: session.user.email });

    return NextResponse.json(topics, { status: 200 });
  } catch (error: any) {
    console.error("Error processing GET request:", error);

    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request" },
      { status: 400 }
    );
  }
}
