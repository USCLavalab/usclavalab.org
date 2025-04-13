import Link from "next/link";
import AlumniSpotlight from "./alumni-spotlight";
import CommunityImagesGrid from "./community/images-grid";
import EventsSection from "./events";
import ExecBoard from "./exec-board";
import Footer from "./footer";
import Hero from "./hero";
import LogoCloud from "./logo-cloud";
import RoleCards from "./role-cards";

export default function Home() {
  return (
    <>
      <div className="relative z-40 flex h-12 w-full items-center justify-center bg-neutral-400">
        <p className="text-sm text-black">
          Upcoming Demo Night @ Tommy’s Place on May 2, 2025 at 00:00 PM
        </p>
      </div>
      <nav className="sticky top-0 z-30 w-full p-8">
        <div className="float-right flex gap-8">
          <Link href="#about">About</Link>
          <Link href="#about">About</Link>
          <Link href="#about">About</Link>
        </div>
      </nav>

      <Hero />

      <div className="h-screen" />

      <div className="relative z-10">
        <section className="mb-20 flex flex-col items-center" id="about">
          <div className="w-full max-w-lg space-y-10 text-center">
            <h2 className="font-sans font-normal opacity-50">[ About ]</h2>
            <div className="space-y-4">
              <p>
                At LavaLab, we don’t build projects—we build startups for a
                brighter future, __ technology that solves real problems, and
                invest in people who dare to bet on themselves.
              </p>
              <p>
                Every semester, LavaLab takes a cohort of 28 students composed
                of product managers, developers, and designers to build
                tomorrow’s startups, today.
              </p>
            </div>
          </div>

          <div className="mt-40 mb-40 flex h-80 justify-center">
            <RoleCards />
          </div>

          <div className="w-full max-w-xl text-center">
            <p>
              We walk all our cohorts through a curriculum built on the
              foundation of YC and Theil’s Zero to One ideology—augmented by
              decades of earned experience passed down by USC’s most successful
              builders and founders.
            </p>
          </div>
        </section>

        <EventsSection />

        <section
          className="mt-20 mb-20 flex flex-col items-center"
          id="community"
        >
          <div className="bg-red mt-20 w-full py-4">
            <CommunityImagesGrid />
          </div>
        </section>

        <section className="mt-40 mb-40 flex flex-col items-center" id="alumni">
          <div className="flex w-full flex-col items-center space-y-10 text-center">
            <h2 className="font-sans font-normal opacity-50">
              [ Alumni Spotlight ]
            </h2>
            <AlumniSpotlight />
          </div>
        </section>

        <section className="mt-40 mb-40 flex flex-col items-center" id="alumni">
          <div className="flex w-full flex-col items-center space-y-10 text-center">
            <h2 className="font-sans font-normal opacity-50">
              [ Employed by the Best ]
            </h2>
            <LogoCloud />
          </div>
        </section>

        <section className="mt-40 mb-40 flex flex-col items-center" id="alumni">
          <div className="flex w-full flex-col items-center space-y-10 text-center">
            <h2 className="font-sans font-normal opacity-50">
              [ Executive Board ]
            </h2>
            <ExecBoard />
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
