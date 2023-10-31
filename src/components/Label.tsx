export default function Label({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
} & React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={`text-sm ${className ?? ""}`} {...props}>
      {children}
    </label>
  );
}
