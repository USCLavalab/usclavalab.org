import { useEffect, useRef } from "react";

export default function GrainedBackground({
  animate = true,
  patternWidth = 200,
  patternHeight = 200,
  grainOpacity = 1 / 3,
  grainDensity = 5,
  grainWidth = 1,
  grainHeight = 1,
  grainChaos = 0.5,
  grainSpeed = 20,
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const grainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = patternWidth;
    canvas.height = patternHeight;

    for (let w = 0; w < patternWidth; w += grainDensity) {
      for (let h = 0; h < patternHeight; h += grainDensity) {
        const rgb = (Math.random() * 256) | 0;
        ctx!.fillStyle = `rgba(${rgb}, ${rgb}, ${rgb}, ${grainOpacity})`;
        ctx!.fillRect(w, h, grainWidth, grainHeight);
      }
    }

    const noiseDataUrl = canvas.toDataURL("image/png");
    if (grainRef.current) {
      grainRef.current.style.backgroundImage = `url(${noiseDataUrl})`;
    }
  }, [
    patternWidth,
    patternHeight,
    grainOpacity,
    grainDensity,
    grainWidth,
    grainHeight,
  ]);

  useEffect(() => {
    if (!animate || !grainRef.current) return;

    const animationName = "grained-react-animation";
    const styleEl = document.createElement("style");
    styleEl.id = "grained-style";

    const keyframes = [
      "0% { transform: translate(-10%, 10%); }",
      "10% { transform: translate(-25%, 0%); }",
      "20% { transform: translate(-30%, 10%); }",
      "30% { transform: translate(-30%, 30%); }",
      "40% { transform: translate(-20%, 20%); }",
      "50% { transform: translate(-15%, 10%); }",
      "60% { transform: translate(-20%, 20%); }",
      "70% { transform: translate(-5%, 20%); }",
      "80% { transform: translate(-25%, 5%); }",
      "90% { transform: translate(-30%, 25%); }",
      "100% { transform: translate(-10%, 10%); }",
    ];

    styleEl.innerHTML = `
      @keyframes ${animationName} {
        ${keyframes.join("\n")}
      }
    `;

    document.head.appendChild(styleEl);

    grainRef.current.style.animation = `${animationName} ${grainChaos}s steps(${grainSpeed}, end) infinite`;

    return () => {
      document.head.removeChild(styleEl);
    };
  }, [animate, grainChaos, grainSpeed]);

  return (
    <div
      ref={containerRef}
      className={`relative size-full overflow-hidden`}
      style={{ position: "relative" }}
    >
      <div
        ref={grainRef}
        style={{
          content: '""',
          position: "absolute",
          top: "-100%",
          left: "-100%",
          width: "300%",
          height: "300%",
          zIndex: 0,
          pointerEvents: "none",
          backgroundRepeat: "repeat",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }} />
    </div>
  );
}
