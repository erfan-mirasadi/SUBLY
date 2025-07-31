// "use client";

// import { useCart } from "@/src/hooks/useCart";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// export default function ShoppingCartPage() {
//   const router = useRouter();
//   const { cartItems, loading, removeFromCart, getCartItemsCount } = useCart();
//   const [fetch, setFetch] = useState(false);
//   useEffect(() => {
//     setFetch(true);
//   }, []);
//   useEffect(() => {
//     setFetch(false);
//   }, [fetch]);
//   console.log({ cartItems });
//   const { data: session } = useSession();

//   const [removingItems, setRemovingItems] = useState(new Set());

//   const handleRemoveItem = async (itemId) => {
//     setRemovingItems((prev) => new Set(prev).add(itemId));
//     try {
//       await removeFromCart(itemId);
//     } finally {
//       setRemovingItems((prev) => {
//         const newSet = new Set(prev);
//         newSet.delete(itemId);
//         return newSet;
//       });
//     }
//   };

//   const handleCheckout = () => {
//     if (!session?.user) {
//       if (typeof window !== "undefined") {
//         localStorage.setItem("redirectAfterLogin", "/shoppingCard");
//       }
//       router.push("/login");
//       return;
//     }
//     // TODO: Implement checkout logic
//     console.log("Proceeding to checkout...");
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#0E0C15] pt-24">
//         <div className="max-w-4xl mx-auto px-4 py-8">
//           <div className="flex justify-center items-center h-64">
//             <div className="w-8 h-8 border-2 border-[#AC6AFF] border-t-transparent rounded-full animate-spin"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#0E0C15] pt-24">
//       <div className="max-w-4xl mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold text-white mb-8">سبد خرید</h1>

//         {cartItems.length === 0 ? (
//           <div className="text-center py-16">
//             <div className="text-6xl mb-4">🛒</div>
//             <h2 className="text-2xl font-semibold text-white mb-4">
//               سبد خرید شما خالی است
//             </h2>
//             <p className="text-[#ADA8C3] mb-8">
//               محصولات مورد نظر خود را به سبد خرید اضافه کنید
//             </p>
//             <button
//               onClick={() => router.push("/products")}
//               className="px-6 py-3 bg-[#AC6AFF] hover:bg-[#AC6AFF]/80 text-white font-medium rounded-lg transition-all duration-300"
//             >
//               مشاهده محصولات
//             </button>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {cartItems.map((item) => {
//               const plan = item.plan;
//               // Handle both server response (nested) and localStorage (flat) structures
//               const productEntry = plan?.product_entry;
//               const product = productEntry?.product || {
//                 title: plan?.product_title,
//                 image_small_url: plan?.product_image,
//                 caption: plan?.product_caption,
//               };

//               return (
//                 <div
//                   key={item.id}
//                   className="bg-[#1B1B2E] rounded-lg p-6 border border-[#252134]"
//                 >
//                   <div className="flex items-center gap-4">
//                     {product?.image_small_url && (
//                       <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
//                         <Image
//                           src={product.image_small_url}
//                           alt={product.title || "محصول"}
//                           width={80}
//                           height={80}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                     )}

//                     <div className="flex-1">
//                       <h3 className="text-lg font-semibold text-white mb-2">
//                         {product?.title || "محصول"}
//                       </h3>
//                       <p className="text-[#ADA8C3] text-sm mb-2">
//                         {productEntry?.model || plan?.model || ""} -{" "}
//                         {plan?.title || ""}
//                       </p>
//                       <div className="flex items-center gap-4">
//                         <span className="text-[#AC6AFF] font-medium">
//                           تعداد: {item.quantity}
//                         </span>
//                         {plan?.price && (
//                           <span className="text-white font-medium">
//                             قیمت: ${plan.price}
//                           </span>
//                         )}
//                       </div>
//                     </div>

//                     <button
//                       onClick={() => handleRemoveItem(item.id)}
//                       disabled={removingItems.has(item.id)}
//                       className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {removingItems.has(item.id) ? (
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       ) : (
//                         "حذف"
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}

//             <div className="bg-[#1B1B2E] rounded-lg p-6 border border-[#252134]">
//               <div className="flex justify-between items-center mb-4">
//                 <span className="text-white font-medium">
//                   تعداد کل آیتم‌ها:
//                 </span>
//                 <span className="text-[#AC6AFF] font-bold">
//                   {getCartItemsCount()}
//                 </span>
//               </div>

//               <button
//                 onClick={handleCheckout}
//                 className="w-full py-3 bg-[#AC6AFF] hover:bg-[#AC6AFF]/80 text-white font-medium rounded-lg transition-all duration-300"
//               >
//                 {session?.user ? "ادامه خرید" : "ورود و ادامه خرید"}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}
