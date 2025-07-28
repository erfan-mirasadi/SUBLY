import { createOrder } from "./api/order";
import { getCartItems, removeCartItems } from "./api/cart";
import { addOrderItem } from "./api/orderItems";

export async function checkout(user_id, payment_gateway, discount_code = null) {
  const cartItems = await getCartItems(user_id);
  if (!cartItems || cartItems.length === 0)
    throw new Error("سبد خرید خالی است");

  // محاسبه قیمت کل
  const total_price = cartItems.reduce((total, item) => {
    return total + (item.product?.price || 0) * item.quantity;
  }, 0);

  // ساخت سفارش
  const order = await createOrder({
    user_id,
    total_price,
    discount_code,
    payment_gateway,
  });

  // اضافه کردن آیتم‌ها به سفارش
  for (const item of cartItems) {
    await addOrderItem({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.product?.price || 0,
    });
  }

  // خالی کردن سبد خرید
  for (const item of cartItems) {
    await removeCartItems(item.id);
  }

  return order;
}
