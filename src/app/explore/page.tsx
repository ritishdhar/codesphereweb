"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIOrb } from "@/components/ui/AIOrb";
import { EcosystemGraph } from "@/components/explore/EcosystemGraph";
import { StatsSidebar } from "@/components/explore/StatsSidebar";
import { StudentBrowser } from "@/components/explore/StudentBrowser";

export default function ExplorePage() {
  return (
    <main className="relative w-full min-h-screen bg-lime overflow-hidden selection:bg-[#0033E6] selection:text-white pt-32">
      <Navbar />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-10 mix-blend-multiply">
        <div className="w-full h-full bg-[linear-gradient(rgba(0,0,0,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.2)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center">
        
        {/* Page Header */}
        <section className="relative w-full px-6 pt-12 pb-8">
          <div className="absolute top-0 left-0 w-full flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none opacity-5 mix-blend-overlay">
            <h1 className="text-[25vw] font-display font-black text-black tracking-tighter leading-none whitespace-nowrap -mt-12">
              ECOSYSTEM
            </h1>
          </div>
          
          <div className="max-w-[1400px] mx-auto w-full relative z-10">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <h1 className="text-5xl md:text-8xl font-display font-black text-black uppercase tracking-tighter leading-[0.9] mb-4">
                The Department<br/>
                <span className="text-[#0033E6]">Neural Network</span>
              </h1>
              <p className="text-xl md:text-2xl font-bold text-black/70 max-w-2xl">
                Every student. Every skill. Every connection. Live.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="w-full px-6 pb-24">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2">
              <EcosystemGraph />
            </div>
            <div className="xl:col-span-1">
              <StatsSidebar />
            </div>
          </div>
        </section>

        {/* Browser */}
        <section className="w-full bg-[#f4f4f5] border-y-8 border-black pt-16 pb-24">
          <div className="max-w-[1400px] mx-auto px-6">
            <StudentBrowser />
          </div>
        </section>

      </div>

      <Footer />
      <AIOrb />
    </main>
  );
}
