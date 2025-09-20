import Image from "next/image";
// زندگی دیجیتال رو ارتقا بده با سابلی
export default function HeroContent() {
  return (
    <div className="relative z-[1] max-w-[992px] mx-auto text-center mb-[62px] md:mb-20 lg:mb-[80px]">
      <h1 className="text-5xl mb-5 font-vazirmatn">
        <div className="md:inline">خرید اشتراک سریع و ارزان</div>
        <div className="block md:inline">
          <span className="inline-flex font-grotesk relative mx-4.5 mr-11 scale-200 justify-center translate-y-3 md:mr-11 md:scale-200 md:translate-y-8.5">
            <Image
              src="/hero/logo1.png"
              alt="SABLY"
              width={600}
              height={600}
              className="h-20 w-25"
            />
            <Image
              src="/hero/curve.png"
              alt="curve"
              width={624}
              height={28}
              className="absolute top-full left-0 w-full -mt-6"
            />
          </span>
        </div>
      </h1>
      {/* <p className=" max-w-4xl mx-auto text-[#CAC6DD] lg:mb-8 font-vazirmatn">
        همه‌ی اشتراک‌های مورد علاقت بدون محدودیت، بدون دردسر یکجا
      </p> */}
      {/* <Link href={"/products"}>
        <button className="px-6 py-3 rounded-xl bg-white text-black font-vazirmatn font-medium hover:bg-opacity-90 transition-all cursor-pointer">
          شروع کن
        </button>
      </Link> */}
    </div>
  );
}
