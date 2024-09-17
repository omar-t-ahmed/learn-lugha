import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

export async function POST(req: Request) {
    const { email } = await req.json();

    // Use your Gmail credentials for production
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER, // Your Gmail address from environment variables
            pass: process.env.GMAIL_PASS, // Your Gmail app-specific password from environment variables
        },
    });

    // Path to the logo image
    const logoPath = path.join(process.cwd(), "public/LEARN LUGHA.png");
    const logo = fs.readFileSync(logoPath).toString("base64");

    const mailOptions = {
        from: `"Learn Lugha Team" <${process.env.GMAIL_USER}>`, // Sender address
        to: email,
        subject: "🌟 Welcome to the Waitlist! 🌟",
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; background-color: #ffffff; padding: 20px; border-radius: 8px; text-align: center; max-width: 600px; margin: 0 auto;">
                <div style="margin-bottom: 20px;">
                    <img src="cid:logo" alt="Learn Lugha Logo" style="width: 80px; margin-bottom: 20px;">
                </div>
                <h2 style="color: #6B46C1;">You're on the waitlist!</h2>
                <p style="font-size: 16px; color: #000;">
                    Thank you for signing up to join the waitlist for our <strong>AI-powered Arabic Language Learning Bot</strong>. We're excited to have you on board as we prepare to launch a revolutionary way to learn Arabic.
                </p>
                <div style="background-color: #f0f0f0; padding: 10px 15px; border-radius: 8px;">
                    <h3 style="color: #6B46C1; margin-bottom: 15px;">✨ What's Next:</h3>
                    <div style="margin-bottom: 15px; display: flex; align-items: center; justify-content: center;">
                        <span style="color: #000;">You'll receive regular updates on our progress and be among the first to know when we officially launch. 
                        As a thank you for joining us early, you'll receive 5 complimentary lessons to jumpstart your journey once we launch!</span>
                    </div>
                </div>
                <p style="font-size: 16px; color: #000;">
                    Thank you for being a part of this exciting journey. We look forward to helping you achieve fluency in Arabic.
                </p>
                <div style="margin-top: 30px; padding-top: 10px; border-top: 1px solid #ddd;">
                    <p style="font-size: 16px; color: #6B46C1;">Warm regards,</p>
                    <p style="font-size: 16px; font-weight: bold; color: #6B46C1;">The Learn Lugha Team</p>
                </div>
                <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;">
                <p style="font-size: 12px; color: #999;">If you did not sign up for this waitlist, please disregard this email.</p>
            </div>
        `,
        attachments: [
            {
                filename: "LEARN LUGHA.png",
                path: logoPath,
                cid: "logo", // Same cid value as in the HTML img src
            },
        ],
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