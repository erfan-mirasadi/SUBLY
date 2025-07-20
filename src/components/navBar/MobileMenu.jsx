import Image from "next/image";

export default function MobileMenu() {
  return (
    <div className="absolute inset-0 font-grotesk">
      {/* Background image */}
      <div className="absolute inset-0 opacity-[.03] pointer-events-none">
        <Image
          className="w-full h-full object-cover"
          src="/hero/robot.jpg"
          width={688}
          height={953}
          alt="Background"
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-[70px] left-[60px] w-3 h-3 bg-gradient-to-b from-[#DD734F] to-[#1B1B2E] rounded-full pointer-events-none"></div>
      <div className="absolute top-[200px] right-[60px] w-3 h-3 bg-gradient-to-b from-[#B9AEDF] to-[#1B1B2E] rounded-full pointer-events-none"></div>
      <div className="absolute top-[430px] left-[50px] w-6 h-6 bg-gradient-to-b from-[#88E5BE] to-[#1B1B2E] rounded-full pointer-events-none"></div>

      {/* Side lines */}
      <div className="absolute top-0 left-5 w-[1px] h-full bg-[#252134] pointer-events-none"></div>
      <div className="absolute top-0 right-5 w-[1px] h-full bg-[#252134] pointer-events-none"></div>

      {/* Rings */}
      <div className="absolute top-1/2 left-1/2 w-[835px] aspect-square border border-[#CAC6DD]/10 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-[580px] aspect-square border border-[#CAC6DD]/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-[360px] aspect-square border border-[#CAC6DD]/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Auth buttons */}
      <div className="absolute bottom-24 left-0 right-0 flex flex-col items-center space-y-7 px-16">
        <a
          href="/login"
          className="text-base text-white/70 hover:text-white transition-colors py-2"
        >
          New account
        </a>
        <a
          href="/login"
          className="text-base font-medium px-5 py-2 bg-white/50 rounded-lg text-[#1B1B2E] hover:bg-white/60 transition-colors"
        >
          Sign in
        </a>
      </div>
    </div>
  );
}
