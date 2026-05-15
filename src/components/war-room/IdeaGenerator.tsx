"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Globe, Smartphone, Link, Wifi, Shield, Zap, Bookmark } from "lucide-react";

const DOMAINS = [
  { id: "ai", label: "AI / ML", icon: Cpu },
  { id: "web", label: "Web", icon: Globe },
  { id: "mobile", label: "Mobile", icon: Smartphone },
  { id: "web3", label: "Blockchain", icon: Link },
  { id: "iot", label: "IoT", icon: Wifi },
  { id: "cyber", label: "Cybersecurity", icon: Shield },
];

const TECH_STACKS = ["React", "Next.js", "Python", "Node.js", "Solidity", "TensorFlow", "React Native", "PostgreSQL", "MongoDB", "Rust"];

const MOCK_RESULTS = [
  {
    id: 1,
    title: "EcoChain Sentinel",
    problem: "Carbon offset markets are opaque and prone to double-counting.",
    solution: "A decentralized oracle network that verifies IoT sensor data from carbon capture plants and mints verified offset NFTs automatically.",
    tech: ["Solidity", "React", "IoT", "Node.js"],
    wow: "Zero-knowledge proofs for corporate emission privacy while maintaining public auditability.",
    time: "48 Hours",
  },
  {
    id: 2,
    title: "NeuroType",
    problem: "Dyslexic users struggle with standard web accessibility tools.",
    solution: "A browser extension powered by on-device ML that analyzes reading patterns in real-time and dynamically adjusts typography, spacing, and contrast per paragraph.",
    tech: ["Python", "TensorFlow", "JavaScript", "WebExtensions"],
    wow: "Runs entirely on-device for extreme privacy with zero latency.",
    time: "36 Hours",
  },
  {
    id: 3,
    title: "MeshRescue",
    problem: "Disaster zones lack immediate communication infrastructure when cell towers fall.",
    solution: "A peer-to-peer mobile app utilizing Bluetooth LE mesh networking to route distress signals and location data hop-by-hop to rescue coordinators.",
    tech: ["React Native", "Rust", "WebRTC"],
    wow: "Custom Rust-based routing algorithm optimized for extremely low-power mobile devices.",
    time: "48 Hours",
  }
];

export function IdeaGenerator() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [teamSize, setTeamSize] = useState<number>(1);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<typeof MOCK_RESULTS | null>(null);
  const [saved, setSaved] = useState<number[]>([]);

  const toggleTech = (tech: string) => {
    setSelectedTech(prev => prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]);
  };

  const generateIdeas = () => {
    if (!selectedDomain || selectedTech.length === 0) return;
    setIsGenerating(true);
    setResults(null);
    
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setResults(MOCK_RESULTS);
    }, 3000);
  };

  const toggleSave = (id: number) => {
    setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-6 mb-12">
        <h2 className="text-5xl md:text-7xl font-display font-black uppercase text-lime drop-shadow-[4px_4px_0px_#000]">
          Generate<br/>Your Idea
        </h2>
        <div className="h-4 flex-1 bg-black rounded-full border-2 border-white/20 hidden md:block" />
      </div>

      <div className="bg-white border-8 border-black rounded-[2rem] p-6 md:p-12 shadow-[12px_12px_0px_#000]">
        
        {/* Step 1: Domain */}
        <div className="mb-12">
          <h3 className="font-black uppercase tracking-widest text-black/50 mb-6">Step 1: Select Primary Domain</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {DOMAINS.map(d => {
              const Icon = d.icon;
              const isSelected = selectedDomain === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setSelectedDomain(d.id)}
                  className={`flex flex-col items-center justify-center p-6 border-4 border-black rounded-2xl transition-all shadow-[4px_4px_0px_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000] ${
                    isSelected ? "bg-lime text-black" : "bg-[#f4f4f5] text-black grayscale hover:grayscale-0"
                  }`}
                >
                  <Icon className="w-8 h-8 mb-4 stroke-[3]" />
                  <span className="font-bold uppercase text-[10px] tracking-widest text-center">{d.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2 & 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="font-black uppercase tracking-widest text-black/50 mb-6">Step 2: Tech Stack (Max 4)</h3>
            <div className="flex flex-wrap gap-2">
              {TECH_STACKS.map(tech => {
                const isSelected = selectedTech.includes(tech);
                return (
                  <button
                    key={tech}
                    onClick={() => toggleTech(tech)}
                    disabled={!isSelected && selectedTech.length >= 4}
                    className={`px-4 py-2 border-2 border-black rounded-xl font-bold text-sm uppercase transition-all ${
                      isSelected 
                        ? "bg-[#0033E6] text-white shadow-[2px_2px_0px_#000]" 
                        : "bg-white text-black hover:bg-black/5 disabled:opacity-50 disabled:cursor-not-allowed"
                    }`}
                  >
                    {tech}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div>
            <h3 className="font-black uppercase tracking-widest text-black/50 mb-6">Step 3: Team Size</h3>
            <div className="flex gap-4">
              {[1, 2, 3, 4].map(size => (
                <button
                  key={size}
                  onClick={() => setTeamSize(size)}
                  className={`w-16 h-16 border-4 border-black rounded-2xl font-display font-black text-2xl transition-all shadow-[4px_4px_0px_#000] flex items-center justify-center ${
                    teamSize === size ? "bg-[#FF007F] text-white" : "bg-[#f4f4f5] text-black hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateIdeas}
          disabled={!selectedDomain || selectedTech.length === 0 || isGenerating}
          className="w-full py-6 bg-lime border-8 border-black rounded-2xl font-display font-black text-4xl uppercase tracking-wider text-black shadow-[8px_8px_0px_#000] hover:-translate-y-2 hover:shadow-[12px_12px_0px_#000] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:-translate-y-0 disabled:hover:shadow-[8px_8px_0px_#000] flex items-center justify-center gap-4"
        >
          {isGenerating ? "Briefing the AI..." : <><Zap className="w-10 h-10" /> Generate Ideas</>}
        </button>

        {/* Results */}
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-16 space-y-8"
            >
              {results.map((res, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  key={res.id} 
                  className="bg-[#111111] border-4 border-black p-8 rounded-3xl shadow-[8px_8px_0px_#000] relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF007F] blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity" />
                  
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <h4 className="font-display font-black text-4xl text-lime uppercase">{res.title}</h4>
                    <span className="bg-white/10 px-4 py-2 rounded-xl text-white font-black uppercase text-xs border-2 border-white/20">{res.time}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 relative z-10">
                    <div>
                      <h5 className="text-[10px] font-black uppercase tracking-widest text-[#FF007F] mb-2">The Problem</h5>
                      <p className="text-white/80 font-bold leading-relaxed">{res.problem}</p>
                    </div>
                    <div>
                      <h5 className="text-[10px] font-black uppercase tracking-widest text-[#0033E6] mb-2">The Solution</h5>
                      <p className="text-white/80 font-bold leading-relaxed">{res.solution}</p>
                    </div>
                  </div>

                  <div className="bg-[#FF007F]/10 border-2 border-[#FF007F] p-4 rounded-xl mb-8 relative z-10">
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-[#FF007F] mb-1">Wow Factor</h5>
                    <p className="text-[#FF007F] font-bold">{res.wow}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-6 relative z-10">
                    <div className="flex flex-wrap gap-2">
                      {res.tech.map(t => (
                        <span key={t} className="bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-xs font-bold text-white uppercase">{t}</span>
                      ))}
                    </div>
                    
                    <div className="flex gap-4 w-full sm:w-auto">
                      <button 
                        onClick={() => toggleSave(res.id)}
                        className={`p-4 border-4 rounded-xl flex items-center justify-center transition-all ${
                          saved.includes(res.id) 
                            ? "bg-lime border-lime text-black" 
                            : "bg-transparent border-white/20 text-white hover:border-lime hover:text-lime"
                        }`}
                      >
                        <Bookmark className="w-6 h-6" />
                      </button>
                      <button className="flex-1 sm:flex-none px-8 py-4 bg-white text-black border-4 border-white rounded-xl font-black uppercase tracking-widest hover:bg-lime hover:border-lime transition-all text-sm">
                        Build Team For This
                      </button>
                    </div>
                  </div>

                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
