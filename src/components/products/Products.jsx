import Link from "next/link";
import Section from "../section/Section";
import Heading from "../ui/Heading";
import ProductCard from "./ProductCard";
import { getFilteredProductsQuery } from "@/src/hooks/query/product";

// const productsList = [
//   {
//     id: 1,
//     title: "Apple Music",
//     text: "موزیک بی‌پایان با کیفیت بالا، پلی‌لیست‌های شخصی‌سازی شده و دسترسی آفلاین",
//     backgroundUrl: "/benefits/card-1.svg",
//     iconUrl: "/benefits/icon-1.svg",
//     imageUrl: "/hero/logos/logo-2.png",
//     category: "music",
//     price: "10.99",
//     duration: "monthly",
//   },
//   {
//     id: 2,
//     title: "Spotify Premium",
//     text: "موزیک بدون محدودیت، بدون تبلیغات و قابلیت دانلود برای گوش دادن آفلاین",
//     backgroundUrl: "/benefits/card-2.svg",
//     iconUrl: "/benefits/icon-2.svg",
//     imageUrl: "/hero/logos/logo-6.png",
//     light: false,
//     category: "music",
//     price: "9.99",
//     duration: "monthly",
//   },
//   {
//     id: 3,
//     title: "Nuke",
//     text: "نرم‌افزار حرفه‌ای کامپوزیت و جلوه‌های ویژه برای سینما و تلویزیون",
//     backgroundUrl: "/benefits/card-3.svg",
//     iconUrl: "/benefits/icon-3.svg",
//     imageUrl: "/hero/Nuke.png",
//     category: "software",
//     price: "99.99",
//     duration: "monthly",
//   },
//   {
//     id: 4,
//     title: "YouTube Premium",
//     text: "تماشای ویدیو بدون تبلیغات، پخش در پس‌زمینه و دانلود برای تماشای آفلاین",
//     backgroundUrl: "/benefits/card-4.svg",
//     iconUrl: "/benefits/icon-4.svg",
//     imageUrl: "/hero/logos/logo-5.png",
//     light: true,
//     category: "video",
//     price: "11.99",
//     duration: "monthly",
//   },
//   {
//     id: 5,
//     title: "Apple Arcade",
//     text: "بازی‌های پریمیوم بدون تبلیغات و خرید درون‌برنامه‌ای برای تمام دستگاه‌های اپل",
//     backgroundUrl: "/benefits/card-5.svg",
//     iconUrl: "/benefits/icon-1.svg",
//     imageUrl: "/hero/logos/Apple-Arcade-1.png",
//     category: "gaming",
//     price: "4.99",
//     duration: "monthly",
//   },
//   {
//     id: 6,
//     title: "Adobe Creative Cloud",
//     text: "مجموعه کامل ابزارهای طراحی حرفه‌ای شامل Photoshop، Illustrator و Premiere",
//     backgroundUrl: "/benefits/card-6.svg",
//     iconUrl: "/benefits/icon-2.svg",
//     imageUrl: "/hero/adobe1.png",
//     category: "design",
//     price: "52.99",
//     duration: "monthly",
//   },
// ];

async function Products() {
  const productsList = await getFilteredProductsQuery();

  return (
    <Section id="productsss">
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[1400px] relative z-[2]">
        <Heading
          className="md:max-w-md lg:max-w-2xl font-vazirmatn"
          title="با سابلی همیشه یک قدم جلوتر باش"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {productsList.map((item, index) => (
            <ProductCard
              key={item.id}
              item={item}
              index={index}
              width={48}
              height={48}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

export default Products;
