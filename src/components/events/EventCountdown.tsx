"use client";

import { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: string;
}

export function EventCountdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const pad = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-2">
      {Object.entries(timeLeft).map(([unit, value], i) => (
        <div key={unit} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <div className="bg-white border-4 border-black w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl shadow-[4px_4px_0px_#000]">
              <span className="font-display font-black text-xl sm:text-2xl text-black">
                {pad(value)}
              </span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-black/60 mt-1">
              {unit.charAt(0)}
            </span>
          </div>
          {i < 3 && <div className="font-black text-2xl pb-4 animate-pulse">:</div>}
        </div>
      ))}
    </div>
  );
}
