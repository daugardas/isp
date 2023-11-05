export default async function NaudotojaiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col w-screen min-h-full items-center">
      {children}
    </section>
  );
}
