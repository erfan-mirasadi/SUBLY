import CountUp from "react-countup";

export default function PriceDisplay({ prevPrice, finalPrice }) {
  let intPart = finalPrice !== null ? Math.trunc(finalPrice) : null;
  let decimalPart = finalPrice !== null ? Math.abs(finalPrice - intPart) : null;
  let hasDecimal = decimalPart && decimalPart > 0.00001;
  let decimalStr = hasDecimal
    ? decimalPart.toFixed(10).replace(/^0\./, ",").replace(/0+$/, "")
    : "";

  return (
    <div className="flex items-end">
      <div className="text-[2rem] leading-normal md:text-[2.5rem]">$</div>
      <div className="text-[5.5rem] leading-none font-bold flex items-end">
        <CountUp
          start={Math.trunc(prevPrice)}
          end={intPart}
          duration={0.4}
          useEasing={false}
          preserveValue
          formattingFn={(v) => <span>{v}</span>}
        />
        {hasDecimal && (
          <span
            className="ml-1 text-xs md:text-sm"
            style={{ fontSize: "0.5em" }}
          >
            <CountUp
              start={parseFloat(
                (prevPrice - Math.trunc(prevPrice)).toFixed(10)
              )}
              end={parseFloat(decimalPart.toFixed(10))}
              duration={0.4}
              useEasing={false}
              preserveValue
              formattingFn={(v) =>
                v > 0
                  ? "," + v.toString().split(".")[1]?.replace(/0+$/, "")
                  : null
              }
            />
          </span>
        )}
      </div>
    </div>
  );
}
