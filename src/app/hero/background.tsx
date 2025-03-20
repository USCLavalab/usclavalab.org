"use client";

import useMouseTransform from "@/lib/useMouseTransform";
import { motion } from "motion/react";
import Image from "next/image";
import backgroundImage from "./background-image.webp";

export default function HeroBackground() {
  const { imageX, imageY, rotateX, rotateY } = useMouseTransform(0.01, 0.005);

  return (
    <div className="size-full absolute top-0 left-0 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="size-full"
        style={{
          scale: 1.05,
          x: imageX,
          y: imageY,
          rotateX: rotateX,
          rotateY: rotateY,
          transformPerspective: 1000,
        }}
      >
        <Image
          src={backgroundImage}
          alt="background image"
          fill
          className="object-cover object-center"
        />
      </motion.div>
      <div className="bg-gradient-to-t from-black via-black/20 via-40 to-black/0 size-full absolute top-0" />
    </div>
  );
}
