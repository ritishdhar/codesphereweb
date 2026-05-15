"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / (duration * 1000), 1);
      
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(easeProgress * (to - from) + from));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export function StatsBar() {
  const stats = [
    { label: "Members", value: 247 },
    { label: "Projects Built", value: 89 },
    { label: "Hackathons Won", value: 23 },
    { label: "XP Earned", value: 142000 },
    { label: "Badges Unlocked", value: 634 },
  ];

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 py-12 relative z-20">
      <div className="glass-panel w-full rounded-3xl p-8 border-4 border-white relative overflow-hidden">
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 divide-x-4 divide-white/20 relative z-10">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`flex flex-col items-center justify-center text-center px-4 ${i === 0 ? "border-l-0" : ""}`}
            >
              <div className="text-4xl md:text-5xl font-display font-black mb-2 text-white drop-shadow-[2px_2px_0px_#000]">
                <Counter from={0} to={stat.value >= 1000 ? Math.floor(stat.value / 1000) : stat.value} duration={2.5} />
                {stat.value >= 1000 ? "K+" : ""}
              </div>
              <div className="text-sm text-white font-bold uppercase tracking-widest bg-[#0033E6] px-3 py-1 rounded-full border-2 border-white">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
