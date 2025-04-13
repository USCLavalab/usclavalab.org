"use client";

import InteractivePatternMaker from "./interactive-pattern-maker";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import BonfireImg from "./img/bonfire.jpeg";
import DemoNightImg from "./img/demo-night.jpeg";
import FiresideChatsImg from "./img/fireside-chats.jpeg";
import HackNightImg from "./img/hack-night.png";
import RetreatImg from "./img/retreat.jpeg";
import WorkshopsImg from "./img/workshops.png";

const patterns = [
  [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [1, 1, 0],
    [1, 0, 0],
  ],
  [
    [0, 1, 1],
    [1, 0, 1],
    [1, 1, 0],
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
    [1, 0, 1],
  ],
  [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 0],
  ],
  [
    [1, 0, 1],
    [0, 1, 1],
    [1, 0, 1],
  ],
  [
    [1, 1, 0],
    [1, 0, 1],
    [1, 1, 0],
  ],
  [
    [0, 1, 0],
    [1, 0, 1],
    [1, 0, 1],
  ],
];

const events = [
  {
    title: "Fireside Chats",
    description:
      "Each semester, LavaLab invites the industry’s top pioneers and entrepreneurs to share their experiences and engage with our members.",
    img: FiresideChatsImg,
  },
  {
    title: "Beach Bonfire",
    description:
      "The first social event of the new cohort. Bond with your fellow cohort members and LavaLab alumni over roasted marshmallows.",
    img: BonfireImg,
  },
  {
    title: "Alumni Workshops",
    description:
      "LavaLum know best. Learn insights and skills from alumni-led workshops on anything from React Native, to Figma shortcuts, to giving the best pitch.",
    img: WorkshopsImg,
  },
  {
    title: "Community Retreat",
    description:
      "Who doesn’t love a weekend getaway? Join fellow cohort members and LavaLab alumni for a trip off campus. Get to know your future co-founders on a whole ‘nother level.",
    img: RetreatImg,
  },
  {
    title: "Pitch Night",
    description:
      "Two weeks before the final showcase, run through your pitch with no judgement. Get feedback from LavaLum on how to perfect your product and pitch for Demo Night.",
    img: null,
  },
  {
    title: "Hack Night",
    description:
      "It’s the final stretch. Join your fellow devs and designers to grind out the finishing touches of your product. Fuel up with free food and encouragement from our Eboard.",
    img: HackNightImg,
  },
  {
    title: "Demo Night",
    description:
      "The Oscars of LavaLab. Demo and pitch your product to investor judges and showcase your team’s hard work.",
    img: DemoNightImg,
  },
  {
    title: "LavaLab Formal",
    description:
      "A celebration of hard work, new friends, and the graduation of another accomplished cohort. Cheers!",
    img: null,
  },
];

export default function EventsSection() {
  const [selectedPatternIndex, setSelectedPatternIndex] = useState<
    number | null
  >(null);
  const event = events[selectedPatternIndex || 0];

  return (
    <>
      <div className="relative z-10 flex w-full flex-col items-center space-y-10 text-center">
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
    </>
  );
}
