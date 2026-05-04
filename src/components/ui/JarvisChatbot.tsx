"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Robot, X, PaperPlaneRight, Sparkle, ChatCircleDots } from "@phosphor-icons/react";

type Message = {
  id: string;
  sender: "user" | "jarvis";
  text: string;
  isAnimated?: boolean;
};

export function JarvisChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "jarvis", text: "System online. I am J.A.R.V.I.S., powered by Gemini AI. I am standing by to provide details on M. Samarjith's skills and projects.", isAnimated: true },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const KNOWLEDGE_BASE = [
    {
      keywords: ["skill", "tech", "stack", "know", "react", "node", "html", "css", "js", "what are your skills"],
      response: "My core protocols (skills) include Next.js, React, Node.js, Express, MongoDB, and modern CSS frameworks. I also specialize in real-time WebSockets, IoT integration, and AI Chatbot development using NLP.",
    },
    {
      keywords: ["project", "work", "portfolio", "build", "made", "app", "website", "show me your projects"],
      response: "I have successfully deployed several high-impact projects, including:\n- Ultra-Fast Food Ordering (React, Node, Razorpay)\n- AI Telegram Chatbot (NLP, Firebase)\n- Smart Home IoT Control (Voice Control, Sensors)\n- College Campus Chatbot\n- Decentralized Healthcare Record System.",
    },
    {
      keywords: ["contact", "hire", "email", "github", "linkedin", "touch", "how do i contact you"],
      response: "You can establish a secure connection via:\nEmail: samarjith2007@gmail.com\nGitHub: @SAMAR106\nLinkedIn: /in/samarjith-m\nOr use the Contact section at the bottom of the page.",
    },
    {
      keywords: ["hello", "hi", "hey", "jarvis", "who", "are", "you"],
      response: "Greetings. I am the J.A.R.V.I.S. interface for M. Samarjith. I am a virtual assistant designed to provide intel on his engineering capabilities and project deployments. How may I assist you?",
    },
  ];

  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || isTyping) return;

    const userMsg = textToSend.trim();
    const newMessages: Message[] = [...messages, { id: Date.now().toString(), sender: "user", text: userMsg }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    // Simulate Jarvis processing delay
    setTimeout(() => {
      const lowerInput = userMsg.toLowerCase();
      let responseText = "I do not have specific intel on that topic. Try asking about his **skills**, **projects**, or how to **contact** him.";

      for (const entry of KNOWLEDGE_BASE) {
        if (entry.keywords.some((kw) => lowerInput.includes(kw))) {
          responseText = entry.response;
          break;
        }
      }

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: "jarvis", text: responseText, isAnimated: true },
      ]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const SUGGESTIONS = [
    "What are your skills?",
    "Show me your projects",
    "How do I contact you?"
  ];

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-black/80 border border-accent shadow-[0_0_20px_rgba(34,211,238,0.4)] backdrop-blur-md transition-all hover:scale-110 hover:shadow-[0_0_30px_rgba(34,211,238,0.8)]"
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        whileHover={{ rotate: 15 }}
      >
        <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping" />
        <ChatCircleDots size={28} weight="duotone" className="text-accent relative z-10" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex h-[450px] w-[90vw] md:w-[380px] flex-col overflow-hidden rounded-[24px] border border-accent/30 bg-[#030712]/95 backdrop-blur-2xl shadow-[0_10px_50px_rgba(34,211,238,0.15)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 border border-accent/40">
                   <div className="absolute inset-0 rounded-full bg-accent animate-[ping_3s_infinite] opacity-20" />
                   <Sparkle size={16} weight="fill" className="text-accent" />
                </div>
                <div>
                  <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-white">J.A.R.V.I.S. AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="font-sans text-[10px] text-accent/80">System Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X size={18} weight="bold" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
              <div className="flex flex-col gap-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={msg.isAnimated ? { opacity: 0, x: msg.sender === "jarvis" ? -10 : 10 } : false}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex max-w-[85%] flex-col ${msg.sender === "user" ? "self-end items-end" : "self-start items-start"}`}
                  >
                    <span className="mb-1 font-mono text-[9px] uppercase tracking-widest text-zinc-500">
                      {msg.sender === "jarvis" ? "System" : "User"}
                    </span>
                    <div
                      className={`rounded-2xl px-4 py-2.5 font-sans text-[13px] leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-accent text-black rounded-tr-sm"
                          : "bg-white/5 text-zinc-200 border border-white/10 rounded-tl-sm shadow-[0_0_15px_rgba(34,211,238,0.05)_inset]"
                      }`}
                    >
                      {msg.text.split("\n").map((line, i) => (
                        <p key={i} className={i !== 0 ? "mt-2" : ""}>{line}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
                
                {/* Quick Suggestions */}
                {messages.length === 1 && !isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap gap-2 mt-2"
                  >
                    {SUGGESTIONS.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(suggestion)}
                        className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5 font-sans text-[11px] text-accent transition-colors hover:bg-accent hover:text-black"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </motion.div>
                )}
                
                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 self-start rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" style={{ animationDelay: "300ms" }} />
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 p-4 bg-black/40">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about skills or projects..."
                  className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-5 pr-12 font-sans text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-accent/50 focus:bg-white/10"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="absolute right-2 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-black transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  <PaperPlaneRight size={16} weight="fill" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
