"use client";

import { useRef } from "react";
import icon1 from "@/public/hero/icon-01.svg";
import icon2 from "@/public/hero/icon-02.svg";
import icon3 from "@/public/hero/icon-03.svg";
import icon4 from "@/public/hero/icon-04.svg";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import HeroBackground from "./HeroBackground";
import CompanyLogos from "./CompanyLogos";
import Section from "../../section/Section";

// Icons for the parallax effect
const heroIcons = [icon1, icon2, icon3, icon4];

function Hero() {
  const parallaxRef = useRef(null);

  return (
    <Section
      className="pt-[6.5rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div
        className="max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem] relative"
        ref={parallaxRef}
      >
        {/* Hero content with heading, text and CTA button */}
        <HeroContent />

        {/* Main hero image with frame and notifications */}
        <HeroImage heroIcons={heroIcons} />

        {/* Background elements and decorations */}
        <HeroBackground parallaxRef={parallaxRef} />

        {/* Company logos section */}
        <CompanyLogos className="hidden relative z-10 mt-20 lg:block" />
      </div>
    </Section>
  );
}

export default Hero;
