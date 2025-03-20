import Image from "next/image";
import logos from "./logos";

export default function LogoCloud() {
  return (
    <div className="max-w-full px-8">
      <div className="flex w-full max-w-3xl flex-wrap justify-center gap-16 md:gap-x-20 md:gap-y-20">
        {Object.entries(logos).map(([name, img], i) => (
          <div key={i} className="relative">
            <Image
              src={img}
              alt={`${name} logo`}
              className="h-6 w-[unset] md:h-8"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
