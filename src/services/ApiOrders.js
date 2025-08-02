import supabase from "./supabase";

// دریافت آیتم‌های سبد خرید + دیتای مرتبط
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
  return data;
}

// ساخت سفارش جدید
export async function createOrder(user_id, cartItems) {
  if (!cartItems || cartItems.length === 0) {
    throw new Error("سبد خرید خالی است");
  }

  const order_items = cartItems.map((item) => {
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

  // مرحله اول: ساخت سفارش
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

  // مرحله دوم: ساخت order_items
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
