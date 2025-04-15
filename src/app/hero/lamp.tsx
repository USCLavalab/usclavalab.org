"use client";

import AnimatedLamp from "./animated-lamp";

import useMouseTransform from "@/hooks/use-mouse-transform";
import { AnimatePresence, motion } from "motion/react";
import "./lamp.css";

export default function LavaLamp() {
  const { imageX, imageY, rotateX, rotateY } = useMouseTransform(0.005, 0);

  return (
    <div className="absolute top-1/2 left-1/2 z-10 aspect-square min-h-screen min-w-screen -translate-1/2">
      <motion.div
        className={`absolute left-1/2 z-10 w-72 -translate-x-1/2 md:w-80 lg:w-96`}
        style={{
          bottom: "calc(35% - 6vh)",

          scale: 1.05,
          x: imageX,
          y: imageY,
          rotateX: rotateX,
          rotateY: rotateY,
          transformPerspective: 1000,
        }}
      >
        <div
          className="absolute bottom-0 left-1/2 h-12 w-56 -translate-x-1/2 rounded-[50%] bg-black opacity-80"
          style={{ filter: "blur(10px)" }}
        />
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 1,
            }}
          >
            <AnimatedLamp />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
