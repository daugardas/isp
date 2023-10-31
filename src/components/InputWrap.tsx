type InputWrapProps = {
  children: React.ReactNode;
};

export default function InputWrap({ children }: InputWrapProps) {
  return <div className="flex flex-col">{children}</div>;
}
