"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
              Featured <span className="gradient-text">Work</span>
            </h2>
            <p className="text-white/60 max-w-lg">
              Showcase of some of my most impactful projects, ranging from AI full-stack applications to secure decentralized protocols.
            </p>
          </div>
          <Link href={portfolioData.contact.github} target="_blank" className="text-white/60 hover:text-white flex items-center gap-2 group transition-colors">
            View all projects on GitHub <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {portfolioData.projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass-card p-1 rounded-[2rem] overflow-hidden group"
            >
              <div className="p-8 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20">
                    {project.type}
                  </div>
                  <div className="flex gap-4">
                    <Link href={project.github} target="_blank" className="text-white/40 hover:text-white transition-colors">
                      <Github size={20} />
                    </Link>
                    <Link href={project.link} target="_blank" className="text-white/40 hover:text-white transition-colors">
                      <ExternalLink size={20} />
                    </Link>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[10px] uppercase font-bold text-white/30">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
