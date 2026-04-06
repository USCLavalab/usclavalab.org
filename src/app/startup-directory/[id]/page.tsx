import { notFound } from "next/navigation";
import { startups } from "../data";
import { StartupPageClient } from "./startup-page-client";

interface StartupPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return startups.map((startup) => ({ id: startup.id }));
}

export async function generateMetadata({ params }: StartupPageProps) {
  const { id } = await params;
  const startup = startups.find((item) => item.id === id);

  if (!startup) {
    return {
      title: "Startup Not Found | LavaLab",
    };
  }

  return {
    title: `${startup.name} | LavaLab Startup Directory`,
    description: startup.description,
  };
}

export default async function StartupPage({ params }: StartupPageProps) {
  const { id } = await params;
  const startup = startups.find((item) => item.id === id);

  if (!startup) {
    notFound();
  }

  return <StartupPageClient startup={startup} />;
}
