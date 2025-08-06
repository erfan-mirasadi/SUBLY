import Image from "next/image";
import Arrow from "./Arrow";
import GradientLight from "./GradientLight";
import ClipPath from "./ClipPath";
import Link from "next/link";

const backgroundImages = [
  "/benefits/card-1.svg",
  "/benefits/card-2.svg",
  "/benefits/card-3.svg",
  "/benefits/card-4.svg",
  "/benefits/card-5.svg",
  "/benefits/card-6.svg",
];

const ProductCard = ({ item, index = 0 }) => {
  // Select background image based on index, or use modulo to cycle through them
  const backgroundImage = backgroundImages[index % backgroundImages.length];

  // Fallback images if the item doesn't have proper image URLs
  const smallImageSrc = item.image_small_url || "/benefits/icon-1.svg";
  const bigImageSrc = item.image_big_url || "/hero/gradient.png";

  return (
    <div
      className="block relative p-0.5 bg-no-repeat w-full"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        transform: "scaleX(-1)",
      }}
      key={item.id}
    >
      <div
        className="relative z-2 flex flex-col min-h-[352px] p-[38px] pointer-events-none"
        style={{ transform: "scaleX(-1)" }}
      >
        <h5 className="text-[32px] leading-normal mb-5">{item.title}</h5>
        <p className="font-light text-[14px] leading-6 md:text-base mb-6 text-[#ADA8C3] vazir">
          {item.text || item.caption || item.description}
        </p>
        <div className="flex items-center mt-auto">
          {smallImageSrc && (
            <Image
              src={smallImageSrc}
              width={48}
              height={48}
              alt={item.title || "Product"}
            />
          )}
          <p className="ml-auto font-code text-xs font-bold text-[#FFFFFF] uppercase tracking-wider cursor-pointer z-3 pointer-events-auto">
            <Link href={`/products/${item.slug}`}>مشاهده محصول</Link>
          </p>
          <Arrow />
        </div>
      </div>

      {<GradientLight />}

      <div
        className="absolute inset-0.5 bg-[#0E0C15]"
        style={{ clipPath: "url(#benefits)" }}
      >
        <div className="absolute inset-0 opacity-5 transition-opacity hover:opacity-40 duration-500">
          {bigImageSrc && (
            <Image
              src={bigImageSrc}
              width={380}
              height={362}
              alt={item.title || "Product"}
              className="w-full h-full object-cover"
              style={{ transform: "scaleX(-1)" }}
            />
          )}
        </div>
      </div>

      <ClipPath />
    </div>
  );
};

export default ProductCard;
