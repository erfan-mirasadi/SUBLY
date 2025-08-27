import TagLine from "./TagLine";

const Heading = ({ className, title, text, tag }) => {
  return (
    <div
      className={`${className} max-w-[50rem] mx-auto m-12 lg:mb-20 text-center `}
    >
      {tag && <TagLine className="mb-4 md:justify-center">{tag}</TagLine>}
      {title && (
        <h2 className="text-[1.5rem] leading-[2rem] md:text-[2rem] md:leading-[2.5rem] lg:text-[2.5rem] lg:leading-[3.5rem] xl:text-[3rem] xl:leading-tight">
          {title}
        </h2>
      )}
      {text && (
        <p className="font-light text-[0.875rem] leading-6 md:text-base mt-4 text-[#757185]">
          {text}
        </p>
      )}
    </div>
  );
};

export default Heading;
