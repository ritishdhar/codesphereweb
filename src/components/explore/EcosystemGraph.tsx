"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Flame, Share2, Activity, User } from "lucide-react";

type NodeType = "student" | "skill" | "project" | "domain";

interface Node {
  id: string;
  label: string;
  type: NodeType;
  x: number;
  y: number;
  size: number;
  activityLevel?: number; // 0-100
  xp?: number;
  connections: string[];
}

interface Edge {
  source: string;
  target: string;
}

const generateMockData = () => {
  const nodes: Node[] = [
    // Domains
    { id: "d1", label: "Web Dev", type: "domain", x: 20, y: 20, size: 80, connections: ["s1", "s2", "sk1", "sk2"] },
    { id: "d2", label: "AI/ML", type: "domain", x: 80, y: 30, size: 80, connections: ["s3", "sk3"] },
    { id: "d3", label: "Cyber", type: "domain", x: 50, y: 80, size: 80, connections: ["s4", "sk4"] },
    
    // Skills
    { id: "sk1", label: "React", type: "skill", x: 30, y: 15, size: 40, connections: ["d1", "s1", "p1"] },
    { id: "sk2", label: "Node.js", type: "skill", x: 15, y: 35, size: 40, connections: ["d1", "s2", "p1"] },
    { id: "sk3", label: "Python", type: "skill", x: 85, y: 15, size: 40, connections: ["d2", "s3", "p2"] },
    { id: "sk4", label: "Ethical Hacking", type: "skill", x: 35, y: 85, size: 40, connections: ["d3", "s4"] },
    
    // Projects
    { id: "p1", label: "Social App", type: "project", x: 40, y: 30, size: 50, connections: ["s1", "s2", "sk1", "sk2"] },
    { id: "p2", label: "AI Classifier", type: "project", x: 70, y: 50, size: 50, connections: ["s3", "sk3"] },
    
    // Students
    { id: "s1", label: "Arjun", type: "student", x: 35, y: 45, size: 60, activityLevel: 95, xp: 142000, connections: ["d1", "sk1", "p1", "s2"] },
    { id: "s2", label: "Priya", type: "student", x: 25, y: 50, size: 55, activityLevel: 80, xp: 128500, connections: ["d1", "sk2", "p1", "s1"] },
    { id: "s3", label: "Rahul", type: "student", x: 65, y: 25, size: 50, activityLevel: 60, xp: 115200, connections: ["d2", "sk3", "p2"] },
    { id: "s4", label: "Neha", type: "student", x: 60, y: 70, size: 45, activityLevel: 40, xp: 98000, connections: ["d3", "sk4"] },
  ];

  // Derive edges from connections
  const edges: Edge[] = [];
  const edgeSet = new Set<string>();
  
  nodes.forEach(node => {
    node.connections.forEach(targetId => {
      // Create a unique key for the edge so we don't duplicate A->B and B->A
      const key = [node.id, targetId].sort().join("-");
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push({ source: node.id, target: targetId });
      }
    });
  });

  return { nodes, edges };
};

export function EcosystemGraph() {
  const { nodes, edges } = useMemo(() => generateMockData(), []);
  
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [heatmapMode, setHeatmapMode] = useState(false);
  const [connectionsOnly, setConnectionsOnly] = useState(false);

  // Filter logic
  const visibleEdges = edges.filter(e => {
    if (connectionsOnly) {
      const sourceIsStudent = nodes.find(n => n.id === e.source)?.type === "student";
      const targetIsStudent = nodes.find(n => n.id === e.target)?.type === "student";
      return sourceIsStudent && targetIsStudent;
    }
    return true;
  });

  const getNodeColor = (node: Node, isHovered: boolean, isConnected: boolean) => {
    if (heatmapMode && node.type === "student") {
      // Hot pink for high activity, cool blue for low
      const hue = 300 - ((node.activityLevel || 0) * 1.5); // 300 (pink) to 150 (blue/green)
      return `hsl(${hue}, 100%, 50%)`;
    }

    if (hoveredNode && !isHovered && !isConnected) {
      return "#E5E7EB"; // Dimmed
    }

    switch (node.type) {
      case "student": return "#0033E6"; // Royal Blue
      case "skill": return "#D4FF00"; // Lime
      case "project": return "#000000"; // Black
      case "domain": return "#FFFFFF"; // White
      default: return "#000000";
    }
  };

  const getTextColor = (nodeType: NodeType) => {
    if (nodeType === "student" || nodeType === "project") return "text-white";
    if (nodeType === "skill" || nodeType === "domain") return "text-black";
    return "text-black";
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white border-4 border-black p-4 rounded-2xl shadow-[4px_4px_0px_#000]">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black/50" />
          <input 
            type="text" 
            placeholder="Search network..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#f4f4f5] border-2 border-black rounded-xl font-bold text-black placeholder:text-black/50 focus:outline-none focus:border-[#0033E6]"
          />
        </div>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button 
            onClick={() => setHeatmapMode(!heatmapMode)}
            className={`flex items-center gap-2 px-4 py-2 border-2 border-black rounded-xl font-black uppercase text-xs tracking-widest transition-all flex-1 sm:flex-none justify-center ${heatmapMode ? 'bg-[#FF007F] text-white shadow-[2px_2px_0px_#000]' : 'bg-white text-black hover:bg-black/5'}`}
          >
            <Flame className="w-4 h-4" /> Heatmap
          </button>
          <button 
            onClick={() => setConnectionsOnly(!connectionsOnly)}
            className={`flex items-center gap-2 px-4 py-2 border-2 border-black rounded-xl font-black uppercase text-xs tracking-widest transition-all flex-1 sm:flex-none justify-center ${connectionsOnly ? 'bg-lime text-black shadow-[2px_2px_0px_#000]' : 'bg-white text-black hover:bg-black/5'}`}
          >
            <Share2 className="w-4 h-4" /> Network Only
          </button>
        </div>
      </div>

      {/* Graph Canvas */}
      <div className="relative w-full h-[500px] md:h-[600px] bg-[#f4f4f5] border-4 border-black rounded-[2rem] shadow-[8px_8px_0px_#000] overflow-hidden">
        
        {/* SVG Edges */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {visibleEdges.map((edge, i) => {
            const sourceNode = nodes.find(n => n.id === edge.source);
            const targetNode = nodes.find(n => n.id === edge.target);
            if (!sourceNode || !targetNode) return null;

            const isConnectedToHover = hoveredNode && (edge.source === hoveredNode || edge.target === hoveredNode);
            const isDimmed = hoveredNode && !isConnectedToHover;

            return (
              <line
                key={i}
                x1={`${sourceNode.x}%`}
                y1={`${sourceNode.y}%`}
                x2={`${targetNode.x}%`}
                y2={`${targetNode.y}%`}
                className={`transition-all duration-300 ${
                  isConnectedToHover ? "stroke-black stroke-4" :
                  isDimmed ? "stroke-black/5 stroke-2" : "stroke-black/20 stroke-2"
                }`}
              />
            );
          })}
        </svg>

        {/* Nodes */}
        <div className="absolute inset-0 z-10">
          {nodes.map(node => {
            // Apply search highlighting
            const isSearched = searchQuery && node.label.toLowerCase().includes(searchQuery.toLowerCase());
            const isHovered = hoveredNode === node.id;
            const isConnected = hoveredNode ? node.connections.includes(hoveredNode) : false;
            
            const scale = isHovered ? 1.2 : (isSearched ? 1.5 : 1);
            const zIndex = isHovered || isSearched ? 30 : 10;
            
            const shapeClass = 
              node.type === "domain" ? "rounded-full border-8" :
              node.type === "project" ? "rounded-xl" :
              node.type === "skill" ? "rotate-45" : "rounded-full";

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale,
                  y: [0, -10, 0], 
                }}
                transition={{ 
                  scale: { duration: 0.2 },
                  y: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center border-4 border-black shadow-[4px_4px_0px_#000] cursor-pointer transition-colors duration-300 ${shapeClass}`}
                style={{ 
                  left: `${node.x}%`, 
                  top: `${node.y}%`,
                  width: node.size,
                  height: node.size,
                  backgroundColor: getNodeColor(node, isHovered, isConnected),
                  zIndex
                }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => node.type === "student" ? setSelectedNode(node) : null}
              >
                {/* Node Label/Icon */}
                <div className={`font-black uppercase tracking-widest text-center leading-none ${getTextColor(node.type)} ${node.type === "skill" ? "-rotate-45 text-[10px]" : "text-xs"}`}>
                  {node.type === "domain" ? node.label : 
                   node.type === "student" ? <User className="w-6 h-6 mx-auto" /> : 
                   node.label}
                </div>

                {/* Tooltip on Hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={`absolute top-full mt-4 w-48 bg-white border-4 border-black p-3 rounded-xl shadow-[4px_4px_0px_#000] z-50 ${node.type === "skill" ? "-rotate-45" : ""}`}
                    >
                      <div className="text-[10px] font-black uppercase text-[#0033E6] mb-1">{node.type}</div>
                      <div className="font-display font-black text-black leading-none text-lg">{node.label}</div>
                      {node.xp && <div className="text-xs font-bold text-black/60 mt-2">{node.xp.toLocaleString()} XP</div>}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Slide-in Student Profile */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="absolute top-0 right-0 w-full sm:w-[400px] h-full bg-white border-l-4 border-black z-40 shadow-[-8px_0_0_rgba(0,0,0,0.1)] flex flex-col"
            >
              <div className="p-6 border-b-4 border-black bg-lime flex justify-between items-center">
                <h3 className="font-display font-black text-2xl uppercase tracking-wider text-black">Neural Link</h3>
                <button onClick={() => setSelectedNode(null)} className="p-2 border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors bg-white">
                  X
                </button>
              </div>
              
              <div className="p-8 flex flex-col items-center border-b-4 border-black bg-[#f4f4f5]">
                <div className="w-24 h-24 rounded-full border-4 border-black overflow-hidden bg-white mb-4 shadow-[4px_4px_0px_#000]">
                  <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <h2 className="font-display font-black text-4xl uppercase text-black">{selectedNode.label}</h2>
                <div className="text-sm font-black uppercase tracking-widest text-[#0033E6] bg-[#0033E6]/10 px-3 py-1 rounded-full mt-2">
                  Level 42
                </div>
              </div>

              <div className="p-6 flex-1 bg-white space-y-6">
                <div>
                  <div className="text-xs font-black uppercase text-black/50 mb-2">Total XP</div>
                  <div className="font-display font-black text-3xl text-black">{selectedNode.xp?.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs font-black uppercase text-black/50 mb-2">Activity Level</div>
                  <div className="w-full h-4 bg-[#f4f4f5] border-2 border-black rounded-full overflow-hidden">
                    <div className="h-full bg-lime border-r-2 border-black" style={{ width: `${selectedNode.activityLevel}%` }} />
                  </div>
                </div>
                <button className="w-full bg-[#0033E6] text-white border-4 border-black p-4 rounded-xl font-black uppercase tracking-widest hover:bg-lime hover:text-black transition-colors shadow-[4px_4px_0px_#000]">
                  View Full Profile
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
