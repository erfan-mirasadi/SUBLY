import supabase from "./supabase";

// گرفتن سبد خرید یک کاربر
export async function getCartItems(user_id) {
  // Check if user_id is valid
  if (!user_id) {
    console.log("No user_id provided, returning empty cart");
    return [];
  }

  try {
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
      // If it's an RLS error or permission issue, return empty array instead of throwing
      if (
        error.code === "42501" ||
        error.message?.includes("permission") ||
        Object.keys(error).length === 0
      ) {
        console.log("Permission issue or empty error, returning empty cart");
        return [];
      }
      throw new Error("خطا در دریافت سبد خرید");
    }

    // فقط آیتم‌هایی که plan دارند و موجود هستند را برگردان
    const availableItems = (data || []).filter(
      (item) => item.plan && item.plan.is_available !== false
    );

    return availableItems;
  } catch (err) {
    console.error("Unexpected error in getCartItems:", err);
    return [];
  }
}

// افزودن محصول به سبد خرید
export async function addToCart(user_id, plan_id, quantity = 1) {
  console.log("Adding to cart:", { user_id, plan_id, quantity });

  try {
    // چک کردن موجودی plan
    const { data: planData, error: planError } = await supabase
      .from("product_plans")
      .select("id, is_available")
      .eq("id", plan_id)
      .single();

    if (planError || !planData || planData.is_available === false) {
      throw new Error("این محصول در حال حاضر موجود نیست");
    }

    // چک کردن اینکه آیتم از قبل در سبد هست یا نه
    const { data: existingItems, error: getError } = await supabase
      .from("cart_items")
      .select("id, quantity")
      .eq("user_id", user_id)
      .eq("plan_id", plan_id);

    if (getError) {
      throw new Error(`خطا در بررسی سبد خرید: ${getError.message}`);
    }

    // اگر آیتم وجود داره، quantity رو افزایش بده
    if (existingItems && existingItems.length > 0) {
      const existingItem = existingItems[0];
      const newQuantity = existingItem.quantity + quantity;
      const { data: updateData, error: updateError } = await supabase
        .from("cart_items")
        .update({ quantity: newQuantity })
        .eq("id", existingItem.id)
        .select();

      if (updateError) {
        throw new Error(`خطا در به‌روزرسانی سبد خرید: ${updateError.message}`);
      }

      return updateData;
    }

    // اگر آیتم وجود نداره، جدید اضافه کن
    const { data: insertData, error: insertError } = await supabase
      .from("cart_items")
      .insert({
        user_id,
        plan_id,
        quantity,
      })
      .select();

    if (insertError) {
      throw new Error(`خطا در افزودن به سبد خرید: ${insertError.message}`);
    }

    return insertData;
  } catch (error) {
    console.error("Unexpected error in addToCart:", error);
    throw error;
  }
}

// حذف آیتم از سبد خرید
export async function removeCartItems(cart_item_id) {
  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", cart_item_id);

  if (error) {
    console.error("Error removing cart item:", error);
    throw new Error("خطا در حذف آیتم سبد خرید");
  }

  return true;
}

// به‌روزرسانی تعداد آیتم در سبد خرید
export async function updateCartItemQuantity(cart_item_id, quantity) {
  if (quantity <= 0) {
    return await removeCartItems(cart_item_id);
  }

  const { data, error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", cart_item_id)
    .select();

  if (error) {
    console.error("Error updating cart item quantity:", error);
    throw new Error("خطا در به‌روزرسانی تعداد آیتم");
  }

  return data;
}

// پاک کردن تمام سبد خرید یک کاربر
// export async function clearCart(user_id) {
//   const { error } = await supabase
//     .from("cart_items")
//     .delete()
//     .eq("user_id", user_id);

//   if (error) {
//     console.error("Error clearing cart:", error);
//     throw new Error("خطا در پاک کردن سبد خرید");
//   }

//   return true;
// }
