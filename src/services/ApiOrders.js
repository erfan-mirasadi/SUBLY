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

  // فقط آیتم‌های موجود را نگه دار
  const availableItems = (data || []).filter(
    (item) => item.plan && item.plan.is_available !== false
  );

  // Convert prices to Iranian Rial before returning
  const [cartItems, currencies] = await Promise.all([
    Promise.resolve(availableItems),
    getCurrenciesQuery(),
  ]);

  return await convertCartItems(cartItems, currencies);
}

// Create new order with converted prices (in Iranian Rial)
export async function createOrder(user_id, cartItems) {
  if (!cartItems || cartItems.length === 0) {
    throw new Error("سبد خرید خالی است");
  }

  // فقط آیتم‌های موجود را نگه دار
  const availableItems = cartItems.filter(
    (item) => item.plan && item.plan.is_available !== false
  );

  if (availableItems.length === 0) {
    throw new Error("هیچ محصول موجودی در سبد خرید نیست");
  }

  // Map available cart items to order items with converted prices
  const order_items = availableItems.map((item) => {
    const plan = item.plan;
    const quantity = item.quantity;

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

  // Create order
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
      discount_price: order_items.reduce(
        (acc, i) => acc + i.discount_price * i.quantity,
        0
      ),
    })
    .select()
    .single();

  if (orderError) {
    throw new Error("خطا در ساخت سفارش: " + orderError.message);
  }

  const orderId = orderData.id;

  // Create order_items
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
