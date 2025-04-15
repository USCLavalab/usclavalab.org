"use client";

import InteractivePatternMaker from "./interactive-pattern-maker";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { events, patterns } from "./constants";

export default function EventsSection() {
  const [selectedPatternIndex, setSelectedPatternIndex] = useState<
    number | null
  >(null);
  const event = events[selectedPatternIndex || 0];

  return (
    <>
      <div className="relative z-10 flex w-full flex-col items-center space-y-10 px-4 text-center">
        <h2 className="font-sans font-normal opacity-50">[ Events ]</h2>

        <InteractivePatternMaker
          patterns={patterns}
          onSelectedPatternChange={setSelectedPatternIndex}
        />

        <AnimatePresence mode="wait">
          {selectedPatternIndex == null ? (
            <motion.div
              key="default"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl space-y-6 text-center"
            >
              <p>
                LavaLab is a community of 500+ ambitious entrepreneurs,
                relentless builders, and fearless change-makers driven by a
                shared passion for innovation and impact.
              </p>
              <p>
                Fueled by lifelong connection, you’ll find a culture that pushes
                you to grow, challenge the status quo, and become the boldest
                version of yourself.
              </p>
              <p>
                If any of this resonates with you, we welcome you to the LavaLab
                community.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={selectedPatternIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl space-y-6 text-center"
            >
              <p>{event.title}</p>
              <p>{event.description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedPatternIndex !== null && event.img !== null && (
          <motion.div
            key={selectedPatternIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-0 size-full overflow-hidden"
          >
            <Image
              src={event.img}
              placeholder="blur"
              priority
              alt="Event Image"
              fill
              className="top-0 object-cover object-center opacity-30"
            />
            <div className="absolute top-0 h-1/4 w-full bg-gradient-to-b from-black to-black/0" />
            <div className="absolute bottom-0 h-1/4 w-full bg-gradient-to-b from-black/0 to-black" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preload all event images */}
      <div className="hidden">
        {events.map(
          (e, idx) =>
            e.img && (
              <Image
                key={idx}
                src={e.img}
                alt={`Preload Event Image ${idx}`}
                width={1}
                height={1}
                priority
              />
            ),
        )}
      </div>
    </>
  );
}
