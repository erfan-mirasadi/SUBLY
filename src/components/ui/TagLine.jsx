import Brackets from "./Brackets";

/*
 * TagLine component - Renders text with decorative brackets on both sides
 */
const TagLine = ({ className, children }) => {
  return (
    <div
      className={`font-grotesk font-light text-xs tracking-[.15em] uppercase flex items-center ${
        className || ""
      }`}
    >
      <Brackets position="left" />
      <div className="mx-3 text-[#ADA8C3]">{children}</div>
      <Brackets position="right" />
    </div>
  );
};

export default TagLine;
