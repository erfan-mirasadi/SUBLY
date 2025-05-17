import Link from "next/link";
import Section from "../section/Section";
import Heading from "../ui/Heading";
import ProductCard from "./ProductCard";

const productsList = [
  {
    id: 1,
    title: "ADOBE",
    text: "Lets users quickly find answers to their questions without having to search through multiple sources.",
    backgroundUrl: "/benefits/card-1.svg",
    iconUrl: "/benefits/icon-1.svg",
    imageUrl: "/hero/logos/logo-1.png",
  },
  {
    id: 2,
    title: "APPLE",
    text: "The app uses natural language processing to understand user queries and provide accurate and relevant responses.",
    backgroundUrl: "/benefits/card-2.svg",
    iconUrl: "/benefits/icon-2.svg",
    imageUrl: "/hero/logos/logo-2.png",
    light: true,
  },
  {
    id: 3,
    title: "SOCIAL ACCOUNTS",
    text: "Connect with the AI chatbot from anywhere, on any device, making it more accessible and convenient.",
    backgroundUrl: "/benefits/card-3.svg",
    iconUrl: "/benefits/icon-3.svg",
    imageUrl: "/hero/logos/logo-3.webp",
  },
  {
    id: 4,
    title: "chatGPT",
    text: "Lets users quickly find answers to their questions without having to search through multiple sources.",
    backgroundUrl: "/benefits/card-4.svg",
    iconUrl: "/benefits/icon-4.svg",
    imageUrl: "/hero/logos/logo-4.webp",
    light: true,
  },
  {
    id: 5,
    title: "YouTube",
    text: "Lets users quickly find answers to their questions without having to search through multiple sources.",
    backgroundUrl: "/benefits/card-5.svg",
    iconUrl: "/benefits/icon-1.svg",
    imageUrl: "/hero/logos/logo-5.png",
  },
  {
    id: 6,
    title: "SPOTIFY",
    text: "The app uses natural language processing to understand user queries and provide accurate and relevant responses.",
    backgroundUrl: "/benefits/card-6.svg",
    iconUrl: "/benefits/icon-2.svg",
    imageUrl: "/hero/logos/logo-6.png",
  },
];

function Products() {
  return (
    <Section id="productsss">
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[1400px] relative z-[2]">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="buy Smarter, Not Harder with SUBLY"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {productsList.map((item, index) => (
            <Link key={index} href="/products">
              <ProductCard item={item} width={48} height={48} />
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default Products;
