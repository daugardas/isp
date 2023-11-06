export default async function ProfilisLayout({
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
