"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  FiCreditCard,
  FiShoppingBag,
  FiUser,
  FiCalendar,
  FiCheck,
} from "react-icons/fi";
import { BsCart3 } from "react-icons/bs";
import { useGetCurrentUser } from "@/src/hooks/query/user";
import { useCreateOrder } from "@/src/hooks/mutate/order";
import { fetchCartWithDetails } from "@/src/services/ApiOrders";
import Button from "@/src/components/Button";
import Spinner from "@/src/components/ui/Spinner";
import Image from "next/image";
import { toPersianNumbers } from "@/src/lib/persianNumbers";

function OrderPage() {
  const router = useRouter();
  const { data: user, isLoading: userLoading } = useGetCurrentUser();
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!userLoading && !user) {
      router.push(`/login?returnUrl=${encodeURIComponent("/checkout")}`);
    }
  }, [user, userLoading, router]);

  // Fetch cart details
  const {
    data: cartItems,
    isLoading: cartLoading,
    error: cartError,
  } = useQuery({
    queryKey: ["cart", user?.id],
    queryFn: () => fetchCartWithDetails(user.id),
    enabled: !!user?.id,
  });

  const createOrderMutation = useCreateOrder(user?.id);

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Spinner size={40} />
          <p className="text-white font-vazirmatn mt-4">
            در حال بررسی احراز هویت...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <Spinner size={40} />
      </div>
    );
  }

  // Calculate totals
  const calculations = cartItems?.reduce(
    (acc, item) => {
      const plan = item.plan;
      const quantity = item.quantity;
      const unitPrice = plan.price;
      const discountPrice = plan.discount_price || 0;
      const itemTotal = (unitPrice - discountPrice) * quantity;
      const itemDiscount = discountPrice * quantity;

      return {
        totalPrice: acc.totalPrice + itemTotal,
        totalDiscount: acc.totalDiscount + itemDiscount,
        originalPrice: acc.originalPrice + unitPrice * quantity,
      };
    },
    { totalPrice: 0, totalDiscount: 0, originalPrice: 0 }
  ) || { totalPrice: 0, totalDiscount: 0, originalPrice: 0 };

  const handleCreateOrder = async () => {
    if (!cartItems?.length) {
      alert("سبد خرید خالی است");
      return;
    }

    setIsCreatingOrder(true);
    try {
      const order = await createOrderMutation.mutateAsync();
      alert(`سفارش با موفقیت ثبت شد! شناسه سفارش: ${order.id}`);
      // Redirect to payment gateway or success page
      router.push(`/order/success/${order.id}`);
    } catch (error) {
      alert(`خطا در ثبت سفارش: ${error.message}`);
    } finally {
      setIsCreatingOrder(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <Spinner size={40} />
      </div>
    );
  }

  if (cartLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Spinner size={40} />
          <p className="text-white font-vazirmatn mt-4">
            در حال بارگذاری سبد خرید...
          </p>
        </div>
      </div>
    );
  }

  if (cartError || !cartItems?.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <BsCart3 className="text-6xl text-gray-500 mx-auto mb-4" />
          <h2 className="text-2xl font-vazirmatn text-white mb-2">
            سبد خرید خالی است
          </h2>
          <p className="text-gray-400 font-vazirmatn mb-6">
            برای ادامه خرید به صفحه محصولات بروید
          </p>
          <Button
            onClick={() => router.push("/products")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            مشاهده محصولات
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br shadow-black shadow-2xl from-gray-900 via-black to-gray-900 py-30 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-vazirmatn bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
            تسویه حساب
          </h1>
          <p className="text-gray-400 font-vazirmatn text-lg">
            بررسی نهایی سفارش شما
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-gray-700 rounded-md p-6 shadow-2xl backdrop-blur-sm shadow-gray-100/15">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-white font-vazirmatn">
                  محصولات سبد خرید
                </h2>
                <FiShoppingBag className="text-2xl text-blue-400 mx-4" />
              </div>

              <div className="space-y-6">
                {cartItems.map((item) => {
                  const plan = item.plan;
                  const product = plan.product_entry.product;
                  const itemTotal =
                    (plan.price - (plan.discount_price || 0)) * item.quantity;

                  return (
                    <div
                      key={item.id}
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
                              پلن: {plan.product_entry.model} • مدت:{" "}
                              {plan.title} ماهه
                            </p>
                          </div>

                          {/* Price and Quantity */}
                          <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-3">
                              <span className="text-green-400 font-vazirmatn font-bold text-lg">
                                {toPersianNumbers(
                                  (
                                    plan.price - (plan.discount_price || 0)
                                  ).toLocaleString()
                                )}{" "}
                                تومان
                              </span>
                              {plan.discount_price > 0 && (
                                <span className="text-gray-500 line-through font-vazirmatn text-sm">
                                  {toPersianNumbers(
                                    plan.price.toLocaleString()
                                  )}{" "}
                                  تومان
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
                              {itemTotal.toLocaleString()}
                            </p>
                            <p className="text-green-300/70 font-vazirmatn text-xs">
                              تومان
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
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
                    {toPersianNumbers(
                      calculations.originalPrice.toLocaleString()
                    )}{" "}
                    تومان
                  </span>
                  <span className="text-gray-400 font-vazirmatn">
                    {" "}
                    : قیمت کل
                  </span>
                </div>

                {calculations.totalDiscount > 0 && (
                  <div className="flex justify-between items-center py-3 border-b border-gray-600">
                    <span className="text-red-400 font-vazirmatn">
                      -
                      {toPersianNumbers(
                        calculations.totalDiscount.toLocaleString()
                      )}{" "}
                      تومان
                    </span>
                    <span className="text-gray-400 font-vazirmatn">
                      : تخفیف
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center py-3 border-b border-gray-600">
                  <span className="text-white font-vazirmatn">
                    محصول {toPersianNumbers(cartItems.length.toString())}
                  </span>
                  <span className="text-gray-400 font-vazirmatn">
                    : تعداد آیتم‌ها
                  </span>
                </div>

                <div className="flex justify-between items-center py-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg px-4">
                  <span className="text-green-400 font-vazirmatn font-bold text-xl">
                    {toPersianNumbers(calculations.totalPrice.toLocaleString())}{" "}
                    تومان
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
                <p className="text-white font-vazirmatn">
                  {user.name || user.phone}
                </p>
                <div className="flex items-center mt-2">
                  <FiCalendar className="text-blue-400 mr-2" />
                  <span className="text-gray-400 font-vazirmatn text-sm">
                    {new Date().toLocaleDateString("fa-IR")}
                  </span>
                </div>
              </div>

              {/* Payment Button */}
              <Button
                onClick={handleCreateOrder}
                disabled={isCreatingOrder || createOrderMutation.isPending}
              >
                {isCreatingOrder || createOrderMutation.isPending ? (
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
                با کلیک بر روی دکمه پرداخت، شما با قوانین و مقررات موافقت
                می‌کنید
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
