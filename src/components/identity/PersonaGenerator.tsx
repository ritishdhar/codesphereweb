"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Sparkles, Share2, Loader2, Code2 } from "lucide-react";

const SKILLS = ["React", "Python", "Figma", "Node.js", "ML", "Solidity", "C++", "Go", "AWS", "Docker"];

export function PersonaGenerator() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<null | any>(null);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setResult({
        title: "Visionary Architect",
        traits: ["System Design", "Scalability", "Leadership"],
        desc: "You see the entire matrix. While others build components, you build ecosystems. You orchestrate complex systems into elegant, scalable solutions.",
        dna: "SYS-ARCH-9F",
      });
    }, 2500);
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 py-24 relative z-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative">
        
        {/* Form Column */}
        <div className="bg-white p-8 md:p-12 rounded-[2rem] border-4 border-black shadow-[8px_8px_0px_#000] relative">
          <div className="absolute -top-6 -left-6 bg-lime text-black font-black uppercase border-4 border-black px-6 py-2 rounded-full transform -rotate-3 text-xl shadow-[4px_4px_0px_#000]">
            Input Data
          </div>

          <form onSubmit={handleGenerate} className="space-y-8 mt-6">
            <div className="space-y-3">
              <label className="font-display font-black text-xl uppercase tracking-wider">Your Name</label>
              <input 
                required
                type="text" 
                placeholder="Enter your handle..."
                className="w-full bg-[#f4f4f5] border-4 border-black p-4 rounded-2xl font-bold text-black placeholder:text-black/50 focus:outline-none focus:border-[#0033E6] focus:bg-white transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="font-display font-black text-lg uppercase tracking-wider">Year</label>
                <select className="w-full bg-[#f4f4f5] border-4 border-black p-4 rounded-2xl font-bold text-black focus:outline-none focus:border-[#0033E6] transition-colors appearance-none cursor-pointer">
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="font-display font-black text-lg uppercase tracking-wider">Branch</label>
                <select className="w-full bg-[#f4f4f5] border-4 border-black p-4 rounded-2xl font-bold text-black focus:outline-none focus:border-[#0033E6] transition-colors appearance-none cursor-pointer">
                  <option>CSE</option>
                  <option>IT</option>
                  <option>ECE</option>
                  <option>MCA</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="font-display font-black text-xl uppercase tracking-wider">Top Skills</label>
              <div className="flex flex-wrap gap-3">
                {SKILLS.map(skill => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-4 py-2 rounded-full border-4 border-black font-black uppercase text-sm transition-all hover:-translate-y-1 ${
                      selectedSkills.includes(skill) 
                        ? 'bg-lime text-black shadow-[4px_4px_0px_#000]' 
                        : 'bg-white text-black/60 hover:bg-black/5'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <button 
              type="submit"
              disabled={isGenerating}
              className="w-full bg-[#0033E6] text-white border-4 border-black p-6 rounded-2xl font-display font-black text-2xl uppercase tracking-widest hover:bg-lime hover:text-black transition-all shadow-[6px_6px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#000] flex justify-center items-center gap-3 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-8 h-8 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-8 h-8 group-hover:animate-pulse" />
                  Generate Identity
                </>
              )}
            </button>
          </form>
        </div>

        {/* Result Column */}
        <div className="relative h-full min-h-[500px]">
          <AnimatePresence mode="wait">
            {!result && !isGenerating && (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 border-4 border-dashed border-white/30 rounded-[2rem] flex flex-col items-center justify-center text-center p-12"
              >
                <BrainCircuit className="w-24 h-24 text-white/30 mb-6" />
                <h3 className="font-display text-3xl font-black text-white/50 uppercase">Awaiting Data</h3>
                <p className="text-white/40 font-bold mt-2">Fill out the matrix to reveal your true developer archetype.</p>
              </motion.div>
            )}

            {isGenerating && (
              <motion.div 
                key="generating"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <div className="relative w-40 h-40 flex items-center justify-center mb-8">
                  <div className="absolute inset-0 rounded-full border-8 border-lime border-t-transparent animate-spin" />
                  <div className="absolute inset-4 rounded-full border-8 border-[#0033E6] border-b-transparent animate-[spin_2s_linear_infinite_reverse]" />
                  <Code2 className="w-12 h-12 text-white animate-pulse" />
                </div>
                <h3 className="font-display text-4xl font-black text-lime uppercase animate-pulse text-center">Running<br/>Neural Scan</h3>
              </motion.div>
            )}

            {result && !isGenerating && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 50, rotateY: 90 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ type: "spring", duration: 1 }}
                className="absolute inset-0 bg-white p-8 md:p-10 rounded-[2rem] border-4 border-black shadow-[8px_8px_0px_#000] flex flex-col"
              >
                <div className="flex-1">
                  <div className="w-24 h-24 bg-lime border-4 border-black rounded-3xl flex items-center justify-center mb-8 shadow-[4px_4px_0px_#000] transform -rotate-6">
                    <Sparkles className="w-12 h-12 text-black" />
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-display font-black text-black uppercase leading-[0.9] mb-6">
                    {result.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {result.traits.map((trait: string) => (
                      <span key={trait} className="bg-black text-lime px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest border-2 border-black">
                        {trait}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-xl font-bold text-black/80 leading-relaxed mb-8">
                    {result.desc}
                  </p>
                  
                  <div className="bg-[#f4f4f5] p-6 rounded-2xl border-4 border-black border-dashed">
                    <div className="text-sm font-black uppercase tracking-widest text-[#0033E6] mb-2">Your CodeDNA</div>
                    <div className="font-mono text-2xl font-bold text-black">{result.dna}</div>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t-4 border-black flex gap-4">
                  <button className="flex-1 bg-lime text-black border-4 border-black p-4 rounded-xl font-black uppercase tracking-widest hover:bg-black hover:text-lime transition-colors flex justify-center items-center gap-2 shadow-[4px_4px_0px_#000]">
                    <Share2 className="w-5 h-5" /> Share Identity
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
