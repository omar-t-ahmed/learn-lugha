import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google"; // Import Source Sans 3 instead of Roboto
import "./globals.css";
import Navbar from "@/components/Navbar";

const sourceSans3 = Source_Sans_3({
  weight: ['400', '700'], // Specify the weights you want to use
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Learn Lugha",
  description: "Conversational Arabic AI Lesson Bot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sourceSans3.className}>
        {/* <Navbar/> */}
        {children}
      </body>
    </html>
  );
}