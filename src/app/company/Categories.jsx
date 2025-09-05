import Section from "@/src/components/section/Section";
import Heading from "@/src/components/ui/Heading";
import Image from "next/image";
import Gradient from "@/src/components/ui/Gradient";
import {
  FaCheckCircle,
  FaYoutube,
  FaSpotify,
  FaFilm,
  FaBook,
  FaGamepad,
} from "react-icons/fa";

const subscriptionIcons = [FaYoutube, FaSpotify, FaFilm, FaBook, FaGamepad];

async function Categories({ item }) {
  return (
    <Section id={item.slug}>
      <div className="max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem] font-vazirmatn">
        <Heading title={item.title} text={item.caption} />

        <div className="relative">
          <div className="relative z-1 flex items-center h-[39rem] mb-5 p-8 border border-[#FFFF]/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[46rem]">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none md:w-3/5 xl:w-auto">
              <Image
                className="w-full h-full object-cover md:object-right"
                width={800}
                alt="compony-1"
                height={730}
                src={item.image_url}
              />
            </div>

            <div className="relative z-1 max-w-[17rem] ml-auto">
              {(() => {
                const lines =
                  item.description
                    ?.split("\n")
                    .map((l) => l.trim())
                    .filter((l) => l.length > 0) || [];

                const firstLine = lines.length > 0 ? lines[0] : "";
                const descriptionList = lines.length > 1 ? lines.slice(1) : [];

                return (
                  <>
                    <h4 className="text-[2rem] leading-normal mb-4">
                      {firstLine}
                    </h4>
                    {descriptionList.length > 0 && (
                      <div className="font-light text-[0.875rem] leading-6 md:text-base mb-[3rem]">
                        {descriptionList.map((line, index) => (
                          <div key={index} className="flex items-start mb-2">
                            <FaCheckCircle className="w-4 h-4 text-purple-500 mt-1 ml-2 flex-shrink-0" />
                            <p className="text-[#ADA8C3]">{line}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>

          <div className="relative z-1 grid gap-5 lg:grid-cols-2">
            <div className="relative min-h-[39rem] border border-[#FFFF]/10 rounded-3xl overflow-hidden">
              <div className="absolute inset-0">
                <video
                  src={item.video_url}
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
                {/* <h4 className="text-[2rem] leading-normal mb-4">
                  Listen to Musics
                </h4>
                <p className="font-light text-[0.875rem] leading-6 md:text-base mb-[3rem] text-[#ADA8C3]">
                  Automatically download any music you want. Try it now!
                </p> */}
              </div>
            </div>

            <div className="p-4 bg-[#15131D] rounded-3xl overflow-hidden lg:min-h-[46rem]">
              <div className="py-12 px-4 xl:px-8">
                {(() => {
                  const lines =
                    item.features
                      ?.split("\n")
                      .map((l) => l.trim())
                      .filter((l) => l.length > 0) || [];

                  const firstLine = lines.length > 0 ? lines[0] : "";
                  const features = lines.length > 1 ? lines.slice(1) : [];

                  return (
                    <>
                      <h4 className="text-[2rem] leading-normal mb-4">
                        {firstLine}
                      </h4>
                      {features.length > 0 && (
                        <p className="font-light text-[0.875rem] leading-6 md:text-base mb-[2rem] text-[#ADA8C3]">
                          {features.join(" ")}
                        </p>
                      )}
                    </>
                  );
                })()}

                <ul className="flex items-center justify-between">
                  {subscriptionIcons.map((Icon, index) => (
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
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative h-[20rem] bg-[#0E0C15] rounded-xl overflow-hidden md:h-[25rem]">
                <Image
                  src={item.image_2}
                  className="w-full h-full object-cover"
                  width={520}
                  height={400}
                  alt="compony-3"
                />
              </div>
            </div>
          </div>

          <Gradient />
        </div>
      </div>
    </Section>
  );
}

export default Categories;
