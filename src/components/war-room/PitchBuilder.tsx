"use client";

import { useState } from "react";
import { Mic, Copy, RefreshCw, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function PitchBuilder() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [script, setScript] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generatePitch = () => {
    setIsGenerating(true);
    setScript(null);
    setCopied(false);

    // Simulate Gemini API call
    setTimeout(() => {
      setIsGenerating(false);
      setScript("generated");
    }, 3000);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-6 mb-12">
        <h2 className="text-5xl md:text-7xl font-display font-black uppercase text-[#0033E6] drop-shadow-[4px_4px_0px_#000]">
          Craft Your<br/>Pitch
        </h2>
        <div className="h-4 flex-1 bg-black rounded-full border-2 border-white/20 hidden md:block" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Form */}
        <div className="bg-white border-8 border-black p-8 md:p-12 rounded-[2rem] shadow-[12px_12px_0px_#000]">
          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-black/50 mb-2">The Problem</label>
              <textarea placeholder="What are you solving?" className="w-full p-4 bg-[#f4f4f5] border-4 border-black rounded-xl font-bold text-black focus:outline-none focus:border-[#0033E6] min-h-[100px] resize-none shadow-[4px_4px_0px_#000]" />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-black/50 mb-2">The Solution</label>
              <textarea placeholder="How does your project solve it?" className="w-full p-4 bg-[#f4f4f5] border-4 border-black rounded-xl font-bold text-black focus:outline-none focus:border-[#0033E6] min-h-[100px] resize-none shadow-[4px_4px_0px_#000]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-black/50 mb-2">Target Users</label>
                <input type="text" placeholder="e.g. Students" className="w-full p-4 bg-[#f4f4f5] border-4 border-black rounded-xl font-bold text-black focus:outline-none focus:border-[#0033E6] shadow-[4px_4px_0px_#000]" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-black/50 mb-2">Tech Stack</label>
                <input type="text" placeholder="e.g. Next.js, OpenAI" className="w-full p-4 bg-[#f4f4f5] border-4 border-black rounded-xl font-bold text-black focus:outline-none focus:border-[#0033E6] shadow-[4px_4px_0px_#000]" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-black/50 mb-2">Impact</label>
              <input type="text" placeholder="What is the wow factor?" className="w-full p-4 bg-[#f4f4f5] border-4 border-black rounded-xl font-bold text-black focus:outline-none focus:border-[#0033E6] shadow-[4px_4px_0px_#000]" />
            </div>
          </div>

          <button 
            onClick={generatePitch}
            disabled={isGenerating}
            className="w-full py-6 bg-[#0033E6] border-4 border-black rounded-xl font-display font-black text-2xl md:text-3xl uppercase tracking-wider text-white shadow-[6px_6px_0px_#000] hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4"
          >
            {isGenerating ? "Consulting AI..." : <><Mic className="w-8 h-8" /> Generate Script</>}
          </button>
        </div>

        {/* Output */}
        <div className="relative">
          <AnimatePresence>
            {!script ? (
              <motion.div 
                exit={{ opacity: 0 }}
                className="w-full h-full min-h-[400px] border-4 border-black border-dashed rounded-[2rem] flex flex-col items-center justify-center p-12 text-center"
              >
                <Mic className="w-16 h-16 text-black/20 mb-6" />
                <h3 className="font-display font-black text-3xl uppercase text-black/30 mb-4">Awaiting Input</h3>
                <p className="text-black/50 font-bold max-w-sm">Fill out the form and hit generate to let our AI write a killer 3-minute pitch script for your project.</p>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#111111] border-8 border-black p-8 md:p-12 rounded-[2rem] shadow-[12px_12px_0px_#000] text-white"
              >
                <div className="flex justify-between items-center mb-8 pb-6 border-b-4 border-white/10">
                  <h3 className="font-display font-black text-3xl uppercase text-lime">Final Script</h3>
                  <div className="flex gap-2">
                    <button onClick={handleCopy} className="p-3 bg-white/10 border-2 border-white/20 rounded-xl hover:bg-white hover:text-black transition-colors">
                      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                    <button onClick={generatePitch} className="p-3 bg-white/10 border-2 border-white/20 rounded-xl hover:bg-lime hover:text-black hover:border-lime transition-colors">
                      <RefreshCw className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-8 font-mono text-sm leading-relaxed">
                  <div>
                    <div className="flex justify-between text-[#FF007F] font-bold uppercase mb-2 tracking-widest">
                      <span>1. The Hook</span>
                      <span>[0:30]</span>
                    </div>
                    <p className="text-white/80">"Imagine a world where carbon offsets aren't just corporate greenwashing, but mathematically provable truths. Hi, we are Team Vertex, and today we're fixing the opaque carbon market."</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-[#0033E6] font-bold uppercase mb-2 tracking-widest">
                      <span>2. The Problem</span>
                      <span>[0:30]</span>
                    </div>
                    <p className="text-white/80">"Currently, offset markets suffer from double-counting and zero transparency. Companies buy credits, but no one knows if the carbon was actually captured."</p>
                  </div>

                  <div>
                    <div className="flex justify-between text-lime font-bold uppercase mb-2 tracking-widest">
                      <span>3. The Solution & Tech</span>
                      <span>[0:45]</span>
                    </div>
                    <p className="text-white/80">"Enter EcoChain Sentinel. We built a decentralized oracle network. Our hardware IoT sensors connect directly to carbon capture plants. When carbon is captured, the sensor cryptographically signs the data and sends it to our Solidity smart contract, automatically minting a verified NFT."</p>
                  </div>

                  <div>
                    <div className="flex justify-between text-[#FF5500] font-bold uppercase mb-2 tracking-widest">
                      <span>4. Demo Walkthrough</span>
                      <span>[0:30]</span>
                    </div>
                    <p className="text-white/80">"[Switch to screen] As you can see on our Next.js dashboard, the real-time sensor data flows directly into the blockchain. We've used Zero-Knowledge proofs to ensure corporate privacy while maintaining public auditability."</p>
                  </div>

                  <div>
                    <div className="flex justify-between text-purple-400 font-bold uppercase mb-2 tracking-widest">
                      <span>5. The Close</span>
                      <span>[0:15]</span>
                    </div>
                    <p className="text-white/80">"We are bringing absolute cryptographic truth to climate change. Thank you."</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
