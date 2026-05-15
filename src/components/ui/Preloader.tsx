"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState(0);
  const [shouldUnmount, setShouldUnmount] = useState(false);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = "hidden";

    // Uncomment this for production to only show once per session
    // if (sessionStorage.getItem("preloader_shown")) {
    //   document.body.style.overflow = "auto";
    //   setShouldUnmount(true);
    //   return;
    // }

    const runSequence = async () => {
      await new Promise(r => setTimeout(r, 500));
      setStage(1); // Tullas
      await new Promise(r => setTimeout(r, 1000));
      setStage(2); // Presents
      await new Promise(r => setTimeout(r, 1000));
      setStage(3); // Codesphere
      await new Promise(r => setTimeout(r, 1800));
      
      setIsOpen(true); // Open garage
      document.body.style.overflow = "auto";
      
      await new Promise(r => setTimeout(r, 1000));
      setShouldUnmount(true);
      sessionStorage.setItem("preloader_shown", "true");
    };

    runSequence();
  }, []);

  if (shouldUnmount) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden pointer-events-auto">
      
      {/* Top Garage Door */}
      <motion.div 
        animate={{ y: isOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.9, ease: [0.77, 0, 0.17, 1] }}
        className="absolute top-0 left-0 w-full h-1/2 bg-black border-b-[8px] border-lime flex items-end justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-20"
      >
        {/* Door texture/handle details */}
        <div className="w-32 h-2 bg-white/10 rounded-t-lg mb-2" />
      </motion.div>

      {/* Bottom Garage Door */}
      <motion.div 
        animate={{ y: isOpen ? "100%" : "0%" }}
        transition={{ duration: 0.9, ease: [0.77, 0, 0.17, 1] }}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-black border-t-[8px] border-lime flex items-start justify-center shadow-[0_-10px_30px_rgba(0,0,0,0.5)] z-20"
      >
        <div className="w-32 h-2 bg-white/10 rounded-b-lg mt-2" />
      </motion.div>
      
      {/* Content */}
      <div className="relative z-30 flex flex-col items-center justify-center gap-6 md:gap-8 w-full max-w-lg px-6">
        <AnimatePresence>
          {!isOpen && (
            <motion.div 
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-8 w-full"
            >
              {/* Image 1: Tulla's */}
              <div className="h-24 md:h-32 flex items-center justify-center">
                {stage >= 1 && (
                  <motion.img 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    src="/tullas.png" 
                    alt="Tulla's" 
                    className="h-full w-auto object-contain drop-shadow-2xl"
                  />
                )}
              </div>

              {/* Image 2: Presents */}
              <div className="h-8 md:h-12 flex items-center justify-center">
                {stage >= 2 && (
                  <motion.img 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    src="/presents.png" 
                    alt="Presents" 
                    className="h-full w-auto object-contain"
                  />
                )}
              </div>

              {/* Image 3: Codesphere White */}
              <div className="h-32 md:h-48 flex items-center justify-center">
                {stage >= 3 && (
                  <motion.img 
                    initial={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    src="/codesphere-white.png" 
                    alt="Codesphere" 
                    className="w-[280px] md:w-[400px] h-auto object-contain drop-shadow-[0_0_30px_rgba(212,255,0,0.3)]"
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
