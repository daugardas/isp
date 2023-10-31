export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-auto mt-36 justify-center">
      {children}
    </section>
  );
}
