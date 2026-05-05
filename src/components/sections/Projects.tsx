"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  GithubLogo,
  Cpu,
  Pulse,
  Globe,
  Database,
  Terminal,
} from "@phosphor-icons/react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";

const PROJECTS = [
  {
    id: "p1",
    tag: "⚡ Fast UI",
    title: "Ultra-Fast Food Ordering",
    shortDetail: "Zero-login flow <10s",
    description:
      "QR-based street food ordering where users scan, order, and pay within 10 seconds without login. Includes real-time order tracking, Razorpay integration, and a vendor dashboard with live analytics.",
    tech: ["React", "Node.js", "Razorpay"],
    highlights: ["Payment", "Live Queue", "Admin Dashboard"],
    link: "https://github.com/SAMAR106",
    color: "rgba(34, 211, 238, 1)",
    icon: Pulse,
  },
  {
    id: "p2",
    tag: "🤖 AI Automation",
    title: "Telegram AI Chatbot",
    shortDetail: "NLP-powered interactions",
    description:
      "AI-powered chatbot that handles customer queries, stores conversation data, and automates responses using NLP. Features memory and intent detection.",
    tech: ["Node.js", "NLP", "Telegram API", "Firebase"],
    highlights: ["User Memory", "Intent Detection"],
    link: "https://github.com/SAMAR106/telegram-chatbot",
    color: "rgba(167, 139, 250, 1)",
    icon: Cpu,
  },
  {
    id: "p3",
    tag: "🎓 AI Chatbot",
    title: "College Chatbot",
    shortDetail: "Autonomous campus assistant",
    description:
      "Intelligent campus assistant to help students find resources, answer FAQs, and navigate college services autonomously.",
    tech: ["React", "Python", "NLP"],
    highlights: ["Campus Navigation", "FAQ Engine"],
    link: "https://github.com/deepaklatha1906-ctrl/College-chatbot",
    color: "rgba(244, 114, 182, 1)",
    icon: Globe,
  },
  {
    id: "p4",
    tag: "🏠 Smart IoT",
    title: "Smart Home Control",
    shortDetail: "Real-time hardware sync",
    description:
      "IoT smart home system with voice control, mobile dashboard, and real-time appliance monitoring using sensors and Firebase.",
    tech: ["React", "Firebase", "IoT Sensors", "Voice Control"],
    highlights: ["Mobile UI", "Cloud Sync", "Voice Commands"],
    link: "https://github.com/SAMAR106/home-automation-use-simple-vocie-agent",
    color: "rgba(52, 211, 153, 1)",
    icon: Database,
  },
  {
    id: "p5",
    tag: "📊 Data-Driven",
    title: "Health Tracker",
    shortDetail: "Predictive health analytics",
    description:
      "Health monitoring system tracking daily activity and predicting risks using AI. Includes charts and smart alerts.",
    tech: ["React", "Node.js", "Chart.js", "AI/ML"],
    highlights: ["Real Data Charts", "Alerts", "AI Suggestions"],
    link: "https://github.com/SAMAR106/Healthcare",
    color: "rgba(251, 191, 36, 1)",
    icon: Terminal,
  },
];

export function Projects() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  const springX = useSpring(x, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.1], ["0%", "-20px"]);
  return (
    <section
      id="projects"
      ref={targetRef}
      className="relative h-[500vh] bg-transparent"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Mobile-visible background gradient */}
        <div
          className="absolute inset-0 md:opacity-0 opacity-100 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 100% 60% at 20% 50%, rgba(34,211,238,0.06) 0%, transparent 50%),
              radial-gradient(ellipse 80% 60% at 80% 40%, rgba(167,139,250,0.05) 0%, transparent 50%)
            `,
          }}
        />

        {/* Background Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
        </div>

        {/* Header */}
        <motion.div 
          style={{ opacity: headerOpacity, y: headerY }}
          className="absolute top-24 md:top-32 left-6 md:left-10 z-20 w-full max-w-md pointer-events-none"
        >
          <EyebrowBadge>MISSION RECAP // PROJECT DATA</EyebrowBadge>

          <h2 className="mt-5 font-sans text-4xl md:text-6xl font-bold tracking-tighter text-white">
            Selected <br />
            <span className="text-accent">Archive</span>
          </h2>

          <p className="mt-5 font-mono text-[10px] md:text-xs text-zinc-400 uppercase tracking-[0.2em] max-w-[40ch]">
            Initializing project stream... <br />
            Accessing repositories... <br />
            Visualizing deployments.
          </p>
        </motion.div>

        {/* Scroll Track */}
        <motion.div
          style={{ x: springX }}
          className="flex gap-12 md:gap-24 pl-[15vw] md:pl-[40vw] pt-48 items-center w-max"
        >
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              className="w-[85vw] md:w-[450px] lg:w-[500px] flex-shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="group relative min-h-[480px] rounded-[32px] bg-white/[0.02] backdrop-blur-2xl border border-white/5 hover:border-accent/30 p-8 flex flex-col transition-all duration-700">

                {/* ID */}
                <div className="absolute top-6 right-8 font-mono text-[9px] text-zinc-600 tracking-[0.5em]">
                  Archive-00{index + 1}
                </div>

                {/* Icon */}
                <div className="flex items-center gap-6 mb-10">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10"
                    style={{ backgroundColor: project.color }}
                  >
                    <project.icon size={32} weight="duotone" className="text-black" />
                  </div>

                  <div>
                    <span className="font-mono text-[10px] text-accent uppercase tracking-[0.3em]">
                      {project.tag}
                    </span>
                    <p className="font-mono text-xs text-zinc-500 uppercase">
                      {project.shortDetail}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-5">
                  {project.title}
                </h3>

                <p className="text-sm text-zinc-400 mb-8">
                  {project.description}
                </p>

                {/* Highlights */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                  {project.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-[10px] uppercase text-zinc-300 border-b border-white/10 pb-1"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[8px] uppercase px-2 py-1 bg-white/5 border border-white/10 text-zinc-400 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-12 w-12 flex items-center justify-center rounded-full border border-white/10 hover:bg-white/10 transition"
                  >
                    <GithubLogo size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
