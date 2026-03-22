"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Minus, Square } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export function DevTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: "",
      output: (
        <div className="text-blue-400 mb-2">
          Welcome to PrinceOS (v1.0.0) <br />
          Type 'help' to see available commands.
        </div>
      )
    }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    
    if (!cmd) return;

    let output: React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div className="text-white/80">
            Available commands: <br />
            <span className="text-emerald-400">about</span> - Display profile summary <br />
            <span className="text-emerald-400">skills</span> - List technical skills <br />
            <span className="text-emerald-400">projects</span> - Show featured projects <br />
            <span className="text-emerald-400">contact</span> - Show contact info <br />
            <span className="text-emerald-400">clear</span> - Clear the terminal <br />
            <span className="text-emerald-400">sudo</span> - ???
          </div>
        );
        break;
      case "about":
        output = <div className="text-white/80">{portfolioData.about}</div>;
        break;
      case "skills":
        output = (
          <div className="grid grid-cols-2 gap-2 text-white/80">
            {Object.entries(portfolioData.skills).map(([category, items]) => (
              <div key={category}>
                <strong className="text-blue-400 capitalize">{category}:</strong> {items.join(", ")}
              </div>
            ))}
          </div>
        );
        break;
      case "projects":
        output = (
          <div className="text-white/80 space-y-2">
            {portfolioData.projects.slice(0, 3).map((p) => (
              <div key={p.id}>
                <strong className="text-emerald-400">{p.title}</strong> - {p.tech.join(", ")}
              </div>
            ))}
            <div className="text-white/50 italic">...and more. Type 'projects --all' to see all.</div>
          </div>
        );
        break;
      case "projects --all":
        output = (
          <div className="text-white/80 space-y-2">
            {portfolioData.projects.map((p) => (
              <div key={p.id}>
                <strong className="text-emerald-400">{p.title}</strong> - {p.type} <br/>
              </div>
            ))}
          </div>
        );
        break;
      case "contact":
        output = (
          <div className="text-white/80">
            Email: <a href={`mailto:${portfolioData.contact.email}`} className="text-blue-400 hover:underline">{portfolioData.contact.email}</a> <br />
            GitHub: <a href={portfolioData.contact.github} target="_blank" className="text-blue-400 hover:underline">{portfolioData.contact.github}</a> <br />
            Mobile: {portfolioData.contact.mobile}
          </div>
        );
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "sudo":
      case "sudo rm -rf /":
        output = <div className="text-red-400">Permission denied. Nice try! 😉</div>;
        break;
      case "whoami":
        output = <div className="text-white/80">guest_user</div>;
        break;
      default:
        output = <div className="text-red-400">Command not found: {cmd}. Type 'help' for available commands.</div>;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full glass border border-white/10 text-white flex items-center justify-center hover:bg-white/5 transition-colors shadow-lg shadow-black/50"
        title="Open Developer Terminal"
      >
        <TerminalIcon size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-[#0d1117] rounded-xl overflow-hidden shadow-2xl border border-white/10 flex flex-col font-mono"
            >
              <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-white/10">
                <div className="flex items-center gap-2">
                  <TerminalIcon size={16} className="text-white/50" />
                  <span className="text-xs text-white/50 font-semibold">prince@portfolio:~</span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-white/30 hover:text-white transition-colors"><Minus size={14} /></button>
                  <button className="text-white/30 hover:text-white transition-colors"><Square size={12} /></button>
                  <button onClick={() => setIsOpen(false)} className="text-white/30 hover:text-red-500 transition-colors"><X size={16} /></button>
                </div>
              </div>

              <div 
                ref={scrollRef}
                className="h-[400px] overflow-y-auto p-4 text-sm"
                onClick={() => inputRef.current?.focus()}
              >
                {history.map((h, i) => (
                  <div key={i} className="mb-4">
                    {h.command && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-emerald-400">prince@portfolio</span>
                        <span className="text-white/50">:</span>
                        <span className="text-blue-400">~</span>
                        <span className="text-white/50">$</span>
                        <span className="text-white">{h.command}</span>
                      </div>
                    )}
                    <div>{h.output}</div>
                  </div>
                ))}
                
                <form onSubmit={handleCommand} className="flex items-center gap-2">
                  <span className="text-emerald-400">prince@portfolio</span>
                  <span className="text-white/50">:</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-white/50">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-white font-mono"
                    spellCheck={false}
                    autoComplete="off"
                  />
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
