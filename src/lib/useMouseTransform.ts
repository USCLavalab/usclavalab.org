import { useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

export default function useMouseTransform(
  panIntensity: number,
  rotationIntensity: number,
) {
  // Create motion values for mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Create spring animations for smoother movement
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Transform the mouse position to image offset (inverted to move away from cursor)
  // The divisors control the intensity of the effect
  const imageX = useTransform(springX, (x) => -x * panIntensity);
  const imageY = useTransform(springY, (y) => -y * panIntensity);

  // Add rotation transform values for tilting effect
  const rotateX = useTransform(springY, (y) => -y * rotationIntensity); // Tilt on X-axis (based on Y mouse position)
  const rotateY = useTransform(springX, (x) => x * rotationIntensity); // Tilt on Y-axis (based on X mouse position)

  // Update mouse position on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to the center of the viewport
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return {
    imageX,
    imageY,
    rotateX,
    rotateY,
  };
}
