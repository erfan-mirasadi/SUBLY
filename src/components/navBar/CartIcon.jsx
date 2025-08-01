"use client";
import {useCart, useCartQuery } from "@/src/hooks/mutate/cart";
import { useEffect, useState } from "react";
import { MdOutlineShoppingCart, MdShoppingCart } from "react-icons/md";
import Cart from "./Cart";
export default function CartIcon() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [id,setId] = useState(null);
  const {data: cartItems,refetch} = useCartQuery();
  const {totalQuantity} = useCart("cart-items");
  useEffect(() => {
    setId(localStorage.getItem("subly_user_id"));
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if(id){
      refetch();
    }
  }, [id]);
  return (
    <>
      {isMounted && (
        <>
          <Cart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
          <div
            className="relative mr-3 cursor-pointer"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            {totalQuantity > 0 || cartItems.length > 0 ? (
              <MdShoppingCart className="w-6 h-6 text-white cursor-pointer hover:text-gray-600 transition-colors duration-300" />
            ) : (
              <MdOutlineShoppingCart className="w-6 h-6 text-gray-600 cursor-pointer hover:text-white transition-colors duration-300" />
            )}
            {(totalQuantity > 0 || cartItems.length > 0) && (
              <div className="absolute cursor-pointer -top-[12px] -right-[15px] text-[14px] flex items-center justify-center w-6 h-6 bg-red-400 text-white font-bold rounded-full">
                {totalQuantity > 0 ? totalQuantity : cartItems.reduce((acc,item)=>acc+item.quantity,0)}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
