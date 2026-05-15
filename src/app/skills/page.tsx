"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIOrb } from "@/components/ui/AIOrb";
import { SkillTreeCanvas } from "@/components/skills/SkillTreeCanvas";
import { LeaderboardSidebar } from "@/components/skills/LeaderboardSidebar";
import { BadgeShowcase } from "@/components/skills/BadgeShowcase";

const DOMAINS = [
  { id: "web", label: "Web Dev", color: "bg-[#0033E6]", textColor: "text-white" },
  { id: "ai", label: "AI/ML", color: "bg-lime", textColor: "text-black" },
  { id: "cyber", label: "Cyber", color: "bg-red-500", textColor: "text-white" },
  { id: "ui", label: "UI/UX", color: "bg-pink-500", textColor: "text-white" },
  { id: "cp", label: "CompProg", color: "bg-black", textColor: "text-white" },
  { id: "os", label: "Open Source", color: "bg-orange-500", textColor: "text-white" },
  { id: "web3", label: "Blockchain", color: "bg-purple-600", textColor: "text-white" },
];

export default function SkillsPage() {
  const [activeDomain, setActiveDomain] = useState("web");

  return (
    <main className="relative w-full min-h-screen bg-[#0033E6] overflow-hidden selection:bg-lime selection:text-black pt-32">
      <Navbar />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center">
        
        {/* Page Header */}
        <section className="relative w-full px-6 pt-12 pb-8">
          <div className="absolute top-0 left-0 w-full flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none opacity-5">
            <h1 className="text-[25vw] font-display font-black text-white tracking-tighter leading-none whitespace-nowrap -mt-12">
              SKILL TREE
            </h1>
          </div>
          
          <div className="max-w-[1400px] mx-auto w-full relative z-10">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <h1 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
                Level Up Your<br/>
                <span className="text-lime text-stroke">Arsenal</span>
              </h1>
              
              {/* XP Progress Bar */}
              <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_#000]">
                <div className="flex justify-between items-end mb-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-lime text-black font-black uppercase px-3 py-1 rounded-lg border-2 border-black text-sm">Lvl 14</span>
                    <span className="font-display font-black text-white text-2xl">7,250 XP</span>
                  </div>
                  <span className="font-bold text-white/60 text-sm uppercase tracking-widest">Next: 10,000 XP</span>
                </div>
                
                <div className="w-full h-4 bg-black/50 rounded-full border-2 border-black overflow-hidden relative">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-lime border-r-2 border-black"
                    initial={{ width: "0%" }}
                    animate={{ width: "72.5%" }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="w-full bg-[#f4f4f5] border-y-8 border-black pt-8 pb-24 mt-12">
          <div className="max-w-[1400px] mx-auto px-6">
            
            {/* Domain Tabs */}
            <div className="flex overflow-x-auto gap-4 pb-8 mb-4 hide-scrollbar">
              {DOMAINS.map(domain => (
                <button
                  key={domain.id}
                  onClick={() => setActiveDomain(domain.id)}
                  className={`flex-shrink-0 px-6 py-3 rounded-xl border-4 border-black font-black uppercase tracking-widest transition-all ${
                    activeDomain === domain.id 
                      ? `${domain.color} ${domain.textColor} shadow-[4px_4px_0px_#000] -translate-y-1 scale-105` 
                      : "bg-white text-black hover:bg-black/5"
                  }`}
                >
                  {domain.label}
                </button>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <SkillTreeCanvas />
              </div>
              <div className="lg:col-span-1">
                <LeaderboardSidebar />
              </div>
            </div>

            {/* Badge Showcase */}
            <div className="mt-16 border-t-8 border-black border-dashed pt-8">
              <BadgeShowcase />
            </div>

          </div>
        </section>

      </div>

      <Footer />
      <AIOrb />
    </main>
  );
}
