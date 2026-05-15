"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Building2, BrainCircuit, ShieldAlert, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const ARCHETYPES = [
  {
    id: 1,
    name: "Visionary Architect",
    icon: Building2,
    color: "bg-lime",
    textColor: "text-black",
    traits: ["System Design", "Scalability", "Leadership"]
  },
  {
    id: 2,
    name: "Neural Whisperer",
    icon: BrainCircuit,
    color: "bg-white",
    textColor: "text-black",
    traits: ["AI/ML", "Data Pipelines", "Optimization"]
  },
  {
    id: 3,
    name: "Security Sentinel",
    icon: ShieldAlert,
    color: "bg-lime",
    textColor: "text-black",
    traits: ["Pen Testing", "Cryptography", "Risk Auth"]
  },
  {
    id: 4,
    name: "Full Stack Engine",
    icon: Rocket,
    color: "bg-white",
    textColor: "text-black",
    traits: ["Frontend", "Backend", "Deployment"]
  }
];

export function ArchetypesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % ARCHETYPES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 py-24 relative z-20 overflow-hidden">
      <div className="text-center mb-24 relative z-10">
        <h2 className="text-6xl md:text-8xl font-display font-black uppercase tracking-tight leading-[0.9]">
          <span className="text-white">FIND YOUR</span><br/>
          <span className="text-lime text-stroke">ARCHETYPE</span>
        </h2>
      </div>

      <div className="relative h-[550px] w-full max-w-3xl mx-auto perspective-1000 z-10">
        <div className="absolute inset-0 flex items-center justify-center preserve-3d">
          {ARCHETYPES.map((item, index) => {
            const Icon = item.icon;
            
            let offset = index - activeIndex;
            // Map offsets to -2, -1, 0, 1
            if (offset < -Math.floor(ARCHETYPES.length / 2)) offset += ARCHETYPES.length;
            if (offset > Math.floor(ARCHETYPES.length / 2)) offset -= ARCHETYPES.length;
            
            // In a 4-item array, we get offsets: -1, 0, 1, 2
            // We want item with offset 2 (or -2) to hide behind the center
            const isHidden = Math.abs(offset) > 1;
            const isActive = offset === 0;
            
            const translateZ = isActive ? 0 : (isHidden ? -400 : -200);
            const translateX = isHidden ? 0 : offset * 250;
            const scale = isActive ? 1 : (isHidden ? 0.6 : 0.8);
            const opacity = isActive ? 1 : (isHidden ? 0 : 0.6);
            const rotateY = isHidden ? 0 : -offset * 20;

            return (
              <div
                key={item.id}
                className={cn(
                  "absolute w-[280px] sm:w-[320px] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer",
                  isActive ? "z-20" : "z-10",
                  isHidden && "pointer-events-none"
                )}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity
                }}
                onClick={() => setActiveIndex(index)}
              >
                <div className={`${item.color} p-8 rounded-[3rem] border-[6px] border-black h-[450px] flex flex-col items-center justify-center text-center shadow-[12px_12px_0px_#000] relative overflow-hidden group`}>
                  
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                     <Icon className="w-48 h-48 -mr-12 -mt-12 text-black" />
                  </div>

                  <div className="w-24 h-24 rounded-full flex items-center justify-center mb-8 border-4 border-black bg-[#0033E6] text-white shadow-[4px_4px_0px_#000] relative z-10">
                    <Icon className="w-10 h-10 stroke-[3]" />
                  </div>
                  
                  <h3 className={`text-3xl font-display font-black ${item.textColor} mb-8 relative z-10 leading-tight`}>
                    {item.name}
                  </h3>
                  
                  <div className="space-y-3 w-full mb-8 relative z-10">
                    {item.traits.map((trait, i) => (
                      <div key={i} className="text-sm font-bold uppercase tracking-widest text-black bg-black/5 py-3 rounded-xl border-2 border-black/10">
                        {trait}
                      </div>
                    ))}
                  </div>

                  {isActive && (
                    <motion.button 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-auto font-display font-black tracking-widest text-lg text-[#0033E6] uppercase flex items-center gap-2 hover:gap-4 transition-all relative z-10 bg-white/50 px-6 py-3 rounded-full border-2 border-[#0033E6]"
                    >
                      Select <span>→</span>
                    </motion.button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
