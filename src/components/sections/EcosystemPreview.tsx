"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function EcosystemPreview() {
  const nodes = [
    { id: 1, x: 50, y: 50, r: 12, label: "Core" },
    { id: 2, x: 120, y: 20, r: 8, label: "Frontend" },
    { id: 3, x: 150, y: 80, r: 10, label: "AI Model" },
    { id: 4, x: 20, y: 120, r: 10, label: "Security" },
    { id: 5, x: 90, y: 150, r: 8, label: "Database" },
    { id: 6, x: 180, y: 140, r: 8, label: "API" },
    { id: 7, x: 220, y: 50, r: 10, label: "Cloud" },
  ];

  const edges = [
    { source: 1, target: 2 },
    { source: 1, target: 3 },
    { source: 1, target: 4 },
    { source: 1, target: 5 },
    { source: 2, target: 6 },
    { source: 3, target: 6 },
    { source: 6, target: 7 },
    { source: 5, target: 3 },
  ];

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 py-24 relative z-20">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left: Mini Node Graph */}
        <div className="flex-1 relative w-full aspect-square max-w-[500px] bg-white rounded-[3rem] flex items-center justify-center p-8 border-4 border-black group overflow-hidden shadow-[8px_8px_0px_#000]">
          
          <svg viewBox="0 0 250 200" className="w-full h-full overflow-visible">
            {/* Edges */}
            {edges.map((edge, i) => {
              const source = nodes.find(n => n.id === edge.source)!;
              const target = nodes.find(n => n.id === edge.target)!;
              return (
                <motion.line
                  key={`edge-${i}`}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="#000"
                  strokeWidth="3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: i * 0.1 }}
                />
              );
            })}
            
            {/* Nodes */}
            {nodes.map((node, i) => (
              <g key={`node-${node.id}`}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r}
                  fill="#D4FF00"
                  stroke="#000"
                  strokeWidth="3"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: i * 0.1 + 0.5 }}
                  className="cursor-pointer"
                  whileHover={{ scale: 1.2 }}
                />
                <motion.text
                  x={node.x}
                  y={node.y + node.r + 14}
                  fontSize="10"
                  fill="#000"
                  textAnchor="middle"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 1 }}
                  className="font-display font-black"
                >
                  {node.label}
                </motion.text>
              </g>
            ))}
          </svg>
        </div>

        {/* Right: Content */}
        <div className="flex-1 space-y-8 relative">
          
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tight mb-2 leading-[0.9]">
              <span className="text-white block">THE</span>
              <span className="text-lime block">ECOSYSTEM</span>
            </h2>
            <p className="text-white font-medium text-lg mt-6 max-w-md">
              A fully mapped universe of student talent. Every project, every skill, every connection tracked in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
            <div className="bg-white p-6 rounded-3xl border-4 border-black shadow-[4px_4px_0px_#000] text-center hover:bg-lime transition-colors">
              <div className="text-4xl font-display font-black text-[#0033E6] mb-1">20</div>
              <div className="text-sm font-bold text-black uppercase tracking-widest">Students</div>
            </div>
            <div className="bg-white p-6 rounded-3xl border-4 border-black shadow-[4px_4px_0px_#000] text-center hover:bg-lime transition-colors">
              <div className="text-4xl font-display font-black text-[#0033E6] mb-1">7</div>
              <div className="text-sm font-bold text-black uppercase tracking-widest">Domains</div>
            </div>
            <div className="bg-white p-6 rounded-3xl border-4 border-black shadow-[4px_4px_0px_#000] text-center hover:bg-lime transition-colors">
              <div className="text-4xl font-display font-black text-[#0033E6] mb-1">89</div>
              <div className="text-sm font-bold text-black uppercase tracking-widest">Projects</div>
            </div>
          </div>

          <div className="relative inline-block mt-8 z-10">
            <button className="flex items-center gap-4 px-8 py-4 bg-lime border-4 border-black text-black font-black font-display tracking-widest uppercase rounded-full hover:bg-white hover:-translate-y-1 transition-all shadow-[6px_6px_0px_#000]">
              Explore Full Map <ArrowRight className="w-6 h-6 stroke-[3]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
