import { FaInfoCircle } from "react-icons/fa";

export default function ProductInfo({ data, plan }) {
  // پیدا کردن همه productEntry هایی که plan مطابق دارند
  const matchingProductEntries =
    data?.product_entry?.filter((entry) =>
      entry.product_plans?.some((p) => p.title === plan)
    ) || [];

  // فیلتر کردن فقط آنهایی که info دارند
  const entriesWithInfo = matchingProductEntries.filter(
    (entry) => entry.info && entry.info.trim()
  );

  if (entriesWithInfo.length === 0) {
    return null; // اگر اطلاعاتی نباشد، چیزی نمایش نده
  }

  return (
    <div className="max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem] mb-16 mt-2.5">
      {/* Title با icon */}
      <div className="flex items-center gap-3 mb-8">
        <FaInfoCircle className="text-blue-400 text-xl" />
        <h3 className="text-2xl font-bold text-white">اطلاعات تکمیلی</h3>
      </div>

      {/* نمایش اطلاعات همه entry ها */}
      <div className="space-y-16">
        {entriesWithInfo.map((entry, entryIndex) => {
          // تقسیم متن به خطوط مانند HeroSection
          const lines = entry.info
            .split("\n")
            .map((l) => l.trim())
            .filter((l) => l.length > 0);

          const firstLine = lines.length > 0 ? lines[0] : "";
          const infoList = lines.length > 1 ? lines.slice(1) : [];

          return (
            <div key={entryIndex}>
              {/* عنوان model برای هر entry */}
              <div className="mb-4">
                <h4 className="text-xl font-semibold text-blue-300 mb-3">
                  {entry.model}
                </h4>
              </div>

              {/* محتوای اطلاعات */}
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                {/* خط اول (عنوان اصلی) */}
                {firstLine && (
                  <div className="mb-4">
                    <p className="text-lg text-gray-200 font-medium leading-relaxed">
                      {firstLine}
                    </p>
                  </div>
                )}

                {/* بقیه خطوط (لیست) */}
                {infoList.length > 0 && (
                  <div className="space-y-3">
                    {infoList.map((line, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-gray-300 leading-relaxed">{line}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* جداکننده بین entry ها (به جز آخری) */}
              {entryIndex < entriesWithInfo.length - 1 && (
                <div className="mt-6 flex items-center justify-center">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
                  <div className="px-4">
                    <div className="w-1 h-1 bg-gray-500 rounded-full" />
                  </div>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* جداکننده نهایی */}
      <div className="mt-8 flex items-center justify-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
        <div className="px-4">
          <div className="w-2 h-2 bg-blue-400 rounded-full" />
        </div>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
      </div>
    </div>
  );
}
