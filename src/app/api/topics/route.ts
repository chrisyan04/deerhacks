import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../db/config";
import Topics, { ITopics } from "../../../models/topics";

export async function POST(request: NextRequest) {
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

export async function GET() {
  try {
    connectDB();

    let topics = await Topics.find({});

    return NextResponse.json(topics, { status: 200 });
  } catch (error: any) {
    console.error("Error processing GET request:", error);

    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request" },
      { status: 400 }
    );
  }
}
