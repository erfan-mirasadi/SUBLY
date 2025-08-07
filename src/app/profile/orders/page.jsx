"use client";
import { useState } from "react";
import { useGetCurrentUser } from "@/src/hooks/query/user";
import { useUserOrders } from "@/src/hooks/query/order";
import Spinner from "@/src/components/ui/Spinner";
import Image from "next/image";
import Link from "next/link";
import {
  FaBox,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp,
  FaCheck,
  FaClock,
  FaTimes,
  FaShippingFast,
} from "react-icons/fa";
import { toPersianNumbers } from "@/src/lib/persianNumbers";

export default function OrdersPage() {
  const { data: user } = useGetCurrentUser();
  const { data: orders, isPending, error } = useUserOrders(user?.id);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-emerald-100 bg-gradient-to-r from-emerald-500/30 to-green-500/30 border border-emerald-400/50";
      case "pending":
        return "text-amber-100 bg-gradient-to-r from-amber-500/30 to-yellow-500/30 border border-amber-400/50";
      case "cancelled":
        return "text-red-100 bg-gradient-to-r from-red-500/30 to-rose-500/30 border border-red-400/50";
      case "processing":
        return "text-blue-100 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 border border-blue-400/50";
      default:
        return "text-gray-100 bg-gradient-to-r from-gray-500/30 to-slate-500/30 border border-gray-400/50";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <FaCheck className="w-4 h-4" />;
      case "pending":
        return <FaClock className="w-4 h-4" />;
      case "cancelled":
        return <FaTimes className="w-4 h-4" />;
      case "processing":
        return <FaShippingFast className="w-4 h-4" />;
      default:
        return <FaClock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "تکمیل شده";
      case "pending":
        return "در انتظار پرداخت";
      case "cancelled":
        return "لغو شده";
      case "processing":
        return "در حال پردازش";
      default:
        return "نامشخص";
    }
  };

  if (isPending) {
    return (
      <div className="fade-up flex justify-center items-center w-full mt-14">
        <Spinner size={75} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="fade-up flex justify-center items-center w-full mt-14 text-red-400">
        خطا در بارگذاری سفارشات: {error.message}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="fade-up flex flex-col items-center justify-center w-full mt-14">
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-full p-8 mb-6 border border-gray-700/30">
          <FaBox className="w-16 h-16 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-[#f5f5f5] mb-2 font-vazirmatn">
          هیچ سفارشی یافت نشد
        </h3>
        <p className="text-[#ADA8C3] font-vazirmatn text-center">
          شما هنوز هیچ سفارشی ثبت نکرده‌اید
        </p>
      </div>
    );
  }

  return (
    <div className="fade-up w-full my-8 px-3">
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-[#18162A]/80 border border-[#252134] rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:border-[#DD734F]/30"
          >
            {/* Order Header */}
            <div
              className="p-6 cursor-pointer"
              onClick={() => toggleExpand(order.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-r from-[#DD734F] to-[#B9AEDF] rounded-full p-3">
                    <FaBox className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#f5f5f5] font-vazirmatn">
                      سفارش #{toPersianNumbers(order.id)}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-[#ADA8C3] w-4 h-4" />
                        <span className="text-[#ADA8C3] font-vazirmatn text-sm">
                          {new Date(order.created_at).toLocaleDateString(
                            "fa-IR"
                          )}
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-2 px-3 py-1 rounded-full select-none ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        <span className="font-vazirmatn text-xs font-medium">
                          {getStatusText(order.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-left">
                    <div className="text-[#f5f5f5] font-bold font-vazirmatn select-none">
                      {toPersianNumbers(order.total_price?.toLocaleString())}{" "}
                      تومان
                    </div>
                    <div className="text-[#ADA8C3] font-vazirmatn text-sm select-none">
                      {toPersianNumbers(order.order_items?.length || 0)} آیتم
                    </div>
                  </div>
                  <div className="text-[#ADA8C3] transition-transform duration-300">
                    {expandedOrderId === order.id ? (
                      <FaChevronUp className="w-5 h-5" />
                    ) : (
                      <FaChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Order Items */}
            {expandedOrderId === order.id && (
              <div className="border-t border-[#252134] bg-[#0E0C15]/40">
                <div className="p-6">
                  <h4 className="text-md font-bold text-[#f5f5f5] mb-4 font-vazirmatn select-none">
                    جزئیات سفارش
                  </h4>
                  <div className="space-y-3">
                    {order.order_items?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-[#18162A]/60 border border-[#252134]/50 rounded-xl hover:border-[#DD734F]/30 transition-all duration-300"
                      >
                        <div className="flex items-center gap-4">
                          {/* Product Image */}
                          <Link
                            href={`/products/${item.plan?.product_entry?.product?.slug}`}
                            className="relative w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-[#DD734F]/20 to-[#B9AEDF]/20 border border-[#252134]/50 hover:border-[#DD734F]/50 transition-all duration-300 cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {item.plan?.product_entry?.product
                              ?.image_small_url ? (
                              <Image
                                src={
                                  item.plan.product_entry.product
                                    .image_small_url
                                }
                                alt={item.plan?.product_entry?.product?.title}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover hover:scale-120 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <FaBox className="w-6 h-6 text-[#ADA8C3]" />
                              </div>
                            )}
                          </Link>

                          {/* Quantity Badge - Modern Minimal Style */}
                          <div className="flex items-center justify-center min-w-[40px] h-6 px-3 bg-[#252134]/80 border border-[#DD734F]/40 rounded-md text-[#DD734F] text-xs font-bold font-vazirmatn backdrop-blur-sm select-none">
                            {toPersianNumbers(item.quantity)} عدد
                          </div>

                          <div className="flex-1">
                            <h5 className="text-[#f5f5f5] font-bold font-vazirmatn mb-1 select-none">
                              {item.plan?.product_entry?.product?.title ||
                                "نام محصول"}
                            </h5>
                            <div className="flex items-center gap-3">
                              {/* Plan Name with Beautiful Effects */}
                              <div className="relative">
                                {/* Main Badge */}
                                <div className="flex items-center justify-center px-3 py-1 bg-gradient-to-r from-[#DD734F] via-[#E8B462] to-[#B9AEDF] rounded-full text-white text-xs font-bold shadow-lg select-none">
                                  <span className="drop-shadow-sm font-vazirmatn">
                                    {item.plan?.product_entry?.model}
                                  </span>
                                </div>
                                {/* Subtle Glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#DD734F]/40 to-[#B9AEDF]/40 rounded-full blur-md -z-10"></div>
                                {/* Shine Effect */}
                                <div className="absolute top-1 left-2 w-3 h-1 bg-white/30 rounded-full"></div>
                              </div>

                              <span className="text-[#ADA8C3]">•</span>
                              <span className="text-[#DD734F] font-vazirmatn text-sm font-medium select-none">
                                {toPersianNumbers(item.plan.title)} ماهه
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-left">
                          <div className="text-[#f5f5f5] font-bold font-vazirmatn select-none">
                            {toPersianNumbers(
                              item.total_price?.toLocaleString()
                            )}{" "}
                            تومان
                          </div>
                          <div className="text-[#ADA8C3] font-vazirmatn text-sm select-none">
                            {toPersianNumbers(
                              item.unit_price?.toLocaleString()
                            )}{" "}
                            × {toPersianNumbers(item.quantity)}
                          </div>
                          {item.discount_price > 0 && (
                            <div className="text-red-400 font-vazirmatn text-xs select-none">
                              تخفیف:{" "}
                              {toPersianNumbers(
                                (
                                  item.discount_price * item.quantity
                                )?.toLocaleString()
                              )}{" "}
                              تومان
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="mt-6 pt-4 border-t border-[#252134]/50">
                    <div className="space-y-2">
                      {/* Subtotal */}
                      <div className="flex justify-between items-center">
                        <span className="text-[#ADA8C3] font-vazirmatn select-none">
                          جمع خرید:
                        </span>
                        <span className="text-[#f5f5f5] font-vazirmatn select-none">
                          {toPersianNumbers(order.unit_price?.toLocaleString())}{" "}
                          تومان
                        </span>
                      </div>

                      {/* Discount */}
                      {order.discount_price > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-red-400 font-vazirmatn select-none">
                            جمع تخفیف:
                          </span>
                          <span className="text-red-400 font-vazirmatn select-none">
                            -
                            {toPersianNumbers(
                              order.discount_price?.toLocaleString()
                            )}{" "}
                            تومان
                          </span>
                        </div>
                      )}

                      {/* Total */}
                      <div className="flex justify-between items-center pt-2 border-t border-[#252134]/30">
                        <span className="text-[#f5f5f5] font-vazirmatn font-bold select-none">
                          مبلغ پرداختی:
                        </span>
                        <span className="text-[#f5f5f5] font-bold text-lg font-vazirmatn select-none">
                          {toPersianNumbers(
                            order.total_price?.toLocaleString()
                          )}{" "}
                          تومان
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
