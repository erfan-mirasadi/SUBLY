//assets
import discordBlack from "@/public/socials/discord.svg";
import facebook from "@/public/socials/facebook.svg";
import instagram from "@/public/socials/instagram.svg";
import telegram from "@/public/socials/telegram.svg";
import twitter from "@/public/socials/twitter.svg";

import Image from "next/image";

const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];

function Footer() {
  return (
    <div className=" max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem] flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col pt-22">
      <p className="text-xs text-[#757185] lg:block">
        ©Erfan {new Date().getFullYear()}. All rights reserved.
      </p>

      <ul className="flex gap-5 flex-wrap">
        {socials.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            className="flex items-center justify-center w-10 h-10 bg-[#15131D] rounded-full transition-colors hover:bg-[#252134]"
          >
            <Image src={item.iconUrl} width={16} height={16} alt={item.title} />
          </a>
        ))}
      </ul>
    </div>
  );
}

export default Footer;
