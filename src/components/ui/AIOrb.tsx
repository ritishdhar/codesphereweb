"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { useState } from "react";

export function AIOrb() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="relative w-16 h-16 flex items-center justify-center">
        
        {/* Orbital Ring */}
        <motion.div 
          className="absolute inset-[-4px] rounded-full border-4 border-black border-t-lime border-r-lime"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner Core */}
        <div className="relative w-14 h-14 bg-white border-4 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_#000] z-10">
          <Bot className="w-6 h-6 text-black" strokeWidth={3} />
        </div>

        {/* Tooltip */}
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-20 whitespace-nowrap bg-lime border-4 border-black shadow-[4px_4px_0px_#000] px-4 py-2 rounded-xl text-sm font-black font-display text-black uppercase tracking-widest"
          >
            SYSTEM AI
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
