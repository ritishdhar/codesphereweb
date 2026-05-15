"use client";

import { Activity, Flame, Users, Zap } from "lucide-react";

export function StatsSidebar() {
  return (
    <div className="w-full bg-white border-4 border-black rounded-[2rem] shadow-[8px_8px_0px_#000] overflow-hidden flex flex-col h-full min-h-[600px]">
      <div className="p-6 border-b-4 border-black bg-lime flex items-center justify-between">
        <h3 className="font-display font-black text-2xl uppercase tracking-wider text-black">Pulse</h3>
        <Activity className="w-6 h-6 animate-pulse" />
      </div>

      <div className="p-6 flex-1 bg-[#f4f4f5] space-y-6 overflow-y-auto">
        
        {/* Most Connected */}
        <div className="bg-white border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_#000]">
          <div className="flex items-center gap-2 mb-4 text-[#0033E6]">
            <Users className="w-5 h-5" />
            <span className="font-black uppercase tracking-widest text-xs">Most Connected</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-black overflow-hidden flex-shrink-0">
              <img src="https://i.pravatar.cc/150?img=11" alt="Arjun" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-display font-black text-xl">Arjun Dev</div>
              <div className="text-sm font-bold text-black/60">42 Connections</div>
            </div>
          </div>
        </div>

        {/* Hottest Domain */}
        <div className="bg-white border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_#000]">
          <div className="flex items-center gap-2 mb-4 text-[#FF007F]">
            <Flame className="w-5 h-5" />
            <span className="font-black uppercase tracking-widest text-xs">Hottest Domain</span>
          </div>
          <div className="font-display font-black text-3xl uppercase">Web Dev</div>
          <div className="text-sm font-bold text-black/60 mt-1">+124 actions this week</div>
        </div>

        {/* Global Stats */}
        <div className="bg-[#0033E6] border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_#000] text-white">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-lime" />
            <span className="font-black uppercase tracking-widest text-xs">Total Network Power</span>
          </div>
          <div className="font-display font-black text-4xl text-lime">1.2M XP</div>
        </div>

        {/* Live Feed */}
        <div>
          <h4 className="font-black uppercase tracking-widest text-xs text-black/50 mb-4">Live Activity Feed</h4>
          <div className="space-y-3">
            {[
              { time: "2m ago", text: "Rahul unlocked Python" },
              { time: "15m ago", text: "Priya connected with Arjun" },
              { time: "1h ago", text: "Neha published AI Classifier" },
              { time: "2h ago", text: "Dev joined Web Dev domain" },
            ].map((feed, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <span className="font-black text-[#0033E6] whitespace-nowrap">{feed.time}</span>
                <span className="font-bold text-black/80">{feed.text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
