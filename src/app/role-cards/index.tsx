"use client";

import { useState } from "react";
import RoleCard from "./card";

import roles from "./roles";

const rolesEntries = Object.entries(roles);

export default function RoleCards() {
  const [selectedIndex, setSelectedIndex] = useState(rolesEntries.length - 1);

  return (
    <div
      className="relative h-80 w-xl transition-all"
      style={{
        marginLeft: `${5 * (rolesEntries.length - selectedIndex + 1)}rem`,
      }}
    >
      {rolesEntries.map((role, i) => {
        return (
          <RoleCard
            key={i}
            cardsLength={rolesEntries.length}
            index={i}
            selectedIndex={selectedIndex}
            onClick={() => setSelectedIndex(i)}
            role={role}
          />
        );
      })}
    </div>
  );
}
