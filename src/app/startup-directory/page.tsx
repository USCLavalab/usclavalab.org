"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import favicon from "../favicon.png";
import { DirectoryFilters } from "./directory-filters";
import { startups } from "./data";
import { SearchBar } from "./search-bar";
import { StartupGrid } from "./startup-grid";

export default function StartupDirectoryPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBatches, setSelectedBatches] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleBatchChange = (batch: string) => {
    setSelectedBatches((previous) =>
      previous.includes(batch)
        ? previous.filter((item) => item !== batch)
        : [...previous, batch],
    );
  };

  const handleIndustryChange = (industry: string) => {
    setSelectedIndustries((previous) =>
      previous.includes(industry)
        ? previous.filter((item) => item !== industry)
        : [...previous, industry],
    );
  };

  const filteredStartups = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return startups.filter((startup) => {
      if (
        selectedBatches.length > 0 &&
        !selectedBatches.includes(startup.batch)
      ) {
        return false;
      }

      if (
        selectedIndustries.length > 0 &&
        !selectedIndustries.includes(startup.industry)
      ) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const matchesName = startup.name.toLowerCase().includes(normalizedQuery);
      const matchesDescription = startup.description
        .toLowerCase()
        .includes(normalizedQuery);
      const matchesIndustry = startup.industry
        .toLowerCase()
        .includes(normalizedQuery);
      const matchesTags = startup.tags.some((tag) =>
        tag.toLowerCase().includes(normalizedQuery),
      );
      const matchesFounders = startup.founders.some((founder) =>
        founder.name.toLowerCase().includes(normalizedQuery),
      );

      return (
        matchesName ||
        matchesDescription ||
        matchesIndustry ||
        matchesTags ||
        matchesFounders
      );
    });
  }, [searchQuery, selectedBatches, selectedIndustries]);

  return (
    <div
      className={`min-h-screen bg-black font-sans text-white motion-safe:transform-gpu motion-safe:transition-all motion-safe:duration-900 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <header className="sticky top-0 z-30 w-full px-6 py-5 md:px-8">
        <Link href="/" className="inline-flex items-center gap-3">
          <Image src={favicon} alt="LavaLab favicon" className="h-8 w-8" />
          {/* <span className="font-sans text-2xl leading-none">LavaLab</span> */}
        </Link>
      </header>

      <main>
        <section className="flex min-h-[calc(82vh-72px)] flex-col items-center justify-center px-6 text-center">
          <h1 className="font-display text-[3.5rem] leading-[0.95] tracking-tight md:text-[5.25rem]">
            LavaLab Startup
            <br />
            Directory
          </h1>

          <div className="mt-10 w-full max-w-xl">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          <div className="mt-16 animate-bounce text-white/40">
            <ChevronDown className="h-6 w-6" />
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-24 md:px-8">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <h2 className="font-sans font-normal text-xs tracking-[0.2em] text-white/50 uppercase">
              Startup Directory
            </h2>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-14">
            <DirectoryFilters
              selectedBatches={selectedBatches}
              selectedIndustries={selectedIndustries}
              onBatchChange={handleBatchChange}
              onIndustryChange={handleIndustryChange}
            />

            <div className="min-w-0 flex-1">
              <p className="mb-6 text-sm text-white/60">
                {filteredStartups.length} startup
                {filteredStartups.length !== 1 ? "s" : ""}
              </p>
              <StartupGrid startups={filteredStartups} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
