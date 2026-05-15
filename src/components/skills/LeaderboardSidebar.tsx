"use client";

const LEADERBOARD = [
  { rank: 1, name: "Arjun Dev", xp: 142000, level: 42, avatar: "https://i.pravatar.cc/150?img=11" },
  { rank: 2, name: "Priya.eth", xp: 128500, level: 38, avatar: "https://i.pravatar.cc/150?img=5" },
  { rank: 3, name: "Rahul Singh", xp: 115200, level: 35, avatar: "https://i.pravatar.cc/150?img=12" },
  { rank: 4, name: "Neha Gupta", xp: 98000, level: 31, avatar: "https://i.pravatar.cc/150?img=20" },
  { rank: 5, name: "You", xp: 7250, level: 14, avatar: "https://i.pravatar.cc/150?img=33", isCurrentUser: true },
  { rank: 6, name: "Dev Kumar", xp: 6800, level: 12, avatar: "https://i.pravatar.cc/150?img=60" },
];

export function LeaderboardSidebar() {
  return (
    <div className="w-full bg-white border-4 border-black rounded-[2rem] shadow-[8px_8px_0px_#000] overflow-hidden flex flex-col h-[600px] md:h-[800px]">
      <div className="p-6 border-b-4 border-black bg-lime">
        <h3 className="font-display font-black text-3xl uppercase tracking-wider text-black">Top Builders</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f4f4f5]">
        {LEADERBOARD.map((user) => {
          const isTop3 = user.rank <= 3;
          const rankColor = 
            user.rank === 1 ? "bg-yellow-400 text-black border-black" :
            user.rank === 2 ? "bg-gray-300 text-black border-black" :
            user.rank === 3 ? "bg-amber-600 text-white border-black" :
            "bg-white text-black border-black/20";

          return (
            <div 
              key={user.rank}
              className={`flex items-center gap-4 p-4 rounded-2xl border-4 border-black transition-transform hover:-translate-y-1 ${
                user.isCurrentUser ? "bg-[#0033E6] text-white shadow-[4px_4px_0px_#D4FF00]" : "bg-white shadow-[4px_4px_0px_#000]"
              }`}
            >
              <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl border-4 font-display font-black text-lg ${rankColor}`}>
                #{user.rank}
              </div>
              
              <div className="w-12 h-12 flex-shrink-0 rounded-full border-4 border-black overflow-hidden bg-white">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <div className={`font-display font-black truncate text-lg leading-tight ${user.isCurrentUser ? "text-white" : "text-black"}`}>
                  {user.name}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded-md border-2 border-black ${user.isCurrentUser ? "bg-lime text-black" : "bg-black/5 text-black"}`}>
                    Lvl {user.level}
                  </span>
                  <span className={`text-xs font-bold ${user.isCurrentUser ? "text-lime" : "text-[#0033E6]"}`}>
                    {user.xp.toLocaleString()} XP
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
