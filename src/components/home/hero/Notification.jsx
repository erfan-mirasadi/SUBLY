import Image from "next/image";
// import notification1 from "@/public/hero/notification/image-1.png";
import notification2 from "@/public/hero/notification/image-2.png";
import notification3 from "@/public/hero/notification/image-3.png";
import notification4 from "@/public/hero/notification/image-4.png";
import notification1 from "@/public/hero/logos/logo-2.png";

const notificationImages = [notification4, notification3, notification2];

const Notification = ({ className, title }) => {
  return (
    <div
      className={`${
        className || ""
      } flex items-center p-4 pr-6 bg-[#474060]/40 backdrop-blur border border-[#FFFFFF]/10 rounded-2xl gap-5`}
    >
      <Image
        src={notification1}
        width={62}
        height={62}
        alt="image"
        className="rounded-xl"
      />

      <div className="flex-1">
        <h6 className="mb-[4px] font-semibold text-base text-amber-50">
          {title}
        </h6>

        <div className="flex items-center justify-between">
          <ul className="flex -m-0.5">
            {notificationImages.map((item, index) => (
              <li
                key={index}
                className="flex w-6 h-6 border-2 border-[#2E2A41] rounded-full overflow-hidden"
              >
                <Image
                  src={item}
                  className="w-full"
                  width={20}
                  height={20}
                  alt={item}
                />
              </li>
            ))}
          </ul>
          <div className=" text-[#6C7275]">1m ago</div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
