/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Navbar } from "@/components/layout/Navbar";
import { Code2, Globe, Shield, Zap, GraduationCap, Award, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-mesh min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">
              Building the Future, <br />
              <span className="gradient-text">One Line at a Time.</span>
            </h1>
            <p className="text-xl text-white/60 leading-relaxed mb-8">
              Hi, I'm Prince Verma. I'm a Full Stack Developer with a deep interest in Web3 and decentralized technologies. My journey in tech is driven by a desire to solve complex problems and build tools that empower users.
            </p>
          </motion.div>

          {/* Core Values / Philosophy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            {[
              { 
                icon: <Zap className="text-yellow-400" />, 
                title: "Efficiency", 
                desc: "Optimizing every bit of code for maximum performance and speed." 
              },
              { 
                icon: <Shield className="text-blue-400" />, 
                title: "Security", 
                desc: "Prioritizing user data and smart contract integrity in every build." 
              },
              { 
                icon: <Heart className="text-pink-400" />, 
                title: "User-Centric", 
                desc: "Designing experiences that are intuitive, accessible, and delightful." 
              }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 rounded-3xl"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Detailed Story Section */}
          <div className="space-y-16 mb-24">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Code2 className="text-blue-400" /> Full Stack Foundation
                </h2>
                <p className="text-white/60 leading-relaxed italic border-l-2 border-blue-500/30 pl-6">
                  "I believe that the best applications are those where the frontend and backend sing in perfect harmony."
                </p>
                <p className="mt-6 text-white/50">
                  With expertise in Next.js, React, and Node.js, I build scalable Web2 architectures that can handle thousands of concurrent users. Whether it's integrating complex APIs or optimizing database queries in MongoDB and PostgreSQL, I focus on building robust systems.
                </p>
              </div>
              <div className="glass aspect-square rounded-[2rem] flex items-center justify-center p-12">
                <div className="text-center">
                  <div className="text-5xl font-bold gradient-text mb-2">10+</div>
                  <div className="text-white/40 uppercase tracking-widest text-xs">Projects Completed</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              <div className="order-2 md:order-1 glass aspect-square rounded-[2rem] flex items-center justify-center p-12">
                 <div className="text-center">
                  <div className="text-5xl font-bold text-blue-400 mb-2">Web3</div>
                  <div className="text-white/40 uppercase tracking-widest text-xs">Architecting Decentralization</div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Shield className="text-purple-400" /> Web3 & Blockchain
                </h2>
                <p className="text-white/60 leading-relaxed">
                  Transitioning into the world of blockchain, I've developed a strong grasp of Solidity and decentralized protocols. My focus in Web3 is on security, transparency, and building applications that give power back to the users through NFTs, DeFi, and smart contracts.
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {["Solidity", "Ethers.js", "Hardhat", "IPFS", "Wagmi"].map(t => (
                    <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white/60">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Education & Certificates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                <GraduationCap className="text-emerald-400" /> Education
              </h2>
              <div className="space-y-6">
                <div className="glass-card p-6 rounded-2xl">
                  <div className="text-blue-400 text-xs font-bold mb-1 uppercase tracking-wider">2023 - 2027 (Currently 3rd Year)</div>
                  <h4 className="text-lg font-bold text-white">B.Tech, Computer Science & Engineering</h4>
                  <p className="text-white/50 text-sm italic">Ajay Kumar Garg Engineering College</p>
                </div>
                <div className="glass-card p-6 rounded-2xl">
                  <div className="text-blue-400 text-xs font-bold mb-1 uppercase tracking-wider">2020 - 2022</div>
                  <h4 className="text-lg font-bold text-white">Class 12th (PCM), CBSE</h4>
                  <p className="text-white/50 text-sm italic">Ramshree Public School</p>
                </div>
                <div className="glass-card p-6 rounded-2xl">
                  <div className="text-blue-400 text-xs font-bold mb-1 uppercase tracking-wider">2020</div>
                  <h4 className="text-lg font-bold text-white">Class 10th, CBSE</h4>
                  <p className="text-white/50 text-sm italic">Ramshree Public School</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                <Award className="text-yellow-400" /> Certifications
              </h2>
              <ul className="space-y-4">
                {[
                  "Database & SQL",
                  "Front-end Developer",
                  "Amazon Web Services (AWS)",
                  "Data Science with Python",
                  "Python",
                  "Data Analytics Dashboards",
                  "HR Analytics"
                ].map((cert, i) => (
                  <motion.li 
                    key={i}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_5px_rgba(250,204,21,0.5)]" />
                    {cert}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <p className="text-white/30 text-sm">
          &copy; {new Date().getFullYear()} Prince Verma — Architecting the Future
        </p>
      </footer>
    </main>
  );
}
