import { NextResponse } from "next/server";
import OpenAI from "openai";

type Lesson = {
  lesson: string;
  objectives: string[];
  vocabulary: { arabic: string; english: string; type: string }[];
};

type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function POST(req: Request): Promise<NextResponse> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  });

  // Get user input, lesson details, and previous conversation history
  const { input, lesson, conversation }: { input: string; lesson: Lesson; conversation?: Message[] } = await req.json();

  // Ensure conversation is an array
  const conversationHistory = Array.isArray(conversation) ? conversation : [];

  // Create a specific system message to guide the AI and include lesson details
  const systemMessage: Message = {
    role: "system",
    content: `
      You are an Arabic language teacher named Ahmed. You are guiding a beginner-level Arabic lesson titled "${lesson.lesson}".
      You must ensure the student learns and uses the following vocabulary: ${lesson.vocabulary.map((vocab) => vocab.arabic).join(", ")}.
      Use short, simple sentences, and guide the student through the lesson objectives. Respond in Arabic, but ensure the student uses the vocabulary words and stays on track.
      Avoid asking generic questions like "How can I help you today?" unless it's relevant to the lesson. Start with common introductory phrases, and use the student's input to continue the lesson.
    `,
  };

  // Append the system message to the conversation
  const messages: Message[] = [
    systemMessage,
    ...conversationHistory,
    { role: "user", content: input }
  ];

  // Call OpenAI API with the lesson and conversation history
  const completion = await openai.chat.completions.create({
    messages,
    model: 'gpt-4',  // Use GPT-4 for better conversation handling
    temperature: 0.7,  // Adjust the temperature to avoid overly generic or repetitive responses
    max_tokens: 150,   // Limit the response length to ensure short, clear sentences
  });

  const response = completion.choices[0].message.content;

  // Track used vocabulary
  const usedVocabulary: string[] = lesson.vocabulary
    .filter((vocab) => response!.includes(vocab.arabic))
    .map((vocab) => vocab.arabic);

  // Return the response, used vocabulary, and conversation history
  return NextResponse.json({
    response: response,
    usedVocabulary,
    conversation: [
      ...conversationHistory,
      { role: "user", content: input },
      { role: "assistant", content: response }
    ],
  });
}