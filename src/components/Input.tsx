export default function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`border p-1 bg-zinc-800 border-zinc-600 ${className ?? ""}`}
      {...props}
    />
  );
}
