"use client";

import { motion } from "framer-motion";
import { Trophy, Code, BookOpen, Shield } from "lucide-react";

export function FeaturedAchievements() {
  const achievements = [
    {
      id: 1,
      name: "Priya Patel",
      title: "Global Hackathon Winner",
      type: "win",
      color: "bg-lime",
      icon: Trophy,
      avatar: "https://i.pravatar.cc/150?img=47"
    },
    {
      id: 2,
      name: "Rohan Kumar",
      title: "AWS Certified Architect",
      type: "cert",
      color: "bg-white",
      icon: Shield,
      avatar: "https://i.pravatar.cc/150?img=33"
    },
    {
      id: 3,
      name: "Ananya Sharma",
      title: "Published AI Research",
      type: "research",
      color: "bg-lime",
      icon: BookOpen,
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
      id: 4,
      name: "Dev Singh",
      title: "100 Days of Code",
      type: "streak",
      color: "bg-white",
      icon: Code,
      avatar: "https://i.pravatar.cc/150?img=12"
    },
    {
      id: 5,
      name: "Neha Gupta",
      title: "Defcon CTF Finalist",
      type: "win",
      color: "bg-lime",
      icon: Trophy,
      avatar: "https://i.pravatar.cc/150?img=20"
    }
  ];

  const duplicatedAchievements = [...achievements, ...achievements];

  return (
    <section className="w-full py-24 relative z-20 overflow-hidden bg-white mt-12 border-y-8 border-black">
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 mb-12 text-center relative z-10 pt-12">
        <h2 className="text-6xl md:text-8xl font-display font-black uppercase tracking-tight leading-[0.9]">
          <span className="text-black">HALL OF</span><br/>
          <span className="text-[#0033E6]">FAME</span>
        </h2>
      </div>

      <div className="relative w-full flex overflow-hidden group pt-10 pb-12">
        <motion.div
          className="flex gap-8 px-4"
          animate={{ x: [0, -2000] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
        >
          {duplicatedAchievements.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={`${item.id}-${i}`}
                className={`w-[320px] flex-shrink-0 rounded-3xl p-6 relative group/card border-4 border-black shadow-[6px_6px_0px_#000] ${item.color} hover:-translate-y-2 transition-transform duration-300`}
              >
                {/* Floating Badge */}
                <div 
                  className="absolute -top-6 -right-6 w-14 h-14 rounded-full flex items-center justify-center border-4 border-black bg-[#0033E6] text-white transform rotate-12 group-hover/card:rotate-0 transition-transform shadow-[4px_4px_0px_#000]"
                >
                  <Icon className="w-6 h-6 stroke-[3]" />
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-black">
                    <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-black font-display font-black text-xl">{item.name}</div>
                    <div className="text-xs font-bold uppercase tracking-widest text-black/60">
                      {item.type}
                    </div>
                  </div>
                </div>
                
                <div className="text-2xl font-display font-black text-black mt-2 leading-tight">
                  {item.title}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
