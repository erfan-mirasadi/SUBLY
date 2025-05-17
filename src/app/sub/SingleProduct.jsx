//assets
import recording03 from "@/public/recording-03.svg";
import recording01 from "@/public/recording-01.svg";
import disc02 from "@/public/disc-02.svg";
import chromecast from "@/public/chrome-cast.svg";
import sliders04 from "@/public/sliders-04.svg";
import service1 from "@/public/hero/logos/apple-logo-01.png";
// import service2 from "@/public/hero/logos/apple-music-video.mp4";
import service3 from "@/public/hero/logos/apple-3.jpg";
import check from "@/public/check.svg";
import gradient from "@/public/gradient.png";

//components
import Section from "@/src/components/section/Section";
import Heading from "@/src/components/ui/Heading";
import Image from "next/image";
import Gradient from "@/src/components/ui/Gradient";

//variables
const brainwaveServices = [
  "Musics of the world’s ",
  "Best Quality",
  "Dulby Atmos",
  "High Quality",
];

const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

function SingleProduct() {
  return (
    <Section id="pppppp">
      <div className="max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem]">
        <Heading
          title="APPLE"
          text="SUBLY unlocks every applications in the world"
        />

        <div className="relative">
          <div className="relative z-1 flex items-center h-[39rem] mb-5 p-8 border border-[#FFFF]/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[46rem]">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none md:w-3/5 xl:w-auto">
              <Image
                className="w-full h-full object-cover md:object-right"
                width={800}
                alt="compony-1"
                height={730}
                src={service1}
              />
            </div>

            <div className="relative z-1 max-w-[17rem] ml-auto">
              <h4 className="text-[2rem] leading-normal mb-4">
                Listen to Musics
              </h4>
              <p className="font-light text-[0.875rem] leading-6 md:text-base mb-[3rem] text-[#ADA8C3]">
                Subly unlocks every products of apple applications
              </p>
              <ul className="font-light text-[0.875rem] leading-6 md:text-base">
                {brainwaveServices.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start py-4 border-t border-[#252134]"
                  >
                    <Image width={24} alt="dc" height={24} src={check} />
                    <p className="ml-4">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* </div> */}
            {/* <div className="relative z-1 grid gap-5 lg:grid-cols-2">
            <div className="relative min-h-[39rem] border border-[#FFFF]/10 rounded-3xl overflow-hidden">
              <div className="absolute inset-0">
                <video
                  src="videos/apple-music-video.mp4"
                  className="h-full w-full object-cover"
                  width={630}
                  height={750}
                  alt="compony-2"
                  autoPlay
                  loop
                  muted
                />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-b from-[#0E0C15]/0 to-[#0E0C15]/90 lg:p-15">
                <h4 className="text-[2rem] leading-normal mb-4">
                  Listen to Musics
                </h4>
                <p className="font-light text-[0.875rem] leading-6 md:text-base mb-[3rem] text-[#ADA8C3]">
                  Automatically download any music you want. Try it now!
                </p>
              </div>
            </div> */}

            {/* <div className="p-4 bg-[#15131D] rounded-3xl overflow-hidden lg:min-h-[46rem]">
              <div className="py-12 px-4 xl:px-8">
                <h4 className="text-[2rem] leading-normal mb-4">
                  Watching Movies
                </h4>
                <p className="font-light text-[0.875rem] leading-6 md:text-base mb-[2rem] text-[#ADA8C3]">
                  The world’s most poplur movie app with a lots of apple
                  componies film . What will you watch?
                </p>

                <ul className="flex items-center justify-between">
                  {brainwaveServicesIcons.map((item, index) => (
                    <li
                      key={index}
                      className={`rounded-2xl flex items-center justify-center ${
                        index === 2
                          ? "w-[3rem] h-[3rem] p-0.25 bg-conic-gradient md:w-[4.5rem] md:h-[4.5rem]"
                          : "flex w-10 h-10 bg-[#252134] md:w-15 md:h-15"
                      }`}
                    >
                      <div
                        className={
                          index === 2
                            ? "flex items-center justify-center w-full h-full bg-[#15131D] rounded-[1rem]"
                            : ""
                        }
                      >
                        <Image src={item} width={24} height={24} alt={item} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div> */}

            {/* <div className="relative h-[20rem] bg-[#0E0C15] rounded-xl overflow-hidden md:h-[25rem]">
                <Image
                  src={service3}
                  className="w-full h-full object-cover"
                  width={520}
                  height={400}
                  alt="compony-3"
                />
              </div> */}
            {/* </div> */}
          </div>

          <Gradient />
        </div>
      </div>
    </Section>
  );
}

export default SingleProduct;
