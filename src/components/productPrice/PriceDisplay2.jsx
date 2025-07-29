// src/app/products/[slug]/components/PriceDisplay2.jsx
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamic import CountUp for client-side only************
const CountUp = dynamic(() => import("react-countup"), {
  ssr: false,
  loading: () => null,
});

export default function PriceDisplay2({ prevPrice, finalPrice }) {
  const [isClient, setIsClient] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && prevPrice !== null && prevPrice !== finalPrice) {
      setShouldAnimate(true);
      // Reset animation flag after animation completes
      const timer = setTimeout(() => setShouldAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [finalPrice, prevPrice, isClient]);

  // Calculate integer and decimal parts
  let intPart = finalPrice !== null ? Math.trunc(finalPrice) : null;
  let decimalPart = finalPrice !== null ? Math.abs(finalPrice - intPart) : null;
  let hasDecimal = decimalPart && decimalPart > 0.00001;
  let decimalStr = hasDecimal
    ? decimalPart.toFixed(10).replace(/^0\./, ",").replace(/0+$/, "")
    : "";

  // Previous price parts for animation
  const prevIntPart = prevPrice !== null ? Math.trunc(prevPrice) : intPart;
  const prevDecimalPart =
    prevPrice !== null ? Math.abs(prevPrice - prevIntPart) : decimalPart;

  return (
    <div className="flex items-end">
      <div className="text-[2rem] leading-normal md:text-[2.5rem]">$</div>
      <div className="text-[5.5rem] leading-none font-bold flex items-end">
        {isClient && shouldAnimate ? (
          <CountUp
            start={prevIntPart}
            end={intPart}
            duration={0.4}
            useEasing={false}
            preserveValue
          />
        ) : (
          <span suppressHydrationWarning>{intPart}</span>
        )}

        {hasDecimal && (
          <span
            className="ml-1 text-xs md:text-sm"
            style={{ fontSize: "0.5em" }}
          >
            {isClient && shouldAnimate && prevDecimalPart !== decimalPart ? (
              <CountUp
                start={parseFloat(prevDecimalPart?.toFixed(10) || "0")}
                end={parseFloat(decimalPart.toFixed(10))}
                duration={0.4}
                useEasing={false}
                preserveValue
                formattingFn={(v) =>
                  v > 0
                    ? "," + v.toString().split(".")[1]?.replace(/0+$/, "")
                    : ""
                }
              />
            ) : (
              <span suppressHydrationWarning>{decimalStr}</span>
            )}
          </span>
        )}
      </div>
    </div>
  );
}
