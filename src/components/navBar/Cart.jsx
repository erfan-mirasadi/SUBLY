"use client";
import { useEffect } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import Button from "../Button";
import Spinner from "../ui/Spinner";
import {
  useCart,
  useCartQuery,
  useAddToCartMutation,
  useUpdateCartMutation,
  useRemoveCartMutation,
} from "@/src/hooks/mutate/cart";
import Image from "next/image";
import Link from "next/link";
import { toPersianNumbers } from "@/src/lib/persianNumbers";

export default function Cart({ isCartOpen, setIsCartOpen }) {
  const {
    cart,
    addItem,
    removeItem,
    clearCart: clearLocalCart,
  } = useCart("cart-items");
  const { data: cartItems } = useCartQuery();
  const addToCartMutation = useAddToCartMutation();
  const updateCartMutation = useUpdateCartMutation();
  const removeCartMutation = useRemoveCartMutation();

  const getUserId = () =>
    typeof window !== "undefined"
      ? localStorage.getItem("sably_user_id")
      : null;

  // تشخیص اینکه کاربر لاگین هست یا نه
  const isLoggedIn = !!getUserId();

  // اگر لاگین هست فقط cartItems رو نمایش بده، وگرنه cart رو
  const displayItems = isLoggedIn ? cartItems || [] : cart;

  // Block body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  const handleIncrease = (item) => {
    const isServerItem = item.plan_id; // Server items have plan_id
    if (isServerItem) {
      const userId = getUserId();
      addToCartMutation.mutate({
        id: item.plan_id,
        user_id: userId,
        quantity: 1,
      });
    } else {
      addItem(item);
    }
  };

  const handleDecrease = (item) => {
    const isServerItem = item.plan_id;
    if (isServerItem) {
      if (item.quantity === 1) {
        removeCartMutation.mutate(item.id);
      } else {
        updateCartMutation.mutate({
          cart_item_id: item.id,
          quantity: item.quantity - 1,
        });
      }
    } else {
      removeItem(item.id);
    }
  };

  console.log({ cart, cartItems, displayItems, isLoggedIn });

  return (
    <>
      {isCartOpen && (
        <div
          className="fixed inset-0 duration-350 transition-all backdrop-brightness-80 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 right-0 w-full flex flex-col max-w-[400px] h-screen overflow-y-auto rounded-l-3xl rounded-b-none  bg-black/70 backdrop-blur-sm z-50 ${
          isCartOpen
            ? "translate-x-0 shadow-lg shadow-white/10 border-l border-white/10"
            : "translate-x-full"
        } transition-transform duration-300`}
      >
        <span className=" h-[100px] sticky flex items-center justify-end md:justify-start pr-5 md:pl-5 cursor-pointer overflow-hidden">
          <span className="rounded-full p-[2px] bg-conic-gradient">
            <IoCloseCircle
              size={30}
              onClick={() => setIsCartOpen(false)}
              className="bg-[#0E0C15]/90 rounded-full hover:bg-orange-600 transition-all duration-300 cursor-pointer hover:scale-114"
            />
          </span>
        </span>
        <div className="w-full h-full flex-1 flex flex-col items-center justify-between pb-2">
          <div className="w-full h-full mb-1 overflow-y-auto flex flex-col gap-2 px-4">
            {displayItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-6">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-full p-8 mb-6 border border-gray-700/30">
                  <BsCart3 size={80} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-vazirmatn text-white mb-2">
                  سبد خرید شما خالی است
                </h3>
                <p className="text-gray-400 text-sm font-vazirmatn leading-relaxed">
                  هنوز محصولی به سبد خرید خود اضافه نکرده‌اید
                </p>
              </div>
            ) : (
              displayItems.map((item, index) => (
                <div
                  key={item.id || `item-${index}`}
                  className="flex items-start justify-between py-4 border-b-[1px] border-b-gray-300 gap-3"
                >
                  {/* Image and Title Section */}
                  <div className="flex flex-col items-center select-none font-vazirmatn uppercase shadow-md">
                    <Image
                      src={
                        item.image ||
                        item.plan?.product_entry?.product?.image_small_url
                      }
                      alt={
                        item.title || item.plan?.product_entry?.product?.title
                      }
                      width={64}
                      height={64}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <h3 className="text-sm font-medium text-center mt-2 max-w-[80px] leading-tight">
                      {item.title || item.plan?.product_entry?.product?.title}
                    </h3>
                  </div>

                  {/* Plan and Model Section */}
                  <div className="flex flex-col mt-2 items-center select-none">
                    {(item.model || item.plan?.product_entry?.model) && (
                      <p className="text-xs text-gray-400">
                        {item.model || item.plan?.product_entry?.model}
                      </p>
                    )}
                    <div className="flex items-center gap-1 mt-11">
                      <p className="font-vazirmatn text-2xs">ماهه </p>
                      <p className="text-sm font-vazirmatn">
                        {typeof item.plan === "string"
                          ? toPersianNumbers(item.plan)
                          : toPersianNumbers(item.plan?.title || "")}
                      </p>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="flex flex-col items-center mt-5 font-vazirmatn shadow-md bg-black/10  p-2 rounded-md select-none">
                    {(item.oldPrice ||
                      (item.plan?.state === "outlet" &&
                        item.plan?.discount_price)) && (
                      <div className="flex items-center gap-1">
                        <p className="text-2xs font-vazirmatn text-gray-400">
                          تومان
                        </p>
                        <p className="text-md line-through text-gray-400">
                          {toPersianNumbers(
                            (
                              item.oldPrice || item.plan?.price
                            )?.toLocaleString() || "0"
                          )}
                        </p>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <p className="text-2xs font-vazirmatn">تومان</p>
                      <p className="text-lg font-vazirmatn">
                        {toPersianNumbers(
                          (
                            item.price ||
                            (item.plan?.state === "outlet" &&
                            item.plan?.discount_price
                              ? parseFloat(
                                  (
                                    item.plan.price - item.plan.discount_price
                                  ).toFixed(10)
                                )
                              : item.plan?.price)
                          )?.toLocaleString() || "0"
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls and Delete */}
                  <div className="flex flex-col items-center gap-2 mt-4.5">
                    <div className="flex font-vazirmatn select-none items-center bg-gray-800/60 shadow-md rounded-md px-2.5 py-2">
                      <button
                        className="text-gray-500 hover:text-gray-200 p-1 cursor-pointer transition-all duration-300 hover:scale-87"
                        onClick={() => handleDecrease(item)}
                        disabled={
                          updateCartMutation.isPending ||
                          removeCartMutation.isPending
                        }
                      >
                        {(item.quantity || 1) === 1 ? (
                          <FaTrash
                            size={16}
                            className="text-red-800 hover:scale-90 hover:text-red-600 transition-all duration-300"
                          />
                        ) : (
                          <FaMinus size={16} />
                        )}
                      </button>
                      <span className="text-sm text-white mx-2.5">
                        {updateCartMutation.isPending ||
                        removeCartMutation.isPending ||
                        addToCartMutation.isPending ? (
                          <Spinner size={25} />
                        ) : (
                          toPersianNumbers((item.quantity || 1).toString())
                        )}
                      </span>
                      <button
                        className="text-gray-300 hover:scale-110 hover:text-white p-1 cursor-pointer transition-all duration-300"
                        onClick={() => handleIncrease(item)}
                        disabled={
                          addToCartMutation.isPending ||
                          updateCartMutation.isPending
                        }
                      >
                        <FaPlus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {displayItems.length > 0 && (
            <Link
              className="!w-[85%] !max-w-none mb-5"
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
            >
              <Button>پرداخت</Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
