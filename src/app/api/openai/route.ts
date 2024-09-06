import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request): Promise<NextResponse> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  });

  const { input } = await req.json() as { input: string };

  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are an Arabic language teacher and we are having a conversation. Your name is Ahmed. Please respond in arabic to my messages and try to hit some common arabic introductory phrases' },
      { role: 'user', content: input },
    ],
    model: 'gpt-4o-mini',
  });

  const response = completion.choices[0].message.content;

  return NextResponse.json({ response });
}
