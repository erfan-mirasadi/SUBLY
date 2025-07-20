//ASSETS

import check2 from "@/public/check-02.svg";
import grid from "@/public/grid.png";
import loading1 from "@/public/loading.png";
import TagLine from "@/src/components/ui/TagLine";
import Heading from "@/src/components/ui/Heading";
//NEXT
import Image from "next/image";
import Gradient from "@/src/components/ui/Gradient";
//COMPONENTS

export const roadmap = [
  {
    id: "0",
    title: "APPLE MUSIC",
    text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
    date: "اشتراکی",
    status: "outlet",
    imageUrl: "/hero/logos/apple-music-1.png",
    colorful: true,
    price: "19.97 $",
    oldPrice: "$29.99",
  },
  {
    id: "1",
    title: "ICLOUD",
    text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
    date: "اشتراکی",
    status: "progress",
    imageUrl: "/hero/logos/iCloud-iPhone.png",
    price: "$14.99",
  },
  {
    id: "2",
    title: "APPLE ARCADE",
    text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
    date: "اشتراکی",
    imageUrl: "/hero/logos/Apple-Arcade-1.png",
    price: "$9.99",
  },
  {
    id: "3",
    title: "APPLE BOOKS",
    text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
    date: "اشتراکی",
    imageUrl: "/hero/logos/Apple-books-01.png",
    price: "$11.99",
  },
  {
    id: "4",
    title: "APPLE MUSIC",
    text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
    date: "اشتراکی",
    status: "outlet",
    imageUrl: "/hero/logos/apple-music-1.png",
    colorful: true,
    price: "$19.99",
    oldPrice: "$29.99",
  },
  {
    id: "5",
    title: "ICLOUD",
    text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
    date: "اشتراکی",
    status: "outlet",
    imageUrl: "/hero/logos/iCloud-iPhone.png",
    colorful: true,
    price: "$19.99",
    oldPrice: "$29.99",
  },
  {
    id: "6",
    title: "APPLE BOOKS",
    text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
    date: "اشتراکی",
    status: "progress",
    imageUrl: "/hero/logos/Apple-books-01.png",
    price: "$11.99",
  },
];

function ProductSection() {
  return (
    <div className=" mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem] md:pb-10 ">
      <Heading
        tag="Ready to get started"
        title="What APPLE has in their pocket"
      />

      <div className="relative grid gap-6 md:grid-cols-2 md:gap-4 md:pb-[7rem]">
        {roadmap.map((item) => {
          const isOutlet = item.status === "outlet";

          return (
            <div
              className={`md:flex even:md:translate-y-[7rem] p-0.25 rounded-[2.5rem] ${
                item.colorful ? "bg-conic-gradient" : "bg-[#252134]"
              }`}
              key={item.id}
            >
              <div className="relative p-8 bg-[#0E0C15] rounded-[2.4375rem] overflow-hidden xl:p-15">
                <div className="absolute top-0 left-0 max-w-full">
                  <Image
                    className="w-full"
                    src={grid}
                    width={550}
                    height={550}
                    alt="Grid"
                  />
                </div>
                <div className="relative z-1">
                  <div className="flex items-center justify-between max-w-[27rem] mb-8 md:mb-20">
                    <TagLine>{item.date}</TagLine>
                    {isOutlet && (
                      <div className="flex items-center px-4 py-1 bg-[#FFFF] rounded text-[#0E0C15]">
                        <Image
                          className="mr-2.5"
                          src={check2}
                          width={16}
                          height={16}
                          alt="check"
                        />
                        <div className="font-grotesk font-light text-xs tracking-tagline uppercase">
                          {item.status}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-10 -my-10 -mx-15">
                    <Image
                      className="w-full"
                      src={item.imageUrl}
                      width={628}
                      height={426}
                      alt={item.title}
                    />
                  </div>

                  <h4 className="text-[2rem] leading-normal mb-4">
                    {item.title}
                  </h4>
                  <p className="font-light text-[0.875rem] leading-6 md:text-base text-[#757185] mb-6">
                    {item.text}
                  </p>

                  {/* 🛒 Pricing Section */}
                  {item.price && (
                    <div className="relative mt-6 flex flex-col items-start">
                      <div className="px-4 py-2 rounded-xl border border-[#ffffff22] bg-[#1a1824]/50 backdrop-blur-md">
                        <div className="flex items-baseline gap-2">
                          {/* New Price */}
                          <span className="text-[1.5rem] font-bold text-[#FFFF]/80 drop-shadow-glow">
                            {item.price}
                          </span>

                          {/* Old Price if exists */}
                          {item.oldPrice && (
                            <span className="text-sm text-[#757185] line-through">
                              {item.oldPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* End Pricing Section */}
                </div>
                <Gradient />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductSection;
