"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIOrb } from "@/components/ui/AIOrb";
import { UpcomingEventCard, PastEventCard, FeaturedEvent } from "@/components/events/EventCards";
import { PastHighlights } from "@/components/events/PastHighlights";

const UPCOMING_EVENTS = [
  {
    id: "e1",
    title: "Global AI Hackathon 2026",
    date: "May 25-27, 2026",
    type: "Hackathon",
    desc: "Join forces to build the next generation of AI tools. 48 hours to create a working prototype. Huge prizes and recruiter presence.",
    tags: ["AI", "NextJS", "Python"],
    color: "bg-[#0033E6]", // Royal Blue
    registered: 342,
    capacity: 500,
    targetDate: "2026-05-25T09:00:00",
  },
  {
    id: "e2",
    title: "Mastering Smart Contracts",
    date: "June 2, 2026",
    type: "Workshop",
    desc: "An intensive 4-hour workshop on Solidity, security patterns, and deploying your first dApp to the Ethereum testnet.",
    tags: ["Web3", "Solidity", "Security"],
    color: "bg-lime", // Lime
    registered: 47,
    capacity: 60,
    targetDate: "2026-06-02T14:00:00",
  }
];

const PAST_EVENTS = [
  {
    id: "p1",
    title: "React Performance Deep Dive",
    date: "May 5, 2026",
    type: "Talk",
    desc: "A masterclass on React Server Components, useMemo, and measuring web vitals in production apps.",
    tags: ["React", "Performance"],
    color: "bg-black",
    attendees: 120,
    projects: 0,
    winner: "N/A",
    recapText: "We explored the absolute limits of React performance, debugging real-world apps with the React Profiler. The key takeaway: memoize wisely, and leverage Server Components to drastically reduce bundle size.",
  },
  {
    id: "p2",
    title: "CyberSec Capture The Flag",
    date: "April 20, 2026",
    type: "Competition",
    desc: "A 12-hour intense CTF competition focusing on web vulnerabilities, reverse engineering, and cryptography.",
    tags: ["Security", "CTF", "Networking"],
    color: "bg-[#FF007F]", // Pink
    attendees: 85,
    projects: 22,
    winner: "0xNull",
    recapText: "An incredible display of offensive security. Team 0xNull managed to root the final boss box in just under 4 hours, exploiting a chained deserialization vulnerability.",
  }
];

export default function EventsPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#111111] overflow-hidden selection:bg-[#FF007F] selection:text-white pt-32">
      <Navbar />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center">
        
        {/* Page Header */}
        <section className="relative w-full px-6 pt-12 pb-16">
          <div className="absolute top-0 left-0 w-full flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none opacity-5">
            <h1 className="text-[25vw] font-display font-black text-white tracking-tighter leading-none whitespace-nowrap -mt-12">
              EVENTS
            </h1>
          </div>
          
          <div className="max-w-[1400px] mx-auto w-full relative z-10 text-center">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <h1 className="text-5xl md:text-8xl font-display font-black text-white uppercase tracking-tighter leading-[0.9] mb-6">
                The Event<br/>
                <span className="text-[#FF007F]">Universe</span>
              </h1>
              <p className="text-xl md:text-2xl font-bold text-white/60 max-w-2xl mx-auto">
                Every workshop. Every hackathon. Every moment that shaped the department.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="w-full px-6 mb-16">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 bg-white/5 backdrop-blur-md border-4 border-white/10 p-4 rounded-[2rem]">
            <div className="flex gap-2">
              {['All', 'Upcoming', 'Past'].map(tab => (
                <button key={tab} className={`px-6 py-2 rounded-xl font-black uppercase tracking-widest text-xs transition-colors ${tab === 'All' ? 'bg-[#FF007F] text-white border-2 border-[#FF007F]' : 'text-white hover:bg-white/10 border-2 border-transparent'}`}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {['Workshop', 'Hackathon', 'Talk', 'Competition'].map(type => (
                <button key={type} className="px-4 py-1.5 rounded-lg font-bold uppercase tracking-widest text-[10px] text-white/70 border-2 border-white/20 hover:border-[#FF007F] transition-colors">
                  {type}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Main Timeline */}
        <section className="w-full px-6 pb-24 relative">
          <div className="max-w-[1400px] mx-auto">
            
            {/* Featured Event (Top) */}
            <FeaturedEvent {...UPCOMING_EVENTS[0]} />

            {/* Timeline Container */}
            <div className="relative mt-24">
              {/* Central Glowing Line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-white/10">
                <motion.div 
                  className="w-full h-32 bg-gradient-to-b from-transparent via-[#FF007F] to-transparent shadow-[0_0_20px_#FF007F]"
                  animate={{ y: ["0%", "1000%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Timeline Nodes */}
              <div className="flex flex-col gap-24 relative z-10">
                
                {/* Upcoming Event (Right side) */}
                <div className="flex justify-end w-full relative">
                  <div className="w-full md:w-[45%] pr-8 md:pr-0 pl-8 md:pl-12 relative">
                    {/* Branch Line */}
                    <div className="hidden md:block absolute top-12 -left-12 w-12 h-1 bg-white/20">
                      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-lime border-4 border-black shadow-[0_0_10px_#D4FF00]" />
                    </div>
                    <UpcomingEventCard {...UPCOMING_EVENTS[1]} />
                  </div>
                </div>

                {/* Past Event (Left side) */}
                <div className="flex justify-start w-full relative">
                  <div className="w-full md:w-[45%] pl-8 md:pl-0 pr-8 md:pr-12 relative">
                    {/* Branch Line */}
                    <div className="hidden md:block absolute top-12 -right-12 w-12 h-1 bg-white/20">
                      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black border-4 border-white/50" />
                    </div>
                    <PastEventCard {...PAST_EVENTS[0]} />
                  </div>
                </div>

                {/* Past Event (Left side) */}
                <div className="flex justify-start w-full relative">
                  <div className="w-full md:w-[45%] pl-8 md:pl-0 pr-8 md:pr-12 relative">
                    {/* Branch Line */}
                    <div className="hidden md:block absolute top-12 -right-12 w-12 h-1 bg-white/20">
                      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black border-4 border-white/50" />
                    </div>
                    <PastEventCard {...PAST_EVENTS[1]} />
                  </div>
                </div>

              </div>
            </div>

            <PastHighlights />

          </div>
        </section>

      </div>

      <Footer />
      <AIOrb />
    </main>
  );
}
