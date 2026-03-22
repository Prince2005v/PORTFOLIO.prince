/* eslint-disable react/no-unescaped-entities, @typescript-eslint/no-explicit-any, react-hooks/exhaustive-deps, @typescript-eslint/no-unused-vars, react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Bot, X, Loader2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function VoiceAssistant() {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  
  const recognitionRef = useRef<any>(null);

  function speak(text: string) {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
      setResponse(text);
    }
  }

  function handleVoiceCommand(command: string) {
    let reply = "I didn't quite catch that. You can ask me about his skills, projects, experience, or contact information.";
    
    if (command.includes("skill") || command.includes("tech") || command.includes("stack")) {
      reply = `Prince's top skills include ${portfolioData.skills.frontend.slice(0, 3).join(", ")}, ${portfolioData.skills.backend.slice(0, 2).join(", ")}, and Web3 technologies like ${portfolioData.skills.web3[0]}.`;
      router.push("/#skills");
    } else if (command.includes("project") || command.includes("work") || command.includes("build")) {
      reply = `He has worked on several amazing projects, including the ${portfolioData.projects[0].title} and the ${portfolioData.projects[1].title}. Would you like to check out his GitHub?`;
      router.push("/#projects");
    } else if (command.includes("experience") || command.includes("background")) {
      reply = `Prince is a ${portfolioData.role}. ${portfolioData.about.split('.')[0]}.`;
      router.push("/#experience");
    } else if (command.includes("about") || command.includes("who is")) {
      reply = `Let me take you to Prince's About page.`;
      router.push("/about");
    } else if (command.includes("contact") || command.includes("email") || command.includes("hire") || command.includes("reach")) {
      reply = `You can easily reach Prince at ${portfolioData.contact.email} or call him directly at ${portfolioData.contact.mobile}.`;
      router.push("/#contact");
    } else if (command.includes("hello") || command.includes("hi") || command.includes("who are you") || command.includes("what is this")) {
      reply = `Hi there! I'm Prince's Gen AI Voice Assistant. Ask me anything about his portfolio.`;
    }

    speak(reply);
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = "en-US";

        recognitionRef.current.onresult = (event: any) => {
          const text = event.results[0][0].transcript;
          setTranscript(text);
          handleVoiceCommand(text.toLowerCase());
        };

        recognitionRef.current.onspeechend = () => {
          setIsListening(false);
          recognitionRef.current.stop();
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
          setResponse("Sorry, I couldn't hear you clearly.");
        };
      } else {
        setIsSupported(false);
      }
    }
  }, []);

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setTranscript("");
      setResponse("Listening...");
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  if (!isSupported) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="glass-card w-72 md:w-80 p-5 rounded-3xl border border-blue-500/20 shadow-2xl shadow-blue-500/10 origin-bottom-right"
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Bot className="text-blue-400" size={20} />
                  <span className="font-bold text-sm text-white">AI Assistant</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
                  <X size={16} />
                </button>
              </div>

              <div className="h-32 mb-4 flex flex-col justify-end gap-3 text-sm">
                {transcript && (
                  <div className="bg-white/5 rounded-2xl rounded-br-none p-3 px-4 self-end max-w-[85%] border border-white/5">
                    <p className="text-white/80">{transcript}</p>
                  </div>
                )}
                
                {response && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass rounded-2xl rounded-bl-none p-3 px-4 self-start max-w-[85%] border border-blue-500/20"
                  >
                    <p className="text-blue-300 font-medium">{response}</p>
                  </motion.div>
                )}

                {!transcript && !response && (
                  <div className="text-white/40 text-center pb-4 italic">
                    "Ask me about Prince's skills..."
                  </div>
                )}
              </div>

              <button
                onClick={toggleListen}
                className={`w-full py-3 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all ${
                  isListening 
                    ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30" 
                    : "bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                }`}
              >
                {isListening ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Listening...
                  </>
                ) : (
                  <>
                    <Mic size={18} />
                    Tap to Speak
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 relative"
        >
          {isListening && (
            <motion.div 
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute inset-0 rounded-full bg-blue-500/40"
            />
          )}
          {isOpen ? <X size={24} /> : <div className="absolute inset-0 flex items-center justify-center bg-transparent"><Bot size={24} className="mb-[2px] mr-[1px]" /></div>}
        </motion.button>
      </div>
    </>
  );
}
