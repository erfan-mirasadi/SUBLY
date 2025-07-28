"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useCart } from "@/src/hooks/useCart";

export default function AddToCartButton({ plan, productInfo, className = "" }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToCart } = useCart();
  const { data: session } = useSession();

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      // Combine plan and product info for localStorage
      const fullPlanInfo = {
        ...plan,
        product_id: productInfo?.id,
        product_title: productInfo?.title,
        product_image: productInfo?.image_small_url,
        product_caption: productInfo?.caption,
        model: productInfo?.model,
      };

      const result = await addToCart(plan.id, 1, fullPlanInfo);
      if (result) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading || !plan}
      className={`w-full mb-6 bg-amber-50 text-black rounded-2xl px-6 py-3 font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className} ${
        success ? "bg-green-500 text-white" : ""
      }`}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          در حال افزودن...
        </div>
      ) : success ? (
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          افزوده شد!
        </div>
      ) : (
        "BUY"
      )}
    </button>
  );
}
