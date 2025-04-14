"use client";

import useMouseTransform from "@/hooks/use-mouse-transform";
import { motion } from "motion/react";
import Image from "next/image";
import backgroundImage from "./background-image.webp";
import GrainedBackground from "./grained";

export default function HeroBackground() {
  // const [images, setImages] = useState([]);
  // const [frameIndex, setFrameIndex] = useState(50);

  // useEffect(() => {
  //   // Preload frames
  //   const loadedImages = [];
  //   let loadedCount = 0;

  //   for (let i = 0; i < TOTAL_FRAMES; i++) {
  //     const img = new Image();
  //     img.src = FRAME_PATH(i + 1);
  //     img.onload = () => {
  //       loadedCount++;
  //       if (loadedCount === TOTAL_FRAMES) {
  //         setImages(loadedImages);
  //       }
  //     };
  //     loadedImages.push(img);
  //   }
  // }, []);

  // const handleMouseMove = (e) => {
  //   if (images.length === 0) return;

  //   const percentage = e.clientX / window.innerWidth;
  //   const newIndex = Math.floor(percentage * TOTAL_FRAMES);
  //   setFrameIndex(Math.min(Math.max(newIndex, 0), TOTAL_FRAMES - 1));
  // };

  // useEffect(() => {
  //   window.addEventListener("mousemove", handleMouseMove);
  //   return () => {
  //     window.removeEventListener("mousemove", handleMouseMove);
  //   };
  // }, [images]);

  const { imageX, imageY, rotateX, rotateY } = useMouseTransform(0.001, 0.005);

  return (
    <div className="absolute top-0 left-0 size-full overflow-hidden">
      {/* <div className="relative size-full">
        <div className="relative size-full">
          {images.length > 0 ? (
            <NextImage
              src={images[frameIndex].src}
              alt={`Frame ${frameIndex}`}
              fill
              className="object-cover"
            />
          ) : (
            <p>Loading frames...</p>
          )}
        </div>
      </div> */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mt-[5vh] size-full"
        style={{
          scale: 1.1,
          x: imageX,
          y: imageY,
          rotateX: rotateX,
          rotateY: rotateY,
          transformPerspective: 1000,
        }}
      >
        <Image
          src={backgroundImage}
          quality={100}
          alt="background image"
          fill
          className="object-cover object-center"
        />
      </motion.div>

      <div className="absolute top-0 size-full">
        <div className="absolute top-0 h-[5vh] w-full bg-gradient-to-b from-black to-black/0" />
        <GrainedBackground />
      </div>

      <div className="via-40 absolute top-0 size-full bg-gradient-to-t from-black via-black/20 to-black/0" />
    </div>
  );
}
