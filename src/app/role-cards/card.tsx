"use client";

import useScreenWidth from "@/hooks/use-screen-width";
import { MD_WIDTH } from "@/lib/utils";
import RoleCardHeader from "./header";

export default function RoleCard({
  cardsLength,
  index,
  selectedIndex,
  role: [key, value],
  onClick,
}: {
  cardsLength: number;
  index?: number;
  selectedIndex?: number;
  role: [string, { who: string; what: string }];
  onClick?: () => void;
}) {
  let transform = "";

  const screenWidth = useScreenWidth();
  const isMD = (screenWidth || 0) > MD_WIDTH;

  if (isMD) {
    if (selectedIndex! - index! == -1) {
      transform = "translateX(calc(100% + 5rem)) rotate(10deg)";
    }
    if (selectedIndex! - index! == -2) {
      transform = "translateX(calc(100% + 10rem)) rotate(20deg)";
    }
  }

  return (
    <div
      className="shadow-card relative flex h-110 w-96 border-2 border-neutral-700 bg-neutral-800 transition-all md:absolute md:h-80 md:w-xl"
      style={
        isMD
          ? {
              marginLeft: `-${5 * (cardsLength - 1 - index!)}rem`,
              transformOrigin: "-4rem -4rem",
              transform: transform,
            }
          : {}
      }
      onClick={() => onClick && onClick()}
    >
      <RoleCardHeader roleName={key} />

      <div className="flex-1 space-y-2 p-5 text-justify text-sm">
        <p className="opacity-50">Who</p>
        <p>{value.who}</p>
        <p className="mt-5 opacity-50">What</p>
        <p>{value.what}</p>
      </div>
    </div>
  );
}
