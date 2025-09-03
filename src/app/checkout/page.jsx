"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useGetCurrentUser } from "@/src/hooks/query/user";
import { useCreateOrder } from "@/src/hooks/mutate/order";
import { fetchCartWithDetails } from "@/src/services/ApiOrders";
import {
  UserLoadingState,
  CartLoadingState,
  EmptyCartState,
} from "./LoadingStates";
import CartItemsList from "./CartItemsList";
import OrderSummary from "./OrderSummary";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: user, isLoading: userLoading } = useGetCurrentUser();
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  // Store account info for all products
  const [itemAccountInfo, setItemAccountInfo] = useState({});

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

  // Handle account info changes from cart items
  const handleAccountInfoChange = (itemId, accountInfo) => {
    setItemAccountInfo((prev) => ({
      ...prev,
      [itemId]: accountInfo,
    }));
  };

  const handleCreateOrder = async (telegramInfo = "") => {
    if (!cartItems?.length) {
      alert("سبد خرید خالی است");
      return;
    }

    setIsCreatingOrder(true);
    try {
      // Add account info and telegram info to order data
      const orderData = {
        itemAccountInfo: itemAccountInfo,
        telegramInfo: telegramInfo,
      };

      const order = await createOrderMutation.mutateAsync(orderData);
      alert(`سفارش با موفقیت ثبت شد! شناسه سفارش: ${order.id}`);

      // Set session storage for valid success page access
      sessionStorage.setItem("orderSuccess", "true");
      sessionStorage.setItem("orderTimestamp", Date.now().toString());
      sessionStorage.setItem("lastOrderId", order.id.toString());

      router.push(`/success`);
    } catch (error) {
      alert(`خطا در ثبت سفارش: ${error.message}`);
    } finally {
      setIsCreatingOrder(false);
    }
  };

  // Loading and error states
  if (userLoading) return <UserLoadingState />;
  if (!user) return <UserLoadingState />;
  if (cartLoading) return <CartLoadingState />;
  if (cartError || !cartItems?.length) {
    return <EmptyCartState onGoToProducts={() => router.push("/products")} />;
  }

  return (
    <div
      style={{ direction: "ltr" }}
      className="min-h-screen bg-gradient-to-br shadow-black shadow-2xl from-gray-900 via-black to-gray-900 py-30 px-4"
    >
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
            <CartItemsList
              cartItems={cartItems}
              onAccountInfoChange={handleAccountInfoChange}
            />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              calculations={calculations}
              cartItems={cartItems}
              user={user}
              isCreatingOrder={isCreatingOrder}
              isPending={createOrderMutation.isPending}
              onCreateOrder={handleCreateOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
