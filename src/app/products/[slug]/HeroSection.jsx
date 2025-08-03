import { FaCheckCircle } from "react-icons/fa";
import Heading from "@/src/components/ui/Heading";
import Image from "next/image";
import Section from "@/src/components/section/Section";

export default function HeroSection({ product }) {
  const explanationList = product.explanation
    ? product.explanation.split("\n")
    : [];
  return (
    <Section>
      <div className="max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem]">
        <Heading title={product.title} text={product.caption} />
        <div className="relative">
          <div className="relative z-1 flex items-center h-[39rem] mb-5 p-8 border border-[#FFFF]/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[46rem]">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none md:w-3/5 xl:w-auto">
              {product.image_big_url && (
                <Image
                  className="w-full h-full object-cover md:object-right"
                  width={800}
                  alt={product.title}
                  height={730}
                  src={product.image_big_url}
                  priority
                />
              )}
            </div>

            <div className="relative z-1 max-w-[17rem] ml-auto">
              <h4 className="text-[2rem] leading-normal mb-4">
                {product.title}
              </h4>
              <p className="font-light text-[0.875rem] leading-6 md:text-base mb-[3rem] text-[#ADA8C3]">
                {product.explanation || "توضیحی ثبت نشده است"}
              </p>
              <ul className="font-light text-[0.875rem] leading-6 md:text-base">
                {explanationList.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start py-4 border-t border-[#252134]"
                  >
                    <FaCheckCircle
                      size={50}
                      className="w-30 h-30 text-purple-500 rounded-full"
                    />
                    <p className="ml-4">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
