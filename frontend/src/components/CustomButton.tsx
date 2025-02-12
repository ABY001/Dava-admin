const CustomButton = ({
  text,
  width,
  py,
  textSize,
  children,
  loading,
  onClick,
}: {
  text: string;
  width: string;
  py: string;
  textSize: string;
  children?: React.ReactNode;
  loading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`dark:bg-whiteSecondary bg-blackPrimary w-${width} py-${py} text-${textSize} dark:hover:bg-white hover:bg-gray-800 bg-blackPrimary duration-200 flex items-center justify-center gap-x-2`}
    >
      {children}
      <span className="dark:text-blackPrimary text-whiteSecondary font-semibold">
        {loading ? "Loading..." : text}
      </span>
    </button>
  );
};
export default CustomButton;
