"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dna, ArrowRight, RefreshCcw, Share2 } from "lucide-react";

const QUESTIONS = [
  { id: 1, text: "Tabs or Spaces?", options: ["Tabs", "Spaces", "Both (Chaos)"] },
  { id: 2, text: "Dark or Light Mode?", options: ["Dark Mode", "Light Mode"] },
  { id: 3, text: "Ship Fast or Perfect First?", options: ["Ship Fast", "Perfect First"] },
  { id: 4, text: "Solo or Pair Programming?", options: ["Lone Wolf", "Pair Up"] },
  { id: 5, text: "Frontend, Backend, or Full Stack?", options: ["Frontend", "Backend", "Full Stack"] },
  { id: 6, text: "console.log or Breakpoints?", options: ["console.log()", "Debugger"] },
  { id: 7, text: "Coffee or Energy Drink?", options: ["Coffee", "Energy Drink", "Water"] },
  { id: 8, text: "Build New or Optimize?", options: ["Build New", "Optimize"] },
];

export function CodeDnaAnalyzer() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (option: string) => {
    setAnswers(prev => ({ ...prev, [currentQ]: option }));
    
    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ(prev => prev + 1);
      } else {
        setIsComplete(true);
      }
    }, 400);
  };

  const handleReset = () => {
    setCurrentQ(0);
    setAnswers({});
    setIsComplete(false);
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 py-24 relative z-20 border-t-8 border-black">
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tight leading-[0.9]">
          <span className="text-lime text-stroke">DECODE YOUR</span><br/>
          <span className="text-white">CODING DNA</span>
        </h2>
      </div>

      <div className="max-w-4xl mx-auto relative">
        
        {/* Progress Bar */}
        {!isComplete && (
          <div className="w-full h-4 bg-white/20 rounded-full mb-12 border-2 border-black overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-lime border-r-2 border-black"
              initial={{ width: "0%" }}
              animate={{ width: `${(currentQ / QUESTIONS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        <div className="relative min-h-[400px] bg-white rounded-[2rem] border-4 border-black shadow-[12px_12px_0px_#000] p-8 md:p-16 overflow-hidden">
          <AnimatePresence mode="wait">
            {!isComplete ? (
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full justify-center"
              >
                <div className="text-sm font-black uppercase text-[#0033E6] tracking-widest mb-4">
                  Question {currentQ + 1} of {QUESTIONS.length}
                </div>
                <h3 className="text-4xl md:text-6xl font-display font-black text-black uppercase leading-none mb-12">
                  {QUESTIONS[currentQ].text}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {QUESTIONS[currentQ].options.map(option => {
                    const isSelected = answers[currentQ] === option;
                    return (
                      <button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        className={`p-6 border-4 border-black text-xl font-black uppercase tracking-widest transition-all rounded-2xl ${
                          isSelected 
                            ? 'bg-lime text-black shadow-[4px_4px_0px_#000] translate-y-1 translate-x-1' 
                            : 'bg-[#f4f4f5] text-black hover:bg-black hover:text-lime hover:-translate-y-1 shadow-[6px_6px_0px_#000]'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring" }}
                className="flex flex-col items-center text-center h-full justify-center"
              >
                <div className="w-24 h-24 bg-[#0033E6] border-4 border-black rounded-3xl flex items-center justify-center mb-8 shadow-[4px_4px_0px_#000]">
                  <Dna className="w-12 h-12 text-white" />
                </div>
                
                <div className="text-sm font-black uppercase text-black/60 tracking-widest mb-2">
                  Your Signature Sequence
                </div>
                
                <div className="font-mono text-5xl md:text-7xl font-bold text-black bg-lime px-8 py-4 border-4 border-black shadow-[6px_6px_0px_#000] transform -rotate-2 mb-12">
                  PYRX-9F
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-12">
                  <div className="bg-[#f4f4f5] border-4 border-black p-4 rounded-xl">
                    <div className="text-xs font-black text-black/60 uppercase">Archetype</div>
                    <div className="font-display text-xl text-black">Lone Wolf</div>
                  </div>
                  <div className="bg-[#f4f4f5] border-4 border-black p-4 rounded-xl">
                    <div className="text-xs font-black text-black/60 uppercase">Power Language</div>
                    <div className="font-display text-xl text-black">TypeScript</div>
                  </div>
                  <div className="bg-[#f4f4f5] border-4 border-black p-4 rounded-xl">
                    <div className="text-xs font-black text-black/60 uppercase">Kryptonite</div>
                    <div className="font-display text-xl text-black">CSS Centering</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <button 
                    onClick={handleReset}
                    className="flex-1 bg-white text-black border-4 border-black p-4 rounded-xl font-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors flex justify-center items-center gap-2 shadow-[4px_4px_0px_#000]"
                  >
                    <RefreshCcw className="w-5 h-5" /> Retake Test
                  </button>
                  <button className="flex-1 bg-[#0033E6] text-white border-4 border-black p-4 rounded-xl font-black uppercase tracking-widest hover:bg-lime hover:text-black transition-colors flex justify-center items-center gap-2 shadow-[4px_4px_0px_#000]">
                    <Share2 className="w-5 h-5" /> Export DNA
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
