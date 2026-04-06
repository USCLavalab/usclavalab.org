import { cn } from "@/lib/utils";

interface DirectoryFiltersProps {
  selectedBatches: string[];
  selectedIndustries: string[];
  onBatchChange: (batch: string) => void;
  onIndustryChange: (industry: string) => void;
}

const batches = ["F25", "S25", "F24", "S24", "F23", "S23", "F22", "S22"];
const industries = [
  "AI/ML",
  "CleanTech",
  "EdTech",
  "Fintech",
  "Healthcare",
  "Real Estate",
  "Consumer",
  "Hardware",
  "Logistics",
  "Commerce",
  "Automotive",
  "Aerospace",
  "Construction"
];

function formatBatch(batch: string) {
  if (batch.length !== 3) {
    return batch;
  }

  return `${batch[0]}'${batch.slice(1)}`;
}

export function DirectoryFilters({
  selectedBatches,
  selectedIndustries,
  onBatchChange,
  onIndustryChange,
}: DirectoryFiltersProps) {
  return (
    <aside className="hidden w-full space-y-10 md:block md:w-48 md:space-y-14">
      <div>
        <h3 className="mb-4 font-sans text-xs tracking-[0.2em] text-white/50 uppercase">
          Batch
        </h3>
        <div className="space-y-2">
          {batches.map((batch) => (
            <button
              key={batch}
              onClick={() => onBatchChange(batch)}
              className={cn(
                "block cursor-pointer font-sans text-left text-base transition-colors",
                selectedBatches.includes(batch)
                  ? "text-white"
                  : "text-white/50 hover:text-white",
              )}
            >
              {formatBatch(batch)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-sans text-xs tracking-[0.2em] text-white/50 uppercase">
          Industry
        </h3>
        <div className="space-y-2">
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => onIndustryChange(industry)}
              className={cn(
                "block cursor-pointer font-sans text-left text-base transition-colors",
                selectedIndustries.includes(industry)
                  ? "text-white"
                  : "text-white/50 hover:text-white",
              )}
            >
              {industry}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
