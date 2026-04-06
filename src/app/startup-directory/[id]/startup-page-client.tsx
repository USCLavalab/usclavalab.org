"use client";

import { ArrowLeft, ExternalLink, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import favicon from "../../favicon.png";
import type { Startup } from "../data";

interface StartupPageClientProps {
  startup: Startup;
}

const seasonByBatch: Record<string, string> = {
  S26: "Spring 2026",
  F25: "Fall 2025",
  S25: "Spring 2025",
  F24: "Fall 2024",
  S24: "Spring 2024",
  F23: "Fall 2023",
  S23: "Spring 2023",
  F22: "Fall 2022",
};

export function StartupPageClient({ startup }: StartupPageClientProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const batchDisplay = `${startup.batch[0]}'${startup.batch.slice(1)}`;

  return (
    <div
      className={`min-h-screen bg-black font-sans text-white motion-safe:transform-gpu motion-safe:transition-all motion-safe:duration-900 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <header className="sticky top-0 z-30 w-full px-6 py-5 md:px-8">
        <Link href="/" className="inline-flex items-center gap-3">
          <Image src={favicon} alt="LavaLab favicon" className="h-8 w-8" />
          <span className="text-2xl leading-none">LavaLab</span>
        </Link>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 pb-16 md:px-8">
        <Link
          href="/startup-directory"
          className="mb-10 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white/80"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Directory
        </Link>

        <section className="mb-14">
          <div className="flex items-start gap-6">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center border border-white/10 bg-white/5 p-2">
              <img
                src={startup.logo}
                alt={`${startup.name} logo`}
                className="h-full w-full object-contain"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start gap-4">
                <h1 className="font-sans text-4xl leading-none md:text-5xl">{startup.name}</h1>
                <span className="pt-1 text-base text-[#FF5C35] md:text-lg">{batchDisplay}</span>
              </div>

              <p className="mt-3 max-w-3xl text-base text-white/65 md:text-lg">{startup.description}</p>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/55 md:text-base">
                <span>{startup.industry}</span>
                {startup.stage && (
                  <>
                    <span className="text-white/20">|</span>
                    <span>{startup.stage}</span>
                  </>
                )}
              </div>

              {startup.website?.trim() && (
                <Link
                  href={startup.website}
                  target="_blank"
                  className="mt-6 inline-flex items-center gap-2 border-b border-[#FF5C35] pb-0.5 text-sm text-[#FF5C35] transition-opacity hover:opacity-75"
                >
                  Visit Website
                  <ExternalLink className="h-3 w-3" />
                </Link>
              )}
            </div>
          </div>
        </section>

        <div className="mb-8 h-0.5 w-16 bg-[#FF5C35]" />

        <section className="mb-14 grid gap-14 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-10">
            {startup.longDescription && (
              <section>
                <h2 className="mb-4 font-sans font-normal text-sm tracking-[0.2em] text-white/40 uppercase">
                  About
                </h2>
                <p className="max-w-4xl text-base leading-relaxed text-white/85 md:text-lg">
                  {startup.longDescription}
                </p>
              </section>
            )}

            {startup.product && (
              <section>
                <h2 className="mb-4 font-sans font-normal text-sm tracking-[0.2em] text-white/40 uppercase">
                  Product
                </h2>
                <p className="max-w-4xl text-base leading-relaxed text-white/85 md:text-lg">
                  {startup.product}
                </p>
              </section>
            )}
          </div>

          <aside className="space-y-8 text-base">
            <div className="border-l border-white/10 pl-6">
              <h3 className="mb-6 font-sans font-normal text-sm tracking-[0.2em] text-white/40 uppercase">
                Details
              </h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm text-white/45">Batch</dt>
                  <dd className="mt-1 text-base text-white/90">
                    {seasonByBatch[startup.batch] ?? startup.batch}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-white/45">Industry</dt>
                  <dd className="mt-1 text-base text-white/90">{startup.industry}</dd>
                </div>
                <div>
                  <dt className="text-sm text-white/45">Team</dt>
                  <dd className="mt-1 text-base text-white/90">
                    {startup.founders.length} founder
                    {startup.founders.length !== 1 ? "s" : ""}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-white/45">Tags</dt>
                  <dd className="mt-1 flex flex-wrap gap-2 text-base text-white/90">
                    {startup.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </section>

        <section className="max-w-3xl">
          <h2 className="mb-6 font-sans font-normal text-sm tracking-[0.2em] text-white/40 uppercase">
            Founders
          </h2>
          <div className="space-y-5">
            {startup.founders.map((founder) => (
              <article
                key={founder.name}
                className="border border-white/10 p-5 md:p-6"
              >
                <div className="flex items-start gap-5">
                  <div className="h-28 w-28 shrink-0 overflow-hidden bg-white/5">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-sans text-xl font-medium text-white">
                        {founder.name}
                      </h3>

                      <div className="flex items-center gap-2 text-white/80">
                        {founder.linkedin && (
                          <Link
                            href={founder.linkedin}
                            target="_blank"
                            className="hover:text-white"
                          >
                            <Linkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn profile</span>
                          </Link>
                        )}
                        {founder.twitter && (
                          <Link href={founder.twitter} target="_blank" className="hover:text-white">
                            <svg
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                              className="h-5 w-5 fill-current"
                            >
                              <path d="M18.901 1.153h3.68l-8.04 9.19 9.46 12.504h-7.406l-5.8-7.584-6.64 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932Zm-1.292 19.49h2.039L6.486 3.24H4.298l13.31 17.404Z" />
                            </svg>
                            <span className="sr-only">X profile</span>
                          </Link>
                        )}
                      </div>
                    </div>

                    <p className="mt-1 text-lg text-white/50">{founder.role}</p>
                    <p className="mt-4 max-w-5xl text-base text-white/80">{founder.bio}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}