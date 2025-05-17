import Image from "next/image";
import Link from "next/link";
import check2 from "@/public/check-02.svg";

function ProductCard({ item }) {
  const isOutlet = item.status === "outlet";

  return (
    <Link href={`/sub`}>
      <div className="group relative flex flex-col hover:scale-[1.02] transition-all duration-300">
        {/* Image Section - Now behind the border */}
        <div className="relative aspect-square mb-0 scale-75 translate-y-[28px] -z-10">
          <Image
            className="w-full h-full object-cover rounded-4xl"
            src={item.imageUrl}
            width={200}
            height={200}
            alt={item.title}
          />
        </div>

        {/* Card Section */}
        <div
          className={`relative p-0.25 rounded-t-2xl rounded-b-lg ${
            item.colorful ? "bg-conic-gradient" : "bg-[#252134]"
          }`}
        >
          {/* Outlet Badge */}
          {isOutlet && (
            <div className="absolute -top-3 right-4 flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-900 to-purple-900 rounded-full text-white shadow-lg transform transition-transform group-hover:scale-110">
              <Image
                className="mr-1.5"
                src={check2}
                width={12}
                height={12}
                alt="check"
              />
              <div className="font-grotesk font-bold text-xs uppercase tracking-wider">
                {item.status}
              </div>
            </div>
          )}

          <div className="p-4 bg-[#0E0C15] rounded-t-2xl flex flex-col min-h-[140px]">
            <h4 className="text-xl leading-snug mb-1 font-bold">
              {item.title}
            </h4>
            <p className="font-light text-xs text-[#757185] mb-4">
              {item.text}
            </p>

            {/* Pricing Section */}
            {item.price && (
              <div className="mt-auto flex justify-center">
                <div className="px-4 py-1.5 rounded-t-md border border-[#ffffff22] bg-[#1a1824]/50 backdrop-blur-md">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-[#FFFF]/80 drop-shadow-glow">
                      {item.price}
                    </span>
                    {item.oldPrice && (
                      <span className="text-xs text-[#757185] line-through">
                        {item.oldPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
