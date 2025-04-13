"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import HeroBackground from "./background";
import LavaLamp from "./lamp";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [fadeOutPoint, setFadeOutPoint] = useState(0);
  const scrollProgress = Math.min(
    fadeOutPoint > 0 ? scrollY / fadeOutPoint : 0,
    1,
  );

  useEffect(() => {
    const updateFadeOutPoint = () => {
      setFadeOutPoint(window.innerHeight * 0.75);
    };

    updateFadeOutPoint();

    window.addEventListener("resize", updateFadeOutPoint);
    return () => window.removeEventListener("resize", updateFadeOutPoint);
  }, []);

  const opacity = 1 - scrollProgress;
  const blur = scrollProgress * 10; // max 10px blur

  return (
    <div
      className="fixed top-12 z-0 h-screen w-screen snap-start pt-48"
      style={{
        opacity,
        filter: `blur(${blur}px)`,
      }}
    >
      <LavaLamp />

      <div className="absolute top-1/4 left-1/2 z-10 -translate-1/2 space-y-6 text-center">
        <h1 className="text-6xl">LavaLab</h1>
        <p className="text-lg leading-[1.4]">
          Meet your cofounders.
          <br />
          USC’s premier, student-run, product incubator.
        </p>
        <div className="space-x-4">
          <Button onClick={() => {}}>Spring 2025</Button>
          <Button variant={"outline"}>Contact</Button>
        </div>
      </div>

      <HeroBackground />

      <div className="fixed bottom-10 left-1/2 flex -translate-x-1/2 -translate-y-full transform animate-bounce flex-col items-center text-neutral-500">
        <ChevronDown className="size-10 animate-pulse" />
      </div>
    </div>
  );
}
