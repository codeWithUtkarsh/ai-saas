import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";


const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI();

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }

    if (!messages) {
        return new NextResponse("Messages are required", { status: 400 });
      }
      
      const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages
      });
      
      return NextResponse.json(response.choices[0]);

  } catch (error) {
    console.error("[CONVERSATION ERROR]", error);
    return new NextResponse("Error occurred", { status: 500 });
  }
}

