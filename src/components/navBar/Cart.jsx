"use client"
import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import Button from "../Button";
import { useCart, useCartQuery } from "@/src/hooks/mutate/cart";

export default function Cart({ isCartOpen, setIsCartOpen }) {
  const {cart} = useCart("cart-items");
  const {data: cartItems} = useCartQuery();
  console.log({cart,cartItems});
  return (
    <div
      className={`fixed top-0 right-0 w-full flex flex-col max-w-[400px] h-screen overflow-y-auto rounded-l-3xl rounded-b-none  bg-black/70 backdrop-blur-sm z-50 ${
        isCartOpen ? "translate-x-0 shadow-lg shadow-white/10 border-l border-white/10" : "translate-x-full"
      } transition-transform duration-300`}
    >
      <span className=" h-[100px] sticky flex items-center justify-start pl-5 cursor-pointer overflow-hidden">
        <span className="bg-red-500 rounded-full p-[2px] bg-conic-gradient">
          <IoCloseCircle
            size={35}
            onClick={() => setIsCartOpen(false)}
            className="bg-[#0E0C15]/90 rounded-full"
          />
        </span>
      </span>
      <div className="w-full h-full flex-1 flex flex-col items-center justify-between pb-2">
      <div className="w-full h-full mb-1 overflow-y-auto flex flex-col gap-2 px-4">
{cart.length > 0 ? cart.map((item)=>(
  <div key={item.id} className="flex items-center justify-between py-8 border-b-[1px] border-b-gray-300 ">
    <h1>{item.title}</h1>
    <p>{item.price}</p>
  </div>
)) : cartItems.map((item)=>(
  <div key={item.id} className="flex items-center justify-between py-8 border-b-[1px] border-b-gray-300 ">
    <h1>{item.plan.product_entry.product.title}</h1>
    <p>{item.plan.price}</p>
  </div>
))}
      </div>
      <Button className="!w-[95%] !max-w-none">checkout</Button>
      </div>
    </div>
  );
}
