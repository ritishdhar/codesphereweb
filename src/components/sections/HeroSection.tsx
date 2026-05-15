"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";

export function HeroSection() {
  const { user } = useAuth();

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden pt-40 pb-20">
      
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 2 }}
          className="whitespace-nowrap flex"
        >
          <h1 className="text-[35vw] font-display font-black text-white tracking-tighter leading-none mt-24">
            CODESPHERE
          </h1>
        </motion.div>
      </div>

      {/* Massive Typography Foreground */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 w-full overflow-hidden">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center leading-[0.8] w-full text-center mt-24 md:mt-32"
        >
          <div className="flex items-start justify-center gap-4 w-full px-4">
            <span className="text-[12vw] md:text-[10vw] font-display font-black text-lime leading-[0.8]">#</span>
            <h1 className="text-[20vw] md:text-[16vw] font-display font-black text-white uppercase tracking-tighter">
              CODE
            </h1>
          </div>
          <h1 className="text-[22vw] md:text-[18vw] font-display font-black text-white uppercase tracking-tighter -mt-[2vw]">
            SOCIAL
          </h1>
          <h1 className="text-[22vw] md:text-[18vw] font-display font-black text-white uppercase tracking-tighter -mt-[2vw]">
            PEOPLE
          </h1>
        </motion.div>
      </div>

      {/* Floating Cards (Bubbles) */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center mt-24 md:mt-32">
        
        {/* Card 1 */}
        <motion.div
          animate={{ y: [-15, 15, -15], rotate: [-4, 4, -4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[25%] left-[20%] md:left-[35%] glass-panel p-3 rounded-3xl w-40 md:w-48 pointer-events-auto flex flex-col items-center"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white bg-blue-900 mb-2 shadow-inner">
            <img src="https://i.pravatar.cc/150?img=32" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="font-display font-bold text-white text-lg md:text-xl">arjun.dev</div>
          <div className="text-xs text-white/80 font-sans font-medium">293 582 points</div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          animate={{ y: [15, -15, 15], rotate: [5, -2, 5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] left-[10%] md:left-[25%] glass-panel p-3 rounded-3xl w-40 md:w-48 pointer-events-auto flex flex-col items-center"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white bg-green-900 mb-2 shadow-inner">
            <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="font-display font-bold text-white text-lg md:text-xl">priya.eth</div>
          <div className="text-xs text-white/80 font-sans font-medium">23 422 points</div>
        </motion.div>

      </div>

      {/* Decorative + Auth CTA layer */}
      <div className="absolute inset-0 z-30 pointer-events-none mt-24 md:mt-32">
        
        {/* Top Right Curved Arrow */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-[10%] right-[10%] md:top-[15%] md:right-[20%] w-32 h-32 md:w-48 md:h-48"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" fill="none" stroke="#D4FF00" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 20 20 Q 90 10 90 50 Q 90 90 40 90" />
            <path d="M 55 75 L 40 90 L 55 105" />
          </svg>
        </motion.div>

        {/* Bottom Left Squiggly Arrow */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-[10%] left-[5%] md:bottom-[15%] md:left-[10%] w-24 h-24 md:w-32 md:h-32"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" fill="none" stroke="#D4FF00" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 20 80 Q 40 20 60 80 T 90 50" />
            <path d="M 75 40 L 90 50 L 75 60" />
          </svg>
        </motion.div>

        {/* Auth CTA — changes based on login state */}
        {!user ? (
          /* Logged-out: big "Join" spinning badge + separate CTA */
          <>
            {/* Spinning Badge */}
            <Link
              href="/auth"
              className="absolute bottom-[5%] right-[5%] md:bottom-[10%] md:right-[15%] w-32 h-32 md:w-40 md:h-40 bg-lime rounded-full flex items-center justify-center pointer-events-auto cursor-pointer hover:scale-110 transition-transform shadow-[0_0_40px_rgba(212,255,0,0.4)]"
            >
              {/* Circular Text */}
              <div className="absolute inset-2">
                <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_10s_linear_infinite] overflow-visible">
                  <path id="circlePath" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="none" />
                  <text className="text-[11px] font-display font-black fill-[#0033E6] uppercase tracking-widest">
                    <textPath href="#circlePath" startOffset="0%" textLength="226" lengthAdjust="spacing">
                      JOIN THE SPHERE • SIGN UP FREE • 
                    </textPath>
                  </text>
                </svg>
              </div>
              <ArrowUpRight className="w-10 h-10 text-[#0033E6] relative z-10" strokeWidth={3} />
            </Link>

            {/* Notification Toast — bottom right (rendered via portal-like fixed position) */}
          </>
        ) : (
          /* Logged-in: show welcome spinning badge only */
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-[5%] right-[5%] md:bottom-[10%] md:right-[15%] w-32 h-32 md:w-40 md:h-40 bg-lime rounded-full flex items-center justify-center pointer-events-auto cursor-pointer hover:scale-110 transition-transform shadow-[0_0_40px_rgba(212,255,0,0.4)]"
          >
            <div className="absolute inset-2">
              <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_10s_linear_infinite] overflow-visible">
                <path id="circlePath2" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="none" />
                <text className="text-[11px] font-display font-black fill-[#0033E6] uppercase tracking-widest">
                  <textPath href="#circlePath2" startOffset="0%" textLength="226" lengthAdjust="spacing">
                    WELCOME BACK • LEVEL UP TODAY • 
                  </textPath>
                </text>
              </svg>
            </div>
            <ArrowUpRight className="w-10 h-10 text-[#0033E6] relative z-10" strokeWidth={3} />
          </motion.div>
        )}

      </div>

      {/* Fixed notification toast — bottom right, for logged-out users */}
      {!user && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-6 left-6 z-[100] pointer-events-auto"
        >
          <div className="bg-white border-4 border-black rounded-[1.5rem] p-4 shadow-[8px_8px_0px_#000] flex flex-col items-start gap-3 w-[220px]">
            <div className="flex items-center gap-3 w-full pb-3 border-b-2 border-black/10">
              <img src="/tullas-logo.png" alt="Tula's" className="h-14 w-auto object-contain scale-[1.3]" />
              <div className="flex flex-col leading-none">
                <span className="text-[9px] font-black uppercase tracking-widest text-black/50">presents</span>
                <span className="font-display font-black text-black text-base uppercase">CodeSphere</span>
              </div>
              <div className="ml-auto w-3 h-3 rounded-full bg-lime border-2 border-black animate-pulse flex-shrink-0" />
            </div>
            <p className="text-[11px] font-bold text-black/70 leading-relaxed">
              🚀 Join the department's developer universe. Track XP, find teams, and win hackathons.
            </p>
            <Link
              href="/auth"
              className="w-full bg-[#0033E6] text-white border-2 border-black rounded-xl py-2.5 font-black uppercase text-xs tracking-widest text-center hover:bg-lime hover:text-black transition-all shadow-[3px_3px_0px_#000]"
            >
              Get Access →
            </Link>
          </div>
        </motion.div>
      )}

    </section>
  );
}
