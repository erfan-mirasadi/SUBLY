"use client";
import Button from "@/src/components/Button";
import Spinner from "@/src/components/ui/Spinner";
import {
  useAddToCartMutation,
  useCart,
  useCartQuery,
  useUpdateCartMutation,
  useRemoveCartMutation,
} from "@/src/hooks/mutate/cart";
import { FaMinus, FaPlus } from "react-icons/fa";
import CountUp from "react-countup";
// Object to store previous prices globally
let lastShownPrices = {};

export default function ClientPrice({ productEntry, plan }) {
  const { cart, addItem, removeItem, clearCart, hasItem } =
    useCart("cart-items");
  const { data: cartItems } = useCartQuery();
  const { mutate: addToCart, isPending: isAddPending } = useAddToCartMutation();
  const { mutate: updateCart, isPending: isUpdatePending } =
    useUpdateCartMutation();
  const { mutate: removeCart, isPending: isRemovePending } =
    useRemoveCartMutation();
  const planDetail = productEntry.product_plans.find((p) => p.title === plan);
  // Price calculation and display logic
  const oldPrice =
    planDetail && planDetail.state === "outlet" && planDetail.discount_price
      ? planDetail.price
      : null;
  const finalPrice =
    planDetail?.state === "outlet" && planDetail?.discount_price
      ? parseFloat((planDetail.price - planDetail.discount_price).toFixed(10))
      : planDetail?.price ?? null;
  // Button text logic
  const buttonText = finalPrice ? "خرید" : "تماس با ما";

  // Determine decimals for CountUp
  let decimals = 0;
  if (finalPrice !== null && !Number.isInteger(finalPrice)) {
    const decimalStr = finalPrice.toString().split(".")[1] || "";
    decimals = decimalStr.replace(/0+$/, "").length;
    if (decimals === 0) decimals = 2;
  }

  // Get the previous price that was shown to user
  const productId = productEntry.id;
  const previousPrice = lastShownPrices[productId] ?? finalPrice ?? 0;

  // Update the last shown price for next plan change
  lastShownPrices[productId] = finalPrice ?? 0;

  // Check if product is in cart
  const authToken =
    typeof window !== "undefined"
      ? localStorage.getItem("subly_access_token")
      : null;
  const isLoggedIn = !!authToken;

  let cartItem = null;
  let quantity = 0;

  if (isLoggedIn) {
    // Check server cart
    cartItem = cartItems?.find((item) => item.plan_id === planDetail?.id);
    quantity = cartItem?.quantity || 0;
  } else {
    // Check local cart
    cartItem = cart.find((item) => item.id === planDetail?.id);
    quantity = cartItem?.quantity || 0;
  }

  const isInCart = quantity > 0;
  const isPending = isAddPending || isUpdatePending || isRemovePending;

  const dataToLocalStorage = {
    id: planDetail?.id,
    title: productEntry.title,
    price: finalPrice,
    oldPrice: oldPrice,
    plan: plan,
    image: productEntry.image,
    model: productEntry.model,
    description: productEntry.description,
    features: productEntry.features,
  };
  const handleAddToCart = () => {
    const authToken =
      typeof window !== "undefined"
        ? localStorage.getItem("subly_access_token")
        : null;
    if (authToken) {
      // User is logged in - add to server
      addToCart({
        id: planDetail?.id,
        user_id:
          typeof window !== "undefined"
            ? localStorage.getItem("subly_user_id")
            : null,
        quantity: 1,
      });
    } else {
      // User is not logged in - add to local storage
      addItem(dataToLocalStorage);
    }
  };

  const handleIncrease = () => {
    if (isLoggedIn) {
      // Add to server cart
      addToCart({
        id: planDetail?.id,
        user_id:
          typeof window !== "undefined"
            ? localStorage.getItem("subly_user_id")
            : null,
        quantity: 1,
      });
    } else {
      // Add to local cart
      addItem(dataToLocalStorage);
    }
  };

  const handleDecrease = () => {
    if (isLoggedIn) {
      if (quantity === 1) {
        // Remove from server cart
        removeCart(cartItem.id);
      } else {
        // Update quantity in server cart
        updateCart({
          cart_item_id: cartItem.id,
          quantity: quantity - 1,
        });
      }
    } else {
      // Remove from local cart
      removeItem(planDetail?.id);
    }
  };

  return (
    <div className="">
      <h3 dir="rtl" className="text-extrabold text-6xl text-center my-12">
        <div className="flex flex-col items-center justify-center min-h-[120px] md:min-h-[200px]">
          {oldPrice && (
            <div className="text-gray-500 text-sm md:text-xl line-through mb-2 font-vazirmatn">
              {oldPrice.toLocaleString()} تومان
            </div>
          )}
          <div className="flex items-center justify-center">
            <div className="text-[1.5rem] md:text-[2rem] leading-normal md:leading-normal md:md:text-[2.5rem] flex items-end">
              $
            </div>
            <div className="text-[3.5rem] md:text-[5.5rem] leading-none font-bold">
              <CountUp
                start={previousPrice}
                end={finalPrice}
                decimals={decimals}
                decimal=","
                duration={1}
                useEasing={false}
                preserveValue
              />
            </div>
          </div>
        </div>
      </h3>
      <div className="my-11">
        {!finalPrice ? (
          <Button>{buttonText}</Button>
        ) : isInCart ? (
          <div className="flex items-center justify-center gap-4">
            <button
              className="bg-gray-800/60 text-white rounded-md p-3 hover:bg-gray-700/60 disabled:opacity-50 cursor-pointer hover:scale-95 duration-300 transition-all"
              onClick={handleDecrease}
              disabled={isPending}
            >
              <FaMinus size={16} />
            </button>

            <div className="flex items-center justify-center min-w-[60px] h-12 bg-gray-800/60 rounded-md select-none">
              {isPending ? (
                <Spinner size={20} />
              ) : (
                <span className="text-white font-vazirmatn text-lg">
                  {quantity}
                </span>
              )}
            </div>

            <button
              className="bg-gray-800/60 hover:scale-105 duration-300 transition-all text-white rounded-md p-3 hover:bg-gray-700/60 disabled:opacity-50 cursor-pointer"
              onClick={handleIncrease}
              disabled={isPending}
            >
              <FaPlus size={16} />
            </button>
          </div>
        ) : (
          <Button onClick={handleAddToCart} loading={isPending}>
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
}
