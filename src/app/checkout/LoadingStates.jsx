import { BsCart3 } from "react-icons/bs";
import Button from "@/src/components/Button";
import Spinner from "@/src/components/ui/Spinner";

export function UserLoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-gray-700 rounded-3xl p-12 shadow-2xl backdrop-blur-sm shadow-gray-100/15 max-w-md w-full">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-6 shadow-lg shadow-blue-500/30">
            <Spinner size={30} />
          </div>
          <h2 className="text-xl font-vazirmatn text-white mb-3 font-semibold">
            در حال بررسی احراز هویت
          </h2>
          <p className="text-gray-300 font-vazirmatn text-sm">
            لطفاً کمی صبر کنید...
          </p>
          <div className="mt-6 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CartLoadingState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-gray-700 rounded-3xl p-12 shadow-2xl backdrop-blur-sm shadow-gray-100/15 max-w-md w-full">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-6 shadow-lg shadow-green-500/30">
            <Spinner size={30} />
          </div>
          <h2 className="text-xl font-vazirmatn text-white mb-3 font-semibold">
            در حال بارگذاری سبد خرید
          </h2>
          <p className="text-gray-300 font-vazirmatn text-sm">
            آیتم‌های شما در حال بارگذاری هستند...
          </p>
          <div className="mt-6 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-green-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EmptyCartState({ onGoToProducts }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-gray-700 rounded-3xl p-12 shadow-2xl backdrop-blur-sm shadow-gray-100/15 max-w-lg w-full">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mb-6 shadow-lg shadow-orange-500/30">
            <BsCart3 className="text-3xl text-white" />
          </div>
          <h2 className="text-2xl font-vazirmatn text-white mb-3 font-semibold">
            سبد خرید خالی است
          </h2>
          <p className="text-gray-300 font-vazirmatn mb-8 text-base">
            هنوز محصولی به سبد خرید خود اضافه نکرده‌اید
            <br />
            برای شروع خرید به صفحه محصولات بروید
          </p>
          <Button onClick={onGoToProducts}>🛍️ مشاهده محصولات</Button>

          {/* Decorative elements */}
          <div className="flex justify-center mt-8 space-x-2">
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
