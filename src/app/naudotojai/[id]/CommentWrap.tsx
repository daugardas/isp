"use client";

type Props = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export default function CommentWrap({
  children,
  className,
  ...props
}: Readonly<Props>) {
  return (
    <div className={` ${className ?? ""}`} {...props}>
      {children}
    </div>
  );
}
