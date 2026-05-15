"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Code, BrainCircuit } from "lucide-react";

const DOMAINS = ["All", "Web Dev", "AI/ML", "Security", "Design", "CompProg"];
const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

const STUDENTS = Array.from({ length: 20 }).map((_, i) => {
  const domains = ["Web Dev", "AI/ML", "Security", "Design", "CompProg"];
  const domain = domains[i % domains.length];
  
  const getDomainIcon = () => {
    switch (domain) {
      case "Web Dev": return Code;
      case "Security": return Shield;
      case "AI/ML": return BrainCircuit;
      default: return Zap;
    }
  };

  const getDomainColor = () => {
    switch (domain) {
      case "Web Dev": return "bg-[#0033E6] text-white";
      case "Security": return "bg-red-500 text-white";
      case "AI/ML": return "bg-lime text-black";
      default: return "bg-black text-white";
    }
  };

  return {
    id: i,
    name: `Student _${i + 1}`,
    avatar: `https://i.pravatar.cc/150?img=${(i % 50) + 1}`,
    year: YEARS[i % 4],
    domain,
    level: Math.floor(Math.random() * 50) + 1,
    skills: ["React", "Python", "Docker"].slice(0, (i % 3) + 1),
    Icon: getDomainIcon(),
    color: getDomainColor()
  };
});

export function StudentGrid() {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 py-24 relative z-20">
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-6xl md:text-8xl font-display font-black uppercase tracking-tight leading-[0.9]">
          <span className="text-[#0033E6]">THE</span><br/>
          <span className="text-black bg-lime px-4 py-2 transform -rotate-2 inline-block border-4 border-black shadow-[6px_6px_0px_#000]">
            COLLECTIVE
          </span>
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12">
        <div className="flex flex-wrap gap-2 justify-center">
          {DOMAINS.map((domain, i) => (
            <button 
              key={domain} 
              className={`px-4 py-2 border-4 border-black font-black uppercase text-sm rounded-full transition-all hover:-translate-y-1 ${
                i === 0 
                  ? "bg-black text-white shadow-[4px_4px_0px_#000]" 
                  : "bg-white text-black hover:bg-lime shadow-[4px_4px_0px_transparent] hover:shadow-[4px_4px_0px_#000]"
              }`}
            >
              {domain}
            </button>
          ))}
        </div>
        <div className="flex gap-2 border-4 border-black p-1 rounded-full bg-white">
          <select className="bg-transparent font-bold uppercase tracking-widest text-sm text-black focus:outline-none pl-4 pr-8 py-2 appearance-none cursor-pointer">
            <option>All Years</option>
            {YEARS.map(y => <option key={y}>{y}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {STUDENTS.map((student, i) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white border-4 border-black rounded-[2rem] p-6 shadow-[6px_6px_0px_#000] hover:-translate-y-2 hover:shadow-[8px_8px_0px_#000] transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4 mb-6 relative">
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-black flex-shrink-0">
                <img src={student.avatar} alt={student.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h4 className="font-display font-black text-xl text-black leading-none">{student.name}</h4>
                <span className="text-xs font-bold uppercase tracking-widest text-black/60">{student.year}</span>
              </div>
              
              <div className={`absolute -top-10 -right-8 w-12 h-12 rounded-full border-4 border-black flex items-center justify-center ${student.color} shadow-[2px_2px_0px_#000] transform rotate-12 group-hover:rotate-0 transition-transform`}>
                <student.Icon className="w-5 h-5 stroke-[3]" />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {student.skills.map(skill => (
                <span key={skill} className="bg-[#f4f4f5] border-2 border-black px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider text-black">
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-4 border-t-4 border-black border-dashed">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-black uppercase text-black/60 tracking-widest">Level {student.level}</span>
                <span className="text-xs font-black text-[#0033E6]">XP</span>
              </div>
              <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden border border-black/20">
                <div 
                  className="h-full bg-[#0033E6]" 
                  style={{ width: `${(student.level / 50) * 100}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
