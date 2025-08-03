import supabase from "./supabase";
import {
  getCurrenciesQuery,
  convertCartItems,
} from "../hooks/query/currencies";

// Fetch cart items with details and convert prices to Iranian Rial
export async function fetchCartWithDetails(user_id) {
  const { data, error } = await supabase
    .from("cart_items")
    .select(
      `
      *,
      plan:plan_id (
        *,
        product_entry (
          *,
          product (*)
        )
      )
    `
    )
    .eq("user_id", user_id);

  if (error) throw new Error(error.message);

  // Convert prices to Iranian Rial before returning
  const [cartItems, currencies] = await Promise.all([
    Promise.resolve(data),
    getCurrenciesQuery(),
  ]);

  return await convertCartItems(cartItems, currencies);
}

// Create new order with converted prices (in Iranian Rial)
// All prices (total_price, discount_price, unit_price) are already converted to IRR
export async function createOrder(user_id, cartItems) {
  if (!cartItems || cartItems.length === 0) {
    throw new Error("سبد خرید خالی است");
  }

  // Map cart items to order items with converted prices
  const order_items = cartItems.map((item) => {
    const plan = item.plan;
    const quantity = item.quantity;

    // These prices are already converted to Iranian Rial
    const unit_price = plan?.price ?? 0;
    const discount_price = plan?.discount_price ?? 0;
    const total_price = (unit_price - discount_price) * quantity;

    return {
      plan_id: plan?.id,
      quantity,
      unit_price,
      discount_price,
      total_price,
    };
  });

  const orderTotal = order_items.reduce((acc, i) => acc + i.total_price, 0);

  // Step 1: Create order with converted prices
  const { data: orderData, error: orderError } = await supabase
    .from("order")
    .insert({
      user_id,
      total_price: orderTotal,
      status: "pending",
      payment_status: "unpaid",
      unit_price: order_items.reduce(
        (acc, i) => acc + i.unit_price * i.quantity,
        0
      ),
      discount_price: order_items.reduce((acc, i) => acc + i.discount_price, 0),
    })
    .select()
    .single();

  if (orderError) {
    throw new Error("خطا در ساخت سفارش: " + orderError.message);
  }

  const orderId = orderData.id;

  // Step 2: Create order_items with converted prices
  const enrichedItems = order_items.map((item) => ({
    ...item,
    order_id: orderId,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(enrichedItems);

  if (itemsError) {
    throw new Error("خطا در افزودن آیتم‌های سفارش: " + itemsError.message);
  }

  return orderData;
}
