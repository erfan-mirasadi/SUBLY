import Image from "next/image";
import Link from "next/link";

const Notification = ({
  className,
  title,
  image,
  price,
  time = "15m ago",
  href,
}) => (
  <div>
    <Link
      href={href}
      className={`flex items-center p-4 pr-6 bg-[#474060]/40 backdrop-blur border border-[#FFFFFF]/10 rounded-2xl gap-5   ${className}`}
    >
      <Image
        src={image}
        width={62}
        height={62}
        alt={title || "image"}
        className="rounded-xl"
      />

      <div className="flex-1">
        <h6 className="mb-[4px] font-semibold text-base text-amber-50">
          {title}
        </h6>

        {price && <div className="text-sm text-[#A78BFA] mb-2">{price}</div>}

        <div className="flex items-center justify-between">
          <ul className="flex -m-0.5"></ul>
          <div className=" text-[#6C7275]">{time}</div>
        </div>
      </div>
    </Link>
  </div>
);

export default Notification;
