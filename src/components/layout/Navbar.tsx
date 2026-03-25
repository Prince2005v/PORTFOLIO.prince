"use client";

import { cn } from "@/lib/utils";
import { portfolioData } from "@/data/portfolio";
import Link from "next/link";
import { Github, Linkedin, Twitter, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const ConnectButton = dynamic(
  () => import("@rainbow-me/rainbowkit").then((mod) => mod.ConnectButton),
  { ssr: false }
);

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Resume Maker", href: "/resume-maker" },
    { name: "Skills", href: "/#skills" },
    { name: "Projects", href: "/#projects" },
    { name: "Experience", href: "/#experience" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "glass border-b border-white/10 py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold gradient-text tracking-tighter">
          PORTFOLIO.DEV
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors flex items-center gap-1.5"
            >
              {link.name}
              {link.name === "Resume Maker" && (
                <span className="bg-blue-500 text-[8px] font-bold px-1.5 py-0.5 rounded text-white uppercase tracking-tighter">New</span>
              )}
            </Link>
          ))}
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
            <Link href={portfolioData.contact.github} target="_blank" className="text-white/60 hover:text-white">
              <Github size={18} />
            </Link>
            <Link href={portfolioData.contact.linkedin} target="_blank" className="text-white/60 hover:text-white">
              <Linkedin size={18} />
            </Link>
            {mounted && (
              <ConnectButton 
                accountStatus="address"
                showBalance={false}
                chainStatus="icon"
              />
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-white/70 hover:text-white flex items-center justify-between group"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{link.name}</span>
                {link.name === "Resume Maker" && (
                  <span className="bg-blue-500 text-[10px] font-bold px-2 py-0.5 rounded text-white uppercase tracking-tighter">New</span>
                )}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
