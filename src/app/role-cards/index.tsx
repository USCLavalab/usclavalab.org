"use client";

import useScreenWidth from "@/hooks/use-screen-width";
import { MD_WIDTH } from "@/lib/utils";
import BigRoleCards from "./big-cards";
import SmallRoleCards from "./small-cards";

export default function RoleCards() {
  const screenWidth = useScreenWidth();

  if (screenWidth == null) return;

  const isMD = (screenWidth || 0) > MD_WIDTH;

  if (isMD) return <BigRoleCards />;

  return <SmallRoleCards />;
}
