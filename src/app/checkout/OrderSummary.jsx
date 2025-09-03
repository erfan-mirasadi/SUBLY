import {
  FiCreditCard,
  FiUser,
  FiCalendar,
  FiCheck,
  FiMessageCircle,
} from "react-icons/fi";
import { FaTelegram } from "react-icons/fa";
import { toPersianNumbers } from "@/src/lib/persianNumbers";
import Button from "@/src/components/Button";
import Spinner from "@/src/components/ui/Spinner";
import { useState, useEffect } from "react";

export default function OrderSummary({
  calculations,
  cartItems,
  user,
  isCreatingOrder,
  isPending,
  onCreateOrder,
}) {
  const [telegramInfo, setTelegramInfo] = useState("");
  const [hasUserClicked, setHasUserClicked] = useState(false);

  // Set default telegram info when user is loaded
  useEffect(() => {
    if (user && telegramInfo === "" && !hasUserClicked) {
      setTelegramInfo(user.phone || "");
    }
  }, [user, hasUserClicked, telegramInfo]);

  const handleInputFocus = () => {
    if (!hasUserClicked) {
      setTelegramInfo("");
      setHasUserClicked(true);
    }
  };

  const handleCreateOrder = () => {
    onCreateOrder(telegramInfo);
  };

  return (
    <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-gray-700 rounded-2xl p-6 sticky top-6 shadow-2xl backdrop-blur-sm shadow-gray-100/15">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl items-center text-center font-bold text-white font-vazirmatn mx-5">
          خلاصه سفارش
        </h2>
        <FiCreditCard className="text-2xl text-green-400 mr-3" />
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center py-3 border-b border-gray-600">
          <span className="text-white font-vazirmatn">
            {toPersianNumbers(calculations.originalPrice.toLocaleString())}{" "}
            تومان
          </span>
          <span className="text-gray-400 font-vazirmatn">: قیمت کل</span>
        </div>

        {calculations.totalDiscount > 0 && (
          <div className="flex justify-between items-center py-3 border-b border-gray-600">
            <span className="text-red-400 font-vazirmatn">
              -{toPersianNumbers(calculations.totalDiscount.toLocaleString())}{" "}
              تومان
            </span>
            <span className="text-gray-400 font-vazirmatn">: تخفیف</span>
          </div>
        )}

        <div className="flex justify-between items-center py-3 border-b border-gray-600">
          <span className="text-white font-vazirmatn">
            محصول {toPersianNumbers(cartItems.length.toString())}
          </span>
          <span className="text-gray-400 font-vazirmatn">: تعداد آیتم‌ها</span>
        </div>

        <div className="flex justify-between items-center py-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg px-4">
          <span className="text-green-400 font-vazirmatn font-bold text-xl">
            {toPersianNumbers(calculations.totalPrice.toLocaleString())} تومان
          </span>
          <span className="text-white font-vazirmatn font-bold text-lg">
            : مبلغ نهایی
          </span>
        </div>

        {/* Discount Code Field */}
        <div className="mt-4 p-4 bg-black/30 rounded-lg border border-gray-600">
          <label className="text-gray-400 font-vazirmatn text-sm mb-2 block">
            کد تخفیف (اختیاری)
          </label>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="کد تخفیف را وارد کنید"
              className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-lg text-white font-vazirmatn text-sm focus:border-blue-500 focus:outline-none"
            />
            <Button className="scale-90">اعمال کد تخفیف</Button>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="mb-6 p-4 bg-black/40 rounded-lg border border-gray-600">
        <div className="flex items-center mb-2">
          <span className="text-gray-400 font-vazirmatn">: خریدار</span>
          <FiUser className="text-blue-400 m-2" />
        </div>
        <p className="text-white font-vazirmatn">{user.name || user.phone}</p>
        <div className="flex items-center mt-2">
          <FiCalendar className="text-blue-400 mr-2" />
          <span className="text-gray-400 font-vazirmatn text-sm">
            {new Date().toLocaleDateString("fa-IR")}
          </span>
        </div>
      </div>

      {/* Contact Info */}
      <div className="mb-6 p-4 bg-black/40 rounded-lg border border-gray-600">
        <div className="flex items-center mb-3">
          <span className="text-gray-400 font-vazirmatn">
            : راه‌های ارتباطی با شما
          </span>
          <FiMessageCircle className="text-green-400 m-2" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <FaTelegram className="text-blue-400 text-lg flex-shrink-0" />
            <input
              type="text"
              value={telegramInfo}
              onChange={(e) => setTelegramInfo(e.target.value)}
              onFocus={handleInputFocus}
              placeholder="آیدی یا شماره تلگرام"
              className="w-full px-3 py-2 bg-gray-800/60 border border-gray-600 rounded-lg text-white placeholder:text-gray-400 font-vazirmatn text-sm focus:border-green-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-green-300 font-vazirmatn text-xs">
              برای ارسال اکانت و پیگیری سفارش استفاده می‌شود
            </span>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <Button
        onClick={handleCreateOrder}
        disabled={isCreatingOrder || isPending}
      >
        {isCreatingOrder || isPending ? (
          <div className="flex items-center justify-center">
            <Spinner size={20} />
            <span className="mr-2">در حال پردازش...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            پرداخت
            <FiCheck className="ml-4" />
          </div>
        )}
      </Button>

      <p className="text-gray-500 font-vazirmatn text-xs text-center mt-4">
        با کلیک بر روی دکمه پرداخت، شما با قوانین و مقررات موافقت می‌کنید
      </p>
    </div>
  );
}
