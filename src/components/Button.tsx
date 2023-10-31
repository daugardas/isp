export default function Button({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`px-1 py-2 bg-zinc-600 hover:bg-zinc-700 ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
