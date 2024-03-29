import Button from "./Button";

export default function SubmitButton({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      className={`bg-green-600 hover:bg-green-700 disabled:bg-neutral-800 ${
        className ?? ""
      }`}
      {...props}
    >
      {children}
    </Button>
  );
}
