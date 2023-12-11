import Button from "./Button";

export default function NeutralButton({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      className={`bg-zinc-600 hover:bg-zinc-700 ${className ?? ""}`}
      {...props}
    >
      {children}
    </Button>
  );
}
