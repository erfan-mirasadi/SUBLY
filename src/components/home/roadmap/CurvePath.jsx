import Image from "next/image";
import curve1 from "@/public/hero/curve-1.svg";
import curve2 from "@/public/hero/curve-2.svg";

const RightCurve = () => {
  return (
    <div
      className="hidden absolute top-1/2 right-full w-[220px] -mt-1 ml-10 pointer-events-none xl:block"
      style={{ transform: "scaleX(-1)" }}
    >
      <Image src={curve2} width={220} height={76} alt="Curve 2" />
    </div>
  );
};

const LeftCurve = () => {
  return (
    <div
      className="hidden absolute top-45 bottom-1/2 left-full w-[822px] -mt-1 mr-10 pointer-events-none xl:block"
      style={{ transform: "scaleX(-1)" }}
    >
      <Image src={curve1} width={522} height={182} alt="Curve 1" />
    </div>
  );
};

function CurvePath() {
  return (
    <div>
      <LeftCurve />
      <RightCurve />
    </div>
  );
}

export default CurvePath;
