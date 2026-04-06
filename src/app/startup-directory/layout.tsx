export default function StartupDirectoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="startup-directory-scope">{children}</div>;
}
