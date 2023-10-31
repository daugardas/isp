import Link, { LinkProps } from "next/link";

export default function SubmitLink({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkProps) {
  return (
    <Link
      className={`px-1 py-2 bg-green-600 hover:bg-green-700 ${className ?? ""}`}
      {...props}
    >
      {children}
    </Link>
  );
}
