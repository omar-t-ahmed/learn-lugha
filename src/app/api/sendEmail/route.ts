import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    const { email } = await req.json();

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Welcome to the Arabic Language Learning Waitlist!",
        text: `Dear Future Arabic Speaker,
    
    Thank you for signing up to join the waitlist for our AI-powered Arabic Language Learning Bot. We're excited to have you on board as we prepare to launch a revolutionary way to learn Arabic.
    
    Our innovative AI bot is designed to provide you with an immersive and interactive learning experience, helping you master the Arabic language through real-time conversations and personalized lessons.
    
    What's Next:
    - You'll receive regular updates on our progress and be among the first to know when we officially launch.
    - We'll provide you with exclusive insights and tips to get started on your language learning journey.
    
    Thank you for being a part of this exciting journey. We look forward to helping you achieve fluency in Arabic.
    
    Warm regards,
    
    The Learn Lugha Team
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred",
        });
    }
}
