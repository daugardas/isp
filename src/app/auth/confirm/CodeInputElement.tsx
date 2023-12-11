type CodeInputElementProps = {
  inputRef: React.RefObject<HTMLInputElement>;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function CodeInputElement({
  inputRef,
  name,
  value,
  onChange,
  ...props
}: Readonly<CodeInputElementProps>) {
  return (
    <input
      ref={inputRef}
      type="text"
      name={name}
      className="w-24 text-8xl bg-neutral-900 outline-none border-none text-center focus:ring-8 ring-neutral-200"
      onChange={onChange}
      value={value}
      {...props}
    />
  );
}
