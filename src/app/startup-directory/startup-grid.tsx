import type { Startup } from "./data";
import { StartupCard } from "./startup-card";

interface StartupGridProps {
  startups: Startup[];
}

export function StartupGrid({ startups }: StartupGridProps) {
  if (startups.length === 0) {
    return (
      <div className="py-16 text-center">
        <h3 className="font-sans text-xl text-white">No startups found</h3>
        <p className="mt-1 text-sm text-white/60">Try a different search query.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-white/10 overflow-hidden border border-white/10">
      {startups.map((startup) => (
        <StartupCard key={startup.id} startup={startup} />
      ))}
    </div>
  );
}
