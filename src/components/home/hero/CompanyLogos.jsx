import Image from "next/image";

//asstest

import apple6 from "@/public/hero/logos/logo-1.png";
// import apple1 from "@/public/hero/logos/logo-2.png";
import apple2 from "@/public/hero/logos/logo-3.webp";
import apple3 from "@/public/hero/logos/logo-4.webp";
import apple4 from "@/public/hero/logos/logo-5.png";
import apple5 from "@/public/hero/logos/logo-6.png";

const companyLogos = [apple2, apple3, apple4, apple5, apple6];

const CompanyLogos = ({ className }) => {
  return (
    <div className={className}>
      <h5 className="tagline mb-6 text-center text-[#FFFFFF]/50">
        Helping people create beautiful content at
      </h5>
      <ul className="flex">
        {companyLogos.map((logo, index) => (
          <li
            className="flex items-center justify-center flex-1 h-[136px]"
            key={index}
          >
            <Image src={logo} width={134} height={28} alt={logo} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyLogos;
