"use client";

import { useEffect, useState } from "react";
import AnimatedLamp from "./animated-lamp";

import useMouseTransform from "@/lib/useMouseTransform";
import { motion } from "motion/react";
import "./lamp.css";

export default function LavaLamp() {
  const [animationState, setAnimationState] = useState("falling");

  useEffect(() => {
    // After the falling animation completes, switch to wobbling
    const timer = setTimeout(() => {
      setAnimationState("wobbling");
    }, 900); // 1 second for falling animation

    return () => clearTimeout(timer);
  }, []);

  // Animation class based on state
  const animationClass = animationState === "falling" ? "animate-falling" : "";

  const { imageX, imageY, rotateX, rotateY } = useMouseTransform(0.005, 0);

  return (
    <div className="absolute top-1/2 left-1/2 z-10 aspect-square min-h-screen min-w-screen -translate-1/2">
      <motion.div
        className={`absolute left-1/2 z-10 w-72 -translate-x-1/2 md:w-80 lg:w-96`}
        style={{
          bottom: "calc(35% - 5vh)",

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
        <div className={`${animationClass}`}>
          <AnimatedLamp />
        </div>
      </motion.div>
    </div>
  );
}
