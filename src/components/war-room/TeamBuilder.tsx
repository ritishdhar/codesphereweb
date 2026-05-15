"use client";

import { useState } from "react";
import { UserPlus, Palette, Code, Server, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ROLES = [
  { id: "design", label: "Designer", icon: Palette, color: "bg-[#FF007F]" },
  { id: "frontend", label: "Frontend", icon: Code, color: "bg-[#0033E6]" },
  { id: "backend", label: "Backend", icon: Server, color: "bg-[#FF5500]" },
  { id: "ai", label: "AI Engineer", icon: Brain, color: "bg-lime" },
];

const MOCK_STUDENTS = [
  { id: 1, name: "Priya.eth", avatar: "https://i.pravatar.cc/150?img=5", archetype: "Frontend Visionary", match: 95, skills: ["React", "Tailwind", "Framer Motion"], role: "frontend" },
  { id: 2, name: "Rahul Singh", avatar: "https://i.pravatar.cc/150?img=12", archetype: "Data Wizard", match: 88, skills: ["Python", "PyTorch", "Pandas"], role: "ai" },
  { id: 3, name: "Arjun Dev", avatar: "https://i.pravatar.cc/150?img=11", archetype: "System Architect", match: 92, skills: ["Node.js", "PostgreSQL", "AWS"], role: "backend" },
  { id: 4, name: "Neha Gupta", avatar: "https://i.pravatar.cc/150?img=20", archetype: "Pixel Perfect", match: 85, skills: ["Figma", "UI/UX", "Illustration"], role: "design" },
];

export function TeamBuilder() {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [invited, setInvited] = useState<number[]>([]);

  const toggleRole = (role: string) => {
    setSelectedRoles(prev => prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]);
  };

  const inviteStudent = (id: number) => {
    setInvited(prev => [...prev, id]);
  };

  const filteredStudents = selectedRoles.length > 0 
    ? MOCK_STUDENTS.filter(s => selectedRoles.includes(s.role))
    : MOCK_STUDENTS;

  return (
    <div className="w-full">
      <div className="flex items-center gap-6 mb-12">
        <h2 className="text-5xl md:text-7xl font-display font-black uppercase text-[#FF007F] drop-shadow-[4px_4px_0px_#000]">
          Build Your<br/>Squad
        </h2>
        <div className="h-4 flex-1 bg-black rounded-full border-2 border-white/20 hidden md:block" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Roles */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-black uppercase tracking-widest text-black/50 mb-6">Select Required Roles</h3>
          {ROLES.map(role => {
            const Icon = role.icon;
            const isSelected = selectedRoles.includes(role.id);
            return (
              <button
                key={role.id}
                onClick={() => toggleRole(role.id)}
                className={`w-full p-6 border-4 border-black rounded-2xl flex items-center gap-6 transition-all ${
                  isSelected 
                    ? `${role.color} ${role.id === "ai" ? "text-black" : "text-white"} shadow-[8px_8px_0px_#000] -translate-y-1` 
                    : "bg-white text-black hover:bg-[#f4f4f5] shadow-[4px_4px_0px_#000]"
                }`}
              >
                <Icon className={`w-8 h-8 stroke-[3] ${isSelected ? "" : "opacity-50"}`} />
                <span className="font-display font-black text-2xl uppercase">{role.label}</span>
              </button>
            );
          })}
        </div>

        {/* Matched Students */}
        <div className="lg:col-span-2">
          <h3 className="font-black uppercase tracking-widest text-black/50 mb-6">Matched Operatives</h3>
          <div className="space-y-6">
            <AnimatePresence>
              {filteredStudents.map(student => (
                <motion.div 
                  key={student.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white border-4 border-black p-6 rounded-[2rem] shadow-[8px_8px_0px_#000] flex flex-col sm:flex-row items-center gap-6"
                >
                  <div className="w-20 h-20 rounded-full border-4 border-black overflow-hidden flex-shrink-0">
                    <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="font-display font-black text-2xl uppercase leading-none mb-1">{student.name}</h4>
                    <div className="text-sm font-bold text-black/60 mb-4">{student.archetype}</div>
                    
                    <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                      {student.skills.map(s => (
                        <span key={s} className="bg-lime/20 border-2 border-lime px-2 py-1 rounded-md text-[10px] font-black uppercase text-black">{s}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-4 w-full sm:w-auto">
                    <div className="text-center">
                      <div className="text-3xl font-display font-black text-[#0033E6]">{student.match}%</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-black/50">Match</div>
                    </div>
                    
                    <button 
                      onClick={() => inviteStudent(student.id)}
                      disabled={invited.includes(student.id)}
                      className={`w-full sm:w-auto px-6 py-3 border-4 border-black rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                        invited.includes(student.id)
                          ? "bg-black text-lime cursor-not-allowed shadow-[2px_2px_0px_#000]"
                          : "bg-white text-black hover:-translate-y-1 hover:shadow-[4px_4px_0px_#000]"
                      }`}
                    >
                      {invited.includes(student.id) ? "Invited" : <><UserPlus className="w-5 h-5" /> Invite</>}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredStudents.length === 0 && (
              <div className="w-full p-12 bg-[#f4f4f5] border-4 border-black border-dashed rounded-[2rem] text-center">
                <div className="font-display font-black text-2xl text-black/40 uppercase mb-2">No Operatives Found</div>
                <p className="font-bold text-black/50">Try selecting different roles to find matches.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
