export default function DangerButton({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`px-1 py-2 bg-red-700 hover:bg-red-900 ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
