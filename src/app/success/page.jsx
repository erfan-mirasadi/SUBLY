"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useGetCurrentUser } from "@/src/hooks/query/user";
import {
  FiCheck,
  FiUser,
  FiCalendar,
  FiCreditCard,
  FiPhone,
  FiCopy,
} from "react-icons/fi";
import { BsCartCheck } from "react-icons/bs";
import { FaTelegram } from "react-icons/fa";
import { toPersianNumbers } from "@/src/lib/persianNumbers";
import Button from "@/src/components/Button";
import Spinner from "@/src/components/ui/Spinner";
import supabase from "@/src/services/supabase";
import Section from "@/src/components/section/Section";

export default function SuccessPage() {
  const router = useRouter();
  const { data: user, isLoading: userLoading } = useGetCurrentUser();
  const [mounted, setMounted] = useState(false);
  const [hasValidAccess, setHasValidAccess] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [orderId, setOrderId] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // Fetch order details only if we have valid access and orderId
  const {
    data: order,
    isLoading: orderLoading,
    error: orderError,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("order")
        .select(
          `
          *,
          order_items (
            *,
            plan:plan_id (
              *,
              product_entry (
                *,
                product (*)
              )
            )
          )
        `
        )
        .eq("id", orderId)
        .eq("user_id", user?.id) // Security: only user's own orders
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!orderId && !!user?.id && hasValidAccess,
  });

  useEffect(() => {
    setMounted(true);

    // Check if user has valid access to success page
    const checkAccess = () => {
      const orderSuccess = sessionStorage.getItem("orderSuccess");
      const orderTimestamp = sessionStorage.getItem("orderTimestamp");
      const storedOrderId = sessionStorage.getItem("lastOrderId");

      if (orderSuccess === "true" && orderTimestamp && storedOrderId) {
        const timestamp = parseInt(orderTimestamp);
        const now = Date.now();
        // Allow access for 10 minutes after order
        if (now - timestamp < 10 * 60 * 1000) {
          setHasValidAccess(true);
          setOrderId(storedOrderId);
          // Clear the session storage after showing success page
          sessionStorage.removeItem("orderSuccess");
          sessionStorage.removeItem("orderTimestamp");
          sessionStorage.removeItem("lastOrderId");
        } else {
          // Expired access
          router.push("/products");
          return;
        }
      } else {
        // No valid access
        router.push("/products");
        return;
      }

      setIsChecking(false);
    };

    checkAccess();
  }, [router]);

  // Remove auto redirect - let user stay on success page as long as they want

  const copyOrderId = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  if (!mounted || isChecking) {
    return (
      <Section>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-gray-700 rounded-3xl p-12 shadow-2xl backdrop-blur-sm shadow-gray-100/15 max-w-md w-full text-center">
            <Spinner size={40} />
            <div className="text-white font-vazirmatn text-lg mt-4">
              در حال بررسی دسترسی...
            </div>
          </div>
        </div>
      </Section>
    );
  }

  if (!hasValidAccess) {
    return null; // Will be redirected
  }

  if (userLoading || orderLoading) {
    return (
      <Section>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-gray-700 rounded-3xl p-12 shadow-2xl backdrop-blur-sm shadow-gray-100/15 max-w-md w-full">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-6 shadow-lg shadow-green-500/30">
                <Spinner size={30} />
              </div>
              <h2 className="text-xl font-vazirmatn text-white mb-3 font-semibold">
                در حال بارگذاری اطلاعات سفارش
              </h2>
              <p className="text-gray-300 font-vazirmatn text-sm">
                لطفاً کمی صبر کنید...
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
      </Section>
    );
  }

  if (orderError || !order) {
    return (
      <Section>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
          <div className="bg-gradient-to-br from-red-900/20 to-red-800/20 border border-red-600/50 rounded-3xl p-8 text-center max-w-md w-full">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-vazirmatn text-white mb-4 font-semibold">
              خطا در بارگذاری سفارش
            </h2>
            <p className="text-gray-300 font-vazirmatn mb-6">
              متأسفانه نتوانستیم اطلاعات سفارش را بارگذاری کنیم
            </p>
            <Button onClick={() => router.push("/products")}>
              بازگشت به محصولات
            </Button>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full mb-6 shadow-lg shadow-green-500/30">
              <FiCheck className="text-white text-4xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-vazirmatn bg-gradient-to-r from-green-400 via-green-300 to-green-400 bg-clip-text text-transparent">
              🎉 سفارش شما با موفقیت ثبت شد!
            </h1>
            <p className="text-gray-300 font-vazirmatn text-lg">
              از خرید شما متشکریم. جزئیات سفارش در ادامه آمده است
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Info */}
              <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-gray-700 rounded-2xl p-6 shadow-2xl backdrop-blur-sm shadow-gray-100/15">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white font-vazirmatn flex items-center">
                    <BsCartCheck className="text-green-400 ml-3" />
                    اطلاعات سفارش
                  </h2>
                  <div className="flex items-center bg-green-900/30 rounded-lg px-3 py-1 border border-green-700/50">
                    <div className="w-2 h-2 bg-green-400 rounded-full ml-2"></div>
                    <span className="text-green-300 font-vazirmatn text-sm">
                      در انتظار پردازش
                    </span>
                  </div>
                </div>

                {/* Order ID */}
                <div className="bg-black/40 rounded-xl p-5 mb-6 border border-gray-600">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 font-vazirmatn text-sm mb-1">
                        شناسه سفارش
                      </p>
                      <p className="text-white font-mono text-xl font-bold">
                        #{toPersianNumbers(orderId)}
                      </p>
                    </div>
                    <button
                      onClick={copyOrderId}
                      className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/50 rounded-lg px-4 py-2 text-blue-300 transition-all hover:scale-105"
                    >
                      <FiCopy className="text-sm" />
                      {copySuccess ? "✅ کپی شد!" : "📋 کپی"}
                    </button>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4">
                  <h3 className="text-lg font-vazirmatn text-white mb-4 font-semibold">
                    📦 محصولات سفارش:
                  </h3>
                  {order.order_items?.map((item, index) => (
                    <div
                      key={index}
                      className="bg-black/30 rounded-xl p-5 border border-gray-600"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-white font-vazirmatn font-semibold mb-2 text-lg">
                            {item.plan?.product_entry?.product?.name}
                          </h4>
                          <p className="text-gray-300 font-vazirmatn text-sm mb-2">
                            📋 پلن: {item.plan?.name}
                          </p>
                          <p className="text-gray-400 font-vazirmatn text-sm mb-3">
                            🔢 تعداد:{" "}
                            {toPersianNumbers(item.quantity.toString())}
                          </p>

                          {/* Account Info if available */}
                          {(item.user_name ||
                            item.password ||
                            item.description) && (
                            <div className="mt-4 p-4 bg-blue-900/20 rounded-xl border border-blue-700/30">
                              <p className="text-blue-300 font-vazirmatn text-sm mb-3 font-semibold flex items-center">
                                🔐 اطلاعات ورود:
                              </p>
                              <div className="space-y-2">
                                {item.user_name && (
                                  <p className="text-gray-300 font-vazirmatn text-sm">
                                    👤 نام کاربری:{" "}
                                    <span className="text-white font-semibold">
                                      {item.user_name}
                                    </span>
                                  </p>
                                )}
                                {item.password && (
                                  <p className="text-gray-300 font-vazirmatn text-sm">
                                    🔑 رمز عبور:{" "}
                                    <span className="text-white font-semibold">
                                      {item.password}
                                    </span>
                                  </p>
                                )}
                                {item.description && (
                                  <p className="text-gray-300 font-vazirmatn text-sm">
                                    📝 توضیحات:{" "}
                                    <span className="text-white">
                                      {item.description}
                                    </span>
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-vazirmatn font-bold text-lg">
                            {toPersianNumbers(
                              item.total_price?.toLocaleString()
                            )}{" "}
                            تومان
                          </p>
                          {item.discount_price > 0 && (
                            <p className="text-gray-500 font-vazirmatn text-sm line-through">
                              {toPersianNumbers(
                                (
                                  item.unit_price * item.quantity
                                )?.toLocaleString()
                              )}{" "}
                              تومان
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Customer & Payment Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Customer Info */}
              <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-gray-700 rounded-2xl p-6 shadow-2xl backdrop-blur-sm shadow-gray-100/15">
                <div className="flex items-center mb-6">
                  <h3 className="text-xl font-vazirmatn text-white flex items-center font-semibold">
                    <FiUser className="text-blue-400 ml-3" />
                    اطلاعات خریدار
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                    <span className="text-gray-400 font-vazirmatn text-sm">
                      👤 نام:
                    </span>
                    <span className="text-white font-vazirmatn font-semibold">
                      {user?.name || user?.phone}
                    </span>
                  </div>

                  {user?.phone && (
                    <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                      <span className="text-gray-400 font-vazirmatn text-sm">
                        📱 شماره:
                      </span>
                      <span className="text-white font-vazirmatn font-semibold">
                        {toPersianNumbers(user.phone)}
                      </span>
                    </div>
                  )}

                  {order.telegram_info && (
                    <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                      <span className="text-gray-400 font-vazirmatn text-sm flex items-center">
                        <FaTelegram className="text-blue-400 ml-1" />
                        تلگرام:
                      </span>
                      <span className="text-white font-vazirmatn font-semibold">
                        {order.telegram_info}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                    <span className="text-gray-400 font-vazirmatn text-sm flex items-center">
                      <FiCalendar className="text-blue-400 ml-1" />
                      تاریخ:
                    </span>
                    <span className="text-white font-vazirmatn font-semibold">
                      {new Date(order.created_at).toLocaleDateString("fa-IR")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-gray-700 rounded-2xl p-6 shadow-2xl backdrop-blur-sm shadow-gray-100/15">
                <div className="flex items-center mb-6">
                  <h3 className="text-xl font-vazirmatn text-white flex items-center font-semibold">
                    <FiCreditCard className="text-green-400 ml-3" />
                    خلاصه پرداخت
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-600">
                    <span className="text-white font-vazirmatn font-semibold">
                      {toPersianNumbers(order.unit_price?.toLocaleString())}{" "}
                      تومان
                    </span>
                    <span className="text-gray-400 font-vazirmatn">
                      : قیمت کل
                    </span>
                  </div>

                  {order.discount_price > 0 && (
                    <div className="flex justify-between items-center py-3 border-b border-gray-600">
                      <span className="text-red-400 font-vazirmatn font-semibold">
                        -
                        {toPersianNumbers(
                          order.discount_price?.toLocaleString()
                        )}{" "}
                        تومان
                      </span>
                      <span className="text-gray-400 font-vazirmatn">
                        : تخفیف
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-xl px-4 border border-green-700/30">
                    <span className="text-green-400 font-vazirmatn font-bold text-xl">
                      {toPersianNumbers(order.total_price?.toLocaleString())}{" "}
                      تومان
                    </span>
                    <span className="text-white font-vazirmatn font-bold text-lg">
                      : مبلغ پرداختی
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button onClick={() => router.push("/products")}>
                  🛍️ ادامه خرید
                </Button>

                <Button onClick={() => router.push("/profile/orders")}>
                  📋 مشاهده تمام سفارشات
                </Button>
              </div>
            </div>
          </div>

          {/* Support Info */}
          <div className="mt-12 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-gray-700 rounded-2xl p-8 text-center shadow-2xl backdrop-blur-sm shadow-gray-100/15">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-vazirmatn text-white mb-3 font-semibold">
              نیاز به کمک دارید؟
            </h3>
            <p className="text-gray-300 font-vazirmatn text-base mb-6 max-w-md mx-auto">
              تیم پشتیبانی ما آماده کمک به شما در هر ساعت از شبانه‌روز می‌باشد
            </p>
            <Button onClick={() => router.push("/support")}>
              <FiPhone className="ml-2" />
              📞 تماس با پشتیبانی
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
