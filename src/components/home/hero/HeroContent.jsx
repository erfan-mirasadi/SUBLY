import Image from "next/image";
import Link from "next/link";

export default function HeroContent() {
  return (
    <div className="relative z-[1] max-w-[992px] mx-auto text-center mb-[62px] md:mb-20 lg:mb-[100px]">
      <h1 className="text-6xl mb-6">
        Explore the Possibilities <br />
        new World with{" "}
        <span className="inline-block relative">
          SUBLY
          <Image
            src="/hero/curve.png"
            alt="curve"
            width={624}
            height={28}
            className="absolute top-full left-0 w-full"
          />
        </span>
      </h1>
      <p className="my-9 max-w-4xl mx-auto text-[#CAC6DD] lg:mb-8">
        Unleash the power of AI within SUBLY Upgrade your productivity with
        SUBLY, the open wold-wide digital goods.
      </p>
      <Link href={"/products"}>
        <button className="px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-opacity-90 transition-all">
          Get Started
        </button>
      </Link>
    </div>
  );
}
