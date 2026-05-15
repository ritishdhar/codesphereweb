"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, User, Mail, Lock, BookOpen, GraduationCap } from "lucide-react";
import { signup, login } from "@/lib/auth";
import { useAuth } from "@/lib/AuthContext";

type Mode = "login" | "signup";

const BRANCHES = ["CSE", "IT", "ECE", "MCA", "MBA", "Mechanical", "Civil", "EEE"];
const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Alumni"];

export default function AuthPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    branch: "CSE",
    year: "2nd Year",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    await new Promise(r => setTimeout(r, 800)); // simulate network

    if (mode === "signup") {
      if (!form.name || !form.email || !form.password) {
        setError("Please fill in all fields."); setIsLoading(false); return;
      }
      const result = signup(form);
      if (!result.success) { setError(result.error || "Signup failed."); setIsLoading(false); return; }
      setUser(result.user!);
      router.push("/");
    } else {
      if (!form.email || !form.password) {
        setError("Please enter your email and password."); setIsLoading(false); return;
      }
      const result = login(form.email, form.password);
      if (!result.success) { setError(result.error || "Login failed."); setIsLoading(false); return; }
      setUser(result.user!);
      router.push("/");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0033E6] flex items-center justify-center overflow-hidden px-4 py-12">
      
      {/* Big BG text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <h1 className="text-[30vw] font-display font-black text-white/5 tracking-tighter leading-none whitespace-nowrap">
          {mode === "login" ? "LOGIN" : "JOIN"}
        </h1>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 bg-white px-3 py-2 rounded-2xl border-4 border-black shadow-[4px_4px_0px_#000] hover:-translate-y-1 transition-transform overflow-hidden">
          <img src="/tullas-logo.png" alt="Tula's" className="h-8 w-auto object-contain" />
          <div className="hidden sm:block h-6 w-px bg-black/20" />
          <img src="/logo.png" alt="CodeSphere" className="h-6 w-auto object-contain" />
        </Link>
        <div className="flex gap-2">
          <button onClick={() => { setMode("login"); setError(""); }} className={`px-5 py-2 font-black uppercase tracking-widest text-sm rounded-xl border-4 border-black transition-all ${mode === "login" ? "bg-lime text-black shadow-[4px_4px_0px_#000]" : "bg-white/10 text-white hover:bg-white/20"}`}>Login</button>
          <button onClick={() => { setMode("signup"); setError(""); }} className={`px-5 py-2 font-black uppercase tracking-widest text-sm rounded-xl border-4 border-black transition-all ${mode === "signup" ? "bg-lime text-black shadow-[4px_4px_0px_#000]" : "bg-white/10 text-white hover:bg-white/20"}`}>Sign Up</button>
        </div>
      </div>

      {/* Main card */}
      <motion.div
        key={mode}
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="relative z-10 w-full max-w-lg bg-white border-8 border-black rounded-[2rem] shadow-[16px_16px_0px_#000] overflow-hidden"
      >
        {/* Card header stripe */}
        <div className="bg-lime border-b-8 border-black px-8 py-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
              <img src="/tullas-logo.png" alt="Tula's" className="w-9 h-9 object-contain" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-black/60 leading-none">Powered by Tula's Institute</p>
              <h2 className="font-display font-black text-3xl uppercase text-black leading-none">
                {mode === "login" ? "System Login" : "Create Account"}
              </h2>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          
          {/* Signup extra fields */}
          <AnimatePresence>
            {mode === "signup" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden space-y-5"
              >
                {/* Name */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-black/50 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Your Full Name" className="w-full pl-12 pr-4 py-4 bg-[#f4f4f5] border-4 border-black rounded-xl font-bold text-black focus:outline-none focus:border-[#0033E6] shadow-[4px_4px_0px_#000]" />
                  </div>
                </div>

                {/* Branch + Year */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-black/50 mb-2">Branch</label>
                    <div className="relative">
                      <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 pointer-events-none" />
                      <select name="branch" value={form.branch} onChange={handleChange} className="w-full pl-10 pr-4 py-4 bg-[#f4f4f5] border-4 border-black rounded-xl font-bold text-black focus:outline-none focus:border-[#0033E6] shadow-[4px_4px_0px_#000] appearance-none">
                        {BRANCHES.map(b => <option key={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-black/50 mb-2">Year</label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 pointer-events-none" />
                      <select name="year" value={form.year} onChange={handleChange} className="w-full pl-10 pr-4 py-4 bg-[#f4f4f5] border-4 border-black rounded-xl font-bold text-black focus:outline-none focus:border-[#0033E6] shadow-[4px_4px_0px_#000] appearance-none">
                        {YEARS.map(y => <option key={y}>{y}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-black/50 mb-2">Email / User ID</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className="w-full pl-12 pr-4 py-4 bg-[#f4f4f5] border-4 border-black rounded-xl font-bold text-black focus:outline-none focus:border-[#0033E6] shadow-[4px_4px_0px_#000]" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-black/50 mb-2">Security Key (Password)</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
              <input name="password" type={showPass ? "text" : "password"} value={form.password} onChange={handleChange} placeholder="••••••••" className="w-full pl-12 pr-14 py-4 bg-[#f4f4f5] border-4 border-black rounded-xl font-bold text-black focus:outline-none focus:border-[#0033E6] shadow-[4px_4px_0px_#000]" />
              <button type="button" onClick={() => setShowPass(p => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors">
                {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-50 border-4 border-red-500 p-4 rounded-xl">
              <p className="text-red-600 font-black text-sm uppercase tracking-widest">{error}</p>
            </motion.div>
          )}

          {/* Submit */}
          <button type="submit" disabled={isLoading} className="w-full py-5 bg-[#0033E6] border-4 border-black rounded-xl font-display font-black text-2xl uppercase tracking-wider text-white shadow-[6px_6px_0px_#000] hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3">
            {isLoading ? (
              <span className="flex items-center gap-3">
                <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                {mode === "login" ? "Accessing..." : "Creating..."}
              </span>
            ) : (
              <>{mode === "login" ? "Initialize System" : "Join The Sphere"} <ArrowRight className="w-6 h-6" /></>
            )}
          </button>

          {/* Switch mode */}
          <p className="text-center font-bold text-black/50 text-sm">
            {mode === "login" ? "No account? " : "Already a member? "}
            <button type="button" onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }} className="font-black text-[#0033E6] underline underline-offset-4 decoration-2 hover:text-black transition-colors">
              {mode === "login" ? "Create one now" : "Sign in"}
            </button>
          </p>
        </form>
      </motion.div>

      {/* Bottom brand */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-50">
        <img src="/tullas-logo.png" alt="Tula's" className="h-5 w-auto object-contain filter brightness-0 invert" />
        <span className="text-white font-black uppercase tracking-widest text-xs">Tula's Institute of Engineering</span>
      </div>
    </div>
  );
}
