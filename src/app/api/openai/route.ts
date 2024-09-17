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

    // Get user input, lesson details, conversation history, and used vocabulary
    const { input, lesson, conversation, usedVocabulary: previousUsedVocabulary = [], gender }: 
        { input: string; lesson: Lesson; conversation?: Message[]; usedVocabulary?: string[], gender: string } = await req.json();

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
    }", where you are having a conversation with the student. Keep a natural conversation tone, and guide the student through the lesson objectives.
    You must ensure the student learns and uses the following vocabulary: ${lesson.vocabulary
        .map((vocab) => vocab.arabic)
        .join(", ")}.
    The students gender is ${gender}.
    They have the following unused vocabulary left: ${lesson.vocabulary
        .filter(vocab => !previousUsedVocabulary.includes(vocab.arabic))
        .map(vocab => `${vocab.arabic} (${vocab.english})`)
        .join(", ")}.
    Use simple sentences, and guide the student through the lesson objectives. Respond in Arabic, with no more than two sentences, and ensure the student uses the vocabulary words and stays on track. Avoid repeating anything you have already said. For example do not ask the student how they are doing more than once. Do not simply ask them to repeat after you but rather guide them through a natural conversation where they would respond with a sentence using the vocabulary.
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
        max_tokens: 50,
    });

    const responseContent = completion.choices[0].message.content;

    // Function to normalize Arabic words (e.g., remove "ta marbuta", handle "al" prefix, etc.)
    const normalizeArabic = (word: string) => 
        word.replace(/ة$/, "ه") // Replace "ta marbuta" with "ha"
            .replace(/^(ال)/, "") // Remove "al" prefix
            .replace(/ى$/, "ي") // Replace "alif maqsura" with "ya"
            .normalize("NFKD") // Normalize Unicode
            .replace(/[\u064B-\u065F]/g, ""); // Remove diacritics

    // Track used vocabulary from the conversation history
    const usedVocabulary: string[] = [
        ...previousUsedVocabulary,
        ...lesson.vocabulary
            .filter((vocab) => 
                conversationHistory.some(
                    (message) => message.role === "user" && new RegExp(normalizeArabic(vocab.arabic), "i").test(normalizeArabic(message.content))
                )
            )
            .map((vocab) => vocab.arabic)
    ];

    // Remove duplicates
    const uniqueUsedVocabulary = Array.from(new Set(usedVocabulary));

    // Add the latest user input and assistant's response to conversation history
    const updatedConversation: Message[] = [
        ...conversationHistory,
        { role: "user", content: input },
        { role: "assistant", content: responseContent ?? "" }, // Ensure content is not null
    ];

    // Check if all vocabulary has been used
    const allVocabularyUsed = lesson.vocabulary.every((vocab) =>
        uniqueUsedVocabulary.includes(vocab.arabic)
    );

    // Generate feedback in English based on the user's most recent message
    const feedbackContent = `
    You are an arabic teacher. Give feedback in English based on the user's most recent message, evaluating the correctness and fluency of their Arabic sentence: "${input}". Keep it general, give a short feedback, no more than one sentence. keep in mind that it is a spoken response. so dont focus on diacritics such as commas, mostly words used and whether or not it makes sense. 
    `;

    const feedbackMessages: Message[] = [
        { role: "system", content: feedbackContent },
        { role: "user", content: input },
    ];

    const feedbackCompletion = await openai.chat.completions.create({
        messages: feedbackMessages,
        model: "gpt-4o-mini",
        temperature: 0.7,
        max_tokens: 50,
    });

    const feedbackResponse = feedbackCompletion.choices[0].message.content;
    // Return the response, used vocabulary, whether the lesson is completed, and feedback
    return NextResponse.json({
        response: responseContent ?? "", // Ensure content is not null
        usedVocabulary: uniqueUsedVocabulary,
        lessonCompleted: allVocabularyUsed,
        conversation: updatedConversation,
        feedback: feedbackResponse ?? "", // Ensure feedback is not null
    });
}