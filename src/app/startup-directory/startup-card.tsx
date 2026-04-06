import Link from "next/link";
import type { Startup } from "./data";

interface StartupCardProps {
  startup: Startup;
}

export function StartupCard({ startup }: StartupCardProps) {
  return (
    <article className="bg-transparent transition-colors hover:bg-white/5">
      <Link
        href={`/startup-directory/${startup.id}`}
        className="flex items-start gap-5 p-5"
      >
        <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-white/10 bg-white/5 p-2">
          <img
            src={startup.logo}
            alt={`${startup.name} logo`}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-sans text-2xl font-semibold text-white">
              {startup.name}
            </h3>
            <span className="text-sm text-white/50">{startup.batch}</span>
          </div>

          <p className="mt-1 text-white/75">{startup.description}</p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="border border-white/10 px-2 py-1 text-xs tracking-wide text-white/75 uppercase">
              {startup.industry}
            </span>
            {startup.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="border border-white/10 px-2 py-1 text-xs tracking-wide text-white/60 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-3 text-sm text-white/60">
            Founders: {startup.founders.map((founder) => founder.name).join(", ")}
          </div>

        </div>
      </Link>
    </article>
  );
}
