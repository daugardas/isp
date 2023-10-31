type FormProps = {
  children: React.ReactNode;
} & React.FormHTMLAttributes<HTMLFormElement>;

export default function Form({ children, className, ...props }: FormProps) {
  return (
    <form
      className={`flex flex-col w-full p-4 gap-2 ${className ?? ""}`}
      {...props}
    >
      {children}
    </form>
  );
}
