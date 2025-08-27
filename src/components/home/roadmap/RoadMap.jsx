import RoadMapCricle from "./RoadMapCircle";
import RoadMapCards from "./RoadMapCards";
import Section from "../../section/Section";
import Link from "next/link";
import { getFilteredProductsQuery } from "@/src/hooks/query/product";

const RoadMapText =
  "سابلی، راهی سریع و هوشمند برای خرید اشتراک‌ سرویس‌های محبوب از سراسر دنیاست.";

const RoadMapContent = [
  {
    id: "0",
    title: "تحویل فوری",
    text: "بلافاصله بعد از خرید، اشتراک به صورت خودکار فعال می‌شود",
  },
  {
    id: "1",
    title: "قیمت منصفانه",
    text: "با نرخ تبدیل منصفانه و بدون هزینه اضافی، پرداختی راحت داشته باش",
  },
  {
    id: "2",
    title: "پشتیبانی واقعی",
    text: "در هر مرحله از خرید، تیم پشتیبانی ما کنارته — بدون ربات و اتلاف وقت",
  },
];

async function RoadMap() {
  const RoadMapApps = await getFilteredProductsQuery();
  return (
    <Section crosses>
      <div className="max-w-6xl mx-auto px-5 md:px-10 lg:px-15 xl:max-w-7xl lg:flex min-h-[600px] lg:min-h-[700px] py-12 lg:py-16">
        <div className="max-w-md">
          <h2 className="text-xl leading-10 md:text-2xl md:leading-10 lg:text-4xl lg:leading-[3.5rem] xl:text-5xl xl:leading-tight mb-4 md:mb-8 font-vazirmatn">
            چرا سابلی بهترین انتخاب برای خرید اشتراک است؟
          </h2>

          <ul className="max-w-[350px] mb-10 md:mb-11 font-vazirmatn">
            {RoadMapContent.map((item) => (
              <RoadMapCards key={item.id} item={item} />
            ))}
          </ul>
          <Link href="/products">
            <button className="bg-amber-50 text-xs text-black p-3 rounded-xl  hover:bg-purple-900 hover:text-white transition duration-300 font-vazirmatn ease-in-out cursor-pointer hover:scale-105">
              تمام محصولات
            </button>
          </Link>
        </div>

        <div className="flex flex-col items-center xl:w-[500px] mt-12 lg:mt-25 lg:items-end">
          <p className="font-light text-sm leading-6 md:text-base mb-22 text-[#757185] md:mb-16 lg:mb-30 lg:w-[320px] xl:mr-70 lg:self-start font-vazirmatn lg:mr-15">
            {RoadMapText}
          </p>

          <RoadMapCricle apps={RoadMapApps} />
        </div>
      </div>
    </Section>
  );
}

export default RoadMap;
