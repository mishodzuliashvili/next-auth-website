export default function RedButton({
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
      className="border border-red-600 p-3 px-5 bg-red-600 font-medium outline-none hover:opacity-70 duration-300 rounded-sm flex items-center gap-2"
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
