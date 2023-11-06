type InputWrapProps = {
  className?: string;
  children: React.ReactNode;
};

export default function InputWrap({ className, children }: InputWrapProps) {
  return <div className={`flex flex-col ${className || ""}`}>{children}</div>;
}
