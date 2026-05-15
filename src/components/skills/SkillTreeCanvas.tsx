"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Check, Zap, X, BookOpen, Video, Code2 } from "lucide-react";

type NodeStatus = "completed" | "available" | "locked";

interface SkillNode {
  id: string;
  label: string;
  x: number;
  y: number;
  status: NodeStatus;
  xp: number;
  desc: string;
}

const INITIAL_NODES: SkillNode[] = [
  { id: "html", label: "HTML5", x: 50, y: 10, status: "completed", xp: 50, desc: "The foundation of the web. Master semantic markup and accessibility." },
  { id: "css", label: "CSS3", x: 50, y: 25, status: "completed", xp: 50, desc: "Style the web. Learn Flexbox, Grid, and modern animations." },
  { id: "js", label: "JavaScript", x: 50, y: 40, status: "available", xp: 100, desc: "Make it interactive. Master ES6+, async/await, and DOM manipulation." },
  { id: "react", label: "React", x: 30, y: 55, status: "locked", xp: 150, desc: "Component-driven UI development using the world's most popular library." },
  { id: "vue", label: "Vue", x: 70, y: 55, status: "locked", xp: 150, desc: "The progressive framework. Learn reactivity and Vue ecosystem." },
  { id: "next", label: "Next.js", x: 30, y: 70, status: "locked", xp: 200, desc: "The React framework for production. SSR, SSG, and API routes." },
  { id: "node", label: "Node.js", x: 70, y: 70, status: "locked", xp: 200, desc: "JavaScript on the server. Build scalable backends and APIs." },
  { id: "fullstack", label: "Full Stack", x: 50, y: 85, status: "locked", xp: 500, desc: "The ultimate convergence. Build end-to-end applications autonomously." },
];

const EDGES = [
  { from: "html", to: "css" },
  { from: "css", to: "js" },
  { from: "js", to: "react" },
  { from: "js", to: "vue" },
  { from: "react", to: "next" },
  { from: "vue", to: "node" },
  { from: "next", to: "fullstack" },
  { from: "node", to: "fullstack" },
];

export function SkillTreeCanvas() {
  const [nodes, setNodes] = useState<SkillNode[]>(INITIAL_NODES);
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleNodeClick = (node: SkillNode) => {
    setSelectedNode(node);
  };

  const completeSkill = () => {
    if (!selectedNode || selectedNode.status !== "available") return;
    
    // Mark complete and unlock children
    const updatedNodes = nodes.map(n => {
      if (n.id === selectedNode.id) return { ...n, status: "completed" as NodeStatus };
      // Unlock logic mock (simple unlock all direct children)
      const isChild = EDGES.some(e => e.from === selectedNode.id && e.to === n.id);
      if (isChild && n.status === "locked") return { ...n, status: "available" as NodeStatus };
      return n;
    });

    setNodes(updatedNodes);
    setSelectedNode({ ...selectedNode, status: "completed" });
    
    // Confetti effect
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="relative w-full h-[600px] md:h-[800px] bg-white border-4 border-black rounded-[2rem] shadow-[8px_8px_0px_#000] overflow-hidden flex">
      
      {/* SVG Canvas for Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {EDGES.map((edge, i) => {
          const fromNode = nodes.find(n => n.id === edge.from);
          const toNode = nodes.find(n => n.id === edge.to);
          if (!fromNode || !toNode) return null;

          const isCompleted = fromNode.status === "completed" && toNode.status === "completed";
          const isAvailable = fromNode.status === "completed" && toNode.status === "available";
          
          return (
            <line
              key={i}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}%`}
              className={`stroke-4 transition-all duration-500 ${
                isCompleted ? "stroke-[#0033E6]" : 
                isAvailable ? "stroke-lime stroke-[6px]" : "stroke-black/20"
              }`}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      <div className="absolute inset-0 z-10">
        {nodes.map(node => (
          <button
            key={node.id}
            onClick={() => handleNodeClick(node)}
            className={`absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all group shadow-[4px_4px_0px_#000] ${
              node.status === "completed" ? "bg-[#0033E6] border-black text-white hover:scale-110" :
              node.status === "available" ? "bg-lime border-black text-black hover:scale-110 animate-pulse" :
              "bg-gray-200 border-dashed border-black/40 text-black/40 cursor-not-allowed"
            }`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            {node.status === "completed" && <Check className="w-8 h-8 stroke-[4]" />}
            {node.status === "available" && <Zap className="w-8 h-8 stroke-[3]" />}
            {node.status === "locked" && <Lock className="w-6 h-6" />}
            
            <div className={`absolute top-full mt-2 font-display font-black text-sm uppercase tracking-widest whitespace-nowrap bg-white border-2 border-black px-2 py-1 rounded-md shadow-[2px_2px_0px_#000] transition-opacity ${
              node.status === "locked" ? "opacity-50" : "opacity-100 group-hover:-translate-y-1"
            }`}>
              {node.label}
            </div>
          </button>
        ))}
      </div>

      {/* Slide-in Detail Panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="absolute top-0 right-0 w-full sm:w-[400px] h-full bg-white border-l-4 border-black z-30 shadow-[-8px_0_0_rgba(0,0,0,0.1)] flex flex-col"
          >
            <div className="p-6 border-b-4 border-black flex justify-between items-center bg-[#f4f4f5]">
              <h3 className="font-display font-black text-2xl uppercase tracking-wider">Skill Intel</h3>
              <button onClick={() => setSelectedNode(null)} className="p-2 border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0px_#000]">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_#000] ${
                  selectedNode.status === "completed" ? "bg-[#0033E6] text-white" : "bg-lime text-black"
                }`}>
                  {selectedNode.status === "completed" ? <Check className="w-8 h-8" /> : <Code2 className="w-8 h-8" />}
                </div>
                <div>
                  <h4 className="font-display font-black text-3xl uppercase">{selectedNode.label}</h4>
                  <span className="text-sm font-black uppercase text-[#0033E6] bg-[#0033E6]/10 px-2 py-1 rounded-md">
                    +{selectedNode.xp} XP Reward
                  </span>
                </div>
              </div>

              <p className="font-bold text-black/80 leading-relaxed mb-8">
                {selectedNode.desc}
              </p>

              <div className="space-y-4 mb-8">
                <h5 className="font-display font-black text-lg uppercase">Resources</h5>
                <a href="#" className="flex items-center gap-3 p-4 border-4 border-black rounded-xl hover:bg-lime hover:-translate-y-1 transition-all shadow-[4px_4px_0px_#000]">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-bold uppercase tracking-widest text-sm">Official Docs</span>
                </a>
                <a href="#" className="flex items-center gap-3 p-4 border-4 border-black rounded-xl hover:bg-lime hover:-translate-y-1 transition-all shadow-[4px_4px_0px_#000]">
                  <Video className="w-5 h-5" />
                  <span className="font-bold uppercase tracking-widest text-sm">Crash Course</span>
                </a>
              </div>
            </div>

            <div className="p-6 border-t-4 border-black bg-[#f4f4f5]">
              {selectedNode.status === "completed" ? (
                <button disabled className="w-full bg-black text-white border-4 border-black p-4 rounded-xl font-black uppercase tracking-widest flex justify-center items-center gap-2 opacity-50 cursor-not-allowed">
                  <Check className="w-6 h-6" /> Skill Mastered
                </button>
              ) : selectedNode.status === "locked" ? (
                <button disabled className="w-full bg-gray-300 text-black/50 border-4 border-black/50 p-4 rounded-xl font-black uppercase tracking-widest flex justify-center items-center gap-2 cursor-not-allowed">
                  <Lock className="w-6 h-6" /> Prerequisites Required
                </button>
              ) : (
                <button 
                  onClick={completeSkill}
                  className="w-full bg-lime text-black border-4 border-black p-4 rounded-xl font-black text-xl uppercase tracking-widest hover:bg-black hover:text-lime transition-all flex justify-center items-center gap-2 shadow-[6px_6px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_#000]"
                >
                  <Zap className="w-6 h-6" /> Mark Complete
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti Overlay */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
          <motion.div 
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [1, 2, 3], opacity: [1, 1, 0] }}
            transition={{ duration: 1 }}
            className="text-6xl font-display font-black text-lime stroke-text-black"
          >
            +{selectedNode?.xp} XP EARNED!
          </motion.div>
        </div>
      )}
    </div>
  );
}
