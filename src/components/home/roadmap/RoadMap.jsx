//Assets
import apple6 from "@/public/hero/logos/logo-1.png";
import apple1 from "@/public/hero/logos/logo-2.png";
import apple2 from "@/public/hero/logos/logo-3.webp";
import apple3 from "@/public/hero/logos/logo-4.webp";
import apple4 from "@/public/hero/logos/logo-5.png";
import apple5 from "@/public/hero/logos/logo-6.png";
//Components
import RoadMapCricle from "./RoadMapCircle";
import RoadMapCards from "./RoadMapCards";
import Section from "../../section/Section";
import Link from "next/link";

const RoadMapText =
  "With smart automation and top-notch security, it's the perfect solution for teams looking to work smarter.";

const RoadMapApps = [
  {
    id: "0",
    title: "Figma",
    icon: apple1,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: apple2,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: apple3,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: apple4,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: apple5,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: apple3,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: apple6,
    width: 26,
    height: 34,
  },
];

const RoadMapContent = [
  {
    id: "0",
    title: "Seamless Integration",
    text: RoadMapText,
  },
  {
    id: "1",
    title: "Smart Automation",
  },
  {
    id: "2",
    title: "Top-notch Security",
  },
];

const RoadMap = () => {
  return (
    <Section crosses>
      <div className="max-w-6xl mx-auto px-5 md:px-10 lg:px-15 xl:max-w-7xl lg:flex h-screen py-12">
        <div className="max-w-md">
          <h2 className="text-xl leading-10 md:text-2xl md:leading-10 lg:text-4xl lg:leading-[3.5rem] xl:text-5xl xl:leading-tight mb-4 md:mb-8">
            AI Chat App for seamless collaboration
          </h2>

          <ul className="max-w-[350px] mb-10 md:mb-14">
            {RoadMapContent.map((item) => (
              <RoadMapCards key={item.id} item={item} />
            ))}
          </ul>
          <Link href="/products">
            <button className="bg-amber-50 text-xs text-black p-3 rounded-2xl mt-5 hover:bg-purple-900 hover:text-white transition duration-300 ease-in-out">
              All Products
            </button>
          </Link>
        </div>

        <div className="lg:ml-auto xl:w-[600px] mt-4">
          <p className="font-light text-sm leading-6 md:text-base mb-22 text-[#757185] md:mb-16 lg:mb-32 lg:w-[350px] lg:mx-auto">
            {RoadMapText}
          </p>

          <RoadMapCricle apps={RoadMapApps} />
        </div>
      </div>
    </Section>
  );
};

export default RoadMap;
