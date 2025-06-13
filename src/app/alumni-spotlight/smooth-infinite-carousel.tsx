"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AlumniSpotlightItem } from "./items";

export default function SmoothInfiniteCarousel({
  items,
}: {
  items: AlumniSpotlightItem[];
}) {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const pauseStartRef = useRef<number | null>(null);
  const totalPausedTimeRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!innerRef.current || !containerRef.current) return;

    // Clone only once
    const alreadyCloned = innerRef.current.children.length > items.length;
    if (!alreadyCloned) {
      const originalItems = Array.from(innerRef.current.children);
      originalItems.forEach((item) => {
        const clone = item.cloneNode(true);
        innerRef.current?.appendChild(clone);
      });
    }

    let animationFrame: number;
    const duration = 40000;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed =
        timestamp - startTimeRef.current - totalPausedTimeRef.current;

      const itemWidth = innerRef.current!.scrollWidth / (items.length * 2);
      const totalOriginalWidth = itemWidth * items.length;

      const scrollPosition =
        ((elapsed % duration) / duration) * totalOriginalWidth;

      containerRef.current!.scrollLeft = scrollPosition;
      animationFrame = requestAnimationFrame(animate);
    };

    // Handle pause logic
    if (isPaused) {
      pauseStartRef.current = performance.now(); // start of pause
      return;
    }

    // If coming back from pause
    if (pauseStartRef.current !== null) {
      const pauseDuration = performance.now() - pauseStartRef.current;
      totalPausedTimeRef.current += pauseDuration;
      pauseStartRef.current = null;
    }

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [items.length, isPaused]);

  return (
    <div
      className="relative mx-auto w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      ref={containerRef}
    >
      <div ref={innerRef} className="flex">
        {items.map((item, index) => (
          <div key={index} className="flex-shrink-0 px-2">
            <div className="relative flex size-80 flex-col items-start justify-between border border-neutral-600 bg-neutral-900 p-6 text-left text-white">
              <div className="text-sm text-neutral-400">{item.founders}</div>

              <div>
                <div className="mb-1 text-sm text-neutral-400">
                  {item.description}
                </div>
                <div className="text-sm text-neutral-500">{item.metrics}</div>
              </div>

              <div className="absolute top-0 left-0 flex size-full items-center justify-center">
                <Image
                  src={item.logo}
                  alt={`${item.name} logo`}
                  className="h-6 w-[unset] md:h-8"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
