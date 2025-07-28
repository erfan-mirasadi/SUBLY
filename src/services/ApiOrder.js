import supabase from "./supabase";

export async function createOrder({
  user_id,
  total_price,
  discount_code = null,
  payment_gateway,
}) {
  const { data, error } = await supabase
    .from("order")
    .insert({
      user_id,
      total_price,
      discount_code,
      payment_gateway,
      status: "pending",
      payment_status: "unpaid",
    })
    .select()
    .single();

  if (error) throw new Error("خطا در ساخت سفارش:", error);
  return data;
}

export async function getUserOrder(user_id) {
  const { data, error } = await supabase
    .from("order")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });

  if (error) throw new Error("خطا در دریافت سفارش‌ها");
  return data;
}

export async function updatePaymentStatus(order_id, status) {
  const { error } = await supabase
    .from("order")
    .update({ payment_status: status, paid_at: new Date() })
    .eq("id", order_id);

  if (error) throw new Error("خطا در به‌روزرسانی پرداخت");
}

export async function cancelOrder(order_id) {
  const { error } = await supabase
    .from("order")
    .update({ status: "canceled" })
    .eq("id", order_id);

  if (error) throw new Error("خطا در لغو سفارش");
}
