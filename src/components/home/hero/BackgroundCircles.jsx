"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MouseParallax } from "react-just-parallax";

// Images for the circles that appear around the rings
const images = [
  {
    src: "/hero/logos/logo-1.png",
    rotate: "rotate-[46deg]",
    transform: "-ml-3 -mt-36 scale-100",
  },
  {
    src: "/hero/logos/logo-2.png",
    rotate: "-rotate-[56deg]",
    transform: "-ml-3 -mt-32 scale-125",
  },
  {
    src: "/hero/logos/logo-3.webp",
    rotate: "rotate-[54deg]",
    transform: "-ml-3 mt-[206px] scale-[1.1]",
  },
  {
    src: "/hero/logos/logo-5.png",
    rotate: "-rotate-[65deg]",
    transform: "-ml-3 mt-52 scale-150",
  },
  {
    src: "/hero/logos/logo-4.webp",
    rotate: "-rotate-[85deg]",
    transform: "-ml-4 -mt-3 scale-125",
  },
  {
    src: "/hero/logos/logo-6.png",
    rotate: "rotate-[70deg]",
    transform: "-ml-4 -mt-3 scale-110",
  },
];

// Decorative rings component
const Rings = () => {
  return (
    <>
      <div className="absolute top-1/2 left-1/2 w-[1054px] aspect-square border border-[#CAC6DD]/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-[822px] aspect-square border border-[#CAC6DD]/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-[578px] aspect-square border border-[#CAC6DD]/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-[370px] aspect-square border border-[#CAC6DD]/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
    </>
  );
};

const BackgroundCircles = ({ parallaxRef }) => {
  const [mounted, setMounted] = useState(false);

  // Only enable animation after component mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute -top-[678px] left-1/2 w-[1248px] aspect-square -translate-x-1/2 md:-top-[616px] xl:-top-[672px] pointer-events-none">
      <Rings />
      <MouseParallax strength={0.07} parallaxContainerRef={parallaxRef}>
        {images.map((img, i) => (
          <div
            key={i}
            className={`hidden lg:block absolute bottom-10 left-1/2 w-0.25 h-1/2 origin-bottom ${img.rotate}`}
          >
            <div
              className={`relative w-6 h-6 ${
                img.transform
              } transition-transform duration-500 ease-out ${
                mounted
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <Image
                src={img.src}
                alt={`circle-${i}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain rounded-full"
              />
            </div>
          </div>
        ))}
      </MouseParallax>
    </div>
  );
};

export default BackgroundCircles;
