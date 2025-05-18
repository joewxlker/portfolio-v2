import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import "./globals.css";
import { ToastProvider } from "@/components/layout/toast";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joseph Walker | Full-Stack Blockchain Engineer",
  description: "Portfolio of Joseph Walker – Full-stack engineer building secure, decentralized apps using Rust, Solidity, and TypeScript.",
};

export default async function RootLayout({ children }: Readonly <{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Flow+Circular&family=Gidole&display=swap" rel="stylesheet"/>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased w-full min-h-screen flex flex-col font-body`}>      
        <Header/>
        <ToastProvider>
          <div className="flex flex-col relative border-x-container items-stretch justify-center flex-1">
            {children}
            <SpeedInsights />
          </div>
        </ToastProvider>
        <Footer/>
      </body>
    </html>
  );
}
