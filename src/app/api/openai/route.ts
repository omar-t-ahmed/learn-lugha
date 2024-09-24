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
    Here are the guidlines for forming a response to the users input:
    - Use simple sentences.
    - Guide them through a natural conversation where they would respond with a sentence using the vocabulary.
    - Respond in Arabic, with no more than two sentences.
    - Ensure the student uses the vocabulary words and stays on track.
    - Avoid repeating anything you have already said.
    - Prompt the user to form their responses in a clever way based on their own input rather than just asking them to repeat a word, they should be challenged and have fun.
    `;

    // seperate prompt into diff sections
    // here are guidliens for forming response :
    // give it a list
    // respond to me based on what i said here, then reinforce the model to do what you want
    // system prompt can go off the rails
    // list out the prompt w bullet points or dashes
    // translate the problem into the prompt
    // in prompt provide examples of what you want for a response
    // lms are few shot learners
    // form the word in a clever way rather than just repeat (tell the prompt to make or prompt the user do this) 

    // check lesson objectives and see if they have completed them 

    // take the convo from the lesson and give them a score 
    // if less than 70% accurate, give them a score of 0
    // if greater than 70% accurate, give them a score of 1
    // if greater than 80% accurate, give them a score of 2
    // if greater than 90% accurate, give them a score of 3
    // if greater than 95% accurate, give them a score of 4
    // if greater than 99% accurate, give them a score of 5
    // if less than certain score have them retry

    // incorporate memory from lesson to lesson 
    // bring up feedback from the previous lessons
    // make the user feel like the ai understands them 
    // make the user feel like the ai is a good teacher

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
        temperature: 0.7, // play around with this
        max_tokens: 50,
    });

    // AB test the temperature
    // see who has higher satisfaction rates


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