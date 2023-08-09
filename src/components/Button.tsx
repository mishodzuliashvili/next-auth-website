export default function Button({
  onClick,
  children,
  type,
  disabled,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) {
  return (
    <button
      className="border border-secondary p-3 px-5 bg-secondary font-medium outline-none hover:opacity-70 duration-300 rounded-sm flex items-center gap-2"
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
