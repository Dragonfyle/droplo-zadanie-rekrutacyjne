export default function SectionWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex justify-center w-full bg-bg-primary border border-border-secondary rounded-md px-xl py-3xl">
      {children}
    </section>
  );
}
