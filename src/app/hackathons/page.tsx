"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIOrb } from "@/components/ui/AIOrb";
import { UpcomingHackathons } from "@/components/war-room/UpcomingHackathons";
import { IdeaGenerator } from "@/components/war-room/IdeaGenerator";
import { TeamBuilder } from "@/components/war-room/TeamBuilder";
import { PitchBuilder } from "@/components/war-room/PitchBuilder";

export default function WarRoomPage() {
  const [activeTab, setActiveTab] = useState(0);
  
  const TABS = [
    "Upcoming Battles",
    "Idea Generator",
    "Team Builder",
    "Pitch Crafter"
  ];

  return (
    <main className="relative w-full min-h-screen bg-[#f4f4f5] overflow-hidden selection:bg-[#FF5500] selection:text-white pt-32">
      <Navbar />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-5">
        <div className="w-full h-full bg-[linear-gradient(rgba(0,0,0,1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center">
        
        {/* Page Header */}
        <section className="relative w-full px-6 pt-12 pb-8">
          <div className="absolute top-0 left-0 w-full flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none opacity-5">
            <h1 className="text-[25vw] font-display font-black text-black tracking-tighter leading-none whitespace-nowrap -mt-12">
              WAR ROOM
            </h1>
          </div>
          
          <div className="max-w-[1400px] mx-auto w-full relative z-10 text-center md:text-left">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-8"
            >
              <div>
                <h1 className="text-5xl md:text-8xl font-display font-black text-black uppercase tracking-tighter leading-[0.9] mb-6">
                  Hackathon<br/>
                  <span className="text-[#FF5500]">Command Center</span>
                </h1>
                <p className="text-xl md:text-2xl font-bold text-black/60 max-w-2xl">
                  Find your next battle. Build your team. Generate your winning idea.
                </p>
              </div>
              
              <div className="hidden lg:flex gap-4">
                <div className="bg-white border-4 border-black p-4 rounded-2xl shadow-[4px_4px_0px_#000] text-center">
                  <div className="font-display font-black text-3xl text-[#0033E6]">₹12.5L</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-black/50">Total Prize Pool</div>
                </div>
                <div className="bg-white border-4 border-black p-4 rounded-2xl shadow-[4px_4px_0px_#000] text-center">
                  <div className="font-display font-black text-3xl text-lime">14</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-black/50">Active Battles</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="w-full px-6 mb-16 relative z-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex overflow-x-auto gap-4 hide-scrollbar py-4 border-b-4 border-black">
              {TABS.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`flex-shrink-0 px-8 py-4 font-black uppercase tracking-widest transition-all rounded-t-2xl border-4 border-b-0 ${
                    activeTab === i 
                      ? "bg-black text-lime border-black translate-y-1" 
                      : "bg-white text-black border-transparent hover:border-black/20 hover:bg-black/5"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="w-full px-6 pb-24 relative z-10 min-h-[600px]">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {activeTab === 0 && <UpcomingHackathons />}
              {activeTab === 1 && <IdeaGenerator />}
              {activeTab === 2 && <TeamBuilder />}
              {activeTab === 3 && <PitchBuilder />}
            </motion.div>
          </div>
        </section>

      </div>

      <Footer />
      <AIOrb />
    </main>
  );
}
