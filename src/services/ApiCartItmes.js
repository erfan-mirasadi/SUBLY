import supabase from "./supabase";

// Test function to check table structure
export async function testCartTable() {
  try {
    // Try to select from cart_items to see if table exists
    const { data, error } = await supabase
      .from("cart_items")
      .select("*")
      .limit(1);

    if (error) {
      console.error("Table test error:", error);
      return { exists: false, error: error.message };
    }

    console.log("Cart table exists, sample data:", data);
    return { exists: true, data };
  } catch (err) {
    console.error("Test function error:", err);
    return { exists: false, error: err.message };
  }
}

// افزودن محصول به سبد خرید
export async function addToCart(user_id, plan_id, quantity = 1) {
  console.log("Adding to cart:", { user_id, plan_id, quantity });

  // First check if item already exists
  const { data: existingItem, error: checkError } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("user_id", user_id)
    .eq("plan_id", plan_id)
    .single();

  if (checkError && checkError.code !== "PGRST116") {
    // PGRST116 = no rows returned
    console.error("Error checking existing item:", checkError);
    throw new Error(`خطا در بررسی آیتم موجود: ${checkError.message}`);
  }

  if (existingItem) {
    // Item exists, update quantity
    const newQuantity = existingItem.quantity + quantity;
    const { data, error } = await supabase
      .from("cart_items")
      .update({ quantity: newQuantity })
      .eq("id", existingItem.id)
      .select();

    if (error) {
      console.error("Supabase error updating cart:", error);
      throw new Error(`خطا در به‌روزرسانی سبد خرید: ${error.message}`);
    }

    console.log("Successfully updated cart item:", data);
    return data;
  } else {
    // Item doesn't exist, insert new
    const { data, error } = await supabase
      .from("cart_items")
      .insert({
        user_id,
        plan_id,
        quantity,
      })
      .select();

    if (error) {
      console.error("Supabase error details:", error);
      throw new Error(`خطا در افزودن به سبد خرید: ${error.message}`);
    }

    console.log("Successfully added to cart:", data);
    return data;
  }
}

// گرفتن سبد خرید یک کاربر
export async function getCartItems(user_id) {
  const { data, error } = await supabase
    .from("cart_items")
    .select(
      `
      *,
      plan:plan_id(
        *,
        product_entry(
          *,
          product(*)
        )
      )
    `
    )
    .eq("user_id", user_id);

  if (error) {
    console.error("Error fetching cart items:", error);
    throw new Error("خطا در دریافت سبد خرید");
  }
  return data;
}

// حذف آیتم از سبد خرید
export async function removeCartItems(cart_item_id) {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", cart_item_id);
  if (error) throw new Error("خطا در حذف آیتم سبد خرید");
}
