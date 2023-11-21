export default function SubmitButton({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`px-1 py-2 bg-green-600 hover:bg-green-700 disabled:bg-neutral-800 ${
        className ?? ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
