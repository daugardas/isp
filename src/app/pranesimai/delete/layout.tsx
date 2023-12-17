export default async function PranešimaiLayout({
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
  