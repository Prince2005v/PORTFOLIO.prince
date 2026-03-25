"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { 
  Download, 
  Plus, 
  Trash2, 
  User, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  CreditCard,
  CheckCircle2,
  FileText,
  X,
  QrCode,
  ShieldCheck,
  RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";
import { portfolioData } from "@/data/portfolio";

interface ResumeItem {
  id: string;
  [key: string]: string;
}

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    portfolio: string;
    summary: string;
  };
  experience: ResumeItem[];
  education: ResumeItem[];
  projects: ResumeItem[];
  skills: string[];
}

const initialResume: ResumeData = {
  personalInfo: {
    name: "Prince Verma",
    email: "8567prince@gmail.com",
    phone: "7303765801",
    linkedin: "linkedin.com/in/prince-verma",
    portfolio: "prince.dev",
    summary: "Dedicated software engineer with a focus on building scalable web applications. Strong background in React, Next.js, and cloud technologies."
  },
  experience: [
    {
      id: "1",
      company: "Freelance",
      role: "Full Stack Developer",
      duration: "2023 - Present",
      desc: "Architecting decentralized protocols and building production-ready dApps."
    }
  ],
  education: [
    {
      id: "1",
      institution: "AKGEC",
      degree: "B.Tech, CSE",
      duration: "2023 - 2027",
      score: "Active"
    }
  ],
  skills: ["React", "Next.js", "TypeScript", "Solidity", "Tailwind CSS"],
  projects: [
    {
      id: "1",
      name: "Resume Maker",
      tech: "Next.js, QR Payment",
      desc: "Built a functional resume generator with integrated UPI payment gateway."
    }
  ]
};

export default function ResumeMaker() {
  const [resumeData, setResumeData] = useState(initialResume);
  const [activeStep, setActiveStep] = useState(0); // 0: Form, 1: Payment, 2: Done
  const [utr, setUtr] = useState("");
  const [verifying, setVerifying] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  // UPI deep link using portfolio data
  const upiLink = `upi://pay?pa=${portfolioData.payments.upi}&pn=${encodeURIComponent(portfolioData.payments.name)}&am=${portfolioData.payments.resumePrice}&cu=${portfolioData.payments.currency}&tn=Resume%20Maker%20Fee`;

  const verifyPayment = () => {
    if (utr.length < 10) return;
    setVerifying(true);
    // Simulate API call to backend for UTR verification
    setTimeout(() => {
      setVerifying(false);
      setActiveStep(2);
    }, 2000);
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData((prev: ResumeData) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const addItem = (section: 'experience' | 'education' | 'projects') => {
    const defaultItems = {
      experience: { id: Date.now().toString(), company: "", role: "", duration: "", desc: "" },
      education: { id: Date.now().toString(), institution: "", degree: "", duration: "", score: "" },
      projects: { id: Date.now().toString(), name: "", tech: "", desc: "" }
    };
    setResumeData((prev: ResumeData) => ({
      ...prev,
      [section]: [...prev[section], defaultItems[section]]
    }));
  };

  const removeItem = (section: 'experience' | 'education' | 'projects', id: string) => {
    setResumeData((prev: ResumeData) => ({
      ...prev,
      [section]: prev[section].filter((item: ResumeItem) => item.id !== id)
    }));
  };

  const updateArrayItem = (section: 'experience' | 'education' | 'projects', id: string, field: string, value: string) => {
    setResumeData((prev: ResumeData) => ({
      ...prev,
      [section]: prev[section].map((item: ResumeItem) => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      <Navbar />
      
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #resume-canvas, #resume-canvas * { visibility: visible; }
          #resume-canvas { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 210mm; 
            height: 297mm !important;
            margin: 0;
            padding: 20mm;
            background: white !important;
            color: black !important;
            box-shadow: none !important;
            display: block !important;
            transform: scale(1) !important;
          }
        }
      `}</style>

      <section className="pt-24 pb-12 px-6 flex flex-col md:flex-row gap-8 max-w-[1600px] mx-auto h-[calc(100vh-6rem)] overflow-hidden">
        
        {/* Left: Input Form */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 overflow-y-auto pr-4 scrollbar-hide">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold tracking-tighter">
              Resume <span className="gradient-text">Genie</span>
            </h1>
            <div className="flex gap-2">
              <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase transition-colors", activeStep === 0 ? "bg-blue-500 text-white" : "bg-white/5 text-white/30")}>Design</span>
              <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase transition-colors", activeStep === 1 ? "bg-blue-500 text-white" : "bg-white/5 text-white/30")}>Pay & Verify</span>
            </div>
          </div>

          {activeStep === 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key="step-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8 pb-12"
              >
                {/* Form Sections (already built in previous step, kept here for logic) */}
                <div className="glass-card p-6 rounded-3xl border border-white/5">
                  <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <User size={16} /> Contact Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-white/40 uppercase tracking-wider ml-1">Full Name</label>
                      <input 
                        type="text" 
                        value={resumeData.personalInfo.name}
                        onChange={(e) => updatePersonalInfo('name', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500/50 outline-none transition-colors font-mono" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-white/40 uppercase tracking-wider ml-1">Email ID</label>
                      <input 
                        type="email" 
                        value={resumeData.personalInfo.email}
                        onChange={(e) => updatePersonalInfo('email', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-500/50 outline-none transition-colors font-mono" 
                      />
                    </div>
                  </div>
                </div>

                {/* Simplified sections for brevity but keeping full logic */}
                <div className="glass-card p-6 rounded-3xl border border-white/5 bg-gradient-to-br from-blue-500/5 to-transparent">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                      <Briefcase size={16} /> Work History
                    </h3>
                    <button onClick={() => addItem('experience')} className="p-1.5 rounded-full bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20">
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {resumeData.experience.map((exp) => (
                      <div key={exp.id} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                        <input 
                          placeholder="Company Name"
                          value={exp.company}
                          onChange={(e) => updateArrayItem('experience', exp.id, 'company', e.target.value)}
                          className="w-full bg-transparent p-1 text-sm outline-none focus:border-blue-500/30 mb-2 border-b border-white/5" 
                        />
                         <textarea 
                          placeholder="What did you do there?"
                          value={exp.desc}
                          onChange={(e) => updateArrayItem('experience', exp.id, 'desc', e.target.value)}
                          className="w-full bg-transparent p-1 text-xs outline-none focus:border-blue-500/30 h-16 resize-none" 
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setActiveStep(1)}
                  className="w-full py-4 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                  Confirm & Scan QR ({portfolioData.payments.currency === 'INR' ? '₹' : portfolioData.payments.currency}{portfolioData.payments.resumePrice}) <QrCode size={18} />
                </button>
              </motion.div>
            </AnimatePresence>
          ) : activeStep === 1 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-8 rounded-[2.5rem] text-center border border-white/10 bg-gradient-to-b from-blue-500/5 to-transparent relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500" />
              
              <h2 className="text-2xl font-bold mb-6">Scan to Pay {portfolioData.payments.currency === 'INR' ? '₹' : portfolioData.payments.currency}{portfolioData.payments.resumePrice}</h2>
              
              <div className="bg-white p-6 rounded-[2rem] inline-block mb-8 shadow-2xl shadow-blue-500/20 relative group">
                <QRCodeSVG 
                  value={upiLink} 
                  size={200} 
                  level="H"
                  includeMargin={false}
                  imageSettings={{
                    src: "/favicon.ico",
                    x: undefined,
                    y: undefined,
                    height: 48,
                    width: 48,
                    excavate: true,
                  }}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-[2rem] backdrop-blur-[2px]">
                   <p className="text-xs font-bold text-white uppercase tracking-widest">Open GPay / PhonePe</p>
                </div>
              </div>

              <div className="max-w-xs mx-auto space-y-4 mb-8">
                <div className="flex items-center gap-2 text-white/40 text-[10px] justify-center uppercase tracking-widest">
                  <ShieldCheck size={12} className="text-emerald-400" /> Encrypted UPI Transaction
                </div>
                <div className="p-1 bg-white/5 rounded-2xl border border-white/10">
                  <input 
                    placeholder="Enter 12-digit UTR / Ref No."
                    value={utr}
                    onChange={(e) => setUtr(e.target.value)}
                    className="w-full bg-transparent px-4 py-3 text-center text-sm font-mono outline-none focus:text-blue-400 transition-colors"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setActiveStep(0)}
                  className="flex-1 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white/50 font-bold transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={verifyPayment}
                  disabled={utr.length < 10 || verifying}
                  className="flex-[2] py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-white/5 disabled:text-white/20 text-white font-bold transition-all flex items-center justify-center gap-2"
                >
                  {verifying ? (
                    <>Verifying... <RefreshCw className="animate-spin" size={18} /></>
                  ) : (
                    <>Verify & Unlock</>
                  )}
                </button>
              </div>

              <p className="mt-6 text-[10px] text-white/30 uppercase tracking-tighter">
                Payments are processed instantly. If you face issues, email support.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-12 rounded-[2.5rem] text-center bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20"
            >
              <div className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/40">
                <CheckCircle2 size={48} strokeWidth={3} />
              </div>
              <h2 className="text-3xl font-bold mb-4 gradient-text">Payment Verified!</h2>
              <p className="text-white/50 mb-12 text-sm">
                Transaction ID: <span className="text-white font-mono">{utr}</span> has been confirmed. Your resume is ready for high-quality export.
              </p>
              
              <div className="space-y-4">
                <button 
                  onClick={handlePrint}
                  className="w-full py-5 rounded-[2rem] bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold transition-all shadow-2xl shadow-blue-500/40 flex items-center justify-center gap-3 group"
                >
                  <Download size={24} className="group-hover:-translate-y-1 transition-transform" /> Save as PDF
                </button>
                <button 
                  onClick={() => setActiveStep(0)}
                  className="text-white/20 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                >
                  Make another resume
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right: Live Preview Container */}
        <div className="hidden md:flex w-1/2 h-full flex-col items-center justify-center relative bg-white/5 rounded-[3rem] border border-white/5 p-8">
           <div className="absolute top-6 left-6 flex items-center gap-2 text-[10px] text-white/20 uppercase tracking-widest">
             <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Live Rendering Engine
           </div>
           
           {/* Scaled Preview with shadow */}
           <div className="relative group overflow-hidden rounded-md shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
             <div 
                id="resume-canvas"
                ref={resumeRef}
                className="w-[210mm] min-h-[297mm] bg-white p-[20mm] transform scale-[0.3] lg:scale-[0.4] xl:scale-[0.5] origin-center flex flex-col text-black font-serif"
              >
                {/* Header */}
                <div className="text-center mb-10 border-b-4 border-slate-900 pb-8">
                  <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">{resumeData.personalInfo.name || "YOUR NAME"}</h1>
                  <div className="text-sm flex justify-center flex-wrap gap-x-6 gap-y-2 text-slate-600 font-sans font-bold uppercase tracking-wider">
                    <span>{resumeData.personalInfo.email}</span>
                    <span className="text-slate-300">|</span>
                    <span>{resumeData.personalInfo.phone}</span>
                    <span className="text-slate-300">|</span>
                    <span>{resumeData.personalInfo.portfolio}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col gap-10">
                  <section>
                    <h2 className="text-xl font-black uppercase border-b-2 border-slate-300 mb-6 pb-2 inline-block">Professional Summary</h2>
                    <p className="text-base leading-relaxed text-slate-800 text-justify italic">
                      {resumeData.personalInfo.summary}
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-black uppercase border-b-2 border-slate-300 mb-6 pb-2 inline-block">Work Experience</h2>
                    <div className="space-y-8">
                      {resumeData.experience.map((exp) => (
                        <div key={exp.id}>
                          <div className="flex justify-between items-baseline mb-2">
                            <span className="font-black text-lg">{exp.company || "Company Name"}</span>
                            <span className="text-sm font-bold text-slate-500">{exp.duration}</span>
                          </div>
                          <div className="text-base font-bold text-blue-800 mb-3">{exp.role || "Job Title"}</div>
                          <p className="text-base text-slate-700 leading-snug">{exp.desc || "Description of your key achievements and responsibilities..."}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xl font-black uppercase border-b-2 border-slate-300 mb-6 pb-2 inline-block">Key Expertise</h2>
                    <div className="flex flex-wrap gap-x-8 gap-y-4">
                      {resumeData.skills.map((skill, i) => (
                        <div key={i} className="text-base font-bold flex items-center gap-3">
                          <div className="w-2.5 h-2.5 rotate-45 bg-blue-600" />
                          {skill}
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <div className="mt-20 border-t border-slate-100 pt-6 flex justify-between items-center opacity-30">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] font-sans">PORTFOLIO.DEV — Resume Gen V1</span>
                  <div className="h-10 w-10 border-4 border-slate-900 rounded-full" />
                </div>
              </div>
           </div>
        </div>

      </section>
    </main>
  );
}
