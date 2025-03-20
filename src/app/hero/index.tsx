"use client";

import { useEffect, useState } from "react";
import HeroBackground from "./background";
import LavaLamp from "./lamp";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [fadeOutPoint, setFadeOutPoint] = useState(0);
  const scrollProgress = Math.min(scrollY / fadeOutPoint, 1); // 0 to 1

  useEffect(() => {
    const updateFadeOutPoint = () => {
      setFadeOutPoint(window.innerHeight * 0.75);
    };

    window.addEventListener("resize", updateFadeOutPoint);
    return () => window.removeEventListener("resize", updateFadeOutPoint);
  }, []);

  const opacity = 1 - scrollProgress;
  const blur = scrollProgress * 10; // max 10px blur

  return (
    <div
      className="sticky top-0 z-0 h-screen w-screen"
      style={{
        opacity,
        filter: `blur(${blur}px)`,
      }}
    >
      <div className="absolute top-1/4 left-1/2 z-10 -translate-1/2 space-y-4 text-center">
        <h1 className="text-6xl">LavaLab</h1>
        <p className="text-lg leading-[1.4]">
          Meet your cofounders.
          <br />
          USC’s premier, student-run, product incubator.
        </p>
      </div>

      <LavaLamp />

      <HeroBackground />
    </div>
  );
}
