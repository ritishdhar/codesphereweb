"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative w-full border-t-8 border-black bg-white pt-24 pb-12 px-6 lg:px-12 z-20 overflow-hidden">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-16 relative z-10">
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-center px-4 py-2 rounded-[2rem] border-4 border-black shadow-[4px_4px_0px_#000] inline-block w-fit mb-4 bg-white hover:-translate-y-1 transition-transform overflow-hidden max-w-full">
            <img src="/logo.png" alt="Codesphere Logo" className="h-24 md:h-32 w-auto max-w-full object-contain scale-125" />
          </div>
          <p className="text-black font-bold text-lg max-w-sm leading-tight uppercase tracking-widest">
            "An Interactive Universe for Student Innovators"<br/>
            Built for dreamers. Deployed for winners.
          </p>
        </div>
        
        <div className="space-y-6">
          <h4 className="font-display text-[#0033E6] tracking-widest text-xl font-black uppercase">ECOSYSTEM</h4>
          <ul className="space-y-4 text-sm text-black font-bold uppercase tracking-widest">
            <li><Link href="/explore" className="hover:text-lime hover:underline transition-colors decoration-4 underline-offset-4">Map</Link></li>
            <li><Link href="/hackathons" className="hover:text-lime hover:underline transition-colors decoration-4 underline-offset-4">War Room</Link></li>
            <li><Link href="/events" className="hover:text-lime hover:underline transition-colors decoration-4 underline-offset-4">Events</Link></li>
            <li><Link href="/skills" className="hover:text-lime hover:underline transition-colors decoration-4 underline-offset-4">Skill Tree</Link></li>
          </ul>
        </div>
        
        <div className="space-y-6">
          <h4 className="font-display text-[#0033E6] tracking-widest text-xl font-black uppercase">CONNECT</h4>
          <div className="flex gap-4">
            <a href="#" className="w-14 h-14 rounded-full border-4 border-black bg-lime flex items-center justify-center text-black hover:bg-black hover:text-lime hover:-translate-y-1 transition-all shadow-[4px_4px_0px_#000]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            </a>
            <a href="#" className="w-14 h-14 rounded-full border-4 border-black bg-lime flex items-center justify-center text-black hover:bg-black hover:text-lime hover:-translate-y-1 transition-all shadow-[4px_4px_0px_#000]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" className="w-14 h-14 rounded-full border-4 border-black bg-lime flex items-center justify-center text-black hover:bg-black hover:text-lime hover:-translate-y-1 transition-all shadow-[4px_4px_0px_#000]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-8 border-t-4 border-black text-xs text-black font-bold uppercase tracking-widest">
        <p>© 2026 CODESPHERE. SYSTEM ONLINE.</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-[#0033E6] hover:underline transition-colors decoration-2 underline-offset-4">Privacy Protocol</Link>
          <Link href="/terms" className="hover:text-[#0033E6] hover:underline transition-colors decoration-2 underline-offset-4">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
