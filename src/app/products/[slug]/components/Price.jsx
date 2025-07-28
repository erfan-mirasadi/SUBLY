"use client";

import Image from "next/image";

//components
import Section from "@/src/components/section/Section";
import Heading from "@/src/components/ui/Heading";
import StyleLines from "./StyleLines";
import PriceList from "./PriceList";

// Assets
// import stars from "@/public/price/stars.svg";
// import smallSphere from "@/public/price/4-small.png";

function Price({ productEntry = [], productInfo = {} }) {
  return (
    <Section className="overflow-hidden" id="pricing">
      <div className="max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem] relative z-2 flex flex-col items-center">
        {/* <div className="hidden relative justify-center mb-[6.5rem] lg:flex ">
          <Image
            src={smallSphere}
            className="relative z-1"
            width={255}
            height={255}
            alt="Sphere"
          />
          <div className="absolute top-1/2 left-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <Image
              src={stars}
              className="w-full"
              width={950}
              height={400}
              alt="Stars"
            />
          </div>
        </div> */}

        <Heading
          tag="Get started with Subly"
          title="با سابلی تمام قدرت را شروع کنید"
          className="font-vazirmatn"
        />

        <div className="relative">
          <PriceList productEntry={productEntry} productInfo={productInfo} />
          <StyleLines />
        </div>

        <div className="cursor-pointer  flex justify-center mt-10">
          <a
            className="text-xs font-code font-bold tracking-wider uppercase border-b "
            href="/pricing"
          >
            See the full details
          </a>
        </div>
      </div>
    </Section>
  );
}

export default Price;
