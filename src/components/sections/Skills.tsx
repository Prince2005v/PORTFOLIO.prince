"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export function Skills() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <section id="skills" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
            Technical <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            A comprehensive overview of my expertise across the modern development landscape, from frontend interfaces to smart contracts.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8"
        >
          {Object.entries(portfolioData.skills).map(([category, skills]) => (
            <motion.div 
              key={category} 
              variants={item}
              className="glass-card p-8 rounded-3xl"
            >
              <h3 className="text-xl font-bold text-white mb-6 capitalize border-b border-white/10 pb-2">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/5 text-white/80 border border-white/5 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
