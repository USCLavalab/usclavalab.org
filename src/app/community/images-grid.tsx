import { cn } from "@/lib/utils";

export default function CommunityImagesGrid() {
  return (
    <div className="my-20 hidden grid-cols-[repeat(15,minmax(0,1fr))] md:grid">
      {Array.from({ length: 75 }, (_, i) => {
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
            <div className="flex size-full items-center justify-center bg-white opacity-0 transition-opacity duration-1000 group-hover:opacity-100 hover:duration-0">
              {i}
            </div>
          </div>
        );
      })}
    </div>
  );
}
