"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { LogOut, LogIn } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Identity", href: "/identity" },
    { name: "Skills", href: "/skills" },
    { name: "Ecosystem", href: "/explore" },
    { name: "Events", href: "/events" },
    { name: "War Room", href: "/hackathons" },
  ];

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 lg:px-12 mx-auto max-w-[1400px] bg-transparent"
    >
      {/* Logo — Tula's + CodeSphere side by side */}
      <Link href="/" className="flex items-center gap-2 bg-white shadow-[4px_4px_0px_#000] border-4 border-black px-4 py-2 rounded-[2rem] hover:-translate-y-1 transition-transform overflow-hidden">
        <img src="/tullas-logo.png" alt="Tula's" className="h-14 sm:h-16 w-auto object-contain scale-[1.35]" />
        <div className="h-8 w-[3px] bg-black/20 rounded-full" />
        <img src="/logo.png" alt="CodeSphere" className="h-10 sm:h-12 w-auto object-contain scale-125" />
      </Link>

      {/* Center Nav */}
      <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 bg-white px-3 py-2 rounded-[2rem] border-4 border-black shadow-[4px_4px_0px_#000]">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`px-4 py-2 rounded-full font-black uppercase tracking-widest text-xs transition-all ${
                isActive
                  ? "bg-lime text-black shadow-[2px_2px_0px_#000] border-2 border-black scale-105"
                  : "text-black hover:bg-black/5 hover:-translate-y-0.5"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Right: User or Login */}
      <div className="flex items-center gap-3">
        {user ? (
          /* Logged-in state */
          <div className="flex items-center gap-2 bg-white border-4 border-black shadow-[4px_4px_0px_#000] rounded-[2rem] pl-1 pr-4 py-1">
            <div className="w-10 h-10 rounded-full border-2 border-black overflow-hidden bg-lime flex-shrink-0">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-black uppercase text-xs text-black tracking-wider truncate max-w-[100px]">{user.name.split(" ")[0]}</span>
              <span className="text-[10px] font-black text-[#0033E6] uppercase tracking-widest">{user.xp.toLocaleString()} XP · Lvl {user.level}</span>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="ml-2 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-red-500 transition-colors border-2 border-black"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Logged-out state */
          <Link
            href="/auth"
            className="flex items-center gap-2 bg-lime border-4 border-black px-5 py-2 rounded-[2rem] shadow-[4px_4px_0px_#000] font-black uppercase tracking-widest text-sm text-black hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000] transition-all"
          >
            <LogIn className="w-4 h-4" />
            Join Now
          </Link>
        )}
      </div>
    </motion.header>
  );
}
