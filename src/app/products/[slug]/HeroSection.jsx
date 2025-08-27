import { FaCheckCircle } from "react-icons/fa";
import Heading from "@/src/components/ui/Heading";
import Image from "next/image";
import Section from "@/src/components/section/Section";
import Gradient from "@/src/components/ui/Gradient";

export default function HeroSection({ product }) {
  const explanationList = product.explanation
    ? product.explanation.split("\n")
    : [];
  return (
    <Section>
      <div className="max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem] font-vazirmatn">
        <Heading title={product.title} text={product.caption} />
        <div className="relative">
          <div className="flex flex-col lg:flex-row border border-white/10 rounded-3xl overflow-hidden">
            <div className="relative w-full lg:w-1/2 h-[20rem] sm:h-[24rem] lg:h-auto">
              {product.image_big_url && (
                <Image
                  className="w-full h-full object-cover"
                  fill
                  alt={product.title}
                  src={product.image_big_url}
                  priority
                />
              )}
            </div>
            <Gradient />
            <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col">
              {/* <h4 className="font-bold text-3xl xl:text-4xl leading-tight mb-4 text-slate-50">
                {product.title}
              </h4> */}
              <div>
                <p className="text-base text-slate-100 mb-8">
                  {product.explanation}
                </p>
                <ul className="space-y-3">
                  {explanationList.map((item, index) => (
                    <li key={index} className="flex py-1" dir="rtl">
                      <FaCheckCircle className="w-4 h-4 my-1 ml-3 text-purple-800 shrink-0" />
                      <p className="text-slate-300"> {item} </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
