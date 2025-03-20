import Hero from "./hero";
import LogoCloud from "./logo-cloud";
import RoleCards from "./role-cards";

export default function Home() {
  return (
    <>
      <Hero />
      <div id="content" className="relative">
        <section className="flex flex-col items-center" id="about">
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
        </section>

        <section className="mb-40 flex flex-col items-center" id="alumni">
          <div className="flex w-full flex-col items-center space-y-10 text-center">
            <h2 className="font-sans font-normal opacity-50">
              [ Employed by the Best ]
            </h2>
            <LogoCloud />
          </div>
        </section>
      </div>
    </>
  );
}
