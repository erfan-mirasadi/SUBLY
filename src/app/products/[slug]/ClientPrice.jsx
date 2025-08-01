"use client";
import Button from "@/src/components/Button";
import { useAddToCartMutation, useCart } from "@/src/hooks/mutate/cart";
import CountUp from "react-countup";
// Object to store previous prices globally
let lastShownPrices = {};

export default function ClientPrice({ productEntry, plan }) {
  const { cart, addItem, removeItem, clearCart, hasItem } = useCart("cart-items");
  const {mutate: addToCart,isPending} = useAddToCartMutation();
  const planDetail = productEntry.product_plans.find((p) => p.title === plan);
  // Price calculation and display logic
  const oldPrice = planDetail && planDetail.state === "outlet" && planDetail.discount_price? planDetail.price: null;
  const finalPrice = planDetail?.state === "outlet" && planDetail?.discount_price ? parseFloat((planDetail.price - planDetail.discount_price).toFixed(10)) : planDetail?.price ?? null;
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
  }
  const handleAddToCart = () => {
    const authToken = localStorage.getItem("subly_access_token");
    if (!authToken) {
      addItem(dataToLocalStorage);
      return;
    }else{
      addToCart({
        id: planDetail?.id,
        user_id: localStorage.getItem("subly_user_id"),
        quantity: 1,
      })
    }
  }
  return (
    <div className="">
      <h3 dir="rtl" className="text-extrabold text-6xl text-center my-12">
        {oldPrice && (
          <div className="text-gray-500 scale-20 line-through">
            {oldPrice} تومان
          </div>
        )}
        <>
          <div className="text-[2rem] leading-normal md:text-[2.5rem] flex items-end">
            $
          </div>
          <div className="text-[5.5rem] leading-none font-bold">
            <CountUp
              start={previousPrice}
              end={finalPrice}
              decimals={decimals}
              decimal=","
              duration={2}
              useEasing={false}
              preserveValue
            />
          </div>
        </>
      </h3>
      <div className="my-11">
        <Button onClick={handleAddToCart} loading={isPending}>{buttonText}</Button>
      </div>
    </div>
  );
}
