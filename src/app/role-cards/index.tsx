"use client";

import { useState } from "react";
import RoleCard from "./card";

const cards = ["Product Manager", "Designer", "Developer"];

export default function RoleCards() {
  const [selectedIndex, setSelectedIndex] = useState(cards.length - 1);

  return (
    <div
      className="relative w-xl h-80 transition-all"
      style={{
        marginLeft: `${5 * (cards.length - selectedIndex + 1)}rem`,
      }}
    >
      {cards.map((text, i) => {
        return (
          <RoleCard
            key={i}
            cardsLength={cards.length}
            index={i}
            selectedIndex={selectedIndex}
            onClick={() => setSelectedIndex(i)}
            roleName={text}
          />
        );
      })}
    </div>
  );
}
