import "@/lib/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LavaLab",
  description:
    "Meet your cofounders. USC’s premier, student-run, product incubator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`dark antialiased`}>{children}</body>
    </html>
  );
}
