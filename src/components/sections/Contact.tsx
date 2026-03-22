/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Mail, Github, Linkedin, Twitter, Send, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error: unknown) {
      console.error(error);
      setStatus("error");
      setErrorMessage((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card rounded-[3rem] p-12 md:p-24 overflow-hidden relative">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -mr-48 -mt-48" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
                Let's Build <br />
                <span className="gradient-text">Something Impactful</span>
              </h2>
              <p className="text-white/50 text-xl mb-12 max-w-md">
                Whether you have a Web2 project that needs scaling or a Web3 protocol that needs building, I'm here to help.
              </p>

              <div className="space-y-6">
                <a 
                  href={`mailto:${portfolioData.contact.email}`}
                  className="flex items-center gap-4 text-white/80 hover:text-white transition-colors group"
                >
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:border-blue-500/50 transition-colors">
                    <Mail size={24} />
                  </div>
                  <span className="text-lg font-medium">{portfolioData.contact.email}</span>
                </a>
                
                <div className="flex gap-4 pt-4">
                  {[
                    { icon: <Github />, link: portfolioData.contact.github },
                    { icon: <Linkedin />, link: portfolioData.contact.linkedin },
                    { icon: <Twitter />, link: portfolioData.contact.twitter }
                  ].map((social, i) => (
                    <Link 
                      key={i} 
                      href={social.link} 
                      target="_blank"
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all"
                    >
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/10 min-h-[500px] flex flex-col justify-center">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center space-y-4 py-12 text-center h-full animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/30 mb-2">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Message Sent!</h3>
                  <p className="text-white/60 max-w-[250px]">Thank you for reaching out. I have received your message.</p>
                  <button 
                    onClick={() => setStatus("idle")} 
                    className="mt-6 px-8 py-3 glass rounded-full text-sm font-bold text-white/80 hover:text-white hover:bg-white/10 transition-all"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-2">Name</label>
                    <input 
                      name="name"
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-2">Email</label>
                    <input 
                      name="email"
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-2">Message</label>
                    <textarea 
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project..."
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm font-medium">
                      {errorMessage}
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-white text-black font-bold rounded-2xl hover:bg-white/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>Sending... <Loader2 className="animate-spin" size={18} /></>
                    ) : (
                      <>Send Message <Send size={18} /></>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-white/20 uppercase tracking-widest">
                    Secured by Prisma Engine & Nodemailer
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
