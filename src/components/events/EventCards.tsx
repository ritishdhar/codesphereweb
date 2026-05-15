"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Image as ImageIcon } from "lucide-react";
import { EventCountdown } from "./EventCountdown";

interface EventProps {
  id: string;
  title: string;
  date: string;
  type: string;
  desc: string;
  tags: string[];
  color: string;
}

interface UpcomingEventProps extends EventProps {
  registered: number;
  capacity: number;
  targetDate: string;
}

export function UpcomingEventCard({ id, title, date, type, desc, tags, color, registered, capacity, targetDate }: UpcomingEventProps) {
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem(`event_${id}`);
    if (status === "registered") setIsRegistered(true);
  }, [id]);

  const handleRegister = () => {
    localStorage.setItem(`event_${id}`, "registered");
    setIsRegistered(true);
  };

  const fillPercentage = Math.min(100, (registered / capacity) * 100);

  return (
    <div className={`relative bg-white border-4 border-black rounded-[2rem] p-6 shadow-[8px_8px_0px_#000] overflow-hidden group`}>
      {/* Top Border Color Bar */}
      <div className={`absolute top-0 left-0 w-full h-4 ${color} border-b-4 border-black`} />
      
      <div className="mt-4 flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-3 py-1 border-2 border-black rounded-lg text-xs font-black uppercase tracking-widest bg-white`}>{type}</span>
            <span className="text-sm font-bold text-black/60">{date}</span>
          </div>
          <h3 className="font-display font-black text-3xl uppercase leading-none text-black">{title}</h3>
        </div>
        
        <div className="flex items-center gap-2 bg-[#f4f4f5] px-3 py-1.5 rounded-full border-2 border-black shadow-[2px_2px_0px_#000]">
          <div className="w-2.5 h-2.5 rounded-full bg-lime animate-pulse border border-black" />
          <span className="text-[10px] font-black uppercase tracking-widest text-black">Live</span>
        </div>
      </div>

      <p className="text-black/80 font-bold mb-6 line-clamp-2 leading-relaxed">
        {desc}
      </p>

      <div className="mb-6">
        <EventCountdown targetDate={targetDate} />
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-2 text-black">
          <span>Registration</span>
          <span>{registered} / {capacity}</span>
        </div>
        <div className="w-full h-4 bg-[#f4f4f5] border-2 border-black rounded-full overflow-hidden">
          <div className={`h-full ${color} border-r-2 border-black transition-all duration-1000`} style={{ width: `${fillPercentage}%` }} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map(tag => (
          <span key={tag} className="bg-black/5 border-2 border-black/10 px-3 py-1 rounded-lg text-xs font-bold text-black">#{tag}</span>
        ))}
      </div>

      <button 
        onClick={handleRegister}
        disabled={isRegistered}
        className={`w-full py-4 px-6 border-4 border-black rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
          isRegistered 
            ? "bg-lime text-black cursor-not-allowed shadow-[2px_2px_0px_#000]" 
            : `${color} text-white shadow-[4px_4px_0px_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000]`
        }`}
      >
        {isRegistered ? <><Check className="w-5 h-5" /> Registered</> : "Register Interest"}
      </button>
    </div>
  );
}

interface PastEventProps extends EventProps {
  attendees: number;
  projects: number;
  winner: string;
  recapText: string;
}

export function PastEventCard({ title, date, type, desc, tags, color, attendees, projects, winner, recapText }: PastEventProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`relative bg-[#f4f4f5] border-4 border-black/20 rounded-[2rem] p-6 transition-all duration-500 ${expanded ? "border-black shadow-[8px_8px_0px_#000] bg-white" : "hover:border-black/50"}`}>
      <div className="flex justify-between items-start mb-6 opacity-60">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-3 py-1 border-2 border-black rounded-lg text-xs font-black uppercase tracking-widest bg-black text-white`}>Completed</span>
            <span className="text-sm font-bold text-black/60">{date}</span>
          </div>
          <h3 className="font-display font-black text-2xl uppercase leading-none text-black/80">{title}</h3>
        </div>
        <span className={`px-3 py-1 border-2 border-black/20 rounded-lg text-[10px] font-black uppercase tracking-widest text-black/50`}>{type}</span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border-2 border-black/20 rounded-xl p-3 text-center">
          <div className="font-display font-black text-2xl text-black/70">{attendees}</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-black/50">Attendees</div>
        </div>
        <div className="bg-white border-2 border-black/20 rounded-xl p-3 text-center">
          <div className="font-display font-black text-2xl text-black/70">{projects}</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-black/50">Projects</div>
        </div>
        <div className="bg-white border-2 border-black/20 rounded-xl p-3 text-center">
          <div className="font-display font-black text-lg text-black/70 truncate">{winner}</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-black/50">Winner</div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t-2 border-dashed border-black/20 mt-4 mb-6">
              <p className="text-sm font-bold text-black/70 mb-6 leading-relaxed">
                {recapText}
              </p>
              
              <div className="flex items-center gap-4 p-4 bg-lime/20 border-2 border-lime rounded-xl mb-6">
                <div className="w-12 h-12 rounded-full border-2 border-black overflow-hidden bg-white">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${winner}`} alt="Winner" className="w-full h-full" />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-black/50">Grand Winner</div>
                  <div className="font-display font-black text-xl">{winner}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="aspect-square bg-black/5 rounded-lg border-2 border-black/10 flex items-center justify-center relative overflow-hidden group cursor-pointer">
                    <ImageIcon className="w-6 h-6 text-black/20" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-xs font-bold uppercase">View</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setExpanded(!expanded)}
        className={`w-full py-3 px-6 border-2 border-black rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${expanded ? "bg-black text-white" : "bg-white text-black hover:bg-black/5"}`}
      >
        {expanded ? "Close Recap" : "View Recap"} <ArrowRight className={`w-4 h-4 transition-transform ${expanded ? "rotate-90" : ""}`} />
      </button>
    </div>
  );
}

export function FeaturedEvent({ id, title, date, type, desc, tags, color, registered, capacity, targetDate }: UpcomingEventProps) {
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem(`event_${id}`);
    if (status === "registered") setIsRegistered(true);
  }, [id]);

  const handleRegister = () => {
    localStorage.setItem(`event_${id}`, "registered");
    setIsRegistered(true);
  };

  return (
    <div className={`w-full bg-white border-8 border-black rounded-[2rem] shadow-[12px_12px_0px_#000] overflow-hidden mb-16 relative`}>
      
      {/* Marquee Header */}
      <div className={`w-full ${color} border-b-8 border-black py-2 overflow-hidden flex whitespace-nowrap`}>
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="flex gap-4 font-display font-black text-xl text-white uppercase tracking-widest"
        >
          {Array(10).fill("REGISTRATION OPEN · LIMITED SEATS · DON'T MISS IT · ").map((text, i) => <span key={i}>{text}</span>)}
        </motion.div>
      </div>

      <div className="p-8 md:p-12 flex flex-col md:flex-row gap-12">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-6">
            <span className={`px-4 py-1.5 border-4 border-black rounded-xl text-sm font-black uppercase tracking-widest bg-lime text-black shadow-[4px_4px_0px_#000]`}>{type}</span>
            <span className="text-lg font-bold text-black/60">{date}</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-display font-black uppercase leading-[0.9] text-black mb-6">{title}</h2>
          <p className="text-xl font-bold text-black/70 mb-8 max-w-xl">
            {desc}
          </p>
          
          <div className="flex flex-wrap gap-3 mb-8">
            {tags.map(tag => (
              <span key={tag} className="bg-black text-white px-4 py-1.5 rounded-lg text-sm font-bold uppercase tracking-widest">#{tag}</span>
            ))}
          </div>
        </div>

        <div className="md:w-[400px] bg-[#f4f4f5] border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_#000] flex flex-col justify-center">
          <div className="mb-8">
            <h4 className="text-xs font-black uppercase tracking-widest text-black/50 mb-4 text-center">Starts In</h4>
            <div className="flex justify-center scale-110 origin-center">
              <EventCountdown targetDate={targetDate} />
            </div>
          </div>
          
          <button 
            onClick={handleRegister}
            disabled={isRegistered}
            className={`w-full py-5 px-6 border-4 border-black rounded-xl font-black uppercase text-xl tracking-widest flex items-center justify-center gap-3 transition-all ${
              isRegistered 
                ? "bg-lime text-black cursor-not-allowed shadow-[4px_4px_0px_#000]" 
                : `${color} text-white shadow-[6px_6px_0px_#000] hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000]`
            }`}
          >
            {isRegistered ? <><Check className="w-6 h-6" /> Registered</> : "Secure Your Spot"}
          </button>
        </div>
      </div>
    </div>
  );
}
