"use client";

import { useEffect, useRef, useState } from "react";

export default function RoleCard({
  cardsLength,
  index,
  selectedIndex,
  role: [key, value],
  onClick,
}: {
  cardsLength: number;
  index: number;
  selectedIndex: number;
  role: [string, { who: string; what: string }];
  onClick: () => void;
}) {
  let transform = "";

  if (selectedIndex - index == -1) {
    transform = "translateX(calc(100% + 5rem)) rotate(10deg)";
  }
  if (selectedIndex - index == -2) {
    transform = "translateX(calc(100% + 10rem)) rotate(20deg)";
  }

  const roleBtnRef = useRef<HTMLHeadingElement>(null);
  const roleNameRef = useRef<HTMLHeadingElement>(null);

  const [marginLeft, setMarginLeft] = useState(0);

  useEffect(() => {
    setMarginLeft(
      (roleBtnRef.current?.clientWidth ?? 0) * 0.5 -
        (roleNameRef.current?.clientHeight ?? 0) * 0.5,
    );
  }, [roleBtnRef, roleNameRef]);

  return (
    <div
      className="shadow-card absolute flex h-80 w-xl border-2 border-neutral-700 bg-neutral-800 transition-all"
      style={{
        marginLeft: `-${5 * (cardsLength - 1 - index)}rem`,
        transformOrigin: "-4rem -4rem",
        transform: transform,
      }}
      onClick={() => onClick()}
    >
      <div
        className="h-full w-20 border-r-2 border-r-neutral-700/50"
        ref={roleBtnRef}
      >
        <div
          className="absolute left-0 h-6"
          style={{
            bottom: `0`,
            marginLeft: `${marginLeft}px`,
          }}
        >
          <h3 ref={roleNameRef} className="origin-top-left -rotate-90 text-xl">
            {key}
          </h3>
        </div>
      </div>

      <div className="flex-1 space-y-2 p-5 text-justify text-sm">
        <p className="opacity-50">Who</p>
        <p>{value.who}</p>
        <p className="mt-5 opacity-50">What</p>
        <p>{value.what}</p>
      </div>
    </div>
  );
}
