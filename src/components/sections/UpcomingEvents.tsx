"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Clock, Users } from "lucide-react";

const Countdown = ({ targetDate }: { targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        d: Math.floor(distance / (1000 * 60 * 60 * 24)),
        h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-2 text-sm font-display font-black">
      <div className="flex items-baseline gap-1">
        <span className="text-black">{timeLeft.d}</span>
        <span className="text-black/50 text-[10px]">D</span>
      </div>
      <span className="text-black/30">:</span>
      <div className="flex items-baseline gap-1">
        <span className="text-black">{timeLeft.h}</span>
        <span className="text-black/50 text-[10px]">H</span>
      </div>
      <span className="text-black/30">:</span>
      <div className="flex items-baseline gap-1">
        <span className="text-black">{timeLeft.m}</span>
        <span className="text-black/50 text-[10px]">M</span>
      </div>
      <span className="text-black/30">:</span>
      <div className="flex items-baseline gap-1">
        <span className="text-[#0033E6]">{timeLeft.s}</span>
        <span className="text-black/50 text-[10px]">S</span>
      </div>
    </div>
  );
};

export function UpcomingEvents() {
  const events = [
    {
      id: 1,
      title: "Web3 Protocol Launch",
      type: "Hackathon",
      date: new Date(Date.now() + 86400000 * 3),
      registered: 47,
      capacity: 60,
      color: "bg-white",
    },
    {
      id: 2,
      title: "Neural Net Workshop",
      type: "Masterclass",
      date: new Date(Date.now() + 86400000 * 7),
      registered: 120,
      capacity: 150,
      color: "bg-lime",
    },
    {
      id: 3,
      title: "CyberSec Defense",
      type: "CTF Event",
      date: new Date(Date.now() + 86400000 * 14),
      registered: 89,
      capacity: 100,
      color: "bg-white",
    }
  ];

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 py-24 relative z-20">
      
      <div className="text-center mb-16">
        <h2 className="text-6xl md:text-8xl font-display font-black uppercase tracking-tight text-white leading-[0.9]">
          UPCOMING<br/>
          <span className="text-lime text-stroke">EVENTS</span>
        </h2>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {events.map((event, i) => {
          const progress = (event.registered / event.capacity) * 100;
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className={`${event.color} rounded-3xl border-4 border-black shadow-[8px_8px_0px_#000] overflow-hidden hover:-translate-y-2 transition-transform`}
            >
              <div className="p-6 md:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="text-xs uppercase tracking-widest font-black text-white bg-[#0033E6] px-3 py-1.5 rounded-full border-2 border-black">
                    {event.type}
                  </div>
                  <div className="flex items-center gap-2 bg-black/5 px-3 py-1.5 rounded-full border-2 border-black/10">
                    <Clock className="w-4 h-4 text-black" strokeWidth={3} />
                    <Countdown targetDate={event.date} />
                  </div>
                </div>

                <h3 className="text-3xl font-display font-black text-black mb-8 leading-tight">
                  {event.title}
                </h3>

                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-sm font-bold text-black">
                    <span className="flex items-center gap-2"><Users className="w-4 h-4" strokeWidth={3} /> Registered</span>
                    <span>{event.registered} / {event.capacity}</span>
                  </div>
                  <div className="w-full h-4 bg-black/10 rounded-full overflow-hidden border-2 border-black">
                    <motion.div 
                      className="h-full bg-[#0033E6] border-r-2 border-black"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>

                <button className="w-full py-4 rounded-xl font-display font-black text-lg tracking-widest uppercase transition-all duration-300 border-4 border-black bg-black text-white hover:bg-white hover:text-black">
                  Register Interest
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
