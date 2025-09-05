import Link from "next/link";
import Button from "@/src/components/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            ۴۰۴
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-vazirmatn">
            صفحه پیدا نشد!
          </h2>
          <p className="text-gray-400 font-vazirmatn text-lg">
            متأسفانه صفحه‌ای که دنبالش هستید وجود ندارد یا منتقل شده است.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              بازگشت به صفحه اصلی
            </Button>
          </Link>

          <Link href="/products">
            <Button className="w-full bg-transparent border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white">
              مشاهده محصولات
            </Button>
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-sm text-gray-500 font-vazirmatn">
            اگر فکر می‌کنید این یک خطا است، لطفاً با{" "}
            <Link
              href="/support"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              پشتیبانی
            </Link>{" "}
            تماس بگیرید.
          </p>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "SABLY | صفحه پیدا نشد",
  description: "صفحه‌ای که دنبالش هستید پیدا نشد.",
};
