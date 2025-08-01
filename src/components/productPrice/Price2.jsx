// src/app/products/[slug]/components/Price2.jsx
import Image from "next/image";

//components
import Section from "@/src/components/section/Section";
import Heading from "@/src/components/ui/Heading";
import PriceList2 from "./PriceList2";


// Assets
import stars from "@/public/price/stars.svg";
import smallSphere from "@/public/price/4-small.png";
import StyleLines from "@/src/app/products/[slug]/StyleLines";

function Price2({
  productEntry = [],
  productInfo = {},
  currentPlan,
  productSlug,
}) {
  return (
    <Section className="overflow-hidden" id="pricing">
      <div className="max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem] relative z-2 flex flex-col items-center">
        <div className="relative">
          <PriceList2
            productEntry={productEntry}
            productInfo={productInfo}
            currentPlan={currentPlan}
            productSlug={productSlug}
          />
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

export default Price2;
