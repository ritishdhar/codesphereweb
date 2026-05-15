"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsBar } from "@/components/sections/StatsBar";
import { EcosystemPreview } from "@/components/sections/EcosystemPreview";
import { FeaturedAchievements } from "@/components/sections/FeaturedAchievements";
import { UpcomingEvents } from "@/components/sections/UpcomingEvents";
import { ArchetypesShowcase } from "@/components/sections/ArchetypesShowcase";
import { AIOrb } from "@/components/ui/AIOrb";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-background overflow-hidden selection:bg-cyan-500/30">
      <Navbar />
      
      <div className="relative z-10 flex flex-col items-center justify-center">
        <HeroSection />
        <StatsBar />
        <EcosystemPreview />
        <FeaturedAchievements />
        <UpcomingEvents />
        <ArchetypesShowcase />
      </div>

      <Footer />
      <AIOrb />
    </main>
  );
}
