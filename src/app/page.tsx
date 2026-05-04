"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/ui/Navbar";
import { CanvasBackground } from "@/components/ui/CanvasBackground";
import { Hero } from "@/components/sections/Hero";
import { JarvisChatbot } from "@/components/ui/JarvisChatbot";

const Skills = dynamic(() => import("@/components/sections/Skills").then(mod => mod.Skills), {
  loading: () => <div className="h-[50vh]" />,
  ssr: false
});

const Projects = dynamic(() => import("@/components/sections/Projects").then(mod => mod.Projects), {
  loading: () => <div className="h-[50vh]" />,
  ssr: false
});

const Contact = dynamic(() => import("@/components/sections/Contact").then(mod => mod.Contact), {
  loading: () => <div className="h-[50vh]" />,
  ssr: false
});

const Footer = dynamic(() => import("@/components/sections/Footer").then(mod => mod.Footer), {
  ssr: false
});

export default function Home() {
  return (
    <>
      <Navbar />
      <CanvasBackground />
      <main className="relative z-10">
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <JarvisChatbot />
      <Footer />
    </>
  );
}
