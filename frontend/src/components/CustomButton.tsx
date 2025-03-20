const CustomButton = ({
  text,
  width,
  py,
  textSize,
  children,
  loading,
  disabled = false,
  onClick,
}: {
  text: string;
  width: string;
  py: string;
  textSize: string;
  children?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`bg-whiteSecondary w-${width} py-${py} text-${textSize} hover:bg-white  duration-200 flex items-center justify-center gap-x-2`}
    >
      {children}
      <span className="text-blackPrimary font-semibold">
        {loading ? "Loading..." : text}
      </span>
    </button>
  );
};
export default CustomButton;
