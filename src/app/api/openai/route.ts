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

    const currentTime = Date.now();

    // Check if the current input is the same as the last one (to prevent identical consecutive requests)
    if (lastUserInput && lastUserInput.input === input && currentTime - lastUserInput.timestamp < 5000) {
        return new NextResponse(null, { status: 204 });
    }

    // Store the current request as the last one
    lastUserInput = { input, timestamp: currentTime };

    // Ensure conversation is initialized
    const conversationHistory: Message[] = Array.isArray(conversation) ? conversation : [];

    // Set up the system message
    const systemContent = `
    You are an Arabic language teacher named Ahmed. You are guiding a beginner-level Arabic lesson titled "${
        lesson.lesson
    }".
    You must ensure the student learns and uses the following vocabulary: ${lesson.vocabulary
        .map((vocab) => vocab.arabic)
        .join(", ")}.
    Use short, simple sentences, and guide the student through the lesson objectives. Respond in Arabic, with no more than one sentence, and ensure the student uses the vocabulary words and stays on track.
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

    // First API call to generate a response to the user
    const completion = await openai.chat.completions.create({
        messages,
        model: "gpt-4o-mini",
        temperature: 0.7,
        max_tokens: 150,
    });

    const responseContent = completion.choices[0].message.content;

    // Track used vocabulary from the response
    const usedVocabulary: string[] = lesson.vocabulary
        .filter((vocab) => responseContent!.includes(vocab.arabic))
        .map((vocab) => vocab.arabic);

    // Add the latest user input and assistant's response to conversation history
    const updatedConversation: Message[] = [
        ...conversationHistory,
        { role: "user", content: input },
        { role: "assistant", content: responseContent ?? "" }, // Ensure content is not null
    ];

    // Second API call to check if all vocabulary has been used
    const checkCompletionContent = `
    Based on the conversation so far, has the student used all of the following vocabulary words: ${lesson.vocabulary
        .map((vocab) => vocab.arabic)
        .join(", ")}?
    Respond with Yes or No.
    `;

    const checkCompletionMessages: Message[] = [
        { role: "system", content: checkCompletionContent },
        ...updatedConversation,
    ];

    const completionCheck = await openai.chat.completions.create({
        messages: checkCompletionMessages,
        model: "gpt-4o-mini",
        temperature: 0.7,
        max_tokens: 50,
    });

    const completionResponse = completionCheck.choices[0].message.content;

    // Determine if the lesson is completed based on OpenAI's response
    const lessonCompleted = completionResponse!.trim().toLowerCase() === "yes";

    // Return the response, used vocabulary, and whether the lesson is completed
    return NextResponse.json({
        response: responseContent ?? "", // Ensure content is not null
        usedVocabulary,
        lessonCompleted,
        conversation: updatedConversation,
    });
}