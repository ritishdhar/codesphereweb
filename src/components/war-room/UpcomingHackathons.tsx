"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_HACKATHONS = [
  { id: 1, name: "Smart India Hackathon", organizer: "Gov of India", date: "Aug 15, 2026", prize: 1000000, mode: "Offline", deadline: 5, tags: ["AI", "Web", "IoT"], desc: "The biggest national-level hackathon. Solve problem statements from ministries and private organizations." },
  { id: 2, name: "ETHGlobal Online", organizer: "ETHGlobal", date: "Sep 1, 2026", prize: 5000000, mode: "Online", deadline: 20, tags: ["Blockchain", "Web3"], desc: "Build the future of decentralized internet. Mentorship from top crypto protocols." },
  { id: 3, name: "Hack the North", organizer: "Univ of Waterloo", date: "Sep 15, 2026", prize: 50000, mode: "Hybrid", deadline: 35, tags: ["Mobile", "Web"], desc: "Canada's biggest hackathon. Incredible energy and global participation." },
  { id: 4, name: "AI Innovate 26", organizer: "OpenAI", date: "July 10, 2026", prize: 200000, mode: "Online", deadline: 2, tags: ["AI", "GenAI"], desc: "Push the limits of LLMs and generative models to create consumer applications." },
  { id: 5, name: "DefHacks", organizer: "DefHacks Inc.", date: "Oct 5, 2026", prize: 25000, mode: "Online", deadline: 45, tags: ["Cybersecurity", "Web"], desc: "Find vulnerabilities and build secure systems over a 48 hour sprint." },
  { id: 6, name: "Reactathon", organizer: "React Community", date: "Aug 20, 2026", prize: 75000, mode: "Offline", deadline: 10, tags: ["Web", "React"], desc: "A pure frontend hackathon focused on performance, UI/UX, and component architecture." },
  { id: 7, name: "IoT BuildWeekend", organizer: "Hardware Collective", date: "Sep 5, 2026", prize: 150000, mode: "Hybrid", deadline: 25, tags: ["IoT", "Hardware"], desc: "Build physical solutions to digital problems. Arduino kits provided." },
  { id: 8, name: "FinTech Sprint", organizer: "Stripe", date: "Aug 30, 2026", prize: 300000, mode: "Online", deadline: 15, tags: ["Web", "Finance"], desc: "Revolutionize payments, lending, and financial literacy apps." },
  { id: 9, name: "Code for Good", organizer: "JPMorgan", date: "Nov 1, 2026", prize: 0, mode: "Offline", deadline: 60, tags: ["Web", "Mobile"], desc: "Build solutions for non-profits and NGOs. Winning teams get fast-tracked for roles." },
  { id: 10, name: "GameJam 2026", organizer: "Unity", date: "July 25, 2026", prize: 100000, mode: "Online", deadline: 6, tags: ["Game Dev", "AR/VR"], desc: "72 hours to build a complete playable game from scratch based on a secret theme." },
];

export function UpcomingHackathons() {
  const [filter, setFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [watchlist, setWatchlist] = useState<number[]>([]);

  const filtered = MOCK_HACKATHONS.filter(h => {
    if (filter === "All") return true;
    if (filter === "Online" || filter === "Offline" || filter === "Hybrid") return h.mode === filter;
    return h.tags.includes(filter);
  });

  const toggleWatchlist = (id: number) => {
    setWatchlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="w-full">
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 mb-8 bg-[#f4f4f5] p-4 border-4 border-black rounded-2xl shadow-[4px_4px_0px_#000]">
        {["All", "Online", "Offline", "Hybrid", "AI", "Web", "Mobile", "Blockchain"].map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl font-black uppercase tracking-widest text-xs border-2 transition-all ${
              filter === f 
                ? "bg-[#FF5500] text-white border-black shadow-[2px_2px_0px_#000]" 
                : "bg-white text-black border-black/20 hover:border-black"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Desktop Table (Hidden on small screens) */}
      <div className="hidden md:block bg-white border-4 border-black rounded-[2rem] shadow-[8px_8px_0px_#000] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FF5500] text-black border-b-4 border-black">
              <th className="p-4 font-black uppercase tracking-widest">Name</th>
              <th className="p-4 font-black uppercase tracking-widest">Organizer</th>
              <th className="p-4 font-black uppercase tracking-widest">Date</th>
              <th className="p-4 font-black uppercase tracking-widest">Prize</th>
              <th className="p-4 font-black uppercase tracking-widest">Mode</th>
              <th className="p-4 font-black uppercase tracking-widest">Deadline</th>
              <th className="p-4 font-black uppercase tracking-widest">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(h => {
              const prizeColor = h.prize > 100000 ? "text-[#0033E6]" : "text-black";
              const modeColor = h.mode === "Online" ? "bg-lime" : h.mode === "Offline" ? "bg-[#FF5500] text-white" : "bg-purple-500 text-white";
              const deadlineColor = h.deadline < 7 ? "bg-red-500 text-white" : h.deadline < 30 ? "bg-yellow-400 text-black" : "bg-gray-200 text-black";
              const isExpanded = expandedId === h.id;

              return (
                <optgroup key={h.id}>
                  <tr 
                    onClick={() => setExpandedId(isExpanded ? null : h.id)}
                    className="border-b-2 border-black/10 hover:bg-black/5 cursor-pointer transition-colors"
                  >
                    <td className="p-4 font-display font-black text-xl uppercase leading-none">{h.name}</td>
                    <td className="p-4 font-bold text-sm text-black/60">{h.organizer}</td>
                    <td className="p-4 font-bold text-sm">{h.date}</td>
                    <td className={`p-4 font-black ${prizeColor}`}>
                      {h.prize === 0 ? "Non-Profit" : `₹${(h.prize / 100000).toFixed(1)}L`}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 border-2 border-black rounded-lg text-[10px] font-black uppercase tracking-widest ${modeColor}`}>
                        {h.mode}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 border-2 border-black rounded-lg text-[10px] font-black uppercase tracking-widest ${deadlineColor}`}>
                        {h.deadline} Days Left
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="p-2 border-2 border-black rounded-xl hover:bg-black hover:text-white transition-colors">
                        <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                    </td>
                  </tr>
                  
                  {/* Expanded Row */}
                  <AnimatePresence>
                    {isExpanded && (
                      <tr>
                        <td colSpan={7} className="p-0 border-b-4 border-black">
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-[#f4f4f5]"
                          >
                            <div className="p-8 flex gap-8">
                              <div className="flex-1">
                                <h4 className="font-black uppercase tracking-widest text-xs text-black/50 mb-2">Briefing</h4>
                                <p className="font-bold text-black/80 leading-relaxed mb-6">{h.desc}</p>
                                <h4 className="font-black uppercase tracking-widest text-xs text-black/50 mb-2">Key Tech</h4>
                                <div className="flex gap-2">
                                  {h.tags.map(t => (
                                    <span key={t} className="px-3 py-1 bg-white border-2 border-black rounded-lg text-xs font-bold uppercase">{t}</span>
                                  ))}
                                </div>
                              </div>
                              <div className="w-[300px] flex flex-col justify-center">
                                <button 
                                  onClick={(e) => { e.stopPropagation(); toggleWatchlist(h.id); }}
                                  className={`w-full py-4 px-6 border-4 border-black rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-[4px_4px_0px_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000] ${watchlist.includes(h.id) ? "bg-black text-lime" : "bg-white text-black"}`}
                                >
                                  {watchlist.includes(h.id) ? <><Check className="w-5 h-5" /> Watchlisted</> : "Add To Watchlist"}
                                </button>
                                <button className="w-full mt-4 py-4 px-6 border-4 border-black rounded-xl font-black uppercase tracking-widest bg-lime text-black flex items-center justify-center gap-2 transition-all shadow-[4px_4px_0px_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000]">
                                  Register Now <ArrowRight className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </optgroup>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile view omitted for brevity, fallback gracefully */}
      <div className="md:hidden space-y-4">
        {filtered.map(h => (
           <div key={h.id} className="bg-white border-4 border-black p-4 rounded-2xl shadow-[4px_4px_0px_#000]">
             <h3 className="font-display font-black text-xl uppercase mb-1">{h.name}</h3>
             <p className="text-sm font-bold text-black/60 mb-4">{h.organizer} · {h.date}</p>
             <button className="w-full py-3 bg-lime border-2 border-black rounded-xl font-black uppercase text-xs">View Details</button>
           </div>
        ))}
      </div>
    </div>
  );
}
