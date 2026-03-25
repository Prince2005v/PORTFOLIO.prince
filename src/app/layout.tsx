import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

if (typeof window === "undefined") {
  (global as any).localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    key: () => null,
    length: 0,
  };
}

import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { VoiceAssistant } from "@/components/ui/VoiceAssistant";
import { DevTerminal } from "@/components/ui/DevTerminal";
import { Web3Provider } from "@/components/providers/Web3Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Full Stack & Web3 Developer | Building the Future",
  description: "High-converting portfolio of a Full Stack & Web3 Developer specializing in scalable Web2 and decentralized Web3 solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-blue-500/30 selection:text-white`}
      >
        <Web3Provider>
          <ParticleBackground />
          {children}
          <VoiceAssistant />
          <DevTerminal />
        </Web3Provider>
      </body>
    </html>
  );
}
