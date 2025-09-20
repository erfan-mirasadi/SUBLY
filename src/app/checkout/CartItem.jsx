import { useState } from "react";
import Image from "next/image";
import {
  FiInfo,
  FiChevronDown,
  FiChevronUp,
  FiUser,
  FiLock,
  FiEdit3,
} from "react-icons/fi";
import { toPersianNumbers } from "@/src/lib/persianNumbers";

export default function CartItem({
  item,
  totalItemsCount,
  onAccountInfoChange,
}) {
  const plan = item.plan;
  const product = plan.product_entry.product;
  const productInfo = plan.product_entry.info;
  const needLogin = plan.product_entry.need_login;
  const itemTotal = (plan.price - (plan.discount_price || 0)) * item.quantity;

  // Auto open product info if cart has 2 or fewer items
  const [isInfoOpen, setIsInfoOpen] = useState(totalItemsCount <= 2);

  // Store login account info
  const [accountInfo, setAccountInfo] = useState({
    username: "",
    password: "",
    description: "",
  });

  // Handle account info field changes
  const handleAccountInfoChange = (field, value) => {
    const newAccountInfo = { ...accountInfo, [field]: value };
    setAccountInfo(newAccountInfo);
    // Send to parent component
    onAccountInfoChange?.(item.id, newAccountInfo);
  };

  return (
    <div
      style={{ direction: "rtl" }}
      className="bg-gradient-to-r from-black/50 to-gray-900/40 border border-gray-600/50 rounded-md p-6 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="relative overflow-hidden rounded-xlp-1">
            <Image
              src={product.image_small_url}
              alt={product.title}
              width={80}
              height={80}
              className="w-20 h-20 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="text-white font-vazirmatn font-bold text-xl mb-1">
              {product.title}
            </h3>
            <p className="text-gray-400 font-vazirmatn text-sm">
              پلن: {plan.product_entry.model} • مدت: {plan.title} ماهه
            </p>
          </div>

          {/* Price and Quantity */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-green-400 font-vazirmatn font-bold text-lg">
                {toPersianNumbers(
                  (plan.price - (plan.discount_price || 0)).toLocaleString()
                )}{" "}
                تومان
              </span>
              {plan.discount_price > 0 && (
                <span className="text-gray-500 line-through font-vazirmatn text-sm">
                  {toPersianNumbers(plan.price.toLocaleString())} تومان
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 font-vazirmatn text-sm">
                تعداد:
              </span>
              <span className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full font-vazirmatn text-sm font-bold">
                {toPersianNumbers(item.quantity.toString())}
              </span>
            </div>
          </div>
        </div>

        {/* Total Price */}
        <div className="flex-shrink-0 text-right">
          <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl px-4 py-3">
            <p className="text-green-400 font-vazirmatn font-bold text-lg">
              {toPersianNumbers(itemTotal.toLocaleString())}
            </p>
            <p className="text-green-300/70 font-vazirmatn text-xs">تومان</p>
          </div>
        </div>
      </div>

      {/* Product Info Section */}
      {productInfo && (
        <div className="mt-4 border-t border-gray-600/30 pt-4">
          <div
            className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-gray-700/30 transition-colors duration-200"
            onClick={() => setIsInfoOpen(!isInfoOpen)}
          >
            <div className="flex items-center gap-2">
              <FiInfo className="text-blue-400 text-sm" />
              <span className="text-blue-300 font-vazirmatn text-sm font-semibold">
                اطلاعات محصول
              </span>
            </div>
            {isInfoOpen ? (
              <FiChevronUp className="text-blue-400 text-sm" />
            ) : (
              <FiChevronDown className="text-gray-400 text-sm" />
            )}
          </div>

          {/* Info Content */}
          {isInfoOpen && (
            <div className="mt-3 p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg">
              {(() => {
                // Split text into lines like ProductInfo
                const lines = productInfo
                  .split("\n")
                  .map((l) => l.trim())
                  .filter((l) => l.length > 0);

                const firstLine = lines.length > 0 ? lines[0] : "";
                const infoList = lines.length > 1 ? lines.slice(1) : [];

                return (
                  <div>
                    {/* First line (main title) */}
                    {firstLine && (
                      <div className="mb-3">
                        <p className="text-gray-200 font-vazirmatn font-medium text-sm leading-relaxed">
                          {firstLine}
                        </p>
                      </div>
                    )}

                    {/* Rest of lines (list) */}
                    {infoList.length > 0 && (
                      <div className="space-y-2">
                        {infoList.map((line, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                            <p className="text-gray-300 font-vazirmatn text-xs leading-relaxed">
                              {line}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* Account Info Section - only show if need_login is true */}
      {needLogin && (
        <div className="mt-4 border-t border-orange-500/30 pt-4">
          {/* Header - always visible, not clickable */}
          <div className="p-3 bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-500/40 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <FiUser className="text-orange-400 text-lg" />
              <span className="text-orange-300 font-vazirmatn font-semibold">
                اطلاعات ورود به حساب
              </span>
              <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full font-vazirmatn">
                اختیاری
              </span>
            </div>{" "}
            {/* Form Fields */}
            <div className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-gray-300 font-vazirmatn text-sm mb-2">
                  <FiUser className="inline ml-2" />
                  نام کاربری
                </label>
                <input
                  type="text"
                  value={accountInfo.username}
                  onChange={(e) =>
                    handleAccountInfoChange("username", e.target.value)
                  }
                  placeholder="نام کاربری خود را وارد کنید"
                  className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-lg text-white font-vazirmatn text-sm focus:border-orange-500 focus:outline-none transition-colors duration-200"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-300 font-vazirmatn text-sm mb-2">
                  <FiLock className="inline ml-2" />
                  رمز عبور
                </label>
                <input
                  type="password"
                  value={accountInfo.password}
                  onChange={(e) =>
                    handleAccountInfoChange("password", e.target.value)
                  }
                  placeholder="رمز عبور خود را وارد کنید"
                  className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-lg text-white font-vazirmatn text-sm focus:border-orange-500 focus:outline-none transition-colors duration-200"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-300 font-vazirmatn text-sm mb-2">
                  <FiEdit3 className="inline ml-2" />
                  توضیحات اضافی
                </label>
                <textarea
                  value={accountInfo.description}
                  onChange={(e) =>
                    handleAccountInfoChange("description", e.target.value)
                  }
                  placeholder="توضیحات یا درخواست ویژه خود را بنویسید..."
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-lg text-white font-vazirmatn text-sm focus:border-orange-500 focus:outline-none transition-colors duration-200 resize-none"
                />
              </div>

              {/* Help Text */}
              <div className="mt-3 p-2 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                <p className="text-yellow-300 font-vazirmatn text-xs">
                  💡 این اطلاعات برای راه‌اندازی حساب شما در این سرویس استفاده
                  خواهد شد
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
