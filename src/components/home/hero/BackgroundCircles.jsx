"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MouseParallax } from "react-just-parallax";

// Images for the circles that appear around the rings
const images = [
  {
    src: "/hero/logos/ChatGPT.png",
    rotate: "rotate-[46deg]",
    transform: "-ml-3 -mt-36 scale-160",
  },
  {
    src: "/hero/logos/hbo_max.png",
    rotate: "rotate-[26deg]",
    transform: "-ml-12 -mt-6 scale-160",
  },
  {
    src: "/hero/logos/Creative_Cloud_Pro.png",
    rotate: "-rotate-[60deg]",
    transform: "-ml-12 -mt-2 scale-145",
  },
  {
    src: "/hero/logos/netflix.png",
    rotate: "rotate-[51deg]",
    transform: "-ml-3 mt-[206px] scale-160",
  },
  {
    src: "/hero/logos/PhotoShop.png",
    rotate: "-rotate-[22deg]",
    transform: "ml-20 -mt-1 scale-125",
  },
  {
    src: "/hero/logos/apple_music.png",
    rotate: "-rotate-[73deg]",
    transform: "-ml-3 -mt-32 scale-195",
  },
  {
    src: "/hero/logos/spotify.png",
    rotate: "rotate-[70deg]",
    transform: "-ml-4 -mt-3 scale-190",
  },
  {
    src: "/hero/logos/udemy.png",
    rotate: "rotate-[55deg]",
    transform: "-ml-4 -mt-1 scale-140",
  },
  {
    src: "/hero/logos/youtube.png",
    rotate: "-rotate-[42deg]",
    transform: "-ml-0 -mt-32 scale-195",
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
