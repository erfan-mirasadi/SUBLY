import { ScrollParallax } from "react-just-parallax";
import Image from "next/image";
import Notification from "./Notification";

// Gradient component for the bottom part of the hero image
const Gradient = () => {
  return (
    <>
      <div className="relative z-1 h-6 mx-2.5 bg-[#1B1B2E] shadow-xl rounded-b-[20px] lg:h-6 lg:mx-8" />
      <div className="relative z-1 h-6 mx-6 bg-[#1B1B2E]/70 shadow-xl rounded-b-[20px] lg:h-6 lg:mx-20" />
    </>
  );
};

export default function HeroImage({ heroIcons }) {
  return (
    <div className=" relative max-w-[368px] mx-auto md:max-w-5xl xl:mb-24">
      <div className="relative z-[1] p-0.5 rounded-2xl bg-conic-gradient">
        <div className="relative bg-[#0E0C15] rounded-[16px]">
          <div className="h-[22px] bg-[#43435C] rounded-t-[14px]" />

          <div className="rounded-b-[14px] overflow-hidden aspect-[1.28] md:aspect-[688/490] lg:aspect-[1024/490]">
            <Image
              src="/hero/robot.jpg"
              alt="hero"
              width={1024}
              height={490}
              className="w-full scale-[1.2] translate-y-[8%] md:scale-[1.1] md:translate-y-[3%] lg:-translate-y-[15%] lg:scale-[1]"
            />

            <ScrollParallax isAbsolutelyPositioned>
              <ul className="hidden absolute -left-[88px] bottom-[120px] px-1 py-1 bg-[#474060]/40 backdrop-blur border border-[#FFFFFF]/10 rounded-2xl xl:flex">
                {heroIcons.map((icon, index) => (
                  <li className="p-5" key={index}>
                    <Image
                      src={icon}
                      width={24}
                      height={25}
                      alt={`icon-${index}`}
                    />
                  </li>
                ))}
              </ul>
            </ScrollParallax>

            <ScrollParallax isAbsolutelyPositioned>
              <Notification
                className="hidden absolute -right-[88px] bottom-[176px] w-[288px] xl:flex"
                title="Last chance !"
              />
            </ScrollParallax>
          </div>
        </div>
        <Gradient />
      </div>
    </div>
  );
}
