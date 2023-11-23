type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export default async function CardWrap({
  children,
  className,
  ...props
}: Readonly<Props>) {
  return (
    <div
      className={`w-full py-3 px-6 rounded-lg flex flex-col items-center bg-zinc-900 ${
        className ?? ""
      }`}
      {...props}
    >
      {children}
    </div>
  );
}
