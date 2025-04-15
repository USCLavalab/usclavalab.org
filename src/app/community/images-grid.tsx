import { cn } from "@/lib/utils";
import Image from "next/image";

export default function CommunityImagesGrid({
  imagePaths,
}: {
  imagePaths: string[];
}) {
  console.log({ imagePaths });

  return (
    <div className="my-20 hidden grid-cols-[repeat(15,minmax(0,1fr))] md:grid">
      {imagePaths.map((val, i) => {
        const cols = 15;
        const isLastCol = (i + 1) % cols === 0;
        const isLastRow = i >= 75 - cols;

        return (
          <div
            key={i}
            className={cn(
              "aspect-square w-full border-t",
              !isLastCol && "border-r",
              isLastRow && "border-b",
              "group",
            )}
          >
            <div className="relative flex size-full items-center justify-center bg-white opacity-0 transition-opacity delay-500 duration-1000 group-hover:opacity-100 hover:delay-0 hover:duration-0">
              <Image src={`/community/${val}`} alt={`Image ${i}`} fill />
            </div>
          </div>
        );
      })}
    </div>
  );
}
