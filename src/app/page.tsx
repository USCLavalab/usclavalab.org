import Link from "next/link";
import Balancer from "react-wrap-balancer";
import AlumniSpotlight from "./alumni-spotlight";
import CommunityImagesGrid from "./community";
import EventsSection from "./events";
import ExecBoard from "./exec-board";
import Footer from "./footer";
import Hero from "./hero";
import LogoCloud from "./logo-cloud";
import RoleCards from "./role-cards";

export default function Home() {
  return (
    <>
      <div className="relative z-40 flex h-12 w-full items-center justify-center bg-neutral-400 p-1">
        <p className="text-center text-sm text-black">
          Upcoming Demo Night @ Tommy’s Place on May 2, 2025 at 3:00 PM
        </p>
      </div>

      <nav className="sticky top-0 z-30 w-full p-8">
        <div className="float-right flex gap-8">
          <Link href="#about">About</Link>
          <Link href="#events">Events</Link>
          <Link href="#alumni">Alumni</Link>
          <Link href="#exec-board">Exec Board</Link>
        </div>
      </nav>

      <Hero />

      <div className="h-screen" />

      <div className="relative z-10">
        <section className="mb-20 flex flex-col items-center pt-20" id="about">
          <div className="w-full max-w-lg space-y-10 px-4 text-center">
            <h2 className="font-sans font-normal opacity-50">[ About ]</h2>
            <div className="space-y-4">
              <p>
                <Balancer>
                  Every semester, LavaLab takes a cohort of 28 students composed
                  of product managers, developers, and designers to build
                  tomorrow’s startups, today.
                  <br />
                  <br />
                  At LavaLab, we don’t build &ldquo;projects&rdquo;—we build
                  ambitious startups for a brighter future, create innovative
                  technology that solves real problems, and invest in
                  forward-thinking people who dare to bet on themselves.
                </Balancer>
              </p>
            </div>
          </div>

          <div className="my-20 flex w-full justify-center md:my-40 md:h-80">
            <RoleCards />
          </div>

          <div className="w-full max-w-lg px-4 text-center">
            <p>
              <Balancer>
                We walk all our cohorts through a curriculum built on the
                foundation of YC and Thiel’s Zero to One ideology—augmented by
                decades of earned experience passed down by USC’s most
                successful builders and founders.
              </Balancer>
            </p>
          </div>
        </section>

        <section
          className="relative flex min-h-screen flex-col items-center overflow-hidden py-20"
          id="events"
        >
          <EventsSection />
        </section>

        <section className="flex flex-col items-center" id="community">
          <div className="w-full py-4">
            <CommunityImagesGrid />
          </div>
        </section>

        <section
          className="mt-20 mb-40 flex flex-col items-center pt-20"
          id="alumni"
        >
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

        <section
          className="mt-20 mb-20 flex flex-col items-center pt-20"
          id="exec-board"
        >
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
