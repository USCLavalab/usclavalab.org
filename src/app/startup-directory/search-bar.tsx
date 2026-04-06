"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-white/40" />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search startups..."
        className="w-full border border-white/10 bg-transparent py-2.5 pr-4 pl-11 text-base text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none"
      />
    </div>
  );
}
