import Image from "next/image";
import Link from "next/link";
// import apple1 from "@/public/hero/logos/logo-2.png";
import ChatGPT from "@/public/hero/logos/ChatGPT.png";
import Creative_Cloud_Pro from "@/public/hero/logos/Creative_Cloud_Pro.png";
import HBO_MAX from "@/public/hero/logos/hbo_max.png";
import netflix from "@/public/hero/logos/netflix.png";
import PhotoShop from "@/public/hero/logos/PhotoShop.png";
import Heading from "../../ui/Heading";

// NOTE: I inferred product slugs from the logo names. If you want different slugs,
// tell me and I'll update them.
const companyLogos = [
  {
    src: Creative_Cloud_Pro,
    name: "Creative Cloud Pro",
    href: "/products/creative-cloud-pro",
  },
  { src: ChatGPT, name: "ChatGPT", href: "/products/chat-gpt" },
  { src: netflix, name: "Netflix", href: "/products/netflix" },
  { src: HBO_MAX, name: "HBO Max", href: "/products/HBO-Max" },
  { src: PhotoShop, name: "PhotoShop", href: "/products/photoshop" },
];

const CompanyLogos = ({ className }) => {
  return (
    <div className={className}>
      <h5 className="tagline mb-16 text-center text-[#FFFFFF]/50 font-vazirmatn">
        <Heading tag="محصولات پرفروش" />
      </h5>
      <ul className="flex">
        {companyLogos.map((logo, index) => (
          <li
            className="flex items-center justify-center flex-1 h-[136px]"
            key={logo.href || index}
          >
            <Link
              href={logo.href}
              className="w-full flex items-center justify-center"
            >
              <Image
                src={logo.src}
                width={134}
                height={28}
                alt={logo.name}
                style={{ width: "auto", height: "auto" }}
                className="max-w-[400px] max-h-[400px] object-contain cursor-pointer hover:scale-125 transition-transform duration-500"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyLogos;
