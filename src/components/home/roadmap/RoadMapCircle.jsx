import Image from "next/image";
import CurvePath from "./CurvePath";

const AppIcon = ({ app, rotation }) => (
  <li
    className="absolute top-0 left-1/2 h-1/2 -ml-[25px] origin-bottom "
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    <div
      className="relative -top-[25px] flex w-[50px] h-[50px] bg-[#15131D] border border-[#FFFFFF]/15 rounded-3xl"
      style={{ transform: `rotate(-${rotation}deg)` }}
    >
      <Image
        className="m-auto"
        width={app.width}
        height={app.height}
        alt={app.title}
        src={app.icon}
      />
    </div>
  </li>
);

function RoadMapCircle({ apps }) {
  return (
    <div className="relative left-1/2 flex w-[350px] aspect-square border border-[#252134] rounded-full -translate-x-1/2 scale:75 md:scale-100">
      <div className="flex w-60 aspect-square m-auto border border-[#252134] rounded-full">
        <div className="w-24 aspect-square m-auto p-[3px] bg-conic-gradient rounded-full">
          <div className="flex items-center justify-center w-full h-full bg-[#0E0C15] rounded-full">
            SUBLY
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
