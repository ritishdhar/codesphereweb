"use client";

import { Trophy } from "lucide-react";

const HIGHLIGHTS = [
  { id: 1, title: "Hack to the Future", date: "April 2026", attendees: 150, winner: "Team Vertex" },
  { id: 2, title: "Web3 Summit", date: "March 2026", attendees: 320, winner: "Priya.eth" },
  { id: 3, title: "AI/ML Bootcamp", date: "Jan 2026", attendees: 450, winner: "Neural Knights" },
  { id: 4, title: "CyberSec CTF", date: "Nov 2025", attendees: 200, winner: "0xNull" },
  { id: 5, title: "UI/UX Designathon", date: "Oct 2025", attendees: 180, winner: "Pixel Perfect" },
];

export function PastHighlights() {
  return (
    <section className="w-full mt-24">
      <div className="flex items-center gap-6 mb-12">
        <h2 className="text-5xl md:text-7xl font-display font-black uppercase text-lime drop-shadow-[4px_4px_0px_#000]">
          Greatest<br/>Moments
        </h2>
        <div className="h-4 flex-1 bg-black rounded-full border-2 border-white/20 hidden md:block" />
      </div>

      <div className="flex overflow-x-auto gap-6 pb-12 hide-scrollbar snap-x px-4 -mx-4">
        {HIGHLIGHTS.map(item => (
          <div key={item.id} className="min-w-[300px] sm:min-w-[400px] bg-white border-4 border-black rounded-3xl p-6 shadow-[8px_8px_0px_#000] snap-center group hover:-translate-y-2 transition-transform cursor-pointer flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="bg-black text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">{item.date}</span>
                <Trophy className="w-6 h-6 text-[#FF007F]" />
              </div>
              <h3 className="font-display font-black text-3xl uppercase leading-none text-black mb-4 group-hover:text-[#0033E6] transition-colors">{item.title}</h3>
            </div>
            
            <div className="bg-[#f4f4f5] border-2 border-black rounded-xl p-4 mt-6">
              <div className="flex justify-between items-center mb-3 pb-3 border-b-2 border-black/10">
                <span className="text-[10px] font-black uppercase tracking-widest text-black/50">Attendees</span>
                <span className="font-display font-black text-xl text-black">{item.attendees}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-black bg-lime overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.winner}`} alt={item.winner} className="w-full h-full" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-black/50">Winner</div>
                  <div className="font-bold text-black uppercase">{item.winner}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
