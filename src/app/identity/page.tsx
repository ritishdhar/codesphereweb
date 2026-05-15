"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIOrb } from "@/components/ui/AIOrb";
import { PersonaGenerator } from "@/components/identity/PersonaGenerator";
import { CodeDnaAnalyzer } from "@/components/identity/CodeDnaAnalyzer";
import { StudentGrid } from "@/components/identity/StudentGrid";

export default function IdentityPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#0033E6] overflow-hidden selection:bg-lime selection:text-black pt-32">
      <Navbar />
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center">
        
        {/* Page Header */}
        <section className="relative w-full text-center px-6 pt-12 pb-8">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none">
            <h1 className="text-[25vw] font-display font-black text-white/5 tracking-tighter leading-none whitespace-nowrap mt-24">
              IDENTITY
            </h1>
          </div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative z-10 max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.9] mb-6">
              Discover Your<br/>
              <span className="text-lime text-stroke">Developer Persona</span>
            </h1>
            <p className="text-xl md:text-2xl font-bold text-white/90 max-w-2xl mx-auto">
              AI analyzes your skills, habits, and personality to generate your unique developer archetype.
            </p>
          </motion.div>
        </section>

        <PersonaGenerator />
        
        <div className="w-full bg-lime border-y-8 border-black">
          <CodeDnaAnalyzer />
        </div>
        
        <div className="w-full bg-[#f4f4f5]">
          <StudentGrid />
        </div>

      </div>

      <Footer />
      <AIOrb />
    </main>
  );
}
