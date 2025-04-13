"use client";
import { cn } from "@/lib/utils";
import { JSX, useEffect, useRef, useState } from "react";
import { sections, spacings } from "./constants";
import LavaLab from "./lavalab";

export default function Footer() {
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [overflowingIndices, setOverflowingIndices] = useState<number[]>([]);

  useEffect(() => {
    const checkOverflow = () => {
      const overflowed: number[] = [];

      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.right > window.innerWidth) {
            overflowed.push(index);
          }
        }
      });

      setOverflowingIndices(overflowed);
    };

    checkOverflow(); // Initial check

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(document.body);

    window.addEventListener("resize", checkOverflow);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  let repositionedSections: JSX.Element[][] = sections.map((v) => [v]);

  switch (overflowingIndices[0]) {
    case 3:
      repositionedSections = [
        [sections[0]],
        [sections[1]],
        [sections[2], sections[3]],
        [sections[3]],
      ];
      break;
    case 2:
      repositionedSections = [
        [sections[0], sections[2]],
        [sections[1], sections[3]],
        [sections[2], sections[3]],
        [sections[3]],
      ];
      break;
    case 1:
      repositionedSections = [
        [sections[0], sections[1], sections[2], sections[3]],
        [sections[1], sections[3]],
        [sections[2], sections[3]],
        [sections[3]],
      ];
      break;
  }

  return (
    <footer style={{ height: 300 }}>
      <div className="absolute w-full">
        <LavaLab />
      </div>

      <div className="absolute w-full">
        <div
          className="relative mx-auto text-sm text-neutral-500"
          style={{ width: 1356, height: 300 }}
        >
          {repositionedSections.map((innerSections, index) => {
            const isOverflowing = overflowingIndices.includes(index);

            return (
              <div
                key={index}
                className={cn("absolute", isOverflowing && "invisible")}
                style={{ bottom: 158, left: spacings[index] || 0 }}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
              >
                <div className="space-y-2">
                  {innerSections.map((section, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex flex-col",
                        innerSections.length == 1 && "h-15",
                      )}
                    >
                      {section}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
