import supabase from "./supabase";

// افزودن آیتم‌های سفارش به جدول order_items
export async function addOrderItems(order_id, items) {
  const formattedItems = items.map((item) => ({
    order_id,
    product_id: item.product_id,
    quantity: item.quantity,
    unit_price: item.unit_price,
    discount_price: item.discount_price || null,
  }));

  const { error } = await supabase.from("order_items").insert(formattedItems);
  if (error) throw new Error("خطا در افزودن آیتم‌های سفارش");
}

// گرفتن آیتم‌های سفارش
export async function getOrderItems(order_id) {
  const { data, error } = await supabase
    .from("order_items")
    .select("*, product(*)")
    .eq("order_id", order_id);

  if (error) throw new Error("خطا در دریافت آیتم‌های سفارش");
  return data;
}
