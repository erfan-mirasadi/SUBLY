"use client";
import { useCart } from "@/src/hooks/useCart";
import { useRouter } from "next/navigation";
import { MdOutlineShoppingCart, MdShoppingCart } from "react-icons/md";

export default function CartIcon() {
  const { getCartItemsCount } = useCart();
  const router = useRouter();
  const cartItemsCount = getCartItemsCount();
  const handleCartClick = () => router.push("/shoppingCard");
  return (
    <button
      onClick={handleCartClick}
      className="relative flex items-center justify-center w-8 h-8 group cursor-pointer hover:scale-110 transition-all duration-300"
      aria-label="Shopping cart"
    >
      {/* Cart Icon */}
      {cartItemsCount > 0 ? (
        <MdShoppingCart className="w-6 h-6 text-white group-hover:text-gray-600 transition-colors duration-300" />
      ) : (
        <MdOutlineShoppingCart className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors duration-300" />
      )}

      {/* Cart Badge */}
      {cartItemsCount > 0 && (
        <div className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full">
          {cartItemsCount > 99 ? "99+" : cartItemsCount}
        </div>
      )}
    </button>
  );
}
