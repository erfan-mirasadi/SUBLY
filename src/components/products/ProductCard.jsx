import Image from "next/image";
import Arrow from "./Arrow";
import GradientLight from "./GradientLight";
import ClipPath from "./ClipPath";

const ProductCard = ({ item }) => {
  return (
    <div
      className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] w-full"
      style={{
        backgroundImage: `url(${item.backgroundUrl})`,
      }}
      key={item.id}
    >
      <div className="relative z-2 flex flex-col min-h-[352px] p-[38px] pointer-events-none">
        <h5 className="text-[32px] leading-normal mb-5">{item.title}</h5>
        <p className="font-light text-[14px] leading-6 md:text-base mb-6 text-[#ADA8C3]">
          {item.text}
        </p>
        <div className="flex items-center mt-auto">
          <Image
            src={item.iconUrl}
            width={48}
            height={48}
            // style={{ height: "auto" }}
            alt={item.title}
          />

          <p className="ml-auto font-code text-xs font-bold text-[#FFFFFF] uppercase tracking-wider">
            Explore more
          </p>
          <Arrow />
        </div>
      </div>

      {item.light && <GradientLight />}

      <div
        className="absolute inset-0.5 bg-[#0E0C15]"
        style={{ clipPath: "url(#benefits)" }}
      >
        <div className="absolute inset-0 opacity-5 transition-opacity hover:opacity-40 duration-500">
          {item.imageUrl && (
            <Image
              src={item.imageUrl}
              width={380}
              height={362}
              alt={item.title}
              // style={{ height: "auto" }}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      <ClipPath />
    </div>
  );
};

export default ProductCard;
