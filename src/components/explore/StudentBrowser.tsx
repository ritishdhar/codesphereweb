"use client";

import { ArrowRight, Star } from "lucide-react";

const STUDENTS = [
  { id: 1, name: "Arjun Dev", avatar: "https://i.pravatar.cc/150?img=11", archetype: "System Architect", domains: ["Web Dev", "AI/ML"], xp: 142000, connections: 42 },
  { id: 2, name: "Priya.eth", avatar: "https://i.pravatar.cc/150?img=5", archetype: "Frontend Visionary", domains: ["Web Dev", "UI/UX"], xp: 128500, connections: 38 },
  { id: 3, name: "Rahul Singh", avatar: "https://i.pravatar.cc/150?img=12", archetype: "Data Wizard", domains: ["AI/ML"], xp: 115200, connections: 25 },
  { id: 4, name: "Neha Gupta", avatar: "https://i.pravatar.cc/150?img=20", archetype: "Security Sentinel", domains: ["Cyber"], xp: 98000, connections: 18 },
  { id: 5, name: "Dev Kumar", avatar: "https://i.pravatar.cc/150?img=60", archetype: "Open Sourcerer", domains: ["Open Source"], xp: 6800, connections: 12 },
];

export function StudentBrowser() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-display font-black uppercase text-black">All Members</h2>
        <div className="flex gap-2">
          <select className="bg-white border-4 border-black px-4 py-2 rounded-xl font-bold uppercase tracking-widest text-xs focus:outline-none appearance-none cursor-pointer shadow-[4px_4px_0px_#000]">
            <option>Sort: Highest XP</option>
            <option>Sort: Most Connected</option>
            <option>Sort: Recent Activity</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {STUDENTS.map(student => (
          <div key={student.id} className="bg-white border-4 border-black p-4 md:p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000]">
            
            <div className="flex items-center gap-4 w-full md:w-auto md:flex-1">
              <div className="w-16 h-16 rounded-full border-4 border-black overflow-hidden flex-shrink-0">
                <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-display font-black text-2xl uppercase leading-none">{student.name}</h3>
                <div className="text-sm font-bold text-black/60">{student.archetype}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-auto md:flex-1 justify-start md:justify-center">
              {student.domains.map(d => (
                <span key={d} className="bg-lime border-2 border-black px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest text-black">
                  {d}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between w-full md:w-auto gap-8">
              <div className="text-center">
                <div className="text-[10px] font-black uppercase text-black/50">XP Earned</div>
                <div className="font-display font-black text-[#0033E6] text-xl">{student.xp.toLocaleString()}</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] font-black uppercase text-black/50">Network</div>
                <div className="font-display font-black text-black text-xl">{student.connections}</div>
              </div>
              <button className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:bg-[#0033E6] transition-colors border-2 border-black flex-shrink-0">
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
