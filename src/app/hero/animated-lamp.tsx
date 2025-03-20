"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import lampImage from "./lamp.png";

const LavaLamp = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const randomBetween = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
      };

      const tl = gsap.timeline();

      for (let i = 0; i < 5; i++) {
        const blob = containerRef.current?.querySelector(`#blob${i}`);
        if (blob) {
          const t = gsap.to(blob, {
            y: 260,
            repeat: -1,
            repeatDelay: randomBetween(1, 3),
            yoyo: true,
            ease: "none",
            duration: randomBetween(14, 50),
          });

          tl.add(t, (i + 1) / 0.6);
        }
      }

      tl.seek(120);
      tl.timeScale(2);
    }
  }, [containerRef]);

  return (
    <div
      className="lava-lamp-container flex h-full w-full items-center justify-center"
      ref={containerRef}
    >
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 600 600"
        xmlSpace="preserve"
        className="w-full max-w-md brightness-150 grayscale"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -9"
              result="cm"
            />
          </filter>
          <radialGradient
            id="bgGrad"
            cx="300"
            cy="300"
            r="300"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="7.142857e-002" style={{ stopColor: "#471A19" }} />
            <stop offset="0.3107" style={{ stopColor: "#290F0E" }} />
            <stop offset="0.553" style={{ stopColor: "#120706" }} />
            <stop offset="0.7828" style={{ stopColor: "#050202" }} />
            <stop offset="0.9847" style={{ stopColor: "#000000" }} />
          </radialGradient>

          <clipPath
            id="mask0_18_9"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="239"
            y="198"
            width="123"
            height="204"
          >
            <path
              d="M241 397.479C256.476 399.654 277.868 401 301.5 401C324.13 401 344.706 399.766 360 397.751C361 395.085 362.6 386.1 359 368.5L330 198.5H272.5L242 368C238.4 385.6 240 394.813 241 397.479Z"
              fill="#D9D9D9"
              stroke="black"
            />
          </clipPath>

          <radialGradient
            id="blob0_2_"
            cx="292"
            cy="171.5"
            r="56.5354"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="1.020408e-002" style={{ stopColor: "#FF9C12" }} />
            <stop offset="0.1922" style={{ stopColor: "#FA9712" }} />
            <stop offset="0.3992" style={{ stopColor: "#ED8A14" }} />
            <stop offset="0.6186" style={{ stopColor: "#D67316" }} />
            <stop offset="0.8449" style={{ stopColor: "#B65419" }} />
            <stop offset="1" style={{ stopColor: "#9C3A1C" }} />
          </radialGradient>

          <radialGradient
            id="blob1_2_"
            cx="297"
            cy="167.5"
            r="37.2156"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="1.020408e-002" style={{ stopColor: "#FF9C12" }} />
            <stop offset="0.1922" style={{ stopColor: "#FA9712" }} />
            <stop offset="0.3992" style={{ stopColor: "#ED8A14" }} />
            <stop offset="0.6186" style={{ stopColor: "#D67316" }} />
            <stop offset="0.8449" style={{ stopColor: "#B65419" }} />
            <stop offset="1" style={{ stopColor: "#9C3A1C" }} />
          </radialGradient>

          <radialGradient
            id="blob2_2_"
            cx="294"
            cy="157"
            r="23"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="1.020408e-002" style={{ stopColor: "#FF9C12" }} />
            <stop offset="0.1922" style={{ stopColor: "#FA9712" }} />
            <stop offset="0.3992" style={{ stopColor: "#ED8A14" }} />
            <stop offset="0.6186" style={{ stopColor: "#D67316" }} />
            <stop offset="0.8449" style={{ stopColor: "#B65419" }} />
            <stop offset="1" style={{ stopColor: "#9C3A1C" }} />
          </radialGradient>

          <radialGradient
            id="botBlob_2_"
            cx="284.5"
            cy="421.5"
            r="53.521"
            gradientTransform="matrix(-2.802637e-002 -0.9996 5.9976 -0.1682 -2235.533 776.7669)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="1.020408e-002" style={{ stopColor: "#FF9C12" }} />
            <stop offset="0.1922" style={{ stopColor: "#FA9712" }} />
            <stop offset="0.3992" style={{ stopColor: "#ED8A14" }} />
            <stop offset="0.6186" style={{ stopColor: "#D67316" }} />
            <stop offset="0.8449" style={{ stopColor: "#B65419" }} />
            <stop offset="1" style={{ stopColor: "#9C3A1C" }} />
          </radialGradient>

          <radialGradient
            id="blob3_2_"
            cx="291.9382"
            cy="167.4587"
            r="41.0767"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="1.020408e-002" style={{ stopColor: "#FF9C12" }} />
            <stop offset="0.1922" style={{ stopColor: "#FA9712" }} />
            <stop offset="0.3992" style={{ stopColor: "#ED8A14" }} />
            <stop offset="0.6186" style={{ stopColor: "#D67316" }} />
            <stop offset="0.8449" style={{ stopColor: "#B65419" }} />
            <stop offset="1" style={{ stopColor: "#9C3A1C" }} />
          </radialGradient>

          <radialGradient
            id="blob4_2_"
            cx="306.5"
            cy="155"
            r="14.109"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="1.020408e-002" style={{ stopColor: "#FF9C12" }} />
            <stop offset="0.1922" style={{ stopColor: "#FA9712" }} />
            <stop offset="0.3992" style={{ stopColor: "#ED8A14" }} />
            <stop offset="0.6186" style={{ stopColor: "#D67316" }} />
            <stop offset="0.8449" style={{ stopColor: "#B65419" }} />
            <stop offset="1" style={{ stopColor: "#9C3A1C" }} />
          </radialGradient>

          <image
            id="image0_18_9"
            width="612"
            height="1848"
            preserveAspectRatio="none"
            xlinkHref={lampImage.src}
          />
        </defs>

        <path
          d="M229 143H370V565H229V143Z"
          fill="url(#pattern0_18_9)"
          fillOpacity="1"
        />
        <pattern
          id="pattern0_18_9"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0_18_9"
            transform="scale(0.00163399 0.000541351)"
          />
        </pattern>

        <use xlinkHref="#glassShape" fill="#EB7619" opacity="0.1" />

        <g clipPath="url(#mask0_18_9)" filter="url(#goo)">
          <path
            id="blob0"
            fill="url(#blob0_2_)"
            d="M336.2,149.5c-5,19.2-21.4,29.2-37.8,26.6c-16.5-2.9-33.4-12.9-37.1-26.6
            c-3.8-13.6,12.5-32.1,37.8-34.9C324.4,111.8,341.3,130.4,336.2,149.5z"
          />

          <path
            id="blob1"
            fill="url(#blob1_2_)"
            d="M330.5,146.4c-4.4,10.1-16.4,20.2-26.8,25.3c-10.4,5.2-22.4-2.9-26.8-15.2
            c-4.4-11.6,7.6-20.4,26.8-25.3C322.9,126.3,334.9,135.6,330.5,146.4z"
          />

          <path
            id="blob2"
            fill="url(#blob2_2_)"
            d="M288,147.7c2.7-7.1,9.4-15.7,15.4-16.4c5.9-0.4,12.6,8.5,15.4,16.9
            c2.7,8.4-4.2,14.9-15.4,14.2C292.2,161.5,285.3,154.8,288,147.7z"
          />

          <path
            id="botBlob"
            fill="url(#botBlob_2_)"
            d="M356.5 380C366.5 383.824 374 394.6 363 397.6C352.3 400.7 317.3 403.2 294 406.5C270.7 409.8 250.3 400.8 239.6 397.6C228.6 394.2 227.2 390 234 383.8C240.8 376.8 252.9 376.2 263.6 373.4C274.6 370.1 292.2 371.1 302 371.5C311.8 371.9 331.5 372.3 342.5 375.5C353.2 379 349.7 377.4 356.5 380Z"
          />

          <path
            id="blob3"
            fill="url(#blob3_2_)"
            d="M322.7,147.3c-2.1,16.4-15.3,27.2-23.2,25.3c-8.1-1.8-12.6-13-14.8-24.9
            c-1.9-11.8,2.7-22.7,14.8-25.3C311.5,119.6,324.7,130.8,322.7,147.3z"
          />

          <path
            id="blob4"
            fill="url(#blob4_2_)"
            d="M327.8,147.4c-1,8.2-9.8,10.3-13.8,9.3c-4-0.9-6.5-3-7.6-8.9c-1-5.9,2.3-8.5,8.4-9.8
            C320.8,136.6,328.8,139.1,327.8,147.4z"
          />
        </g>
      </svg>
    </div>
  );
};

export default LavaLamp;
