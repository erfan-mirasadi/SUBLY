import Image from "next/image";
import CurvePath from "./CurvePath";
import Link from "next/link";

const AppIcon = ({ app, rotation }) => (
  <li
    className="absolute top-0 left-1/2 h-1/2 -ml-[25px] origin-bottom "
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    <Link href={`/products/${app.slug}`}>
      <div
        className="relative -top-[25px] flex w-[50px] h-[50px] bg-[#15131D] border border-[#FFFFFF]/15 rounded-3xl"
        style={{ transform: `rotate(-${rotation}deg)` }}
      >
        <Image
          className="m-auto"
          width={44}
          height={44}
          alt={app.title}
          src={app.image_small_url}
        />
      </div>
    </Link>
  </li>
);

function RoadMapCircle({ apps }) {
  return (
    <div className="relative flex w-[350px] aspect-square border border-[#252134] rounded-full scale:75 md:scale-100 mx-auto lg:right-1/3">
      <div className="flex w-60 aspect-square m-auto border border-[#252134] rounded-full">
        <div className="w-24 aspect-square m-auto p-[3px] bg-conic-gradient rounded-full">
          <div className="flex items-center justify-center w-full h-full bg-[#0E0C15] rounded-full">
            <Image
              src="/hero/logo1.png"
              alt="SABLY"
              width={400}
              height={400}
              className="w-25 h-25"
            />
          </div>
        </div>
      </div>

      <ul>
        {apps.map((app, index) => {
          const rotation = (360 / apps.length) * index;
          return <AppIcon key={app.id} app={app} rotation={rotation} />;
        })}
      </ul>
      <CurvePath />
    </div>
  );
}

export default RoadMapCircle;
