import Image from "next/image";
import heroBackground from "@/public/hero/logo1.png";
import BackgroundCircles from "./BackgroundCircles";

export default function HeroBackground({ parallaxRef }) {
  return (
    <>
      <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[108%] lg:-top-[60%] z-[0] opacity-3">
        <Image
          src={heroBackground}
          className="w-full"
          width={1440}
          height={1800}
          alt="hero background"
          priority
        />
      </div>
      <BackgroundCircles parallaxRef={parallaxRef} />
    </>
  );
}
