import Button from "./Button";

export default function DangerButton({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      className={`bg-red-700 hover:bg-red-900 ${className ?? ""}`}
      {...props}
    >
      {children}
    </Button>
  );
}
