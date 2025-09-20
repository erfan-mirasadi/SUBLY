// "use client";

// import { useState } from "react";
// import { useAddToCartMutation } from "@/src/hooks/mutate/cart";
// import Link from "next/link";

// export default function AddToCartButton({ plan, productInfo, className = "" }) {
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const addToCartMutation = useAddToCartMutation();

//   console.log({plan, productInfo});

//   // Check if the plan is available
//   const isAvailable = plan?.is_available !== false;

//   const handleAddToCart = async () => {
//     if (!isAvailable) return;

//     const userId = localStorage.getItem("sably_user_id");
//     if (!userId) {
//       // Handle user not logged in
//       return;
//     }

//     setLoading(true);
//     try {
//       await addToCartMutation.mutateAsync({
//         id: plan?.id,
//         user_id: userId,
//         quantity: 1
//       });
//       setSuccess(true);
//       setTimeout(() => setSuccess(false), 2000);
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // If not available, show contact button
//   if (!isAvailable) {
//     return (
//       <Link href="/support" className="w-full block">
//         <button className={`w-full mb-6 bg-red-500 text-white rounded-2xl px-6 py-3 font-medium transition-all duration-300 ${className}`}>
//           تماس با ما
//         </button>
//       </Link>
//     );
//   }

//   return (
//     <button
//       onClick={handleAddToCart}
//       disabled={loading}
//       className={`w-full mb-6 bg-amber-50 text-black rounded-2xl px-6 py-3 font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className} ${
//         success ? "bg-green-500 text-white" : ""
//       }`}
//     >
//       {loading ? (
//         <div className="flex items-center gap-2">
//           <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//           در حال افزودن...
//         </div>
//       ) : success ? (
//         <div className="flex items-center gap-2">
//           <svg
//             className="w-4 h-4"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M5 13l4 4L19 7"
//             />
//           </svg>
//           افزوده شد!
//         </div>
//       ) : (
//         "افزودن به سبد"
//       )}
//     </button>
//   );
// }
