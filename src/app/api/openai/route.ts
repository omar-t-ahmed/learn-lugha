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

// Simple in-memory cache to store the last user input
let lastUserInput: { input: string; timestamp: number } | null = null;

export async function POST(req: Request): Promise<NextResponse> {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY!,
    });

    // Get user input, lesson details, and conversation history
    const { input, lesson, conversation }: { input: string; lesson: Lesson; conversation?: Message[] } = await req.json();

    // Check if the current input is the same as the last one (to prevent identical consecutive requests)
    const currentTime = Date.now();

    if (lastUserInput && lastUserInput.input === input && currentTime - lastUserInput.timestamp < 5000) {
        // If the input is identical to the last one within 5 seconds, return a 204 No Content without a body
        return new NextResponse(null, { status: 204 });
    }
    

    // Store the current request as the last one
    lastUserInput = { input, timestamp: currentTime };

    // Ensure conversation is initialized
    const conversationHistory = Array.isArray(conversation) ? conversation : [];

    // Set up the system message
    const systemContent = `
    You are an Arabic language teacher named Ahmed. You are guiding a beginner-level Arabic lesson titled "${
        lesson.lesson
    }".
    You must ensure the student learns and uses the following vocabulary: ${lesson.vocabulary
        .map((vocab) => vocab.arabic)
        .join(", ")}.
    Use short, simple sentences, and guide the student through the lesson objectives. Respond in Arabic, with no more than one sentence, and ensure the student uses the vocabulary words and stays on track. If they ask you repeat questions make sure to direct them back to the learning objective.
  `;

    const systemMessage: Message = {
        role: "system",
        content: systemContent,
    };

    // Append the system message and conversation
    const messages: Message[] = [
        systemMessage,
        ...conversationHistory,
        { role: "user", content: input },
    ];

    // Call OpenAI API with the lesson and conversation history
    const completion = await openai.chat.completions.create({
        messages,
        model: "gpt-4o-mini",
        temperature: 0.7,
        max_tokens: 150,
    });

    const response = completion.choices[0].message.content;

    // Track used vocabulary
    const usedVocabulary: string[] = lesson.vocabulary
        .filter((vocab) => response!.includes(vocab.arabic))
        .map((vocab) => vocab.arabic);

    // Return the response, used vocabulary, and updated conversation history
    return NextResponse.json({
        response: response,
        usedVocabulary,
        conversation: [
            ...conversationHistory,
            { role: "user", content: input },
            { role: "assistant", content: response },
        ],
    });
}
