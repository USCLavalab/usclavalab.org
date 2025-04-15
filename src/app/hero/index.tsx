"use client";

import { buttonVariants } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
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

      <div className="absolute top-1/4 left-1/2 z-10 w-full max-w-72 -translate-1/2 space-y-6 text-center">
        <h1 className="text-5xl md:text-6xl">LavaLab</h1>
        <p className="leading-[1.4] md:text-lg">
          Meet your cofounders. <br className="hidden md:block" />
          USC’s premier, student-run, product incubator.
        </p>
        <div className="space-x-4">
          <Link
            href={"https://forms.gle/ab73pNHHozRN4F5W8"}
            className={buttonVariants()}
          >
            Spring 2025
          </Link>
          <Link
            href={"mailto:usclavalab@gmail.com"}
            className={buttonVariants({ variant: "outline" })}
          >
            Contact
          </Link>
        </div>
      </div>

      <HeroBackground />

      <div className="xs:bottom-10 fixed bottom-0 left-1/2 z-10 flex -translate-x-1/2 -translate-y-full transform animate-bounce flex-col items-center text-neutral-500">
        <ChevronDown className="size-10 animate-pulse" />
      </div>
    </div>
  );
}
