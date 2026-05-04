"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import {
  AnimatedItem,
  AnimatedSection,
} from "@/components/ui/AnimatedSection";
import {
  Code,
  PaintBrush,
  TerminalWindow,
  Atom,
  Cpu,
  Database,
  Globe,
  Brain,
  Robot,
  Lightning,
  Sparkle,
  GitBranch,
  Info,
} from "@phosphor-icons/react";

const DNA_TREE = [
  {
    level: "Foundations",
    image: "/images/lightning_1.png",
    skills: [
      {
        name: "HTML5",
        icon: Code,
        side: "left",
        desc: "The structural foundation of every modern web application.",
        longDesc:
          "Mastering semantic structure, SEO optimization, and accessibility standards.",
      },
      {
        name: "CSS3",
        icon: PaintBrush,
        side: "right",
        desc: "Advanced styling and layout engine.",
        longDesc:
          "Flexbox, Grid, animations, and responsive UI systems.",
      },
      {
        name: "JavaScript",
        icon: TerminalWindow,
        side: "left",
        desc: "The logic engine of the interactive web.",
        longDesc:
          "ES6+, async programming, DOM manipulation.",
      },
      {
        name: "Git",
        icon: GitBranch,
        side: "right",
        desc: "Version control system.",
        longDesc:
          "Branching, merging, collaboration workflows.",
      },
    ],
  },
  {
    level: "Core Systems",
    image: "/images/lightning_2.png",
    skills: [
      {
        name: "React",
        icon: Atom,
        side: "left",
        desc: "Component-based UI architecture.",
        longDesc:
          "Hooks, state management, optimized rendering.",
      },
      {
        name: "Node.js",
        icon: Cpu,
        side: "right",
        desc: "Server runtime.",
        longDesc:
          "Scalable backend systems and APIs.",
      },
      {
        name: "Express",
        icon: Globe,
        side: "left",
        desc: "Web framework.",
        longDesc:
          "REST APIs, middleware, routing.",
      },
      {
        name: "MongoDB",
        icon: Database,
        side: "right",
        desc: "NoSQL database.",
        longDesc:
          "Schema design and aggregation pipelines.",
      },
    ],
  },
  {
    level: "Intelligence & Real-time",
    image: "/images/lightning_3.png",
    skills: [
      {
        name: "AI Chatbots",
        icon: Robot,
        side: "left",
        desc: "Conversational agents.",
        longDesc:
          "Memory, context-aware responses.",
      },
      {
        name: "NLP Intent",
        icon: Brain,
        side: "right",
        desc: "Language understanding.",
        longDesc:
          "Intent detection and classification.",
      },
      {
        name: "WebSockets",
        icon: Lightning,
        side: "left",
        desc: "Real-time communication.",
        longDesc:
          "Low latency data streaming.",
      },
      {
        name: "IoT Control",
        icon: Sparkle,
        side: "right",
        desc: "Device connectivity.",
        longDesc:
          "Hardware-cloud synchronization.",
      },
    ],
  },
];

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // ✅ FIXED: proper scroll line transform (NO merge conflict issue)
  const scrollLineHeight = useTransform(
    pathLength,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative bg-transparent py-32 md:py-48 min-h-[1800px]"
    >
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10">
        
        <AnimatedSection className="text-center mb-40">
          <AnimatedItem>
            <EyebrowBadge>ENGINEERING EVOLUTION // TECH TREE</EyebrowBadge>
          </AnimatedItem>

          <AnimatedItem>
            <h2 className="text-5xl md:text-7xl font-bold text-white">
              Skills <span className="text-accent">Evolution</span>
            </h2>
          </AnimatedItem>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative">
          
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2">
            <div className="absolute inset-0 border-l-2 border-dashed border-white/10" />

            {/* ✅ FIXED animated scroll line */}
            <motion.div
              className="absolute top-0 left-[-1px] w-[4px] bg-accent"
              style={{ height: scrollLineHeight }}
            />
          </div>

          <div className="flex flex-col gap-60">
            {DNA_TREE.map((layer, lIndex) => (
              <div key={layer.level} className="relative">
                <div className="text-center mb-10 text-white">
                  <h3 className="text-3xl font-bold">{layer.level}</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-20">
                  {layer.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="p-6 rounded-3xl bg-white/5 border border-white/10"
                    >
                      <div className="flex items-center gap-4">
                        <skill.icon size={28} className="text-white" />
                        <div>
                          <h4 className="text-white font-bold">
                            {skill.name}
                          </h4>
                          <p className="text-zinc-400 text-sm">
                            {skill.desc}
                          </p>
                        </div>
                      </div>

                      <AnimatePresence>
                        {hoveredSkill === skill.name && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="mt-4 text-zinc-300 text-sm"
                          >
                            {skill.longDesc}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
