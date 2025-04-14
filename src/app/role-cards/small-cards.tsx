"use client";

import RoleCard from "./card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import roles from "./roles";

const rolesEntries = Object.entries(roles);

export default function SmallRoleCards() {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {rolesEntries.map((role, i) => {
          return (
            <CarouselItem
              key={i}
              className="flex basis-full items-center justify-center sm:basis-[unset]"
            >
              <div
                className={cn(
                  i == 0 && "pl-4",
                  i == rolesEntries.length - 1 && "pr-4",
                )}
              >
                <RoleCard cardsLength={rolesEntries.length} role={role} />
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className="relative flex justify-evenly pt-6">
        <CarouselPrevious className="relative top-0 left-0 m-0 size-12 translate-0" />
        <CarouselNext className="relative top-0 left-0 m-0 size-12 translate-0" />
      </div>
    </Carousel>
  );
}
