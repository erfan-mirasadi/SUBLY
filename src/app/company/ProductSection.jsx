//ASSETS

import check2 from "@/public/check-02.svg";
import grid from "@/public/grid.png";
import TagLine from "@/src/components/ui/TagLine";
import Heading from "@/src/components/ui/Heading";
//NEXT
import Image from "next/image";
import Gradient from "@/src/components/ui/Gradient";
import Link from "next/link";
import { toPersianNumbers } from "@/src/lib/persianNumbers";
//COMPONENTS
function ProductSection({ item }) {
  return (
    <div className=" mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem] md:pb-10 ">
      <Heading
        tag="Ready to get started"
        title="What APPLE has in their pocket"
      />

      <div className="relative grid gap-6 md:grid-cols-2 md:gap-4 md:pb-[7rem]">
        {item.map((item) => {
          // Check if any product plan is available
          const hasAvailablePlans =
            item.product_entry?.some((entry) =>
              entry.product_plans?.some((plan) => plan.is_available !== false)
            ) || false;

          // --- ProductCard style price logic ---
          let allPlans =
            item.product_entry?.flatMap(
              (entry) =>
                entry.product_plans?.map((plan) => {
                  let discounted =
                    plan.state === "outlet" && plan.discount_price;
                  return {
                    ...plan,
                    model: entry.model,
                    displayPrice: discounted
                      ? plan.price - plan.discount_price
                      : plan.price,
                    oldPrice: discounted ? plan.price : null,
                    isOutlet: discounted,
                  };
                }) || []
            ) || [];

          // Find the plan with the lowest display price
          let lowestPlan =
            allPlans.length > 0
              ? allPlans.reduce(
                  (min, plan) =>
                    plan.displayPrice < min.displayPrice ? plan : min,
                  allPlans[0]
                )
              : null;

          let price = lowestPlan ? lowestPlan.displayPrice : null;
          let oldPrice = lowestPlan ? lowestPlan.oldPrice : null;
          let isOutlet = lowestPlan ? lowestPlan.isOutlet : false;
          let colorful = isOutlet;

          const text = item.caption || "";
          const imageUrl = item.image_small_url;
          const title = item.title || "";

          return (
            <Link
              href={`/products/${item.slug}`}
              className={
                `cursor-pointer md:flex even:md:translate-y-[7rem] p-0.25 rounded-[2.5rem] ` +
                (colorful ? "bg-conic-gradient" : "bg-[#252134]")
              }
              key={item.id}
            >
              <div className="relative p-8 bg-[#0E0C15] rounded-[2.4375rem] overflow-hidden xl:p-15">
                <div className="absolute top-0 left-0 max-w-full">
                  <Image
                    className="w-full"
                    src={grid}
                    width={550}
                    height={550}
                    alt="Grid"
                  />
                </div>
                <div className="relative z-1">
                  <div className="flex items-center justify-between max-w-[27rem] mb-8 md:mb-20">
                    <TagLine>{item.type}</TagLine>
                    {isOutlet && (
                      <div className="flex items-center px-4 py-1 bg-[#FFFF] rounded text-[#0E0C15]">
                        <Image
                          className="mr-2.5"
                          src={check2}
                          width={16}
                          height={16}
                          alt="check"
                        />
                        <div className="font-grotesk font-light text-xs tracking-tagline uppercase">
                          {item.state} با تخفیف
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-10 -my-10 -mx-15">
                    <Image
                      className="w-full"
                      src={imageUrl}
                      width={628}
                      height={426}
                      alt={title}
                    />
                  </div>

                  <h4 className="text-[2rem] leading-normal mb-4">{title}</h4>
                  <p className="font-light text-[0.875rem] leading-6 md:text-base text-[#757185] mb-6">
                    {text}
                  </p>

                  {/* 🛒 Pricing Section */}
                  <div className="relative mt-6 flex flex-col items-start">
                    {!hasAvailablePlans ? (
                      <div className="px-4 py-2 rounded-xl border border-red-500/30 bg-red-500/10 backdrop-blur-md">
                        <span className="text-sm font-medium text-red-500">
                          ناموجود
                        </span>
                      </div>
                    ) : price ? (
                      <div className="px-4 py-2 rounded-xl border border-[#ffffff22] bg-[#1a1824]/50 backdrop-blur-md">
                        <div className="flex items-baseline gap-2">
                          {/* New Price */}
                          <span className="text-[1.5rem] font-bold text-[#FFFF]/80 drop-shadow-glow font-vazirmatn">
                            {toPersianNumbers(price?.toLocaleString() || "0")}{" "}
                            تومان
                          </span>

                          {/* Old Price if exists */}
                          {oldPrice && (
                            <span className="text-sm text-[#757185] line-through font-vazirmatn">
                              {toPersianNumbers(
                                oldPrice?.toLocaleString() || "0"
                              )}{" "}
                              تومان
                            </span>
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                <Gradient />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ProductSection;
