export default function Button({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`px-1 py-2 rounded-md ${className ?? ""}`} {...props}>
      {children}
    </button>
  );
}
