"use client";
import { useCart, useCartQuery } from "@/src/hooks/mutate/cart";
import { useEffect, useState } from "react";
import { MdOutlineShoppingCart, MdShoppingCart } from "react-icons/md";
import Cart from "./Cart";
export default function CartIcon() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [id, setId] = useState(null);
  const { data: cartItems, refetch } = useCartQuery();
  const { totalQuantity } = useCart("cart-items");

  // تشخیص اینکه کاربر لاگین هست یا نه
  const isLoggedIn = !!id;

  useEffect(() => {
    const userId = localStorage.getItem("subly_user_id");
    setId(userId);
    setIsMounted(true);

    // اگر کاربر لاگین هست، فوراً cart رو بگیر
    if (userId) {
      refetch();
    }
  }, [refetch]);

  // شنود تغییرات login/logout
  useEffect(() => {
    const handleStorageChange = () => {
      const newUserId = localStorage.getItem("subly_user_id");
      if (newUserId !== id) {
        setId(newUserId);
        if (newUserId) {
          refetch();
        }
      }
    };

    // شنود تغییرات localStorage از سایر tab ها
    window.addEventListener("storage", handleStorageChange);

    // شنود تغییرات در همین tab
    const interval = setInterval(handleStorageChange, 2000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [id, refetch]);

  // محاسبه تعداد کل آیتم‌ها (اگر لاگین هست فقط server، وگرنه فقط localStorage)
  const totalItems = isLoggedIn
    ? cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0
    : totalQuantity;
  return (
    <>
      {isMounted && (
        <>
          <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
          <div
            className="relative mr-3 cursor-pointer"
            onClick={() => setIsCartOpen(!isCartOpen)}
            title="سبد خرید"
          >
            {totalItems > 0 ? (
              <MdShoppingCart className="w-6 h-6 text-white cursor-pointer hover:text-gray-600 transition-colors duration-300" />
            ) : (
              <MdOutlineShoppingCart className="w-6 h-6 text-gray-600 cursor-pointer hover:text-white transition-colors duration-300" />
            )}
            {totalItems > 0 && (
              <div className="absolute cursor-pointer -top-[12px] -right-[15px] text-[14px] flex items-center justify-center w-6 h-6 bg-red-400 text-white font-bold rounded-full">
                {totalItems}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
