"use client";

import { Trophy, Code, Flame, Star, Shield, Cpu, GitBranch, Terminal } from "lucide-react";

const BADGES = [
  { id: 1, name: "First Commit", icon: GitBranch, category: "Action", earned: true, date: "May 10, 2026", color: "bg-[#0033E6] text-white" },
  { id: 2, name: "7 Day Streak", icon: Flame, category: "Streak", earned: true, date: "May 14, 2026", color: "bg-orange-500 text-white" },
  { id: 3, name: "CSS Master", icon: Code, category: "Domain", earned: true, date: "May 15, 2026", color: "bg-lime text-black" },
  { id: 4, name: "Top 10 Builder", icon: Trophy, category: "Rank", earned: false, desc: "Reach top 10 on the global leaderboard.", color: "bg-yellow-400 text-black" },
  { id: 5, name: "Security Sentinel", icon: Shield, category: "Domain", earned: false, desc: "Complete 5 security modules.", color: "bg-red-500 text-white" },
  { id: 6, name: "Algorithm God", icon: Cpu, category: "Special", earned: false, desc: "Solve 50 hard algorithm challenges.", color: "bg-purple-500 text-white" },
  { id: 7, name: "Terminal Wizard", icon: Terminal, category: "Special", earned: false, desc: "Complete the bash scripting path.", color: "bg-black text-lime" },
  { id: 8, name: "Rising Star", icon: Star, category: "Event", earned: false, desc: "Win a beginner hackathon.", color: "bg-blue-400 text-black" },
];

export function BadgeShowcase() {
  return (
    <section className="w-full py-16">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-4xl md:text-5xl font-display font-black uppercase text-black">Your Badges</h2>
        <div className="h-2 flex-1 bg-black/10 rounded-full overflow-hidden border-2 border-black hidden sm:block">
           <div className="h-full bg-lime w-[37.5%] border-r-2 border-black" />
        </div>
        <div className="font-black text-xl bg-black text-lime px-4 py-2 rounded-xl border-4 border-black">3 / 8</div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {BADGES.map(badge => {
          const Icon = badge.icon;
          return (
            <div 
              key={badge.id}
              className={`relative p-6 rounded-[2rem] border-4 border-black flex flex-col items-center text-center transition-all group ${
                badge.earned 
                  ? "bg-white shadow-[6px_6px_0px_#000] hover:-translate-y-2 hover:shadow-[8px_8px_0px_#000] cursor-pointer" 
                  : "bg-gray-100 shadow-[2px_2px_0px_#000] opacity-70 grayscale hover:grayscale-0 hover:opacity-100 cursor-help"
              }`}
            >
              <div className={`w-20 h-20 rounded-full border-4 border-black flex items-center justify-center mb-4 shadow-[4px_4px_0px_#000] transform group-hover:rotate-12 transition-transform ${badge.earned ? badge.color : "bg-gray-300 text-gray-500"}`}>
                <Icon className="w-10 h-10 stroke-[3]" />
              </div>
              
              <h4 className="font-display font-black text-xl leading-tight mb-2 uppercase">{badge.name}</h4>
              
              <div className="mt-auto">
                {badge.earned ? (
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0033E6] bg-[#0033E6]/10 px-2 py-1 rounded-md">
                    Unlocked: {badge.date}
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-black/60 leading-tight block">
                    {badge.desc}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
